import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Fotballkort.module.css';
import Image from 'next/image';
import PlayerImagePlaceholder from '../components/PlayerImagePlaceholder';

interface Stats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

interface Oppgave {
  spørsmål: string;
  alternativer: string[];
  svar: number;
  type?: 'matte' | 'lesing';
  tekst?: string;
}

interface Player {
  id: number;
  navn: string;
  posisjon: string;
  klubb: string;
  nasjonalitet: string;
  overall: number;
  cardType: 'gold' | 'silver' | 'bronze';
  bilde: string;
  stats: Stats;
  oppgaver: Oppgave[];
}

const players: Player[] = [
  {
    id: 1,
    navn: "Erling Haaland",
    posisjon: "ST",
    klubb: "Manchester City",
    nasjonalitet: "Norge",
    overall: 91,
    cardType: 'gold',
    bilde: "/images/players/haaland.jpg",
    stats: {
      pace: 89,
      shooting: 93,
      passing: 66,
      dribbling: 80,
      defending: 45,
      physical: 88
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 7?",
        alternativer: ["2", "3", "4"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvor mange mål scoret Haaland?",
        tekst: "Erling Haaland scoret 36 mål i sin første sesong i England.",
        alternativer: ["30 mål", "36 mål", "40 mål"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 2,
    navn: "Martin Ødegaard",
    posisjon: "CAM",
    klubb: "Arsenal",
    nasjonalitet: "Norge",
    overall: 87,
    cardType: 'gold',
    bilde: "/images/players/odegaard.jpg",
    stats: {
      pace: 78,
      shooting: 84,
      passing: 89,
      dribbling: 88,
      defending: 55,
      physical: 68
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 4?",
        alternativer: ["6", "8", "7"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hvilken klubb spiller Ødegaard for?",
        tekst: "Martin Ødegaard er kaptein for Arsenal og for Norge.",
        alternativer: ["Liverpool", "Arsenal", "Chelsea"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 3,
    navn: "Marcus Rashford",
    posisjon: "LW",
    klubb: "Manchester United",
    nasjonalitet: "England",
    overall: 85,
    cardType: 'gold',
    bilde: "/images/players/rashford.jpg",
    stats: {
      pace: 92,
      shooting: 83,
      passing: 78,
      dribbling: 85,
      defending: 41,
      physical: 75
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 3?",
        alternativer: ["7", "8", "6"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hva liker Rashford å gjøre?",
        tekst: "Marcus Rashford liker å løpe fort med ballen.",
        alternativer: ["Løpe fort", "Sove lenge", "Spise is"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 4,
    navn: "Jude Bellingham",
    posisjon: "CM",
    klubb: "Real Madrid",
    nasjonalitet: "England",
    overall: 88,
    cardType: 'gold',
    bilde: "/images/players/bellingham.jpg",
    stats: {
      pace: 82,
      shooting: 82,
      passing: 85,
      dribbling: 87,
      defending: 78,
      physical: 84
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 8?",
        alternativer: ["2", "3", "4"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hvor gammel er Bellingham?",
        tekst: "Jude Bellingham er bare 20 år og spiller for Real Madrid.",
        alternativer: ["18 år", "20 år", "25 år"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 5,
    navn: "Virgil van Dijk",
    posisjon: "CB",
    klubb: "Liverpool",
    nasjonalitet: "Nederland",
    overall: 89,
    cardType: 'gold',
    bilde: "/images/players/vandijk.jpg",
    stats: {
      pace: 81,
      shooting: 60,
      passing: 71,
      dribbling: 72,
      defending: 90,
      physical: 86
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 5?",
        alternativer: ["4", "5", "6"],
        svar: 2,
        type: "matte"
      },
      {
        spørsmål: "Hva er van Dijk god til?",
        tekst: "Virgil van Dijk er veldig god til å stoppe andre lag i å score mål.",
        alternativer: ["Score mål", "Stoppe mål", "Løpe fort"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 6,
    navn: "Bruno Fernandes",
    posisjon: "CAM",
    klubb: "Manchester United",
    nasjonalitet: "Portugal",
    overall: 88,
    cardType: 'gold',
    bilde: "/images/players/fernandes.jpg",
    stats: {
      pace: 75,
      shooting: 86,
      passing: 90,
      dribbling: 84,
      defending: 65,
      physical: 74
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 2?",
        alternativer: ["7", "8", "9"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hva er Bruno god på?",
        tekst: "Bruno Fernandes er god til å gi fine pasninger til andre spillere.",
        alternativer: ["Pasninger", "Hopping", "Synging"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 7,
    navn: "Bukayo Saka",
    posisjon: "RW",
    klubb: "Arsenal",
    nasjonalitet: "England",
    overall: 86,
    cardType: 'gold',
    bilde: "/images/players/saka.jpg",
    stats: {
      pace: 87,
      shooting: 82,
      passing: 83,
      dribbling: 86,
      defending: 45,
      physical: 68
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 6?",
        alternativer: ["3", "4", "5"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvor gammel er Saka?",
        tekst: "Bukayo Saka er 22 år og har spilt for Arsenal siden han var liten.",
        alternativer: ["20 år", "22 år", "24 år"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 8,
    navn: "Rodri",
    posisjon: "CDM",
    klubb: "Manchester City",
    nasjonalitet: "Spania",
    overall: 89,
    cardType: 'gold',
    bilde: "/images/players/rodri.jpg",
    stats: {
      pace: 72,
      shooting: 78,
      passing: 85,
      dribbling: 82,
      defending: 87,
      physical: 85
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 1?",
        alternativer: ["8", "9", "7"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvilket lag vant Rodri med?",
        tekst: "Rodri hjalp Manchester City å vinne tre store pokaler i 2023.",
        alternativer: ["To pokaler", "Tre pokaler", "Fire pokaler"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 9,
    navn: "Vinicius Jr",
    posisjon: "LW",
    klubb: "Real Madrid",
    nasjonalitet: "Brasil",
    overall: 89,
    cardType: 'gold',
    bilde: "/images/players/vinicius.jpg",
    stats: {
      pace: 95,
      shooting: 82,
      passing: 81,
      dribbling: 90,
      defending: 29,
      physical: 68
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 9?",
        alternativer: ["0", "1", "2"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvor kommer Vinicius fra?",
        tekst: "Vinicius Jr kommer fra Brasil og er kjent for sine fine driblerier.",
        alternativer: ["Spania", "England", "Brasil"],
        svar: 2,
        type: "lesing"
      }
    ]
  },
  {
    id: 10,
    navn: "Trent Alexander-Arnold",
    posisjon: "RB",
    klubb: "Liverpool",
    nasjonalitet: "England",
    overall: 86,
    cardType: 'gold',
    bilde: "/images/players/trent.jpg",
    stats: {
      pace: 80,
      shooting: 75,
      passing: 90,
      dribbling: 82,
      defending: 80,
      physical: 74
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 0?",
        alternativer: ["9", "10", "8"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hva er Trent god på?",
        tekst: "Trent Alexander-Arnold er kjent for å slå lange, fine pasninger.",
        alternativer: ["Lange pasninger", "Høye hopp", "Raske løp"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 11,
    navn: "Kylian Mbappé",
    posisjon: "ST",
    klubb: "Paris Saint-Germain",
    nasjonalitet: "Frankrike",
    overall: 91,
    cardType: 'gold',
    bilde: "/images/players/mbappe.jpg",
    stats: {
      pace: 97,
      shooting: 89,
      passing: 80,
      dribbling: 92,
      defending: 36,
      physical: 78
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 3?",
        alternativer: ["5", "7", "8"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvor kommer Mbappé fra?",
        tekst: "Kylian Mbappé er en fransk spiller som er kjent for å være veldig rask.",
        alternativer: ["England", "Frankrike", "Spania"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 12,
    navn: "Kevin De Bruyne",
    posisjon: "CAM",
    klubb: "Manchester City",
    nasjonalitet: "Belgia",
    overall: 91,
    cardType: 'gold',
    bilde: "/images/players/debruyne.jpg",
    stats: {
      pace: 76,
      shooting: 88,
      passing: 94,
      dribbling: 88,
      defending: 64,
      physical: 77
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 8?",
        alternativer: ["2", "3", "4"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hva er De Bruyne best på?",
        tekst: "Kevin De Bruyne er kjent for å slå perfekte pasninger til lagkameratene sine.",
        alternativer: ["Pasninger", "Taklinger", "Headinger"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 13,
    navn: "Mohamed Salah",
    posisjon: "RW",
    klubb: "Liverpool",
    nasjonalitet: "Egypt",
    overall: 89,
    cardType: 'gold',
    bilde: "/images/players/salah.jpg",
    stats: {
      pace: 90,
      shooting: 87,
      passing: 81,
      dribbling: 88,
      defending: 45,
      physical: 75
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 6?",
        alternativer: ["4", "5", "3"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hvilket land kommer Salah fra?",
        tekst: "Mohamed Salah er fra Egypt og spiller for Liverpool.",
        alternativer: ["Marokko", "Egypt", "Tunisia"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 14,
    navn: "Luka Modric",
    posisjon: "CM",
    klubb: "Real Madrid",
    nasjonalitet: "Kroatia",
    overall: 87,
    cardType: 'gold',
    bilde: "/images/players/modric.jpg",
    stats: {
      pace: 75,
      shooting: 76,
      passing: 89,
      dribbling: 88,
      defending: 72,
      physical: 66
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 5?",
        alternativer: ["4", "5", "6"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hvor gammel er Modric?",
        tekst: "Luka Modric er 38 år og spiller fortsatt fotball på høyt nivå.",
        alternativer: ["36 år", "37 år", "38 år"],
        svar: 2,
        type: "lesing"
      }
    ]
  },
  {
    id: 15,
    navn: "Alisson",
    posisjon: "GK",
    klubb: "Liverpool",
    nasjonalitet: "Brasil",
    overall: 89,
    cardType: 'gold',
    bilde: "/images/players/alisson.jpg",
    stats: {
      pace: 54,
      shooting: 22,
      passing: 85,
      dribbling: 55,
      defending: 90,
      physical: 86
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 7?",
        alternativer: ["2", "3", "4"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvilken posisjon spiller Alisson?",
        tekst: "Alisson er keeper (målvakt) for Liverpool og Brasil.",
        alternativer: ["Spiss", "Keeper", "Midtbane"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 16,
    navn: "Pedri",
    posisjon: "CM",
    klubb: "Barcelona",
    nasjonalitet: "Spania",
    overall: 86,
    cardType: 'gold',
    bilde: "/images/players/pedri.jpg",
    stats: {
      pace: 81,
      shooting: 75,
      passing: 88,
      dribbling: 89,
      defending: 68,
      physical: 69
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 4?",
        alternativer: ["5", "6", "7"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvilket lag spiller Pedri for?",
        tekst: "Pedri er en ung spiller som spiller for Barcelona i Spania.",
        alternativer: ["Real Madrid", "Barcelona", "Valencia"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 17,
    navn: "Joshua Kimmich",
    posisjon: "CDM",
    klubb: "Bayern München",
    nasjonalitet: "Tyskland",
    overall: 88,
    cardType: 'gold',
    bilde: "/images/players/kimmich.jpg",
    stats: {
      pace: 75,
      shooting: 80,
      passing: 90,
      dribbling: 84,
      defending: 85,
      physical: 80
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 9?",
        alternativer: ["0", "1", "2"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvilket land kommer Kimmich fra?",
        tekst: "Joshua Kimmich spiller for Tyskland og Bayern München.",
        alternativer: ["Tyskland", "Østerrike", "Sveits"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 18,
    navn: "Rafael Leão",
    posisjon: "LW",
    klubb: "AC Milan",
    nasjonalitet: "Portugal",
    overall: 86,
    cardType: 'gold',
    bilde: "/images/players/leao.jpg",
    stats: {
      pace: 93,
      shooting: 82,
      passing: 78,
      dribbling: 86,
      defending: 34,
      physical: 78
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 2?",
        alternativer: ["6", "7", "8"],
        svar: 2,
        type: "matte"
      },
      {
        spørsmål: "Hvilken liga spiller Leão i?",
        tekst: "Rafael Leão spiller i Italia for AC Milan.",
        alternativer: ["Spania", "Italia", "England"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 19,
    navn: "Rúben Dias",
    posisjon: "CB",
    klubb: "Manchester City",
    nasjonalitet: "Portugal",
    overall: 88,
    cardType: 'gold',
    bilde: "/images/players/dias.jpg",
    stats: {
      pace: 75,
      shooting: 55,
      passing: 78,
      dribbling: 71,
      defending: 88,
      physical: 87
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 1?",
        alternativer: ["8", "9", "7"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hva er Dias god på?",
        tekst: "Rúben Dias er en av verdens beste forsvarsspillere.",
        alternativer: ["Forsvar", "Angrep", "Målvakt"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 20,
    navn: "Phil Foden",
    posisjon: "LW",
    klubb: "Manchester City",
    nasjonalitet: "England",
    overall: 85,
    cardType: 'gold',
    bilde: "/images/players/foden.jpg",
    stats: {
      pace: 84,
      shooting: 82,
      passing: 85,
      dribbling: 87,
      defending: 55,
      physical: 68
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 5?",
        alternativer: ["4", "5", "6"],
        svar: 0,
        type: "matte"
      },
      {
        spørsmål: "Hvor gammel er Foden?",
        tekst: "Phil Foden er 23 år og har spilt for Manchester City hele karrieren.",
        alternativer: ["21 år", "23 år", "25 år"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 21,
    navn: "Victor Osimhen",
    posisjon: "ST",
    klubb: "Napoli",
    nasjonalitet: "Nigeria",
    overall: 88,
    cardType: 'gold',
    bilde: "/images/players/osimhen.jpg",
    stats: {
      pace: 90,
      shooting: 86,
      passing: 75,
      dribbling: 83,
      defending: 42,
      physical: 84
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 6?",
        alternativer: ["3", "4", "5"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvilket land kommer Osimhen fra?",
        tekst: "Victor Osimhen er en spiss fra Nigeria som spiller i Italia.",
        alternativer: ["Ghana", "Nigeria", "Senegal"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 22,
    navn: "Gavi",
    posisjon: "CM",
    klubb: "Barcelona",
    nasjonalitet: "Spania",
    overall: 84,
    cardType: 'gold',
    bilde: "/images/players/gavi.jpg",
    stats: {
      pace: 82,
      shooting: 72,
      passing: 83,
      dribbling: 85,
      defending: 75,
      physical: 78
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 3?",
        alternativer: ["6", "7", "8"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvor gammel er Gavi?",
        tekst: "Gavi er bare 19 år og er en av de yngste spillerne på Barcelona.",
        alternativer: ["17 år", "19 år", "21 år"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 23,
    navn: "Federico Valverde",
    posisjon: "CM",
    klubb: "Real Madrid",
    nasjonalitet: "Uruguay",
    overall: 87,
    cardType: 'gold',
    bilde: "/images/players/valverde.jpg",
    stats: {
      pace: 86,
      shooting: 83,
      passing: 84,
      dribbling: 82,
      defending: 80,
      physical: 85
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 8?",
        alternativer: ["1", "2", "3"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvilket lag spiller Valverde for?",
        tekst: "Federico Valverde spiller for Real Madrid i Spania.",
        alternativer: ["Barcelona", "Real Madrid", "Atletico Madrid"],
        svar: 1,
        type: "lesing"
      }
    ]
  },
  {
    id: 24,
    navn: "Theo Hernández",
    posisjon: "LB",
    klubb: "AC Milan",
    nasjonalitet: "Frankrike",
    overall: 85,
    cardType: 'gold',
    bilde: "/images/players/hernandez.jpg",
    stats: {
      pace: 95,
      shooting: 75,
      passing: 80,
      dribbling: 83,
      defending: 81,
      physical: 84
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 7?",
        alternativer: ["2", "3", "4"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hva er Hernández kjent for?",
        tekst: "Theo Hernández er en av de raskeste forsvarsspillerne i verden.",
        alternativer: ["Fart", "Heading", "Skudd"],
        svar: 0,
        type: "lesing"
      }
    ]
  },
  {
    id: 25,
    navn: "Jamal Musiala",
    posisjon: "CAM",
    klubb: "Bayern München",
    nasjonalitet: "Tyskland",
    overall: 86,
    cardType: 'gold',
    bilde: "/images/players/musiala.jpg",
    stats: {
      pace: 85,
      shooting: 81,
      passing: 82,
      dribbling: 89,
      defending: 55,
      physical: 65
    },
    oppgaver: [
      {
        spørsmål: "Hva er 10-vennen til 4?",
        alternativer: ["5", "6", "7"],
        svar: 1,
        type: "matte"
      },
      {
        spørsmål: "Hvor gammel er Musiala?",
        tekst: "Jamal Musiala er 20 år og spiller for Bayern München.",
        alternativer: ["18 år", "20 år", "22 år"],
        svar: 1,
        type: "lesing"
      }
    ]
  }
  // More players will be added here...
];

const getCardBackground = (cardType: 'gold' | 'silver' | 'bronze') => {
  switch (cardType) {
    case 'gold':
      return 'linear-gradient(135deg, #f4d03f, #f1c40f)';
    case 'silver':
      return 'linear-gradient(135deg, #bdc3c7, #95a5a6)';
    case 'bronze':
      return 'linear-gradient(135deg, #cd6133, #b33939)';
  }
};

const getStatColor = (value: number) => {
  if (value >= 90) return '#2ecc71';
  if (value >= 80) return '#f1c40f';
  if (value >= 70) return '#e67e22';
  return '#e74c3c';
};

export default function Fotballkort() {
  const [unlockedCards, setUnlockedCards] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: number]: number[]}>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCardClick = (playerId: number) => {
    if (unlockedCards.includes(playerId)) {
      return;
    }
    setActiveCard(playerId);
    setActiveQuestion(0);
    setShowModal(true);
  };

  const handleAnswer = (alternativeIndex: number) => {
    if (!activeCard) return;

    const player = players.find(p => p.id === activeCard);
    if (!player) return;

    const isCorrect = player.oppgaver[activeQuestion].svar === alternativeIndex;
  
    if (isCorrect) {
      // Vis målanimasjon for hvert riktig svar
      setShowGoal(true);
      setTimeout(() => setShowGoal(false), 2000);

      // Oppdater fullførte spørsmål
      setCompletedQuestions(prev => ({
        ...prev,
        [activeCard]: [...(prev[activeCard] || []), activeQuestion]
      }));

      // Sjekk om alle oppgaver er fullført
      const allQuestionsCompleted = completedQuestions[activeCard]?.length === player.oppgaver.length - 1;

      if (allQuestionsCompleted) {
        // Vis ekstra feiring når kortet er låst opp
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        
        setUnlockedCards(prev => [...prev, activeCard]);
        setTimeout(() => {
          setShowModal(false);
          setActiveCard(null);
          setActiveQuestion(0);
        }, 2000);
      } else {
        // Gå til neste spørsmål
        setTimeout(() => {
          setActiveQuestion(prev => prev + 1);
        }, 1500);
      }
    }
  };

  return (
    <Layout title="Fotballkort">
      <div className={styles.container}>
        <h1 className={styles.title}>Fotballkort</h1>
        
        <div className={styles.progress}>
          <p>Du har låst opp {unlockedCards.length} av {players.length} kort!</p>
        </div>

        <div className={styles.cardGrid}>
          {players.map((player) => (
            <div 
              key={player.id} 
              className={`${styles.card} ${unlockedCards.includes(player.id) ? styles.unlocked : styles.locked}`}
              onClick={() => handleCardClick(player.id)}
              style={{ 
                background: getCardBackground(player.cardType)
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.rating}>{player.overall}</div>
                  <div className={styles.position}>{player.posisjon}</div>
                </div>

                <div className={styles.playerImage}>
                  {unlockedCards.includes(player.id) ? (
                    <Image
                      src={player.bilde}
                      alt={player.navn}
                      width={200}
                      height={200}
                      priority
                      onError={(e) => {
                        // If image fails to load, show placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.parentElement?.querySelector('.placeholder') as HTMLElement | null;
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                        }
                      }}
                    />
                  ) : (
                    <div className="placeholder" style={{ width: '100%', height: '100%' }}>
                      <PlayerImagePlaceholder name={player.navn} />
                    </div>
                  )}
                </div>

                <div className={styles.playerInfo}>
                  <h2 className={styles.playerName}>{player.navn}</h2>
                  <p className={styles.playerDetails}>
                    {player.klubb} • {player.nasjonalitet}
                  </p>
                </div>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span>PAC</span>
                    <span style={{ color: getStatColor(player.stats.pace) }}>
                      {player.stats.pace}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span>SHO</span>
                    <span style={{ color: getStatColor(player.stats.shooting) }}>
                      {player.stats.shooting}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span>PAS</span>
                    <span style={{ color: getStatColor(player.stats.passing) }}>
                      {player.stats.passing}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span>DRI</span>
                    <span style={{ color: getStatColor(player.stats.dribbling) }}>
                      {player.stats.dribbling}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span>DEF</span>
                    <span style={{ color: getStatColor(player.stats.defending) }}>
                      {player.stats.defending}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span>PHY</span>
                    <span style={{ color: getStatColor(player.stats.physical) }}>
                      {player.stats.physical}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && activeCard && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>{players.find(p => p.id === activeCard)?.navn}</h2>
                <div className={styles.progressIndicator}>
                  Oppgave {activeQuestion + 1} av {players.find(p => p.id === activeCard)?.oppgaver.length}
                </div>
              </div>

              <div className={styles.modalContent}>
                <h3 className={styles.question}>
                  {players.find(p => p.id === activeCard)?.oppgaver[activeQuestion].spørsmål}
                </h3>

                {players.find(p => p.id === activeCard)?.oppgaver[activeQuestion].tekst && (
                  <p className={styles.questionText}>
                    {players.find(p => p.id === activeCard)?.oppgaver[activeQuestion].tekst}
                  </p>
                )}

                <div className={styles.answers}>
                  {players.find(p => p.id === activeCard)?.oppgaver[activeQuestion].alternativer.map((alternative, index) => (
                    <button
                      key={index}
                      className={styles.answerButton}
                      onClick={() => handleAnswer(index)}
                    >
                      {alternative}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Målanimasjon */}
        {showGoal && (
          <>
            <div className={styles.goalMessage}>
              MÅL! 🎉
              <span>Riktig svar!</span>
            </div>
            <div className={styles.celebrationBall}>⚽</div>
            <div className={styles.celebrationBall}>⚽</div>
            <div className={styles.celebrationBall}>⚽</div>
            <div className={styles.celebrationBall}>⚽</div>
          </>
        )}

        {/* Konfetti når kortet er låst opp */}
        {showConfetti && (
          <div className={styles.confetti}>
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className={styles.confettiPiece}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
