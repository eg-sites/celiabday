'use strict';

var STORAGE_KEY = 'celia-25-cartas-progress';
var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

var EFFECT_SYMBOLS = {
  halo: '25',
  glimmer: '✦',
  spring: '☼',
  ripple: '◌',
  heartbeat: '♡',
  velvet: '✷',
  ember: '❋',
  stardust: '✦',
  orbit: '⊹',
  warmth: '♥',
  trace: '∞',
  petals: '❀',
  thread: '⟡',
  bloom: '✿',
  aura: '☽',
  perfume: '❁',
  flare: '✧',
  dawn: '☼',
  'heart-home': '♡',
  'quiet-gold': '✦',
  lift: '✧',
  'full-bloom': '✿',
  pages: '❋',
  constellation: '✦',
  finale: '25'
};

var CARD_ICON_KEYS = {
  'c1-1': 'birthday-crown',
  'c1-2': 'beauty-bloom',
  'c1-3': 'spring-sun',
  'c1-4': 'touch-trace',
  'c1-5': 'life-orbit',
  'c2-1': 'heart-wave',
  'c2-2': 'strength-shield',
  'c2-3': 'smile',
  'c2-4': 'chosen-star',
  'c2-5': 'dual-hearts',
  'c3-1': 'calendar',
  'c3-2': 'palette',
  'c3-3': 'compass',
  'c3-4': 'gem-heart',
  'c3-5': 'infinity',
  'c4-1': 'perfume',
  'c4-2': 'courage',
  'c4-3': 'sunrise',
  'c4-4': 'home-heart',
  'c4-5': 'signature',
  'c5-1': 'uplift',
  'c5-2': 'happiness',
  'c5-3': 'book',
  'c5-4': 'memories',
  'c5-5': 'cake'
};

var CARD_EMOJI_DATA = {
  'birthday-crown': { emoji: '👑', accent: '✨' },
  'beauty-bloom': { emoji: '🌸', accent: '✨' },
  'spring-sun': { emoji: '☀️', accent: '✨' },
  'touch-trace': { emoji: '💫', accent: '🤍' },
  'life-orbit': { emoji: '💞', accent: '✨' },
  'heart-wave': { emoji: '❤️', accent: '✨' },
  'strength-shield': { emoji: '💪', accent: '✨' },
  'smile': { emoji: '😊', accent: '✨' },
  'chosen-star': { emoji: '⭐', accent: '🤍' },
  'dual-hearts': { emoji: '💞', accent: '✨' },
  calendar: { emoji: '📅', accent: '✨' },
  palette: { emoji: '🎨', accent: '✨' },
  compass: { emoji: '🧭', accent: '✨' },
  'gem-heart': { emoji: '💎', accent: '🤍' },
  infinity: { emoji: '♾️', accent: '✨' },
  perfume: { emoji: '🌷', accent: '✨' },
  courage: { emoji: '🛡️', accent: '✨' },
  sunrise: { emoji: '🌅', accent: '✨' },
  'home-heart': { emoji: '🏠', accent: '❤️' },
  signature: { emoji: '✨', accent: '🤍' },
  uplift: { emoji: '🎈', accent: '✨' },
  happiness: { emoji: '🌼', accent: '✨' },
  book: { emoji: '📖', accent: '✨' },
  memories: { emoji: '📸', accent: '✨' },
  cake: { emoji: '🎂', accent: '✨' }
};

var state = {
  openedIds: new Set(),
  activeCardId: '',
  pendingFinale: false,
  toastTimer: null,
  currentScene: 'scene-opening'
};

var allCards = [];
var cardsById = {};
var audioState = {
  started: false,
  enabled: SITE_CONFIG.audio ? !!SITE_CONFIG.audio.enabledByDefault : false,
  context: null,
  masterGain: null,
  sceneGain: null,
  padOscillators: [],
  bellTimer: null,
  unlockListenersAttached: false,
  lastCueScene: ''
};

function byId(id) {
  return document.getElementById(id);
}

function setText(id, text) {
  var element = byId(id);
  if (element) {
    element.textContent = text;
  }
}

function setHTML(id, html) {
  var element = byId(id);
  if (element) {
    element.innerHTML = html;
  }
}

function setHidden(element, hidden) {
  if (!element) return;
  element.hidden = !!hidden;
  if (hidden) {
    element.setAttribute('hidden', '');
  } else {
    element.removeAttribute('hidden');
  }
}

function getLastCardId() {
  return allCards.length ? allCards[allCards.length - 1].id : '';
}

function iconSvg(viewBox, inner) {
  return [
    '<svg class="letter-icon-svg" viewBox="',
    viewBox,
    '" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
    inner,
    '</svg>'
  ].join('');
}

function getCardEmojiMarkup(cardId) {
  var iconKey = CARD_ICON_KEYS[cardId] || 'beauty-bloom';
  var data = CARD_EMOJI_DATA[iconKey] || CARD_EMOJI_DATA['beauty-bloom'];

  return [
    '<span class="letter-sheet__emoji-wrap">',
    '<span class="letter-sheet__emoji" aria-hidden="true">', data.emoji, '</span>',
    '<span class="letter-sheet__emoji-accent" aria-hidden="true">', data.accent, '</span>',
    '</span>'
  ].join('');
}

