const SITE_CONFIG = {
  siteTitle: "25 Cartas para a Célia",
  pageTitle: "Célia's Day | 25 Cartas",
  metaDescription:
    "Uma experiência digital romântica e editorial com 25 cartas para celebrar a Célia.",

  opening: {
    eyebrow: "for you, my love",
    title: "25 cartas para ti",
    lines: [
      "Quis transformar uma parte do que sinto por ti em palavras.",
      "Não para te dizer tudo, porque nunca caberia num só lugar,",
      "mas para te deixar 25 pequenos lembretes de como és especial para mim."
    ],
    buttonLabel: "Abrir",
    whisper: "uma pequena caixa de amor, memória e Primavera"
  },

  overview: {
    eyebrow: "Célia's Day",
    title: "Abre cada carta ao teu ritmo",
    description:
      "Cinco capítulos, vinte e cinco lembranças, e uma coleção de palavras pensadas só para ti."
  },

  buttonLabels: {
    closeLetter: "Guardar esta carta",
    viewFinale: "Abrir o abraço final",
    returnToFinale: "Ir outra vez para o abraço final",
    backToLetters: "Voltar às cartas",
    restart: "Recomeçar devagar",
    finalEntry: "Ver o momento final",
    musicOn: "Ativar música",
    musicOff: "Pausar música"
  },

  labels: {
    progressPrefix: "cartas abertas",
    chapterPrefix: "Capítulo",
    openedBadge: "aberta",
    lockedBadge: "abre o capítulo anterior",
    chapterCompleted: "capítulo concluído",
    finalReady: "Todas as 25 cartas já foram abertas.",
    finalHint: "Quando te apetecer, o fecho está à tua espera.",
    finalSummaryTitle: "As 25 cartas, reunidas com alma"
  },

  finale: {
    eyebrow: "25 de 25",
    title: "Parabéns, meu amor",
    lines: [
      "Hoje celebro-te com a delicadeza de quem sabe a sorte que tem.",
      "Que nunca te falte luz, doçura, coragem nem amor.",
      "E que eu possa continuar a fazer parte de muitos dos teus próximos capítulos."
    ],
    signature: "Com tudo o que sinto de mais bonito.",
    photoCaption: "Uma memória tua que quero continuar a guardar com carinho."
  },

  assets: {
    bow: "assets/ornament-bow.svg",
    photo: "assets/celia-memory.jpg"
  },

  audio: {
    enabledByDefault: true,
    openingVolume: 0.13,
    finaleVolume: 0.18,
    lettersVolume: 0
  },

  animationTuning: {
    loaderDelay: 1350,
    cardRevealStagger: 70,
    progressDuration: 520
  },

  chapters: [
    {
      id: "chapter-1",
      number: "01",
      title: "Quem tu és",
      note: "Cinco pequenas verdades sobre a forma como existes no mundo — e em mim.",
      unlockCopy: "O próximo capítulo acabou de se abrir.",
      layout: [
        { x: 4, y: 8, rotate: -8, depth: 1 },
        { x: 35, y: 1, rotate: 6, depth: 3 },
        { x: 57, y: 27, rotate: 9, depth: 4 },
        { x: 20, y: 37, rotate: -11, depth: 2 },
        { x: 45, y: 51, rotate: -2, depth: 5 }
      ],
      cards: [
        {
          id: "c1-1",
          number: "01",
          message: "Hoje celebram-se 25 anos de uma pessoa rara, linda e muito especial.",
          effect: "halo"
        },
        {
          id: "c1-2",
          number: "02",
          message: "Há pessoas bonitas. E há quem torne tudo à sua volta mais bonito. Tu és as duas coisas.",
          effect: "glimmer"
        },
        {
          id: "c1-3",
          number: "03",
          message: "Tens uma luz incrível, daquelas que se sentem e se guardam, como um dia solarengo de Primavera.",
          effect: "spring"
        },
        {
          id: "c1-4",
          number: "04",
          message: "O teu jeito de ser e de estar fica em tudo — e em todos — os que tocas.",
          effect: "ripple"
        },
        {
          id: "c1-5",
          number: "05",
          message: "O teu aniversário é meu também, porque o teu existir mudou a minha vida.",
          effect: "heartbeat"
        }
      ]
    },
    {
      id: "chapter-2",
      number: "02",
      title: "O que eu amo em ti",
      note: "Cinco cartas onde o amor fica dito com calma e intenção.",
      unlockCopy: "Mais um pedaço do que sinto ficou à vista.",
      layout: [
        { x: 8, y: 12, rotate: -6, depth: 2 },
        { x: 43, y: 2, rotate: 7, depth: 4 },
        { x: 60, y: 34, rotate: 4, depth: 3 },
        { x: 16, y: 44, rotate: -9, depth: 5 },
        { x: 42, y: 58, rotate: 3, depth: 1 }
      ],
      cards: [
        {
          id: "c2-1",
          number: "06",
          message: "Amo a tua forma de sentir as coisas com verdade e intensidade.",
          effect: "velvet"
        },
        {
          id: "c2-2",
          number: "07",
          message: "Amo a tua força e a tua resiliência, mesmo quando o choro vem junto.",
          effect: "ember"
        },
        {
          id: "c2-3",
          number: "08",
          message: "Amo o teu sorriso — uma das mais belas criações que já vi.",
          effect: "stardust"
        },
        {
          id: "c2-4",
          number: "09",
          message: "Amo a forma como me fazes sentir escolhido.",
          effect: "orbit"
        },
        {
          id: "c2-5",
          number: "10",
          message: "Amo-te por quem és e por quem me tenho tornado contigo.",
          effect: "warmth"
        }
      ]
    },
    {
      id: "chapter-3",
      number: "03",
      title: "O que vivemos",
      note: "Cinco recortes do que entre nós já ganhou lugar, tempo e memória.",
      unlockCopy: "As nossas memórias acabaram de abrir outro capítulo.",
      layout: [
        { x: 3, y: 11, rotate: -10, depth: 3 },
        { x: 33, y: 2, rotate: 5, depth: 1 },
        { x: 57, y: 20, rotate: 10, depth: 4 },
        { x: 18, y: 44, rotate: -4, depth: 5 },
        { x: 47, y: 55, rotate: 2, depth: 2 }
      ],
      cards: [
        {
          id: "c3-1",
          number: "11",
          message: "Há dias que passam. Todos os dias contigo ficam.",
          effect: "trace"
        },
        {
          id: "c3-2",
          number: "12",
          message: "Contigo, até os momentos simples ganham outra cor.",
          effect: "petals"
        },
        {
          id: "c3-3",
          number: "13",
          message: "Gosto da nossa forma de existir, sempre com intenção.",
          effect: "thread"
        },
        {
          id: "c3-4",
          number: "14",
          message: "És uma das partes mais bonitas da minha vida.",
          effect: "bloom"
        },
        {
          id: "c3-5",
          number: "15",
          message: "Se eu pudesse guardar uma sensação para sempre, seria esta vontade de estar contigo eternamente.",
          effect: "aura"
        }
      ]
    },
    {
      id: "chapter-4",
      number: "04",
      title: "O que eu admiro em ti",
      note: "Cinco admirações que te pertencem por inteiro, e que eu nunca deixo de notar.",
      unlockCopy: "Ainda há mais para te mostrar.",
      layout: [
        { x: 6, y: 10, rotate: -5, depth: 2 },
        { x: 39, y: 0, rotate: 8, depth: 4 },
        { x: 58, y: 29, rotate: 6, depth: 5 },
        { x: 17, y: 39, rotate: -8, depth: 3 },
        { x: 44, y: 56, rotate: 1, depth: 1 }
      ],
      cards: [
        {
          id: "c4-1",
          number: "16",
          message: "Admiro a tua capacidade de estares sempre linda e cheirosa.",
          effect: "perfume"
        },
        {
          id: "c4-2",
          number: "17",
          message: "Admiro a tua coragem, mesmo quando achas que ninguém a vê.",
          effect: "flare"
        },
        {
          id: "c4-3",
          number: "18",
          message: "Admiro a forma como enfrentas a vida com optimismo.",
          effect: "dawn"
        },
        {
          id: "c4-4",
          number: "19",
          message: "Admiro o teu coração. É um dos lugares mais bonitos que conheço. Posso morar nele para sempre?",
          effect: "heart-home"
        },
        {
          id: "c4-5",
          number: "20",
          message: "Admiro-te porque és tu — e isso já é tudo.",
          effect: "quiet-gold"
        }
      ]
    },
    {
      id: "chapter-5",
      number: "05",
      title: "O que desejo para ti e para nós",
      note: "Cinco desejos cheios de ternura para o que ainda vamos viver.",
      unlockCopy: "A última parte do presente acabou de florescer.",
      layout: [
        { x: 5, y: 12, rotate: -7, depth: 2 },
        { x: 34, y: 2, rotate: 6, depth: 4 },
        { x: 60, y: 19, rotate: 9, depth: 5 },
        { x: 18, y: 46, rotate: -9, depth: 3 },
        { x: 47, y: 57, rotate: 2, depth: 1 }
      ],
      cards: [
        {
          id: "c5-1",
          number: "21",
          message: "Quero que os teus 25 te tragam leveza, alegria e expansão.",
          effect: "lift"
        },
        {
          id: "c5-2",
          number: "22",
          message: "Quero ver-te feliz da forma mais inteira possível.",
          effect: "full-bloom"
        },
        {
          id: "c5-3",
          number: "23",
          message: "Quero estar ao teu lado em muitos dos teus próximos capítulos.",
          effect: "pages"
        },
        {
          id: "c5-4",
          number: "24",
          message: "Quero continuar a construir memórias contigo que nos saibam sempre a pouco.",
          effect: "constellation"
        },
        {
          id: "c5-5",
          number: "25",
          message: "Parabéns, meu amor. Hoje celebro-te com tudo o que sinto de mais bonito. Que venham muitos mais anos.",
          effect: "finale"
        }
      ]
    }
  ]
};
