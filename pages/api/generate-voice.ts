import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const VOICE_ID = '9BWtsMINqrJLrRacOk9x'; // Aria stemme
const API_KEY = 'sk_d2283a9959b9d193172e9fa5014999c5c0b60d2e038947d8';

// Funksjon for å forbedre norsk uttale
function enhanceNorwegianPronunciation(text: string): string {
  // Legg til flere norske markører og SSML-lignende tags
  return `[nb-NO][LANGUAGE:Norwegian][ACCENT:Norwegian][REGION:Norway][DIALECT:Bokmål]
<speak>
  <lang xml:lang="nb-NO">
    <prosody rate="0.9" pitch="+0%">
      ${text}
    </prosody>
  </lang>
</speak>`;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Endepunkt for å liste stemmer
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': API_KEY!
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voices');
      }

      const voices = await response.json();
      return res.status(200).json(voices);
    } catch (error) {
      console.error('Error fetching voices:', error);
      return res.status(500).json({ error: 'Failed to fetch voices' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text, fileName } = req.body;

    if (!text || !fileName) {
      return res.status(400).json({ message: 'Text and fileName are required' });
    }

    if (!API_KEY) {
      console.error('ELEVEN_LABS_API_KEY is not set');
      return res.status(500).json({ message: 'API key is not configured' });
    }

    console.log(`[DEBUG] Starting generation for: ${fileName}`);
    console.log(`[DEBUG] Text content: ${text.substring(0, 100)}...`);
    console.log(`[DEBUG] API Key length: ${API_KEY.length}`);

    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
    console.log(`[DEBUG] API URL: ${apiUrl}`);

    console.log('Using voice ID:', VOICE_ID);

    // Først, la oss sjekke om stemmen eksisterer
    const voiceCheckResponse = await fetch(`https://api.elevenlabs.io/v1/voices/${VOICE_ID}`, {
      headers: {
        'xi-api-key': API_KEY!
      }
    });

    if (!voiceCheckResponse.ok) {
      console.error('Error checking voice:', await voiceCheckResponse.text());
      throw new Error('Voice not found or not accessible');
    }

    const voiceInfo = await voiceCheckResponse.json();
    console.log('Voice info:', JSON.stringify(voiceInfo, null, 2));

    const requestBody = {
      text: enhanceNorwegianPronunciation(text),
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.85, // Økt fra 0.5 for mer konsistent uttale
        similarity_boost: 0.95, // Økt fra 0.75 for å holde seg nærmere originaluttalen
        style: 0.5, // Lagt til litt mer stil for tydeligere uttale
        use_speaker_boost: true
      },
      voice: {
        languageCode: "nb-NO", // Tvinger norsk språk
        language: "Norwegian",
        accent: "Norwegian",
        region: "Norway"
      }
    };

    console.log('[DEBUG] Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
        'Accept-Language': 'nb-NO',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`[DEBUG] Response status: ${response.status}`);
    console.log(`[DEBUG] Response headers:`, response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ERROR] ElevenLabs API error (${response.status}):`, errorText);
      return res.status(response.status).json({ 
        message: 'ElevenLabs API error',
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('audio/mpeg')) {
      console.error(`[ERROR] Unexpected content type: ${contentType}`);
      const responseText = await response.text();
      console.error('[ERROR] Response body:', responseText);
      return res.status(500).json({ 
        message: 'Invalid response from ElevenLabs',
        contentType,
        response: responseText
      });
    }

    const audioBuffer = await response.arrayBuffer();
    if (audioBuffer.byteLength === 0) {
      console.error('[ERROR] Received empty audio buffer');
      return res.status(500).json({ message: 'Received empty audio from ElevenLabs' });
    }

    const publicDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, `${fileName}.mp3`);
    fs.writeFileSync(filePath, Buffer.from(audioBuffer));

    console.log(`[SUCCESS] Generated audio file: ${filePath}`);
    res.status(200).json({ success: true, path: `/audio/${fileName}.mp3` });
  } catch (error) {
    console.error('[ERROR] Error generating voice:', error);
    res.status(500).json({ 
      message: 'Error generating voice', 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    });
  }
}