function getCardIconMarkup(cardId) {
  var iconKey = CARD_ICON_KEYS[cardId] || 'beauty-bloom';

  switch (iconKey) {
    case 'birthday-crown':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-orbit" cx="48" cy="48" r="32"></circle>',
        '<path class="icon-line icon-bob" d="M18 64L27 33L44 49L58 27L71 49L83 33L78 64H18Z"></path>',
        '<path class="icon-line" d="M23 71H77"></path>',
        '<path class="icon-line icon-ray" d="M48 10V18"></path>',
        '<path class="icon-line icon-ray" d="M32 18L27 14"></path>',
        '<path class="icon-line icon-ray" d="M64 18L69 14"></path>'
      ].join(''));
    case 'beauty-bloom':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-soft-fill icon-pulse" cx="48" cy="48" r="12"></circle>',
        '<ellipse class="icon-line icon-bob" cx="48" cy="26" rx="10" ry="14"></ellipse>',
        '<ellipse class="icon-line icon-bob" cx="70" cy="48" rx="14" ry="10"></ellipse>',
        '<ellipse class="icon-line icon-bob" cx="48" cy="70" rx="10" ry="14"></ellipse>',
        '<ellipse class="icon-line icon-bob" cx="26" cy="48" rx="14" ry="10"></ellipse>',
        '<path class="icon-line icon-ray" d="M76 20L82 14"></path>',
        '<path class="icon-line icon-ray" d="M74 34H84"></path>'
      ].join(''));
    case 'spring-sun':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-soft-fill icon-pulse" cx="48" cy="48" r="18"></circle>',
        '<circle class="icon-line" cx="48" cy="48" r="16"></circle>',
        '<path class="icon-line icon-ray" d="M48 12V24"></path>',
        '<path class="icon-line icon-ray" d="M48 72V84"></path>',
        '<path class="icon-line icon-ray" d="M12 48H24"></path>',
        '<path class="icon-line icon-ray" d="M72 48H84"></path>',
        '<path class="icon-line icon-ray" d="M23 23L31 31"></path>',
        '<path class="icon-line icon-ray" d="M65 65L73 73"></path>',
        '<path class="icon-line icon-ray" d="M23 73L31 65"></path>',
        '<path class="icon-line icon-ray" d="M65 31L73 23"></path>'
      ].join(''));
    case 'touch-trace':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-draw" d="M24 58C28 46 37 40 46 40C51 40 55 42 58 46"></path>',
        '<path class="icon-line icon-draw" d="M72 58C68 46 59 40 50 40C45 40 41 42 38 46"></path>',
        '<path class="icon-line" d="M22 60C26 68 34 73 43 73"></path>',
        '<path class="icon-line" d="M74 60C70 68 62 73 53 73"></path>',
        '<path class="icon-line icon-pulse" d="M48 34L51 40H57L52 44L54 50L48 46L42 50L44 44L39 40H45L48 34Z"></path>'
      ].join(''));
    case 'life-orbit':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-pulse" d="M48 66C35 57 27 49 27 39C27 31 33 25 41 25C45 25 49 27 52 31C55 27 59 25 63 25C71 25 77 31 77 39C77 49 69 57 56 66L52 69L48 66Z"></path>',
        '<ellipse class="icon-orbit" cx="48" cy="48" rx="33" ry="19"></ellipse>',
        '<circle class="icon-dot" cx="22" cy="44" r="3"></circle>'
      ].join(''));
    case 'heart-wave':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-pulse" d="M48 68C34 58 24 49 24 36C24 28 30 22 38 22C43 22 47 24 50 29C53 24 57 22 62 22C70 22 76 28 76 36C76 49 66 58 52 68L48 71L48 68Z"></path>',
        '<path class="icon-line icon-draw" d="M18 60H33L39 48L47 63L54 42L60 54H78"></path>'
      ].join(''));
    case 'strength-shield':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M48 16L72 24V43C72 58 62 69 48 77C34 69 24 58 24 43V24L48 16Z"></path>',
        '<path class="icon-line strength-mark" d="M48 32L52 42L63 42L54 49L57 60L48 54L39 60L42 49L33 42L44 42L48 32Z"></path>',
        '<path class="icon-line icon-ray" d="M74 32L82 28"></path>',
        '<path class="icon-line icon-ray" d="M14 44L22 42"></path>'
      ].join(''));
    case 'smile':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-soft-fill" cx="48" cy="48" r="28"></circle>',
        '<circle class="icon-line" cx="48" cy="48" r="26"></circle>',
        '<circle class="icon-dot" cx="39" cy="41" r="2.6"></circle>',
        '<circle class="icon-dot" cx="57" cy="41" r="2.6"></circle>',
        '<path class="icon-line smile-arc" d="M34 54C38 61 44 64 48 64C52 64 58 61 62 54"></path>',
        '<path class="icon-line" d="M30 30L24 24"></path>',
        '<path class="icon-line" d="M66 30L72 24"></path>'
      ].join(''));
    case 'chosen-star':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-orbit" cx="48" cy="48" r="30"></circle>',
        '<path class="icon-line icon-pulse" d="M48 66C36 57 28 49 28 39C28 31 34 25 42 25C46 25 49 27 52 30C55 27 58 25 62 25C70 25 76 31 76 39C76 49 68 57 56 66L52 69L48 66Z"></path>',
        '<path class="icon-line strength-mark" d="M71 25L73 30L78 31L74 35L75 40L71 37L67 40L68 35L64 31L69 30L71 25Z"></path>'
      ].join(''));
    case 'dual-hearts':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M38 62C28 54 22 47 22 38C22 31 27 26 34 26C38 26 41 28 43 31C45 28 48 26 52 26C59 26 64 31 64 38C64 47 58 54 48 62L43 66L38 62Z"></path>',
        '<path class="icon-line icon-drift" d="M58 66C48 58 42 51 42 42C42 35 47 30 54 30C58 30 61 32 63 35C65 32 68 30 72 30C79 30 84 35 84 42C84 51 78 58 68 66L63 70L58 66Z"></path>'
      ].join(''));
    case 'calendar':
      return iconSvg('0 0 96 96', [
        '<rect class="icon-line" x="20" y="24" width="56" height="48" rx="10"></rect>',
        '<path class="icon-line" d="M20 38H76"></path>',
        '<path class="icon-line" d="M32 18V30"></path>',
        '<path class="icon-line" d="M64 18V30"></path>',
        '<path class="icon-line icon-pulse" d="M39 49H57"></path>',
        '<path class="icon-line icon-pulse" d="M39 57H52"></path>'
      ].join(''));
    case 'palette':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M48 20C31 20 18 33 18 49C18 63 29 74 43 74H50C56 74 60 69 60 63C60 57 56 54 56 50C56 46 59 43 64 43H66C74 43 80 37 80 29C80 24 76 20 71 20H48Z"></path>',
        '<circle class="icon-dot" cx="34" cy="39" r="3"></circle>',
        '<circle class="icon-dot" cx="46" cy="31" r="3"></circle>',
        '<circle class="icon-dot" cx="59" cy="33" r="3"></circle>',
        '<circle class="icon-dot" cx="36" cy="54" r="3"></circle>'
      ].join(''));
    case 'compass':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-line" cx="48" cy="48" r="28"></circle>',
        '<path class="icon-line icon-pulse" d="M58 38L54 58L34 62L38 42L58 38Z"></path>',
        '<path class="icon-line" d="M48 20V28"></path>',
        '<path class="icon-line" d="M48 68V76"></path>',
        '<path class="icon-line" d="M20 48H28"></path>',
        '<path class="icon-line" d="M68 48H76"></path>'
      ].join(''));
    case 'gem-heart':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M34 26H62L74 40L48 72L22 40L34 26Z"></path>',
        '<path class="icon-line" d="M34 26L48 40L62 26"></path>',
        '<path class="icon-line" d="M22 40H74"></path>',
        '<path class="icon-line icon-pulse" d="M48 55C44 52 40 48 40 44C40 41 42 39 45 39C47 39 48 40 49 42C50 40 51 39 53 39C56 39 58 41 58 44C58 48 54 52 50 55L49 56L48 55Z"></path>'
      ].join(''));
    case 'infinity':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-draw" d="M18 52C24 40 32 38 38 38C49 38 51 58 60 58C66 58 72 52 78 44"></path>',
        '<path class="icon-line icon-draw" d="M18 44C24 52 30 58 36 58C47 58 49 38 58 38C64 38 72 40 78 52"></path>',
        '<path class="icon-line icon-pulse" d="M48 27C45 24 42 22 39 22C35 22 32 25 32 29C32 34 37 38 44 43L48 45L52 43C59 38 64 34 64 29C64 25 61 22 57 22C54 22 51 24 48 27Z"></path>'
      ].join(''));
    case 'perfume':
      return iconSvg('0 0 96 96', [
        '<rect class="icon-line icon-bob" x="29" y="34" width="38" height="34" rx="10"></rect>',
        '<path class="icon-line" d="M40 24H56"></path>',
        '<path class="icon-line" d="M44 24V34"></path>',
        '<path class="icon-line" d="M56 24V30H63"></path>',
        '<path class="icon-line mist" d="M24 28C28 24 29 20 27 16"></path>',
        '<path class="icon-line mist" d="M70 30C75 26 76 21 73 16"></path>'
      ].join(''));
    case 'courage':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M48 16L72 24V43C72 58 62 69 48 77C34 69 24 58 24 43V24L48 16Z"></path>',
        '<path class="icon-line strength-mark" d="M48 31L51 39L60 40L53 46L55 55L48 51L41 55L43 46L36 40L45 39L48 31Z"></path>',
        '<path class="icon-line icon-ray" d="M48 10V18"></path>',
        '<path class="icon-line icon-ray" d="M16 40L24 40"></path>',
        '<path class="icon-line icon-ray" d="M72 40L80 40"></path>'
      ].join(''));
    case 'sunrise':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line" d="M18 62H78"></path>',
        '<path class="icon-line" d="M28 62C28 50 37 41 48 41C59 41 68 50 68 62"></path>',
        '<path class="icon-line icon-ray" d="M48 24V34"></path>',
        '<path class="icon-line icon-ray" d="M32 32L38 38"></path>',
        '<path class="icon-line icon-ray" d="M64 32L58 38"></path>',
        '<path class="icon-line icon-ray" d="M24 48H34"></path>',
        '<path class="icon-line icon-ray" d="M62 48H72"></path>'
      ].join(''));
    case 'home-heart':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M24 42L48 24L72 42"></path>',
        '<path class="icon-line" d="M30 40V72H66V40"></path>',
        '<path class="icon-line icon-pulse" d="M48 60C44 57 40 54 40 49C40 46 42 43 46 43C48 43 49 44 50 46C51 44 52 43 54 43C58 43 60 46 60 49C60 54 56 57 52 60L50 61L48 60Z"></path>'
      ].join(''));
    case 'signature':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-orbit" cx="48" cy="44" r="26"></circle>',
        '<path class="icon-line strength-mark" d="M48 24L52 36L64 36L54 43L58 55L48 48L38 55L42 43L32 36L44 36L48 24Z"></path>',
        '<path class="icon-line icon-draw" d="M28 70C36 64 44 67 52 70C58 72 65 72 70 68"></path>'
      ].join(''));
    case 'uplift':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M48 23C57 23 64 30 64 39C64 50 55 57 48 63C41 57 32 50 32 39C32 30 39 23 48 23Z"></path>',
        '<path class="icon-line" d="M48 63V79"></path>',
        '<path class="icon-line icon-ray" d="M48 12V18"></path>',
        '<path class="icon-line icon-ray" d="M34 18L38 24"></path>',
        '<path class="icon-line icon-ray" d="M62 18L58 24"></path>'
      ].join(''));
    case 'happiness':
      return iconSvg('0 0 96 96', [
        '<circle class="icon-soft-fill" cx="48" cy="48" r="24"></circle>',
        '<path class="icon-line" d="M26 50C30 61 38 67 48 67C58 67 66 61 70 50"></path>',
        '<path class="icon-line" d="M34 38H36"></path>',
        '<path class="icon-line" d="M60 38H62"></path>',
        '<path class="icon-line icon-ray" d="M48 16V24"></path>',
        '<path class="icon-line icon-ray" d="M24 28L31 33"></path>',
        '<path class="icon-line icon-ray" d="M72 28L65 33"></path>'
      ].join(''));
    case 'book':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line icon-bob" d="M20 30C28 28 36 28 44 31V69C36 66 28 66 20 68V30Z"></path>',
        '<path class="icon-line icon-bob" d="M76 30C68 28 60 28 52 31V69C60 66 68 66 76 68V30Z"></path>',
        '<path class="icon-line" d="M48 28V70"></path>',
        '<path class="icon-line icon-draw" d="M28 40H38"></path>',
        '<path class="icon-line icon-draw" d="M58 40H68"></path>'
      ].join(''));
    case 'memories':
      return iconSvg('0 0 96 96', [
        '<rect class="icon-line photo-a" x="20" y="30" width="28" height="34" rx="6"></rect>',
        '<rect class="icon-line photo-b" x="48" y="24" width="28" height="34" rx="6"></rect>',
        '<path class="icon-line" d="M24 56L32 47L39 53L44 46"></path>',
        '<path class="icon-line" d="M53 49L60 42L67 48L72 40"></path>',
        '<circle class="icon-dot" cx="37" cy="40" r="2.5"></circle>',
        '<circle class="icon-dot" cx="64" cy="34" r="2.5"></circle>'
      ].join(''));
    case 'cake':
      return iconSvg('0 0 96 96', [
        '<path class="icon-line" d="M25 65H71"></path>',
        '<rect class="icon-line icon-bob" x="28" y="46" width="40" height="19" rx="6"></rect>',
        '<path class="icon-line" d="M28 54H68"></path>',
        '<path class="icon-line" d="M48 30V46"></path>',
        '<path class="icon-line flame" d="M48 20C52 24 52 28 48 32C44 28 44 24 48 20Z"></path>'
      ].join(''));
    default:
      return iconSvg('0 0 96 96', [
        '<circle class="icon-orbit" cx="48" cy="48" r="28"></circle>',
        '<path class="icon-line strength-mark" d="M48 27L52 38L64 38L54 45L58 57L48 50L38 57L42 45L32 38L44 38L48 27Z"></path>'
      ].join(''));
  }
}

