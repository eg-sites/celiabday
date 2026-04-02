// ============================================================
// config.js — Todas as variáveis e textos editáveis aqui
// ============================================================
// Edita este ficheiro para personalizar o site.
// NÃO é necessário tocar no HTML, CSS ou JS para a maioria das alterações.

const SITE_CONFIG = {

  // ── IDENTIDADE ───────────────────────────────────────────
  celebrantName:  "Célia Bizerra João",
  siteTitle:      "Aniversário da Célia",
  pageTitle:      "Célia Bizerra João · Birthday Experience",
  dressCode:      "Grown & Sexy",
  themeLabel:     "I'm about to get a tini 🍸 bit older",
  eventYear:      "2026",

  // ── WELCOME ──────────────────────────────────────────────
  welcomeEyebrow:     "Confirmação Final, Because...",
  welcomeTitle:       "Antes de revelar todos os detalhes desta celebração...",
  welcomeMessage:     "Confirma a tua presença. O espaço e o horário do jantar serão revelados mediante confirmação. (preenche mesmo que não possas ir, por favor)",
  welcomeSubmessage:  "",
  welcomeNameLabel:   "O teu nome",
  welcomeNamePlaceholder: "Escreve aqui o teu nome",
  welcomeNameError:   "Para continuar, preciso do teu nome.",
  confirmYesLabel:    "Sim, vou",
  confirmNoLabel:     "Não vou",

  // ── FORMULÁRIO ───────────────────────────────────────────
  dinnerCompanionSceneEyebrow: "Só mais uma perguntinha...",
  dinnerCompanionSceneTitle: "Vens acompanhado(a)?",
  formCompanionQuestion: "",
  formCompanionYes:      "Sim",
  formCompanionNo:       "Não",
  formCompanionAddLabel: "+ Adicionar acompanhante",
  formCompanionLabel:    "Nome do acompanhante",
  formSubmitLabel:       "Confirmar presença ✦",
  dinnerFormNote:        "Os detalhes do jantar serão revelados após confirmação.",
  dinnerCompanionError:  "Se vens com acompanhante, escreve pelo menos um nome.",

  // ── JANTAR ───────────────────────────────────────────────
  // 🔧 EDITAR AQUI com os dados reais do restaurante
  dinnerDateLabel:    "18 de Abril de 2026",
  dinnerTimeLabel:    "19:15",
  dinnerVenueName:    "Restaurante Aprazível (Menu 35€/pessoa)",
  dinnerVenueAddress: "Galerias Páteo Garrett, R. Garrett 19, 1200-093 Lisboa",
  dinnerVenueMapsUrl: "https://share.google/MfY5LhM7l7T69CJkF",
  dinnerVenueImage:   "",
  dinnerVenueImageAlt:"Fotografia do restaurante Aprazível",
  dinnerNote:         "Sê pontual e prepara-te para criarmos uma noite cheia de memórias incríveis.",

  // ── MENSAGENS JANTAR ─────────────────────────────────────
  confirmedDinnerTitle:   "Que bom ter-te comigo.",
  confirmedDinnerMessage: "A tua presença vai tornar esta celebração ainda mais especial. Abaixo encontras os detalhes do jantar.",
  declinedDinnerTitle:    "Que pena...",
  declinedDinnerMessage:  "Gostava muito de te ter comigo neste jantar. Mas obrigada por me responderes — isso também é um gesto bonito.",
  declinedKissAndCheese:  "Um beijo e um queijo. 🧀💋",
  continueLead:           "mas calma, ainda há mais",
  continueButtonLabel:    "Continuar",

  // ── AFTER ────────────────────────────────────────────────
  // 🔧 EDITAR AQUI com os dados reais do after
  afterQuestionTitle:     "Depois do jantar...",
  afterQuestionSubtitle:  "vais ao after?",
  afterQuestionNote:      "A noite não acaba aqui... a maltinha é inimiga do fim ✨",
  afterNoDinnerQuestion:  "Mesmo não indo ao jantar...",
  afterNoDinnerSubtitle:  "queres aparecer no after dinner?",

  afterTitle:        "Então sim... agora posso contar-te.",
  afterDateLabel:    "18 de Abril de 2026",
  afterTimeLabel:    "22:30",
  afterVenueName:    "SEEN by Olivier - Lisboa",
  afterVenueAddress: "Av. da Liberdade 187, Lisbon, Portugal",
  afterVenueMapsUrl: "https://share.google/lo61RQSPuwqE0d5kr",
  afterNote:         "Mais descontraído, mais ousado, mais festa. O mood continua: grown & sexy.",
  afterCompanionQuestion: "Vais com acompanhante(s) ao after?",
  afterCompanionSame: "Os mesmos do jantar",
  afterCompanionOther: "Acrescentar outros acompanhantes",
  afterConfirmLabel: "Confirmar tudo ✦",
  afterCompanionError: "Se vais com companhia ao after, escreve pelo menos um nome.",

  // ── FECHOS ───────────────────────────────────────────────
  finalThankYouTitle:   "Obrigada por confirmares.",
  finalThankYouMessage: "Mal posso esperar por celebrar contigo. Vemo-nos em breve.",
  finalOnlyAfterMsg:    "Mesmo sem jantar, fico feliz por te ver no after. Até lá!",
  finalDinnerOnlyMsg:   "Presença confirmada para o jantar. Vai ser especial ter-te comigo.",
  finalBothMsg:         "Mal posso esperar por celebrar contigo. Vai ser uma noite memorável.",
  finalNoTitle:         "Um beijo e um queijo",
  finalNoMessage:       "Mesmo não estando presente, obrigada pelo carinho e pela resposta. Sentes a minha falta — eu sei.",

  // ── CARTÃO FINAL (screenshot) ────────────────────────────
  cardScreenshotNote:  "Guarda este convite — faz screenshot para o teres sempre à mão.",
  cardDinnerLabel:     "Jantar de Aniversário",
  cardAfterLabel:      "After Party",
  cardTitle:           "Célia's Day",
  cardEyebrow:         "You are invited to",
  cardCompanionsPrefix:"Com",
  mapButtonLabel:      "Ver Google Maps",

  // ── ASSETS ───────────────────────────────────────────────
  // 🔧 SUBSTITUIR pela foto "kid" real da Célia (coloca em assets/)
  kidAfterImage: "assets/kid-after.jpg",

  // ── INTEGRAÇÃO GOOGLE ────────────────────────────────────
  // 🔧 COLOCAR AQUI a URL do Web App do Google Apps Script após publicação
  googleAppsScriptUrl: "COLOCAR_AQUI_A_URL_DO_WEB_APP",

  // ── ADMIN ────────────────────────────────────────────────
  // 🔧 Chave de acesso à página admin — trocar por algo seguro
  adminSecretKey: "celia2026admin",

  // ── PALETA (referência; valores usados via CSS vars) ─────
  colors: {
    bg:          "#fff8f4",
    softPink:    "#fce8f0",
    red:         "#b20d18",
    deepRed:     "#7f0912",
    rose:        "#e07090",
    blush:       "#f6d0dd",
    cream:       "#fff8f4",
    black:       "#0a0a0f",
    gold:        "#c9a87c",
    white:       "#ffffff"
  }
};
