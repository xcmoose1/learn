interface OrdOppgave {
  ord: string;
  bilde: string;
  lyd: string;
  fokusLyd: string;
  hint: string;
  nivå: number;
  animasjon: string;
}

export const ordListe: { [key: string]: OrdOppgave[] } = {
  "S-lyd": [
    // Nivå 1
    {
      ord: "Scoring",
      bilde: "/images/speech/scoring.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Tenk på lyden av en slange: sssss",
      nivå: 1,
      animasjon: "⚽ -> 🥅"
    },
    {
      ord: "Supporter",
      bilde: "/images/speech/supporter.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "La tunga ligge rett bak tennene",
      nivå: 1,
      animasjon: "👥 -> 👏"
    },
    {
      ord: "Sykkel",
      bilde: "/images/speech/sykkel.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Tenk på en sykkelpumpe: ssssss",
      nivå: 1,
      animasjon: "🚲"
    },
    {
      ord: "Sokker",
      bilde: "/images/speech/sokker.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som lyden av vind: ssssss",
      nivå: 1,
      animasjon: "🧦"
    },
    {
      ord: "Seier",
      bilde: "/images/speech/seier.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Tenk på en seiersang",
      nivå: 1,
      animasjon: "🏆"
    },
    // Nivå 2
    {
      ord: "Spiller",
      bilde: "/images/speech/spiller.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som når du hysjer: sssssh",
      nivå: 2,
      animasjon: "⚽"
    },
    {
      ord: "Stadion",
      bilde: "/images/speech/stadion.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Tenk på supportersang",
      nivå: 2,
      animasjon: "🏟️"
    },
    {
      ord: "Skudd",
      bilde: "/images/speech/skudd.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en ball som suser",
      nivå: 2,
      animasjon: "👟 -> ⚽"
    },
    {
      ord: "Senter",
      bilde: "/images/speech/senter.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Midt på banen",
      nivå: 2,
      animasjon: "⭕"
    },
    {
      ord: "Spark",
      bilde: "/images/speech/spark.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en rask bevegelse",
      nivå: 2,
      animasjon: "👞"
    },
    // Nivå 3
    {
      ord: "Spiss",
      bilde: "/images/speech/spiss.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Tenk på en slange",
      nivå: 3,
      animasjon: "👤"
    },
    {
      ord: "Stopper",
      bilde: "/images/speech/stopper.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en brems",
      nivå: 3,
      animasjon: "🛑"
    },
    {
      ord: "Svette",
      bilde: "/images/speech/svette.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Etter trening",
      nivå: 3,
      animasjon: "💦"
    },
    {
      ord: "Sprinte",
      bilde: "/images/speech/sprinte.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Løpe fort",
      nivå: 3,
      animasjon: "🏃"
    },
    {
      ord: "Skade",
      bilde: "/images/speech/skade.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Au!",
      nivå: 3,
      animasjon: "🤕"
    },
    {
      ord: "Sving",
      bilde: "/images/speech/sving.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en sving på banen",
      nivå: 3,
      animasjon: "↪️"
    },
    {
      ord: "Synge",
      bilde: "/images/speech/synge.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "På tribunen",
      nivå: 3,
      animasjon: "🎤"
    },
    {
      ord: "Sikre",
      bilde: "/images/speech/sikre.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Holde ballen trygt",
      nivå: 3,
      animasjon: "🔒"
    },
    {
      ord: "Sesongen",
      bilde: "/images/speech/sesongen.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Hele året med fotball",
      nivå: 3,
      animasjon: "📅"
    },
    {
      ord: "Samspill",
      bilde: "/images/speech/samspill.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Spille sammen",
      nivå: 3,
      animasjon: "🤝"
    },
    {
      ord: "Svømme",
      bilde: "/images/speech/svomme.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en svømmer",
      nivå: 3,
      animasjon: "🏊‍♀️"
    },
    {
      ord: "Søke",
      bilde: "/images/speech/søke.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en detektiv",
      nivå: 3,
      animasjon: "🔍"
    },
    {
      ord: "Sørge",
      bilde: "/images/speech/sørge.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en sørger",
      nivå: 3,
      animasjon: "😢"
    },
    {
      ord: "Svare",
      bilde: "/images/speech/svare.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en svarende",
      nivå: 3,
      animasjon: "💬"
    },
    {
      ord: "Sende",
      bilde: "/images/speech/sende.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en sender",
      nivå: 3,
      animasjon: "📱"
    },
    {
      ord: "Slette",
      bilde: "/images/speech/slette.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en sletter",
      nivå: 3,
      animasjon: "🚮"
    },
    {
      ord: "Skrive",
      bilde: "/images/speech/skrive.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en skriver",
      nivå: 3,
      animasjon: "✍️"
    },
    {
      ord: "Sende",
      bilde: "/images/speech/sende2.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en sender",
      nivå: 3,
      animasjon: "📨"
    },
    {
      ord: "Sende",
      bilde: "/images/speech/sende3.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Som en sender",
      nivå: 3,
      animasjon: "📧"
    }
  ],
  "R-lyd": [
    // Nivå 1
    {
      ord: "Redning",
      bilde: "/images/speech/redning.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en motor som brummer",
      nivå: 1,
      animasjon: "🧤"
    },
    {
      ord: "Rolle",
      bilde: "/images/speech/rolle.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Tenk på en løve som brøler",
      nivå: 1,
      animasjon: "🎭"
    },
    {
      ord: "Regel",
      bilde: "/images/speech/regel.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en dommer som brummer",
      nivå: 1,
      animasjon: "📋"
    },
    {
      ord: "Ryggen",
      bilde: "/images/speech/ryggen.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Tenk på en tiger som knurrer",
      nivå: 1,
      animasjon: "👕"
    },
    {
      ord: "Rekke",
      bilde: "/images/speech/rekke.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en motorsykkel",
      nivå: 1,
      animasjon: "➡️"
    },
    // Nivå 2
    {
      ord: "Runde",
      bilde: "/images/speech/runde.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Tenk på en racerbil",
      nivå: 2,
      animasjon: "🔄"
    },
    {
      ord: "Ramme",
      bilde: "/images/speech/ramme.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en tromme",
      nivå: 2,
      animasjon: "🖼️"
    },
    {
      ord: "Rope",
      bilde: "/images/speech/rope.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Høy stemme",
      nivå: 2,
      animasjon: "📢"
    },
    {
      ord: "Rutine",
      bilde: "/images/speech/rutine.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Gjenta som en motor",
      nivå: 2,
      animasjon: "🔁"
    },
    {
      ord: "Rask",
      bilde: "/images/speech/rask.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en racerbil",
      nivå: 2,
      animasjon: "⚡"
    },
    // Nivå 3
    {
      ord: "Rot",
      bilde: "/images/speech/rot.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en traktor",
      nivå: 3,
      animasjon: "🌳"
    },
    {
      ord: "Retur",
      bilde: "/images/speech/retur.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Tilbake som en ball",
      nivå: 3,
      animasjon: "↩️"
    },
    {
      ord: "Rekkevidde",
      bilde: "/images/speech/rekkevidde.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Langt som en rakett",
      nivå: 3,
      animasjon: "📏"
    },
    {
      ord: "Rykte",
      bilde: "/images/speech/rykte.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en radio",
      nivå: 3,
      animasjon: "📰"
    },
    {
      ord: "Reserve",
      bilde: "/images/speech/reserve.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Klar til å rulle inn",
      nivå: 3,
      animasjon: "🔄"
    },
    {
      ord: "Retning",
      bilde: "/images/speech/retning.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en racerbil svinger",
      nivå: 3,
      animasjon: "➡️"
    },
    {
      ord: "Resultat",
      bilde: "/images/speech/resultat.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Rull tallene",
      nivå: 3,
      animasjon: "📊"
    },
    {
      ord: "Rekord",
      bilde: "/images/speech/rekord.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Rask som lyn",
      nivå: 3,
      animasjon: "🏆"
    },
    {
      ord: "Rykk",
      bilde: "/images/speech/rykk.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Rask bevegelse",
      nivå: 3,
      animasjon: "💨"
    },
    {
      ord: "Regler",
      bilde: "/images/speech/regler.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Rett og riktig",
      nivå: 3,
      animasjon: "📜"
    },
    {
      ord: "Røre",
      bilde: "/images/speech/røre.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en rørlegger",
      nivå: 3,
      animasjon: "🔧"
    },
    {
      ord: "Rømme",
      bilde: "/images/speech/rømme.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en rømmer",
      nivå: 3,
      animasjon: "🏃‍♂️"
    },
    {
      ord: "Røke",
      bilde: "/images/speech/røke.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røker",
      nivå: 3,
      animasjon: "🚭"
    },
    {
      ord: "Røffe",
      bilde: "/images/speech/røffe.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røffel",
      nivå: 3,
      animasjon: "🤪"
    },
    {
      ord: "Røntgen",
      bilde: "/images/speech/røntgen.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røntgenmaskin",
      nivå: 3,
      animasjon: "🔍"
    },
    {
      ord: "Røvere",
      bilde: "/images/speech/røvere.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røver",
      nivå: 3,
      animasjon: "🤠"
    },
    {
      ord: "Røv",
      bilde: "/images/speech/røv.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røv",
      nivå: 3,
      animasjon: "👊"
    },
    {
      ord: "Røys",
      bilde: "/images/speech/røys.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røys",
      nivå: 3,
      animasjon: "🏔️"
    },
    {
      ord: "Røysing",
      bilde: "/images/speech/røysing.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røysing",
      nivå: 3,
      animasjon: "🏞️"
    },
    {
      ord: "Røysk",
      bilde: "/images/speech/røysk.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Som en røysk",
      nivå: 3,
      animasjon: "🏠"
    }
  ],
  "K-lyd": [
    // Nivå 1
    {
      ord: "Keeper",
      bilde: "/images/speech/keeper.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en katt som fanger",
      nivå: 1,
      animasjon: "🧤"
    },
    {
      ord: "Kamp",
      bilde: "/images/speech/kamp.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kort og kraftig",
      nivå: 1,
      animasjon: "⚽"
    },
    {
      ord: "Kaptein",
      bilde: "/images/speech/kaptein.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kommanderende stemme",
      nivå: 1,
      animasjon: "©️"
    },
    {
      ord: "Klubb",
      bilde: "/images/speech/klubb.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en klokke",
      nivå: 1,
      animasjon: "⚽"
    },
    {
      ord: "Kort",
      bilde: "/images/speech/kort.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kjapt som et klapp",
      nivå: 1,
      animasjon: "🟨"
    },
    // Nivå 2
    {
      ord: "Kryss",
      bilde: "/images/speech/kryss.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kråke",
      nivå: 2,
      animasjon: "❌"
    },
    {
      ord: "Kast",
      bilde: "/images/speech/kast.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kraftig som en kanon",
      nivå: 2,
      animasjon: "🤾"
    },
    {
      ord: "Ko",
      bilde: "/images/speech/ko.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som køen på stadion",
      nivå: 2,
      animasjon: "👥"
    },
    {
      ord: "Kule",
      bilde: "/images/speech/kule.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Rund som en ball",
      nivå: 2,
      animasjon: "⚽"
    },
    {
      ord: "Kraft",
      bilde: "/images/speech/kraft.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kanon",
      nivå: 2,
      animasjon: "💪"
    },
    // Nivå 3
    {
      ord: "Krone",
      bilde: "/images/speech/krone.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kongelig lyd",
      nivå: 3,
      animasjon: "👑"
    },
    {
      ord: "Kontroll",
      bilde: "/images/speech/kontroll.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Klar og tydelig",
      nivå: 3,
      animasjon: "🎮"
    },
    {
      ord: "Kvalitet",
      bilde: "/images/speech/kvalitet.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Klink og klar",
      nivå: 3,
      animasjon: "⭐"
    },
    {
      ord: "Kamp2",
      bilde: "/images/speech/kamp2.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kraftig start",
      nivå: 3,
      animasjon: "🏃"
    },
    {
      ord: "Klar",
      bilde: "/images/speech/klar.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som et klapp",
      nivå: 3,
      animasjon: "✅"
    },
    {
      ord: "Klokke",
      bilde: "/images/speech/klokke.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Tikk takk",
      nivå: 3,
      animasjon: "⏰"
    },
    {
      ord: "Kjempe",
      bilde: "/images/speech/kjempe.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kraftig som en kjempe",
      nivå: 3,
      animasjon: "💪"
    },
    {
      ord: "Konkurranse",
      bilde: "/images/speech/konkurranse.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kamp om seieren",
      nivå: 3,
      animasjon: "🏆"
    },
    {
      ord: "Keeper2",
      bilde: "/images/speech/keeper2.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Klar til å redde",
      nivå: 3,
      animasjon: "🧤"
    },
    {
      ord: "Kamp3",
      bilde: "/images/speech/kamp3.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Kamp til siste slutt",
      nivå: 3,
      animasjon: "⚽"
    },
    {
      ord: "Kjøre",
      bilde: "/images/speech/kjøre.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjører",
      nivå: 3,
      animasjon: "🚗"
    },
    {
      ord: "Kjøpe",
      bilde: "/images/speech/kjøpe.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjøper",
      nivå: 3,
      animasjon: "🛍️"
    },
    {
      ord: "Kjøtt",
      bilde: "/images/speech/kjøtt.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjøttkaker",
      nivå: 3,
      animasjon: "🍖️"
    },
    {
      ord: "Kjærlighet",
      bilde: "/images/speech/kjærlighet.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjærlighetssang",
      nivå: 3,
      animasjon: "❤️"
    },
    {
      ord: "Kjøkken",
      bilde: "/images/speech/kjøkken.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjøkkenmaskin",
      nivå: 3,
      animasjon: "🍳"
    },
    {
      ord: "Kjøttkaker",
      bilde: "/images/speech/kjøttkaker.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjøttkaker",
      nivå: 3,
      animasjon: "🍴"
    },
    {
      ord: "Kjøttfarse",
      bilde: "/images/speech/kjøttfarse.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjøttfarse",
      nivå: 3,
      animasjon: "🍔"
    },
    {
      ord: "Kjøttkaker2",
      bilde: "/images/speech/kjøttkaker2.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Som en kjøttkaker",
      nivå: 3,
      animasjon: "🍴"
    }
  ]
};