function flattenCards() {
  allCards = [];
  cardsById = {};

  SITE_CONFIG.chapters.forEach(function (chapter, chapterIndex) {
    chapter.cards.forEach(function (card, cardIndex) {
      var fullCard = Object.assign({}, card, {
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterNumber: chapter.number,
        chapterIndex: chapterIndex,
        cardIndex: cardIndex
      });

      allCards.push(fullCard);
      cardsById[card.id] = fullCard;
    });
  });
}

function loadProgress() {
  try {
    var raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;

    parsed.forEach(function (id) {
      if (cardsById[id]) {
        state.openedIds.add(id);
      }
    });
  } catch (error) {
    console.error('Erro ao carregar progresso:', error);
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(state.openedIds)));
  } catch (error) {
    console.error('Erro ao guardar progresso:', error);
  }
}

function applyConfig() {
  document.title = SITE_CONFIG.pageTitle;

  var meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', SITE_CONFIG.metaDescription);
  }

  setText('opening-eyebrow', SITE_CONFIG.opening.eyebrow);
  setText('opening-title', SITE_CONFIG.opening.title);
  setText('opening-whisper', SITE_CONFIG.opening.whisper);
  setText('overview-eyebrow', SITE_CONFIG.overview.eyebrow);
  setText('overview-title', SITE_CONFIG.overview.title);
  setText('overview-description', SITE_CONFIG.overview.description);
  setText('final-entry-title', SITE_CONFIG.labels.finalReady);
  setText('final-entry-hint', SITE_CONFIG.labels.finalHint);
  setText('finale-summary-title', SITE_CONFIG.labels.finalSummaryTitle);
  setText('open-experience', SITE_CONFIG.opening.buttonLabel);
  setText('open-finale', SITE_CONFIG.buttonLabels.finalEntry);
  setText('back-to-letters', SITE_CONFIG.buttonLabels.backToLetters);
  setText('restart-experience', SITE_CONFIG.buttonLabels.restart);
  setText('letter-finale-link', SITE_CONFIG.buttonLabels.returnToFinale);
  setText('finale-eyebrow', SITE_CONFIG.finale.eyebrow);
  setText('finale-title', SITE_CONFIG.finale.title);
  setText('finale-signature', SITE_CONFIG.finale.signature);
  setText('finale-caption', SITE_CONFIG.finale.photoCaption);

  var openingCopy = byId('opening-copy');
  if (openingCopy) {
    openingCopy.innerHTML = SITE_CONFIG.opening.lines
      .map(function (line) { return '<p>' + line + '</p>'; })
      .join('');
  }

  var finaleCopy = byId('finale-copy');
  if (finaleCopy) {
    finaleCopy.innerHTML = SITE_CONFIG.finale.lines
      .map(function (line) { return '<p>' + line + '</p>'; })
      .join('');
  }

  var photo = byId('finale-photo');
  var photoBlur = byId('finale-photo-blur');
  if (photo) {
    photo.src = SITE_CONFIG.assets.photo;
    photo.alt = 'Fotografia da Célia';
  }
  if (photoBlur) {
    photoBlur.src = SITE_CONFIG.assets.photo;
    photoBlur.alt = '';
  }

  ['loader-bow', 'hero-bow', 'finale-bow'].forEach(function (id) {
    var image = byId(id);
    if (image) image.src = SITE_CONFIG.assets.bow;
  });

  updateMusicButton();
}

