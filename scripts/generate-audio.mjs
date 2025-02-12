import { voiceTexts } from './voice-texts.js';

console.log('Script started...');

async function generateAudio() {
  console.log('Starting audio generation...');
  console.log(`Total texts to generate: ${voiceTexts.length}\n`);

  for (const item of voiceTexts) {
    console.log(`Generating audio for: ${item.filename}`);
    console.log(`Text content: ${item.text}`);

    try {
      const response = await fetch('http://localhost:3001/api/generate-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: item.text,
          fileName: item.filename.replace('.mp3', '')
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log(`✅ Successfully generated audio for: ${item.filename}\n`);
      } else {
        console.error(`❌ Failed to generate audio for: ${item.filename}`);
        console.error('Error:', data.error, '\n');
      }
    } catch (error) {
      console.error(`❌ Error generating audio for: ${item.filename}`);
      console.error('Error:', error.message, '\n');
    }

    // Legg inn en liten pause mellom hver request for å ikke overbelaste API-et
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('Audio generation completed!');
}

generateAudio().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
