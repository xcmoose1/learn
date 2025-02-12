const voiceTexts = [
  // === Tier-venner ===
  {
    filename: 'help_tier_venner_title.mp3',
    text: 'Tier-venner: La oss lære om tall som blir 10 sammen!',
    category: 'Tier-venner hjelp'
  },
  {
    filename: 'help_tier_venner_explanation.mp3',
    text: 'Tenk på det som å lage et fotballag! Hvis du har 7 spillere, hvor mange flere trenger du for å ha et helt lag med 10? Det er som å telle hvor mange spillere som mangler på banen.',
    category: 'Tier-venner hjelp'
  },
  {
    filename: 'tier_venner_help_modal.mp3',
    text: 'La meg hjelpe deg med å finne tier-venner! Tenk på det som å lage et fotballag. Hvis du har noen spillere, hvor mange flere trenger du for å ha et helt lag med 10?',
    category: 'Tier-venner hjelp'
  },

  // === Fotball-matte ===
  {
    filename: 'help_fotball_matte_title.mp3',
    text: 'Fotball-matte: La oss regne med fotball!',
    category: 'Fotball-matte hjelp'
  },
  {
    filename: 'help_fotball_matte_explanation.mp3',
    text: 'Her regner vi med: Mål i kamper - akkurat som å telle Haaland sine scoringer! Poeng i serien - 3 poeng for seier, som i ekte fotball. Tilskuere på kamp - som å telle hvor mange som heier på laget ditt.',
    category: 'Fotball-matte hjelp'
  },
  {
    filename: 'math_goals_first_half.mp3',
    text: 'scorer {0} mål i første omgang',
    category: 'Fotball-matte spørsmål'
  },
  {
    filename: 'math_goals_second_half.mp3',
    text: 'og {0} mål i andre omgang',
    category: 'Fotball-matte spørsmål'
  },
  {
    filename: 'math_goals_total.mp3',
    text: 'Hvor mange mål scorer spilleren totalt?',
    category: 'Fotball-matte spørsmål'
  },
  {
    filename: 'math_points_question.mp3',
    text: 'vinner {0} kamper. Hvor mange poeng får de totalt når man får 3 poeng for seier?',
    category: 'Fotball-matte spørsmål'
  },
  {
    filename: 'math_stadium_question.mp3',
    text: 'Det er {0} tilskuere på stadion. {1} sitter på hovedtribunen. Hvor mange sitter på de andre tribunene?',
    category: 'Fotball-matte spørsmål'
  },

  // === Lesespill ===
  {
    filename: 'help_lesespill_title.mp3',
    text: 'Lesespill: La oss lære om fotballspillerne!',
    category: 'Lesespill hjelp'
  },
  {
    filename: 'help_lesespill_explanation.mp3',
    text: 'Her skal vi lese spennende fakta om fotballspillerne! Trykk på høyttaler-knappen for å høre teksten. Les sammen med stemmen og svar på spørsmålene. Jo mer du leser, jo flere kort låser du opp!',
    category: 'Lesespill hjelp'
  },

  // === Haaland ===
  {
    filename: 'players_haaland_intro.mp3',
    text: 'Erling Haaland er en målmaskin som scorer mål nesten hver kamp for Manchester City!',
    category: 'Haaland'
  },
  {
    filename: 'players_haaland_facts.mp3',
    text: 'Haaland ble født i Leeds i England, men spiller for det norske landslaget. Han er kjent for sin utrolige fart og styrke på banen.',
    category: 'Haaland'
  },
  {
    filename: 'players_haaland_reading_text1.mp3',
    text: 'Erling Haaland spiller spiss for Manchester City. Han er kjent for å score mange mål og har en egen jubel når han scorer.',
    category: 'Haaland'
  },
  {
    filename: 'players_haaland_reading_text2.mp3',
    text: 'Haaland trener hardt hver dag for å bli bedre. Han spiser sunn mat og sover godt for å holde seg i form.',
    category: 'Haaland'
  },

  // === Ødegaard ===
  {
    filename: 'players_odegaard_intro.mp3',
    text: 'Martin Ødegaard er kaptein for Arsenal og det norske landslaget. Han er kjent for sine fantastiske pasninger!',
    category: 'Ødegaard'
  },
  {
    filename: 'players_odegaard_facts.mp3',
    text: 'Ødegaard begynte å spille fotball i Strømsgodset og ble den yngste spilleren som noen gang har spilt i Eliteserien.',
    category: 'Ødegaard'
  },
  {
    filename: 'players_odegaard_reading_text1.mp3',
    text: 'Martin Ødegaard er midtbanespiller og kaptein for Arsenal. Han er flink til å sentre ballen til lagkameratene sine.',
    category: 'Ødegaard'
  },
  {
    filename: 'players_odegaard_reading_text2.mp3',
    text: 'Ødegaard trener mye på å bli bedre til å skyte og sentre. Han hjelper laget sitt med både mål og assists.',
    category: 'Ødegaard'
  },

  // === Tilbakemeldinger lesing ===
  {
    filename: 'reading_correct.mp3',
    text: 'Riktig svar! Du er flink til å lese!',
    category: 'Tilbakemeldinger lesing'
  },
  {
    filename: 'reading_incorrect.mp3',
    text: 'Prøv igjen! Les teksten en gang til, så klarer du det!',
    category: 'Tilbakemeldinger lesing'
  },
  {
    filename: 'reading_instructions.mp3',
    text: 'Trykk på høyttaler-knappen for å høre teksten. Les sammen med stemmen og svar på spørsmålene.',
    category: 'Tilbakemeldinger lesing'
  },

  // === Generelle tilbakemeldinger ===
  {
    filename: 'feedback_correct.mp3',
    text: 'Riktig svar! Bra jobbet!',
    category: 'Generelle tilbakemeldinger'
  },
  {
    filename: 'feedback_incorrect.mp3',
    text: 'Prøv igjen! Du klarer det!',
    category: 'Generelle tilbakemeldinger'
  },

  // === Tier-venner tilbakemeldinger ===
  {
    filename: 'tier_venner_correct.mp3',
    text: 'Flott! Du fant riktig tier-venn!',
    category: 'Tier-venner tilbakemeldinger'
  },
  {
    filename: 'tier_venner_incorrect.mp3',
    text: 'Ikke helt riktig. Prøv å tenke: Hvilket tall mangler for å få 10?',
    category: 'Tier-venner tilbakemeldinger'
  },
  {
    filename: 'tier_venner_streak.mp3',
    text: 'Fantastisk! Du har {0} riktige på rad!',
    category: 'Tier-venner tilbakemeldinger'
  }
];

// Funksjon for å vise tekstene gruppert etter kategori
function printVoiceTexts() {
  const groupedTexts = voiceTexts.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  console.log('Tekster som skal spilles inn:\n');
  
  Object.entries(groupedTexts).forEach(([category, items]) => {
    console.log(`\n=== ${category} ===`);
    items.forEach(item => {
      console.log(`\nFilnavn: ${item.filename}`);
      console.log(`Tekst: "${item.text}"`);
    });
  });
}

// Eksporter for bruk i andre filer
module.exports = {
  voiceTexts,
  printVoiceTexts
};

// Hvis filen kjøres direkte
if (require.main === module) {
  printVoiceTexts();
}
