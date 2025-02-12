import fs from 'fs';
import path from 'path';

const texts = {
  // Hjelp-tekster
  'help.tier_venner.title': 'Tier-venner: La oss lære om tall som blir 10 sammen!',
  'help.tier_venner.explanation': `
    Tenk på det som å lage et fotballag!
    Hvis du har 7 spillere, hvor mange flere trenger du for å ha et helt lag med 10?
    Det er som å telle hvor mange spillere som mangler på banen.
  `,
  'help.fotball_matte.title': 'Fotball-matte: La oss regne med fotball!',
  'help.fotball_matte.explanation': `
    Her regner vi med:
    Mål i kamper - akkurat som å telle Haaland sine scoringer!
    Poeng i serien - 3 poeng for seier, som i ekte fotball.
    Tilskuere på kamp - som å telle hvor mange som heier på laget ditt.
  `,
  'help.lesespill.title': 'Lesespill: La oss lære om fotballspillerne!',
  'help.lesespill.explanation': `
    Her skal vi lese spennende fakta om fotballspillerne!
    Trykk på høyttaler-knappen for å høre teksten.
    Les sammen med stemmen og svar på spørsmålene.
    Jo mer du leser, jo flere kort låser du opp!
  `,

  // Spiller-tekster
  'players.haaland.intro': 'Erling Haaland er en målmaskin som scorer mål nesten hver kamp for Manchester City!',
  'players.haaland.facts': 'Haaland ble født i Leeds i England, men spiller for det norske landslaget. Han er kjent for sin utrolige fart og styrke på banen.',
  'players.haaland.reading.text1': 'Erling Haaland spiller spiss for Manchester City. Han er kjent for å score mange mål og har en egen jubel når han scorer.',
  'players.haaland.reading.text2': 'Haaland trener hardt hver dag for å bli bedre. Han spiser sunn mat og sover godt for å holde seg i form.',

  'players.odegaard.intro': 'Martin Ødegaard er kaptein for Arsenal og det norske landslaget. Han er kjent for sine fantastiske pasninger!',
  'players.odegaard.facts': 'Ødegaard begynte å spille fotball i Strømsgodset og ble den yngste spilleren som noen gang har spilt i Eliteserien.',
  'players.odegaard.reading.text1': 'Martin Ødegaard er midtbanespiller og kaptein for Arsenal. Han er flink til å sentre ballen til lagkameratene sine.',
  'players.odegaard.reading.text2': 'Ødegaard trener mye på å bli bedre til å skyte og sentre. Han hjelper laget sitt med både mål og assists.',

  // Generelle lyder
  'reading.correct': 'Riktig svar! Du er flink til å lese!',
  'reading.incorrect': 'Prøv igjen! Les teksten en gang til, så klarer du det!',
  'reading.instructions': 'Trykk på høyttaler-knappen for å høre teksten. Les sammen med stemmen og svar på spørsmålene.',

  'correct': 'Riktig svar! Bra jobbet!',
  'incorrect': 'Prøv igjen! Du klarer det!'
};

async function generateAudio() {
  for (const [id, text] of Object.entries(texts)) {
    try {
      const response = await fetch('http://localhost:3000/api/generate-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          fileName: id.replace(/\./g, '_')
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate audio for ${id}`);
      }

      console.log(`Generated audio for ${id}`);
    } catch (error) {
      console.error(`Error generating audio for ${id}:`, error);
    }
  }
}

generateAudio().catch(console.error);
