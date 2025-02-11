export interface Quiz {
  sporsmal: string;
  alternativer: string[];
  riktigSvar: string;
  forklaring: string;
}

export interface Fargeutfordring {
  element: string;
  farge: string;
  beskrivelse: string;
}

export interface FotballspillerTegning {
  id: string;
  navn: string;
  svg: string;
  beskrivelse: string;
  quiz: Quiz[];
  fargeutfordringer: Fargeutfordring[];
  morsommeFakta: string[];
}

export const fotballspillere: FotballspillerTegning[] = [
  {
    id: 'ronaldo',
    navn: 'Cristiano Ronaldo',
    beskrivelse: 'Portugisisk superstjerne kjent for sine dribleferdigheter og mål',
    quiz: [
      {
        sporsmal: 'Hvilket land kommer Ronaldo fra?',
        alternativer: ['Portugal', 'Spania', 'Brasil'],
        riktigSvar: 'Portugal',
        forklaring: 'Ronaldo er fra Portugal og er kaptein på det portugisiske landslaget! 🇵🇹'
      },
      {
        sporsmal: 'Hvilket draktnummer er Ronaldo mest kjent for?',
        alternativer: ['7', '9', '10'],
        riktigSvar: '7',
        forklaring: 'Ronaldo bruker nummer 7, og hans merke heter faktisk "CR7"! 🎯'
      },
      {
        sporsmal: 'Hvilken klubb spilte Ronaldo for før Manchester United?',
        alternativer: ['Sporting CP', 'Porto', 'Benfica'],
        riktigSvar: 'Sporting CP',
        forklaring: 'Ronaldo startet sin karriere i Sporting CP før han dro til Manchester United! ⚽'
      }
    ],
    fargeutfordringer: [
      {
        element: 'drakt',
        farge: '#FF0000',
        beskrivelse: 'Farg drakten rød som Manchester United! 🔴'
      },
      {
        element: 'shorts',
        farge: '#FFFFFF',
        beskrivelse: 'Farg shortsen hvit som Real Madrid! ⚪'
      }
    ],
    morsommeFakta: [
      'Ronaldo kan hoppe 78 cm rett opp i lufta! Det er høyere enn en basketballspiller! 🦘',
      'Han trener over 5 timer hver dag for å holde seg i toppform! 💪',
      'Ronaldo har scoret over 800 mål i karrieren sin! ⚽'
    ],
    svg: `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 100 L200 150" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="200" cy="80" r="30" stroke="black" stroke-width="2" fill="none"/>
      <path class="drakt" d="M160 150 L240 150 L220 300 L180 300 Z" stroke="black" stroke-width="2" fill="none"/>
      <path class="shorts" d="M220 300 L240 400 L180 400 L160 300 Z" stroke="black" stroke-width="2" fill="none"/>
      <path d="M160 200 L140 280" stroke="black" stroke-width="2" fill="none"/>
      <path d="M240 200 L260 280" stroke="black" stroke-width="2" fill="none"/>
      <text x="180" y="450" font-family="Arial" font-size="20">Ronaldo</text>
    </svg>`
  },
  {
    id: 'messi',
    navn: 'Lionel Messi',
    beskrivelse: 'Argentinsk magiker med utrolig balanse og teknikk',
    quiz: [
      {
        sporsmal: 'Hvilket draktnummer bruker Messi på Argentina?',
        alternativer: ['10', '30', '19'],
        riktigSvar: '10',
        forklaring: 'Messi bruker nummer 10 på Argentina, akkurat som legenden Diego Maradona! 🇦🇷'
      },
      {
        sporsmal: 'Hvilken klubb spilte Messi for i nesten hele karrieren?',
        alternativer: ['Barcelona', 'Real Madrid', 'PSG'],
        riktigSvar: 'Barcelona',
        forklaring: 'Messi spilte for Barcelona i over 20 år før han dro til PSG! 🔵🔴'
      },
      {
        sporsmal: 'Hva vant Messi med Argentina i 2022?',
        alternativer: ['VM', 'Copa America', 'OL'],
        riktigSvar: 'VM',
        forklaring: 'Messi ledet Argentina til VM-seier i 2022! 🏆'
      }
    ],
    fargeutfordringer: [
      {
        element: 'drakt',
        farge: '#75AADB',
        beskrivelse: 'Farg drakten lyseblå som Argentina! 🔵'
      },
      {
        element: 'shorts',
        farge: '#000000',
        beskrivelse: 'Farg shortsen svart som Argentina! ⚫'
      }
    ],
    morsommeFakta: [
      'Messi begynte å spille fotball da han var bare 4 år gammel! 👶',
      'Han er bare 170 cm høy, men er en av verdens beste spillere! 🌟',
      'Messi har vunnet Gullballen 8 ganger! Det er rekord! 🏆'
    ],
    svg: `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 100 L200 150" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="200" cy="80" r="25" stroke="black" stroke-width="2" fill="none"/>
      <path class="drakt" d="M170 150 L230 150 L220 280 L180 280 Z" stroke="black" stroke-width="2" fill="none"/>
      <path class="shorts" d="M220 280 L235 380 L165 380 L180 280 Z" stroke="black" stroke-width="2" fill="none"/>
      <path d="M170 200 L150 260" stroke="black" stroke-width="2" fill="none"/>
      <path d="M230 200 L250 260" stroke="black" stroke-width="2" fill="none"/>
      <text x="180" y="450" font-family="Arial" font-size="20">Messi</text>
    </svg>`
  },
  {
    id: 'mbappe',
    navn: 'Kylian Mbappé',
    beskrivelse: 'Lynrask fransk spiss med utrolig teknikk',
    quiz: [
      {
        sporsmal: 'Hvor gammel var Mbappé da han vant VM?',
        alternativer: ['19', '23', '25'],
        riktigSvar: '19',
        forklaring: 'Mbappé var bare 19 år da han vant VM med Frankrike i 2018! 🇫🇷'
      },
      {
        sporsmal: 'Hvilken klubb spiller Mbappé for nå?',
        alternativer: ['PSG', 'Monaco', 'Real Madrid'],
        riktigSvar: 'PSG',
        forklaring: 'Mbappé spiller for Paris Saint-Germain (PSG) i Frankrike! 🗼'
      },
      {
        sporsmal: 'Hva er Mbappés største styrke?',
        alternativer: ['Fart', 'Heading', 'Taklinger'],
        riktigSvar: 'Fart',
        forklaring: 'Mbappé er en av verdens raskeste fotballspillere! 🏃‍♂️'
      }
    ],
    fargeutfordringer: [
      {
        element: 'drakt',
        farge: '#001E62',
        beskrivelse: 'Farg drakten mørkeblå som PSG! 🔵'
      },
      {
        element: 'shorts',
        farge: '#001E62',
        beskrivelse: 'Farg shortsen mørkeblå som PSG! 🔵'
      }
    ],
    morsommeFakta: [
      'Mbappé kan løpe 100 meter på under 11 sekunder! ⚡',
      'Han ga bort alle pengene han tjente i VM 2018 til veldedighet! ❤️',
      'Mbappé scoret hat-trick i VM-finalen 2022! ⚽⚽⚽'
    ],
    svg: `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 100 L200 150" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="200" cy="80" r="28" stroke="black" stroke-width="2" fill="none"/>
      <path class="drakt" d="M165 150 L235 150 L225 290 L175 290 Z" stroke="black" stroke-width="2" fill="none"/>
      <path class="shorts" d="M225 290 L245 390 L155 390 L175 290 Z" stroke="black" stroke-width="2" fill="none"/>
      <path d="M165 200 L145 270" stroke="black" stroke-width="2" fill="none"/>
      <path d="M235 200 L255 270" stroke="black" stroke-width="2" fill="none"/>
      <text x="175" y="450" font-family="Arial" font-size="20">Mbappé</text>
    </svg>`
  },
  {
    id: 'neymar',
    navn: 'Neymar Jr.',
    beskrivelse: 'Brasiliansk tryllekunstner med fantastiske finter',
    quiz: [
      {
        sporsmal: 'Hvilket land kommer Neymar fra?',
        alternativer: ['Brasil', 'Argentina', 'Portugal'],
        riktigSvar: 'Brasil',
        forklaring: 'Neymar er fra Brasil, verdens mest suksessrike fotballnasjon! 🇧🇷'
      },
      {
        sporsmal: 'Hvilken klubb spilte Neymar for sammen med Messi?',
        alternativer: ['Barcelona', 'Real Madrid', 'PSG'],
        riktigSvar: 'Barcelona',
        forklaring: 'Neymar og Messi spilte sammen i Barcelona og senere i PSG! ⚽'
      },
      {
        sporsmal: 'Hva er Neymar kjent for?',
        alternativer: ['Finter', 'Heading', 'Keeperspill'],
        riktigSvar: 'Finter',
        forklaring: 'Neymar er kjent for sine utrolige finter og driblinger! 🕺'
      }
    ],
    fargeutfordringer: [
      {
        element: 'drakt',
        farge: '#FEE12B',
        beskrivelse: 'Farg drakten gul som Brasil! 💛'
      },
      {
        element: 'shorts',
        farge: '#009C3B',
        beskrivelse: 'Farg shortsen grønn som Brasil! 💚'
      }
    ],
    morsommeFakta: [
      'Neymar begynte å spille futsal da han var 3 år gammel! 👶',
      'Han er kjent for å ha over 50 forskjellige finter! 🎭',
      'Neymar har scoret over 400 mål i karrieren sin! ⚽'
    ],
    svg: `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 100 L200 150" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="200" cy="80" r="27" stroke="black" stroke-width="2" fill="none"/>
      <path class="drakt" d="M168 150 L232 150 L222 285 L178 285 Z" stroke="black" stroke-width="2" fill="none"/>
      <path class="shorts" d="M222 285 L240 385 L160 385 L178 285 Z" stroke="black" stroke-width="2" fill="none"/>
      <path d="M168 200 L148 265" stroke="black" stroke-width="2" fill="none"/>
      <path d="M232 200 L252 265" stroke="black" stroke-width="2" fill="none"/>
      <text x="175" y="450" font-family="Arial" font-size="20">Neymar</text>
    </svg>`
  }
];