function createPetals() {
  var container = byId('petal-stream');
  if (!container || REDUCED_MOTION) return;

  var fragment = document.createDocumentFragment();
  for (var index = 0; index < 12; index += 1) {
    var petal = document.createElement('span');
    petal.style.left = (4 + index * 8) + '%';
    petal.style.animationDuration = (14 + Math.random() * 8).toFixed(2) + 's';
    petal.style.animationDelay = (Math.random() * 10).toFixed(2) + 's';
    petal.style.transform = 'rotate(' + ((Math.random() * 32) - 16).toFixed(2) + 'deg)';
    fragment.appendChild(petal);
  }
  container.appendChild(fragment);
}

function motifPiece(className, style, content) {
  return '<span class="motif-piece ' + className + '"' + (style ? ' style="' + style + '"' : '') + '>' + (content || '') + '</span>';
}

function getMotifMarkup(effect) {
  switch (effect) {
    case 'halo':
      return [
        motifPiece('motif-piece--ring', ''),
        motifPiece('motif-piece--ring is-large', ''),
        motifPiece('motif-piece--dot', 'top:24%;left:26%;animation-delay:0.2s;'),
        motifPiece('motif-piece--dot', 'top:31%;right:24%;animation-delay:0.8s;'),
        motifPiece('motif-piece--dot', 'bottom:24%;left:48%;animation-delay:1.1s;')
      ].join('');
    case 'glimmer':
    case 'stardust':
    case 'constellation':
      return [
        motifPiece('motif-piece--star', 'top:20%;left:18%;animation-delay:0.2s;', '✦'),
        motifPiece('motif-piece--star', 'top:28%;right:18%;animation-delay:0.8s;', '✧'),
        motifPiece('motif-piece--star', 'bottom:22%;left:26%;animation-delay:1.1s;', '✦'),
        motifPiece('motif-piece--star', 'bottom:18%;right:24%;animation-delay:0.4s;', '✧'),
        motifPiece('motif-piece--dot', 'top:44%;left:16%;animation-delay:1.4s;'),
        motifPiece('motif-piece--dot', 'top:54%;right:15%;animation-delay:0.6s;')
      ].join('');
    case 'spring':
    case 'dawn':
    case 'lift':
      return [
        motifPiece('motif-piece--beam', '--beam-rotate:-70deg;'),
        motifPiece('motif-piece--beam', '--beam-rotate:-30deg;animation-delay:0.35s;'),
        motifPiece('motif-piece--beam', '--beam-rotate:22deg;animation-delay:0.7s;'),
        motifPiece('motif-piece--beam', '--beam-rotate:62deg;animation-delay:1s;'),
        motifPiece('motif-piece--dot', 'top:24%;left:48%;animation-delay:0.3s;'),
        motifPiece('motif-piece--dot', 'top:62%;left:22%;animation-delay:1s;')
      ].join('');
    case 'petals':
    case 'bloom':
    case 'full-bloom':
      return [
        motifPiece('motif-piece--petal', 'top:22%;left:28%;--petal-rotate:-18deg;animation-delay:0.2s;'),
        motifPiece('motif-piece--petal', 'top:26%;right:28%;--petal-rotate:18deg;animation-delay:0.8s;'),
        motifPiece('motif-piece--petal', 'bottom:22%;left:32%;--petal-rotate:-32deg;animation-delay:1.1s;'),
        motifPiece('motif-piece--petal', 'bottom:20%;right:30%;--petal-rotate:32deg;animation-delay:0.4s;'),
        motifPiece('motif-piece--petal', 'top:18%;left:47%;--petal-rotate:2deg;animation-delay:1.5s;')
      ].join('');
    case 'heartbeat':
    case 'heart-home':
    case 'warmth':
    case 'finale':
      return [
        motifPiece('motif-piece--heart', ''),
        motifPiece('motif-piece--ring is-large', 'animation-delay:0.4s;'),
        motifPiece('motif-piece--spark', 'top:24%;left:25%;animation-delay:0.3s;'),
        motifPiece('motif-piece--spark', 'top:28%;right:23%;animation-delay:0.8s;'),
        motifPiece('motif-piece--spark', 'bottom:24%;left:23%;animation-delay:1.2s;'),
        motifPiece('motif-piece--spark', 'bottom:20%;right:22%;animation-delay:0.6s;')
      ].join('');
    case 'perfume':
      return [
        motifPiece('motif-piece--trail', 'top:18%;left:18%;animation-delay:0.4s;'),
        motifPiece('motif-piece--trail', 'bottom:16%;right:18%;animation-delay:1.1s;'),
        motifPiece('motif-piece--petal', 'top:30%;right:25%;--petal-rotate:20deg;animation-delay:0.6s;'),
        motifPiece('motif-piece--petal', 'bottom:24%;left:24%;--petal-rotate:-25deg;animation-delay:1.2s;')
      ].join('');
    case 'ripple':
    case 'orbit':
    case 'trace':
      return [
        motifPiece('motif-piece--trail', 'top:50%;left:50%;transform:translate(-50%,-50%);'),
        motifPiece('motif-piece--trail', 'top:50%;left:50%;transform:translate(-50%,-50%) scale(1.35);animation-delay:0.6s;'),
        motifPiece('motif-piece--dot', 'top:18%;left:49%;animation-delay:0.3s;'),
        motifPiece('motif-piece--dot', 'bottom:18%;left:49%;animation-delay:1.1s;')
      ].join('');
    case 'thread':
      return [
        motifPiece('motif-piece--line', 'top:28%;left:16%;width:68%;--line-rotate:6deg;'),
        motifPiece('motif-piece--line', 'top:50%;left:12%;width:76%;--line-rotate:-4deg;animation-delay:0.6s;'),
        motifPiece('motif-piece--line', 'bottom:26%;left:18%;width:64%;--line-rotate:9deg;animation-delay:1.2s;'),
        motifPiece('motif-piece--dot', 'top:23%;left:14%;animation-delay:0.4s;'),
        motifPiece('motif-piece--dot', 'bottom:20%;right:14%;animation-delay:0.9s;')
      ].join('');
    case 'pages':
      return [
        motifPiece('motif-piece--page', 'top:25%;left:26%;--page-rotate:-14deg;animation-delay:0.2s;'),
        motifPiece('motif-piece--page', 'top:20%;right:24%;--page-rotate:10deg;animation-delay:0.8s;'),
        motifPiece('motif-piece--line', 'bottom:24%;left:20%;width:60%;--line-rotate:0deg;animation-delay:1s;')
      ].join('');
    case 'ember':
    case 'velvet':
      return [
        motifPiece('motif-piece--spark', 'top:22%;left:24%;animation-delay:0.2s;'),
        motifPiece('motif-piece--spark', 'top:28%;right:22%;animation-delay:0.8s;'),
        motifPiece('motif-piece--spark', 'bottom:24%;left:28%;animation-delay:1.1s;'),
        motifPiece('motif-piece--spark', 'bottom:20%;right:26%;animation-delay:0.5s;'),
        motifPiece('motif-piece--ring', '')
      ].join('');
    case 'flare':
      return [
        motifPiece('motif-piece--star', 'top:18%;left:49%;font-size:1.45rem;', '✦'),
        motifPiece('motif-piece--star', 'top:40%;left:18%;animation-delay:0.5s;', '✧'),
        motifPiece('motif-piece--star', 'top:42%;right:18%;animation-delay:0.9s;', '✦'),
        motifPiece('motif-piece--dot', 'bottom:18%;left:30%;animation-delay:0.4s;'),
        motifPiece('motif-piece--dot', 'bottom:16%;right:28%;animation-delay:1.1s;')
      ].join('');
    default:
      return [
        motifPiece('motif-piece--ring', ''),
        motifPiece('motif-piece--dot', 'top:22%;left:28%;'),
        motifPiece('motif-piece--dot', 'top:28%;right:28%;')
      ].join('');
  }
}

function updateMusicButton() {
  var button = byId('music-toggle');
  var label = byId('music-toggle-label');
  if (!button || !label) return;

  var visible = state.currentScene === 'scene-opening' || state.currentScene === 'scene-finale';
  button.classList.toggle('is-visible', visible);
  button.classList.toggle('is-active', !!audioState.enabled);
  button.setAttribute('aria-pressed', audioState.enabled ? 'true' : 'false');
  label.textContent = audioState.enabled ? SITE_CONFIG.buttonLabels.musicOff : SITE_CONFIG.buttonLabels.musicOn;
}

function fadeAudioTo(targetVolume) {
  if (!audioState.sceneGain || !audioState.context) return;
  var now = audioState.context.currentTime;
  audioState.sceneGain.gain.cancelScheduledValues(now);
  audioState.sceneGain.gain.setTargetAtTime(targetVolume, now, 0.14);
}

function playBell(frequency, timeOffset, duration, volume) {
  if (!audioState.context || !audioState.sceneGain) return;

  var ctx = audioState.context;
  var startTime = ctx.currentTime + (timeOffset || 0);
  var gain = ctx.createGain();
  var osc = ctx.createOscillator();
  var filter = ctx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.value = frequency;
  filter.type = 'lowpass';
  filter.frequency.value = 880;
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume || 0.012, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration || 2.1));

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioState.sceneGain);
  osc.start(startTime);
  osc.stop(startTime + (duration || 2.8) + 0.15);
}

function triggerAmbientPhrase() {
  if (!audioState.started || !audioState.enabled) return;

  var phrase = [
    { frequency: 392, time: 0, duration: 0.48, volume: 0.011 },
    { frequency: 392, time: 0.4, duration: 0.38, volume: 0.0105 },
    { frequency: 440, time: 0.82, duration: 0.54, volume: 0.0115 },
    { frequency: 392, time: 1.3, duration: 0.56, volume: 0.011 },
    { frequency: 523.25, time: 1.86, duration: 0.72, volume: 0.012 },
    { frequency: 493.88, time: 2.52, duration: 0.82, volume: 0.012 }
  ];

  phrase.forEach(function (note) {
    playBell(note.frequency, note.time, note.duration, note.volume);
  });
}

function startAmbientLoop() {
  if (audioState.bellTimer) return;
  audioState.bellTimer = window.setInterval(triggerAmbientPhrase, 6400);
}

function ensureAudioStarted() {
  if (audioState.started) {
    if (audioState.context && audioState.context.state === 'suspended') {
      audioState.context.resume();
    }
    return;
  }

  var AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return;

  var ctx = new AudioContextCtor();
  var masterGain = ctx.createGain();
  var sceneGain = ctx.createGain();
  var filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1050;
  masterGain.gain.value = 0.95;
  sceneGain.gain.value = 0.0001;

  sceneGain.connect(filter);
  filter.connect(masterGain);
  masterGain.connect(ctx.destination);

  [196, 246.94, 293.66].forEach(function (frequency, index) {
    var oscillator = ctx.createOscillator();
    var gain = ctx.createGain();
    var lfo = ctx.createOscillator();
    var lfoGain = ctx.createGain();

    oscillator.type = index === 0 ? 'triangle' : 'sine';
    oscillator.frequency.value = frequency;
    oscillator.detune.value = (index - 1) * 4;

    gain.gain.value = index === 0 ? 0.018 : 0.013;

    lfo.type = 'sine';
    lfo.frequency.value = 0.05 + index * 0.014;
    lfoGain.gain.value = 0.003 + index * 0.001;

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    oscillator.connect(gain);
    gain.connect(sceneGain);

    oscillator.start();
    lfo.start();

    audioState.padOscillators.push({ oscillator: oscillator, gain: gain, lfo: lfo, lfoGain: lfoGain });
  });

  audioState.context = ctx;
  audioState.masterGain = masterGain;
  audioState.sceneGain = sceneGain;
  audioState.started = true;
  audioState.enabled = true;

  startAmbientLoop();
}

function removeAudioUnlockListeners() {
  if (!audioState.unlockListenersAttached) return;
  document.removeEventListener('pointerdown', attemptAudioAutoplay);
  document.removeEventListener('touchstart', attemptAudioAutoplay);
  document.removeEventListener('keydown', attemptAudioAutoplay);
  audioState.unlockListenersAttached = false;
}

function attachAudioUnlockListeners() {
  if (audioState.unlockListenersAttached) return;
  document.addEventListener('pointerdown', attemptAudioAutoplay);
  document.addEventListener('touchstart', attemptAudioAutoplay);
  document.addEventListener('keydown', attemptAudioAutoplay);
  audioState.unlockListenersAttached = true;
}

function attemptAudioAutoplay() {
  if (!SITE_CONFIG.audio || !audioState.enabled) return;

  ensureAudioStarted();
  if (!audioState.context) return;

  var resumeResult = typeof audioState.context.resume === 'function'
    ? audioState.context.resume()
    : null;

  if (resumeResult && typeof resumeResult.then === 'function') {
    resumeResult
      .then(function () {
        syncAudioForScene();
        if (audioState.context.state === 'running') {
          removeAudioUnlockListeners();
        } else {
          attachAudioUnlockListeners();
        }
      })
      .catch(function () {
        attachAudioUnlockListeners();
      });
    return;
  }

  syncAudioForScene();
  if (audioState.context.state === 'running') {
    removeAudioUnlockListeners();
  } else {
    attachAudioUnlockListeners();
  }
}

function syncAudioForScene() {
  updateMusicButton();
  if (!audioState.started) return;

  var target = SITE_CONFIG.audio.lettersVolume;
  if (!audioState.enabled) {
    fadeAudioTo(0.0001);
    audioState.lastCueScene = '';
    return;
  }

  if (state.currentScene === 'scene-opening') {
    target = SITE_CONFIG.audio.openingVolume;
  } else if (state.currentScene === 'scene-finale') {
    target = SITE_CONFIG.audio.finaleVolume;
  }

  fadeAudioTo(target <= 0 ? 0.0001 : target);

  if (target > 0) {
    if (audioState.lastCueScene !== state.currentScene) {
      triggerAmbientPhrase();
      audioState.lastCueScene = state.currentScene;
    }
  } else {
    audioState.lastCueScene = '';
  }
}

function toggleMusic() {
  if (!audioState.started) {
    ensureAudioStarted();
  } else {
    audioState.enabled = !audioState.enabled;
    audioState.lastCueScene = '';
    if (audioState.enabled && audioState.context && audioState.context.state === 'suspended') {
      audioState.context.resume();
    }
  }

  if (!audioState.started) return;
  if (audioState.enabled) {
    attemptAudioAutoplay();
  } else {
    removeAudioUnlockListeners();
  }
  syncAudioForScene();
}

function getOpenedCount() {
  return state.openedIds.size;
}

function getChapterOpenedCount(chapterIndex) {
  var chapter = SITE_CONFIG.chapters[chapterIndex];
  var count = 0;

  chapter.cards.forEach(function (card) {
    if (state.openedIds.has(card.id)) count += 1;
  });

  return count;
}

function isChapterComplete(chapterIndex) {
  return getChapterOpenedCount(chapterIndex) === SITE_CONFIG.chapters[chapterIndex].cards.length;
}

function isChapterUnlocked(chapterIndex) {
  if (chapterIndex === 0) return true;

  for (var index = 0; index < chapterIndex; index += 1) {
    if (!isChapterComplete(index)) return false;
  }

  return true;
}

function isAllOpened() {
  return getOpenedCount() === allCards.length;
}

function getCardOpenCount(cardId) {
  var count = 0;

  for (var index = 0; index < allCards.length; index += 1) {
    count += 1;
    if (allCards[index].id === cardId) return count;
  }

  return 0;
}

function getStatusText(chapterIndex) {
  if (isChapterComplete(chapterIndex)) {
    return SITE_CONFIG.labels.chapterCompleted;
  }

  if (!isChapterUnlocked(chapterIndex)) {
    return SITE_CONFIG.labels.lockedBadge;
  }

  return getChapterOpenedCount(chapterIndex) + '/5';
}

function renderChapterPills() {
  var container = byId('chapter-pills');
  if (!container) return;

  var firstUnlocked = 0;
  for (var index = 0; index < SITE_CONFIG.chapters.length; index += 1) {
    if (!isChapterComplete(index)) {
      firstUnlocked = index;
      break;
    }
    firstUnlocked = index;
  }

  container.innerHTML = SITE_CONFIG.chapters.map(function (chapter, chapterIndex) {
    var classes = ['chapter-pill'];
    if (isChapterComplete(chapterIndex)) classes.push('is-complete');
    if (chapterIndex === firstUnlocked && !isAllOpened()) classes.push('is-active');

    return [
      '<div class="' + classes.join(' ') + '">',
      '<span class="chapter-pill__index">' + chapter.number + '</span>',
      '<span>' + chapter.title + '</span>',
      '</div>'
    ].join('');
  }).join('');
}

function renderFinaleSummary() {
  var container = byId('finale-summary-list');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.chapters.map(function (chapter) {
    return [
      '<section class="finale-summary__chapter">',
      '<h4 class="finale-summary__chapter-title">',
      '<span class="finale-summary__chapter-index">' + SITE_CONFIG.labels.chapterPrefix + ' ' + chapter.number + '</span>',
      '<span>' + chapter.title + '</span>',
      '</h4>',
      '<div class="finale-summary__messages">',
      chapter.cards.map(function (card) {
        return [
          '<div class="finale-summary__item">',
          '<span class="finale-summary__number">' + card.number + '</span>',
          '<span>' + card.message + '</span>',
          '</div>'
        ].join('');
      }).join(''),
      '</div>',
      '</section>'
    ].join('');
  }).join('');
}

function cardMarkup(card, chapter) {
  var layout = chapter.layout[card.cardIndex];
  var isOpened = state.openedIds.has(card.id);

  return [
    '<button',
    ' class="memory-card' + (isOpened ? ' is-opened' : '') + '"',
    ' type="button"',
    ' data-card-id="' + card.id + '"',
    ' data-chapter-index="' + card.chapterIndex + '"',
    ' style="--x:' + layout.x + '; --y:' + layout.y + '; --rotate:' + layout.rotate + '; --depth:' + layout.depth + ';"',
    ' aria-label="Abrir carta ' + card.number + ', ' + chapter.title + '"',
    '>',
    '<span class="memory-card__paper">',
    '<span class="memory-card__header">',
    '<span class="memory-card__chapter">' + chapter.title + '</span>',
    '<span class="memory-card__seal">' + (isOpened ? '♥' : '✦') + '</span>',
    '</span>',
    '<span class="memory-card__body">',
    '<span class="memory-card__number">' + card.number + '</span>',
    '<span class="memory-card__prompt">toca para abrir</span>',
    '</span>',
    '<span class="memory-card__footer">',
    '<span class="memory-card__status">' + SITE_CONFIG.labels.openedBadge + '</span>',
    '</span>',
    '</span>',
    '</button>'
  ].join('');
}

function renderChapters() {
  var container = byId('chapters-container');
  if (!container) return;

  container.innerHTML = SITE_CONFIG.chapters.map(function (chapter, chapterIndex) {
    var sectionClasses = ['chapter-panel'];
    if (!isChapterUnlocked(chapterIndex)) sectionClasses.push('is-locked');
    if (isChapterComplete(chapterIndex)) sectionClasses.push('is-complete');

    return [
      '<section class="' + sectionClasses.join(' ') + '" data-section="' + chapter.id + '">',
      '<div class="chapter-panel__header">',
      '<p class="chapter-panel__eyebrow">' + SITE_CONFIG.labels.chapterPrefix + ' ' + chapter.number + '</p>',
      '<div class="chapter-panel__row">',
      '<h3 class="chapter-panel__title">' + chapter.title + '</h3>',
      '<span class="chapter-panel__status">' + getStatusText(chapterIndex) + '</span>',
      '</div>',
      '<p class="chapter-panel__note">' + chapter.note + '</p>',
      '</div>',
      '<div class="chapter-cluster">',
      chapter.cards.map(function (card) {
        return cardMarkup(cardsById[card.id], chapter);
      }).join(''),
      '<div class="chapter-cluster__veil"><span>' + SITE_CONFIG.labels.lockedBadge + '</span></div>',
      '</div>',
      '</section>'
    ].join('');
  }).join('');
}

function updateProgress() {
  var opened = getOpenedCount();
  var total = allCards.length;
  var percentage = total ? (opened / total) * 100 : 0;
  setText('progress-count', opened + '/' + total);
  setText('progress-label', SITE_CONFIG.labels.progressPrefix);

  var fill = byId('progress-fill');
  if (fill) {
    fill.style.width = percentage + '%';
  }

  var finalEntry = byId('final-entry');
  setHidden(finalEntry, !isAllOpened());

  renderChapterPills();
  renderChapters();
}

function showToast(message) {
  if (!message) return;
  var toast = byId('chapter-toast');
  if (!toast) return;

  window.clearTimeout(state.toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(function () {
    toast.classList.add('is-visible');
  });

  state.toastTimer = window.setTimeout(function () {
    toast.classList.remove('is-visible');
    window.setTimeout(function () {
      toast.hidden = true;
    }, 320);
  }, 2600);
}

function openModal() {
  var modal = byId('letter-modal');
  if (!modal) return;

  setHidden(modal, false);
  document.body.classList.add('modal-open');
  requestAnimationFrame(function () {
    modal.classList.add('is-open');
  });
}

function closeModal() {
  var modal = byId('letter-modal');
  if (!modal) return;

  var shouldRevealFinale = state.pendingFinale;
  if (shouldRevealFinale) {
    ensureAudioStarted();
  }
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');

  window.setTimeout(function () {
    setHidden(modal, true);
    if (shouldRevealFinale) {
      state.pendingFinale = false;
      showScene('scene-finale');
    }
  }, REDUCED_MOTION ? 1 : 420);
}

function populateLetter(card) {
  var iconKey = CARD_ICON_KEYS[card.id] || 'beauty-bloom';
  setText(
    'letter-kicker',
    SITE_CONFIG.labels.chapterPrefix + ' ' + card.chapterNumber + ' · Carta ' + card.number
  );
  setText('letter-chapter-title', card.chapterTitle);
  setText('letter-message', card.message);
  setText('letter-progress', getOpenedCount() + ' de ' + allCards.length);
  setText('letter-symbol', EFFECT_SYMBOLS[card.effect] || '✦');

  var visual = byId('letter-visual');
  if (visual) {
    visual.setAttribute('data-effect', card.effect);
  }
  setHTML('letter-motif', getMotifMarkup(card.effect));
  setHTML('letter-icon', getCardEmojiMarkup(card.id));

  var icon = byId('letter-icon');
  if (icon) {
    icon.setAttribute('data-icon', iconKey);
  }

  var confirmButton = byId('letter-confirm');
  if (confirmButton) {
    confirmButton.textContent = state.pendingFinale
      ? SITE_CONFIG.buttonLabels.viewFinale
      : SITE_CONFIG.buttonLabels.closeLetter;
  }

  var finaleButton = byId('letter-finale-link');
  setHidden(finaleButton, !(isAllOpened() && card.id === getLastCardId() && !state.pendingFinale));
}

function openCard(cardId) {
  var card = cardsById[cardId];
  if (!card) return;

  var isNewOpen = !state.openedIds.has(cardId);
  if (isNewOpen) {
    state.openedIds.add(cardId);
    saveProgress();
  }

  state.activeCardId = cardId;
  state.pendingFinale = isNewOpen && isAllOpened();

  populateLetter(card);
  updateProgress();
  openModal();

  if (isNewOpen && isChapterComplete(card.chapterIndex)) {
    showToast(SITE_CONFIG.chapters[card.chapterIndex].unlockCopy);
  }

}

function showScene(sceneId) {
  Array.prototype.forEach.call(document.querySelectorAll('.scene'), function (scene) {
    scene.classList.remove('is-active');
  });

  var nextScene = byId(sceneId);
  if (nextScene) {
    nextScene.classList.add('is-active');
    state.currentScene = sceneId;
    syncAudioForScene();
    window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
  }
}

function restartExperience() {
  state.openedIds = new Set();
  state.activeCardId = '';
  state.pendingFinale = false;
  window.localStorage.removeItem(STORAGE_KEY);
  updateProgress();
  showScene('scene-opening');
}

function bindEvents() {
  var chaptersContainer = byId('chapters-container');
  if (chaptersContainer) {
    chaptersContainer.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-card-id]');
      if (!trigger) return;

      var chapterIndex = parseInt(trigger.getAttribute('data-chapter-index'), 10);
      if (!isChapterUnlocked(chapterIndex)) return;

      openCard(trigger.getAttribute('data-card-id'));
    });
  }

  byId('open-experience').addEventListener('click', function () {
    attemptAudioAutoplay();
    showScene('scene-letters');
  });

  byId('open-finale').addEventListener('click', function () {
    attemptAudioAutoplay();
    showScene('scene-finale');
  });

  byId('back-to-letters').addEventListener('click', function () {
    showScene('scene-letters');
  });

  byId('restart-experience').addEventListener('click', restartExperience);
  byId('music-toggle').addEventListener('click', toggleMusic);
  byId('close-letter').addEventListener('click', closeModal);
  byId('letter-backdrop').addEventListener('click', closeModal);
  byId('letter-confirm').addEventListener('click', closeModal);
  byId('letter-finale-link').addEventListener('click', function () {
    state.pendingFinale = true;
    closeModal();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !byId('letter-modal').hidden) {
      closeModal();
    }
  });
}

function hideLoader() {
  var loader = byId('loader');
  if (!loader) return;
  loader.classList.add('is-hidden');
}

function init() {
  flattenCards();
  loadProgress();
  applyConfig();
  createPetals();
  renderFinaleSummary();
  renderChapters();
  renderChapterPills();
  updateProgress();
  bindEvents();
  updateMusicButton();
  attemptAudioAutoplay();

  window.setTimeout(hideLoader, SITE_CONFIG.animationTuning.loaderDelay);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
