const STORAGE_KEY = 'impostorGameStateV2';
const MAX_PLAYERS = 10;
const MIN_PLAYERS = 3;
const POOLS_CACHE_KEY = 'impostorWordPoolsV1';
const POOLS_MANIFEST_URL = 'word-pools/manifest.json';
const THEME_STORAGE_KEY = 'impostorGameTheme';
const LANGUAGE_STORAGE_KEY = 'impostorGameLanguage';
const SCREEN_LOCK_STORAGE_KEY = 'impostorGameScreenLock';

// ---------- Internationalization system ----------
const TRANSLATIONS = {
  es: {
    gameTitle: 'Juego del Impostor',
    gameSubtitle: '¿Podrás descubrir quién es el impostor?',
    play: 'Jugar',
    rules: 'Reglas',
    createdBy: 'Creado por Darío Sevilla',
    rulesTitle: 'Reglas del Juego',
    objective: 'Objetivo',
    objectiveText: 'Los <strong>civiles</strong> deben identificar a los <strong>impostores</strong> antes de que termine el tiempo.',
    preparation: 'Preparación',
    preparationSteps: ['Cada jugador recibe una palabra secreta', 'Los civiles reciben la misma palabra', 'Los impostores reciben una palabra diferente pero relacionada'],
    gameplay: 'Partida',
    gameplaySteps: ['Por turnos, cada jugador da un sinónimo o descripción de su palabra', 'Intenta ser específico pero no revelar tu palabra exacta', 'Los impostores deben intentar pasar desapercibidos'],
    voting: 'Votación',
    votingSteps: ['Tras el tiempo de juego y deliberación, vota en secreto', 'Los más votados son eliminados', 'Si todos los impostores son eliminados, ganan los civiles', 'Si queda algún impostor, ellos ganan'],
    back: 'Volver',
    configuration: 'Configuración',
    players: 'Jugadores',
    impostors: 'Impostores',
    gameTime: 'Tiempo de partida (seg)',
    deliberationTime: 'Deliberación (seg)',
    pools: 'Pools (toca para seleccionar)',
    next: 'Siguiente',
    playerNames: 'Nombres de jugadores',
    startGame: 'Comenzar partida',
    player: 'Jugador',
    readyToReveal: 'Listo para revelar',
    eachPlayerSecret: 'Cada jugador debe ver su rol en secreto. Desliza la cortina hacia arriba para revelar.',
    startReveal: 'Empezar revelación',
    revelation: 'Revelación',
    turnOf: 'Turno de',
    othersLookAway: 'Los demás, no miréis. Mantén levantada la cortina para ver tu rol.',
    liftCurtain: 'LEVANTA LA CORTINA',
    nextPlayer: 'Siguiente jugador',
    startMatch: '¡Iniciar partida!',
    gameInProgress: 'Partida en curso',
    giveSynonyms: 'A decir sinónimos!',
    skipToDeliberation: 'Saltar a deliberación',
    deliberation: 'Deliberación',
    lastArguments: 'Últimos argumentos antes de votar.',
    goToVoting: 'Ir a votación',
    secretVoting: 'Votación secreta',
    passMobileTo: 'Pasa el móvil a',
    chooseSuspects: 'Elige',
    suspect: 'sospechoso(s)',
    confirmVote: 'Confirmar voto',
    votes: 'Votos',
    results: 'Resultados',
    civiliansWin: '¡GANAN LOS CIVILES!',
    impostorsWin: '¡GANAN LOS IMPOSTORES!',
    executed: 'Ejecutados',
    nobody: 'Nadie',
    noVotes: 'Sin votos',
    revealedRoles: 'Roles revelados',
    newMatch: 'Nueva partida',
    civil: 'CIVIL',
    impostor: 'IMPOSTOR',
    civilians: 'civiles',
    poolsLabel: 'Pools',
    starts: 'Empieza',
    order: 'Orden',
    clockwise: 'Horario',
    counterclockwise: 'Antihorario',
    impostorsMustBeLess: 'Impostores debe ser menor que jugadores',
    animalsNature: 'Animales y Naturaleza',
    everydayObjects: 'Objetos Cotidianos',
    exitGame: 'Salir de la partida',
    poolsSelection: 'Selección de Pools',
    poolsSelectionText: 'Toca para seleccionar las categorías de palabras que quieres usar en la partida.'
  },
  en: {
    gameTitle: 'The Impostor Game',
    gameSubtitle: 'Can you figure out who the impostor is?',
    play: 'Play',
    rules: 'Rules',
    createdBy: 'Created by Darío Sevilla',
    rulesTitle: 'Game Rules',
    objective: 'Objective',
    objectiveText: '<strong>Civilians</strong> must identify the <strong>impostors</strong> before time runs out.',
    preparation: 'Setup',
    preparationSteps: ['Each player receives a secret word', 'Civilians receive the same word', 'Impostors receive a different but related word'],
    gameplay: 'Gameplay',
    gameplaySteps: ['Taking turns, each player gives a synonym or description of their word', 'Try to be specific but don\'t reveal your exact word', 'Impostors must try to blend in'],
    voting: 'Voting',
    votingSteps: ['After game time and deliberation, vote in secret', 'The most voted players are eliminated', 'If all impostors are eliminated, civilians win', 'If any impostor remains, they win'],
    back: 'Back',
    configuration: 'Setup',
    players: 'Players',
    impostors: 'Impostors',
    gameTime: 'Game time (sec)',
    deliberationTime: 'Deliberation (sec)',
    pools: 'Pools (tap to select)',
    next: 'Next',
    playerNames: 'Player names',
    startGame: 'Start game',
    player: 'Player',
    readyToReveal: 'Ready to reveal',
    eachPlayerSecret: 'Each player must see their role in secret. Swipe the curtain up to reveal.',
    startReveal: 'Start reveal',
    revelation: 'Revelation',
    turnOf: 'Turn of',
    othersLookAway: 'Others, look away. Keep the curtain lifted to see your role.',
    liftCurtain: 'LIFT THE CURTAIN',
    nextPlayer: 'Next player',
    startMatch: 'Start match!',
    gameInProgress: 'Game in progress',
    giveSynonyms: 'Give synonyms!',
    skipToDeliberation: 'Skip to deliberation',
    deliberation: 'Deliberation',
    lastArguments: 'Last arguments before voting.',
    goToVoting: 'Go to voting',
    secretVoting: 'Secret voting',
    passMobileTo: 'Pass the phone to',
    chooseSuspects: 'Choose',
    suspect: 'suspect(s)',
    confirmVote: 'Confirm vote',
    votes: 'Votes',
    results: 'Results',
    civiliansWin: 'CIVILIANS WIN!',
    impostorsWin: 'IMPOSTORS WIN!',
    executed: 'Executed',
    nobody: 'Nobody',
    noVotes: 'No votes',
    revealedRoles: 'Revealed roles',
    newMatch: 'New match',
    civil: 'CIVILIAN',
    impostor: 'IMPOSTOR',
    civilians: 'civilians',
    poolsLabel: 'Pools',
    starts: 'Starts',
    order: 'Order',
    clockwise: 'Clockwise',
    counterclockwise: 'Counterclockwise',
    impostorsMustBeLess: 'Impostors must be less than players',
    animalsNature: 'Animals and Nature',
    everydayObjects: 'Everyday Objects',
    exitGame: 'Exit Game',
    poolsSelection: 'Pool Selection',
    poolsSelectionText: 'Tap to select the word categories you want to use in the game.'
  }
};

let currentLanguage = 'es';

function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith('es') ? 'es' : 'en';
}

function loadLanguage() {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved || getBrowserLanguage();
}

function saveLanguage(lang) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

function t(key) {
  return TRANSLATIONS[currentLanguage][key] || key;
}

function setLanguage(lang) {
  currentLanguage = lang;
  saveLanguage(lang);
  document.documentElement.setAttribute('lang', lang);
  updateUI();
}

function toggleLanguage() {
  const newLang = currentLanguage === 'es' ? 'en' : 'es';
  setLanguage(newLang);
}

async function updateUI() {
  // Update language button
  const langText = document.querySelector('.language-text');
  if (langText) {
    langText.textContent = currentLanguage.toUpperCase();
  }

  // Update all static text elements
  updateStaticTexts();

  // Reload pools for the new language (wait for it to complete)
  await loadPoolsList();

  // Re-render dynamic content if in specific phases
  if (state.phase === 'names') {
    buildNameInputs();
  } else if (state.phase === 'pre-reveal') {
    renderSummary();
  } else if (state.phase === 'voting') {
    renderVoting();
  } else if (state.phase === 'results') {
    showResults();
  }
}

function updateStaticTexts() {
  // Welcome screen
  const welcomeTitle = document.querySelector('.welcome-title');
  if (welcomeTitle) welcomeTitle.textContent = t('gameTitle');

  const welcomeSubtitle = document.querySelector('.welcome-subtitle');
  if (welcomeSubtitle) welcomeSubtitle.textContent = t('gameSubtitle');

  const playBtn = document.querySelector('.btn-primary');
  if (playBtn) playBtn.textContent = t('play');

  const rulesBtn = document.querySelector('.btn-secondary');
  if (rulesBtn) rulesBtn.textContent = t('rules');

  const credits = document.querySelector('.welcome-credits');
  if (credits) credits.textContent = t('createdBy');

  // Rules screen
  const rulesTitle = document.querySelector('#rules-screen h1');
  if (rulesTitle) rulesTitle.textContent = t('rulesTitle');

  const ruleSections = document.querySelectorAll('.rule-section');
  if (ruleSections.length >= 4) {
    ruleSections[0].querySelector('h3').textContent = t('objective');
    ruleSections[0].querySelector('p').innerHTML = t('objectiveText');

    ruleSections[1].querySelector('h3').textContent = t('preparation');
    const prepSteps = t('preparationSteps');
    ruleSections[1].querySelectorAll('p').forEach((p, i) => {
      if (prepSteps[i]) p.textContent = `${i + 1}. ${prepSteps[i]}`;
    });

    ruleSections[2].querySelector('h3').textContent = t('gameplay');
    const gameSteps = t('gameplaySteps');
    ruleSections[2].querySelectorAll('p').forEach((p, i) => {
      if (gameSteps[i]) p.textContent = `${i + 1}. ${gameSteps[i]}`;
    });

    ruleSections[3].querySelector('h3').textContent = t('voting');
    const voteSteps = t('votingSteps');
    ruleSections[3].querySelectorAll('p').forEach((p, i) => {
      if (voteSteps[i]) p.textContent = `${i + 1}. ${voteSteps[i]}`;
    });
  }

  // Setup screen
  const setupTitle = document.querySelector('#setup-screen h1');
  if (setupTitle) setupTitle.textContent = t('configuration');

  const labels = {
    'num-players': t('players'),
    'num-impostors': t('impostors'),
    'game-time': t('gameTime'),
    'deliberation-time': t('deliberationTime')
  };

  Object.entries(labels).forEach(([id, text]) => {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) label.textContent = text + ':';
  });

  // Pools screen
  const poolsTitle = document.querySelector('#pools-screen h1');
  if (poolsTitle) poolsTitle.textContent = t('poolsSelection');

  const poolsText = document.querySelector('#pools-screen .info-text');
  if (poolsText) poolsText.textContent = t('poolsSelectionText');

  // Names screen
  const namesTitle = document.querySelector('#names-screen h1');
  if (namesTitle) namesTitle.textContent = t('playerNames');

  // Pre-reveal screen
  const preRevealTitle = document.querySelector('#pre-reveal-screen h1');
  if (preRevealTitle) preRevealTitle.textContent = t('readyToReveal');

  const preRevealText = document.querySelector('#pre-reveal-screen .info-text:not(#config-summary)');
  if (preRevealText) preRevealText.textContent = t('eachPlayerSecret');

  // Reveal screen
  const revealTitle = document.querySelector('#reveal-screen h1');
  if (revealTitle) revealTitle.textContent = t('revelation');

  // Game screen
  const gameTitle = document.querySelector('#game-screen h1');
  if (gameTitle) gameTitle.textContent = t('gameInProgress');

  const gameText = document.querySelector('#game-screen .info-text');
  if (gameText) gameText.textContent = t('giveSynonyms');

  // Deliberation screen
  const delibTitle = document.querySelector('#deliberation-screen h1');
  if (delibTitle) delibTitle.textContent = t('deliberation');

  const delibText = document.querySelector('#deliberation-screen .info-text');
  if (delibText) delibText.textContent = t('lastArguments');

  // Voting screen
  const votingTitle = document.querySelector('#voting-screen h1');
  if (votingTitle) votingTitle.textContent = t('secretVoting');

  // Results screen
  const resultsTitle = document.querySelector('#results-screen h1');
  if (resultsTitle) resultsTitle.textContent = t('results');

  // Buttons
  const backButtons = document.querySelectorAll('button.ghost');
  backButtons.forEach(btn => {
    if (btn.textContent.includes('Volver') || btn.textContent.includes('Back')) {
      btn.textContent = `← ${t('back')}`;
    }
  });

  // Update all other buttons based on their onclick or content
  document.querySelectorAll('button').forEach(btn => {
    if (btn.getAttribute('onclick') === 'goToPools()') btn.textContent = t('next');
    else if (btn.getAttribute('onclick') === 'goToNames()') btn.textContent = t('next');
    else if (btn.getAttribute('onclick') === 'startGame()') btn.textContent = t('startGame');
    else if (btn.getAttribute('onclick') === "showScreen('reveal-screen'); loadCurrentReveal();") btn.textContent = t('startReveal');
    else if (btn.id === 'next-player-btn') btn.textContent = t('nextPlayer') + ' →';
    else if (btn.id === 'start-game-btn') btn.textContent = t('startMatch');
    else if (btn.getAttribute('onclick') === 'skipToDeliberation()') btn.textContent = t('skipToDeliberation') + ' →';
    else if (btn.getAttribute('onclick') === 'skipToVoting()') btn.textContent = t('goToVoting') + ' →';
    else if (btn.id === 'confirm-vote-btn') btn.textContent = t('confirmVote');
    else if (btn.getAttribute('onclick') === 'newMatch()') btn.textContent = t('newMatch');
  });

  // Exit game button
  const exitText = document.querySelector('.exit-text');
  if (exitText) exitText.textContent = t('exitGame');
}

// Embedded pools with impostor words [civilian_word, impostor_word]
const EMBEDDED_POOLS = [
  // Spanish pools
  { id: 'animales_naturaleza', name: 'Animales y Naturaleza', emoji: '🌿', lang: 'es', words: [['Oso','Pez'],['Pavo real','Abanico'],['Camello','Arena'],['Lirio','Rana'],['Lobo','Luna'],['Represa','Castor'],['Elefante','Safari'],['Flamenco','Camarón'],['Búho','Nieve'],['Canguro','Koala'],['Jungla','Serpiente'],['Muerte','Cuervo'],['Delfín','Orca'],['Zorro','Gallina'],['Tortuga','Galápagos'],['León','Sabana'],['Polo Sur','Pingüino'],['Hormiga','Trabajo'],['Abeja','Verano'],['Ballena','Dory'],['Mandíbula','Tiburón'],['Río de Janeiro','Loro'],['Caballo','Libertad'],['Gorila','Plata'],['Murciélago','Fruta'],['Venado','Tambor'],['Misisipi','Águila'],['Cisne','Lago'],['Grillo','Campo'],['Leopardo','Manchas'],['Mascarilla','Mapache'],['Chita','Velocidad'],['Araña','Nueva York'],['Playa','Medusa'],['Glaciar','Oso polar'],['Jirafa','Madagascar'],['Maine','Langosta'],['Pulpo','Pluma'],['Cuervo','Pantera'],['Foca','Rosa'],['Mariposa','Algodoncillo'],['Burro','Santorini'],['Lluvia','Caracol'],['Cangrejo','Araña'],['Rana','Grillo'],['Siberia','Tigre'],['Gaviota','Playa'],['Cocodrilo','Nilo'],['Pingüino','Nueva Zelanda'],['Loro','Gato'],['Cuervo','Bandada'],['Conejo','Agujero'],['Tiburón','Paleozoico'],['Trueno','Júpiter'],['Sol','Playa'],['Océano Atlántico','Huracán'],['Tsunami','Derrumbe'],['Ola','Hawái'],['Papel','Árbol'],['Universo','Energía'],['Vida','Tiempo'],['Océano','Tormenta'],['Lago','Sal'],['Oxígeno','Fuego'],['Biología','Célula'],['Tiza','Hielo'],['Clima','Invierno'],['Planeta','Gas'],['Era de hielo','Bellota'],['Avalancha','Montaña'],['Bisonte','Llanuras'],['Floración','Néctar'],['Cañón','Águila'],['Ardilla listada','Nueces'],['Coral','Arrecife'],['Desierto','Espejismo'],['Ecosistema','Equilibrio'],['Halcón','Picado'],['Luciérnaga','Brillo'],['Gecko','Hoja'],['Colibrí','Azúcar'],['Koala','Eucalipto'],['Meteoro','Cráter'],['Nutria','Río'],['Selva tropical','Dosel'],['Rinoceronte','Cuerno'],['Volcán','Ceniza'],['Naturaleza salvaje','Huellas']] },
  { id: 'objetos_cotidianos', name: 'Objetos Cotidianos', emoji: '🏠', lang: 'es', words: [['Martillo','Tiburón'],['Silla','Espalda'],['Mesa','Café'],['Cuchara','Crema'],['Tenedor','Posidón'],['Cuchillo','Mantequilla'],['Plata','Plato'],['Copa','Campeonato'],['Vidrio','Arena'],['Botella','Aerosol'],['Lata','Boda'],['Teléfono','Radio'],['Laptop','Tarjeta'],['Teclado','Piano'],['Ratón','Laboratorio'],['Marco','Pantalla'],['Control','Satélite'],['Lámpara','Aceite'],['Horno','Bombilla'],['Vela','Corona de flores'],['Carro','Espejo'],['Ventana','Caja'],['Puerta','Armario'],['Llave','Auto'],['Candado','Sello'],['Monedero','Piel'],['Cartera','Etiqueta'],['Mochila','Avión'],['Maleta','Toalla'],['Sombrero','Paja'],['Zapatos','Vela'],['Calcetas','Medida'],['Playera','Algodón'],['Cierre','Pantalón'],['Abrigo','Pelo'],['Paraguas','Ala'],['Vacaciones','Gafas de sol'],['Reloj de pulsera','Monitor'],['Rueda','Anillo'],['Collar','Tiara'],['Manga','Tatuaje'],['Cama','Monstruo'],['Funda','Media'],['Manta','Cuna'],['Colchón','Aire'],['Libro','Pop-up'],['Revista','Diario'],['Periódico','Columna'],['Pluma','Bola'],['Lápiz','Delineador'],['Borrador','Goma'],['Dibujo','Cuaderno'],['Tijeras','Cabello'],['Regla','Parrilla'],['Pegamento','Tubo'],['Cinta adhesiva','Clip'],['Pincel','Escoba'],['Cesto','Arco'],['Caja','Zapato'],['Sobre','Carta'],['Sello','Fecha'],['Calendario','Luna'],['Reloj','Campana'],['Radio','Onda'],['Bocina','Pared'],['DJ','Audífonos'],['Micrófono','Televisión'],['Televisión','Imagen'],['Cámara','Láser'],['Trípode','Pierna'],['Ventilador','Oxígeno'],['Calefactor','Secadora'],['Estufa','Carbón'],['Refrigerador','Leche'],['Congelador','Helado'],['Microondas','Radar'],['Tostadora','Horno'],['Licuadora','Espátula'],['Olla','Sopa'],['Acero','Sartén'],['Tetera','Cobre'],['Esponja','Gelatina'],['Jabón','Barra'],['Toalla','Ducha'],['Cepillo de dientes','Lengua'],['Pasta de dientes','Gel'],['Marfil','Peine'],['Cepillo','Rastrillo'],['Navaja','Jabón'],['Champú','Sábila'],['Acondicionador','Espuma'],['Loción','Seda'],['Balde','Tierra'],['Trapeador','Piso'],['Escoba','Avión'],['Recogedor','Nube'],['Basurero','Camión'],['Reciclaje','Papel'],['Escalera','Cuerda']] },

  // English pools
  { id: 'animals_nature_en', name: 'Animals and Nature', emoji: '🌿', lang: 'en', words: [['Bear','Fish'],['Peacock','Fan'],['Camel','Sand'],['Lily','Frog'],['Wolf','Moon'],['Dam','Beaver'],['Elephant','Safari'],['Flamingo','Shrimp'],['Owl','Snow'],['Kangaroo','Koala'],['Jungle','Snake'],['Death','Crow'],['Dolphin','Orca'],['Fox','Chicken'],['Turtle','Galapagos'],['Lion','Savanna'],['South Pole','Penguin'],['Ant','Work'],['Bee','Summer'],['Whale','Dory'],['Jaw','Shark'],['Rio','Parrot'],['Horse','Freedom'],['Gorilla','Silver'],['Bat','Fruit'],['Deer','Drum'],['Mississippi','Eagle'],['Swan','Lake'],['Cricket','Field'],['Leopard','Spots'],['Mask','Raccoon'],['Cheetah','Speed'],['Spider','New York'],['Beach','Jellyfish'],['Glacier','Polar bear'],['Giraffe','Madagascar'],['Maine','Lobster'],['Octopus','Feather'],['Raven','Panther'],['Seal','Rose'],['Butterfly','Milkweed'],['Donkey','Santorini'],['Rain','Snail'],['Crab','Spider'],['Frog','Cricket'],['Siberia','Tiger'],['Seagull','Beach'],['Crocodile','Nile'],['Penguin','New Zealand'],['Parrot','Cat'],['Crow','Flock'],['Rabbit','Hole'],['Shark','Paleozoic'],['Thunder','Jupiter'],['Sun','Beach'],['Atlantic','Hurricane'],['Tsunami','Landslide'],['Wave','Hawaii'],['Paper','Tree'],['Universe','Energy'],['Life','Time'],['Ocean','Storm'],['Lake','Salt'],['Oxygen','Fire'],['Biology','Cell'],['Chalk','Ice'],['Climate','Winter'],['Planet','Gas'],['Ice age','Acorn'],['Avalanche','Mountain'],['Bison','Plains'],['Bloom','Nectar'],['Canyon','Eagle'],['Chipmunk','Nuts'],['Coral','Reef'],['Desert','Mirage'],['Ecosystem','Balance'],['Falcon','Dive'],['Firefly','Glow'],['Gecko','Leaf'],['Hummingbird','Sugar'],['Koala','Eucalyptus'],['Meteor','Crater'],['Otter','River'],['Rainforest','Canopy'],['Rhino','Horn'],['Volcano','Ash'],['Wilderness','Tracks']] },
  { id: 'everyday_objects_en', name: 'Everyday Objects', emoji: '🏠', lang: 'en', words: [['Hammer','Shark'],['Chair','Back'],['Table','Coffee'],['Spoon','Cream'],['Fork','Poseidon'],['Knife','Butter'],['Silver','Plate'],['Cup','Championship'],['Glass','Sand'],['Bottle','Spray'],['Can','Wedding'],['Phone','Radio'],['Laptop','Card'],['Keyboard','Piano'],['Mouse','Lab'],['Frame','Screen'],['Remote','Satellite'],['Lamp','Oil'],['Oven','Bulb'],['Candle','Wreath'],['Car','Mirror'],['Window','Box'],['Door','Closet'],['Key','Car'],['Lock','Seal'],['Wallet','Leather'],['Purse','Tag'],['Backpack','Airplane'],['Suitcase','Towel'],['Hat','Straw'],['Shoes','Sail'],['Socks','Measure'],['Shirt','Cotton'],['Zipper','Pants'],['Coat','Hair'],['Umbrella','Wing'],['Vacation','Sunglasses'],['Watch','Monitor'],['Wheel','Ring'],['Necklace','Tiara'],['Sleeve','Tattoo'],['Bed','Monster'],['Pillowcase','Stocking'],['Blanket','Cradle'],['Mattress','Air'],['Book','Pop-up'],['Magazine','Journal'],['Newspaper','Column'],['Pen','Ball'],['Pencil','Eyeliner'],['Eraser','Rubber'],['Notebook','Drawing'],['Scissors','Hair'],['Ruler','Grill'],['Glue','Tube'],['Tape','Clip'],['Brush','Broom'],['Basket','Arc'],['Box','Shoe'],['Envelope','Letter'],['Stamp','Date'],['Calendar','Moon'],['Clock','Bell'],['Radio','Wave'],['Speaker','Wall'],['DJ','Headphones'],['Microphone','TV'],['Television','Picture'],['Camera','Laser'],['Tripod','Leg'],['Fan','Oxygen'],['Heater','Dryer'],['Stove','Coal'],['Fridge','Milk'],['Freezer','Ice cream'],['Microwave','Radar'],['Toaster','Oven'],['Blender','Spatula'],['Pot','Soup'],['Pan','Steel'],['Kettle','Copper'],['Sponge','Jelly'],['Soap','Bar'],['Towel','Shower'],['Toothbrush','Tongue'],['Toothpaste','Gel'],['Comb','Ivory'],['Brush','Rake'],['Razor','Soap'],['Shampoo','Aloe'],['Conditioner','Foam'],['Lotion','Silk'],['Bucket','Earth'],['Mop','Floor'],['Broom','Airplane'],['Dustpan','Cloud'],['Trash can','Truck'],['Recycling','Paper'],['Ladder','Rope']] }
];

let availablePools = [];
let poolsCache = {};

let state = {
  phase: 'setup',
  numPlayers: 6,
  numImpostors: 1,
  gameTime: 180,
  deliberationTime: 60,
  playerNames: [],
  roles: [],
  civilianWord: '',
  impostorWord: '',
  currentReveal: 0,
  startPlayer: 0,
  turnDirection: 'horario',
  revealOrder: [],
  timerEndAt: null,
  timerPhase: null,
  votes: {},
  votingPlayer: 0,
  selections: [],
  executed: [],
  selectedPools: [], // Now it's an array for multiple pools, will be populated based on language
  votingPool: null,
  isTiebreak: false,
  tiebreakCandidates: []
};

const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const loadState = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try { state = JSON.parse(raw); return true; } catch { return false; }
};
const clearState = () => localStorage.removeItem(STORAGE_KEY);

const loadPoolsCache = () => {
  try { poolsCache = JSON.parse(localStorage.getItem(POOLS_CACHE_KEY) || '{}'); } catch { poolsCache = {}; }
};
const savePoolsCache = () => localStorage.setItem(POOLS_CACHE_KEY, JSON.stringify(poolsCache));

// ---------- Default values ----------
function defaultImpostors(nPlayers) {
  const capped = Math.min(Math.max(nPlayers, MIN_PLAYERS), MAX_PLAYERS);
  let impostors = 1;
  if (capped > 7) impostors = 3;
  else if (capped > 5) impostors = 2;
  const halfCap = Math.max(1, Math.floor(capped / 2));
  return Math.min(impostors, halfCap);
}

function defaultGameTime(nPlayers) {
  const capped = Math.min(Math.max(nPlayers, MIN_PLAYERS), MAX_PLAYERS);
  if (capped <= 4) return 300;
  if (capped >= 10) return 900;
  const extraPlayers = capped - 4;
  const seconds = 300 + extraPlayers * 100;
  return Math.round(seconds / 30) * 30;
}

function defaultDeliberation(gameSeconds) {
  return Math.max(30, Math.round(gameSeconds / 3));
}

// ---------- Word Pools ----------
async function loadPoolsList() {
  loadPoolsCache();

  // Start with embedded pools (always available)
  let embeddedList = EMBEDDED_POOLS.map(p => ({
    id: p.id,
    name: p.name,
    emoji: p.emoji,
    count: p.words.length,
    lang: p.lang
  }));

  // Try to load external pools from manifest
  let externalList = [];
  try {
    const res = await fetch(POOLS_MANIFEST_URL);
    if (res.ok) {
      const manifest = await res.json();
      if (Array.isArray(manifest)) {
        externalList = manifest;
      }
    }
  } catch (e) {
    console.log('Failed to load manifest:', e);
  }

  // Combine pools, avoiding duplicates (prefer embedded version over manifest)
  const embeddedIds = new Set(embeddedList.map(p => p.id));
  const uniqueExternal = externalList.filter(p => !embeddedIds.has(p.id));
  const allPools = [...embeddedList, ...uniqueExternal];

  // Filter pools by current language (only show pools matching current language)
  availablePools = allPools.filter(p => p.lang === currentLanguage);

  // Check if selected pools are valid for current language
  const validSelectedPools = (state.selectedPools || []).filter(id =>
    availablePools.some(p => p.id === id)
  );

  // If no valid pools or pools don't match current language, reset to defaults
  if (validSelectedPools.length === 0) {
    const defaultPools = availablePools.slice(0, 2).map(p => p.id);
    state.selectedPools = defaultPools.length > 0 ? defaultPools : [];
    saveState();
  } else {
    state.selectedPools = validSelectedPools;
    saveState();
  }

  renderPoolButtons();
}

function parseWordsFile(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  return lines.map(line => {
    // Format: civilian_word|impostor_word
    if (line.includes('|')) {
      const [civil, impostor] = line.split('|').map(s => s.trim());
      return [civil, impostor];
    }
    // Fallback: if no pipe, use the same word for both
    return [line, line];
  });
}

async function pickWords() {
  const selectedIds = state.selectedPools && state.selectedPools.length > 0 ? state.selectedPools : ['animales_naturaleza'];
  let allWords = [];

  // Collect words from all selected pools
  for (const poolId of selectedIds) {
    let words = [];

    // Search embedded pools first
    const embeddedPool = EMBEDDED_POOLS.find(p => p.id === poolId);
    if (embeddedPool) {
      words = embeddedPool.words;
    } else if (poolsCache[poolId]?.words) {
      words = poolsCache[poolId].words;
    } else {
      try {
        const res = await fetch(`word-pools/${poolId}.txt`);
        if (res.ok) {
          const text = await res.text();
          words = parseWordsFile(text);
          poolsCache[poolId] = { words, ts: Date.now() };
          savePoolsCache();
        }
      } catch (_) {}
    }

    allWords = allWords.concat(words);
  }

  if (allWords.length === 0) {
    // Fallback to embedded pool
    allWords = EMBEDDED_POOLS[0].words;
  }

  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const wordPair = shuffled[0];

  // wordPair is [civilian_word, impostor_word]
  return { civilian: wordPair[0], impostor: wordPair[1] };
}

function renderPoolButtons() {
  const container = document.getElementById('pool-buttons');
  if (!container) return;
  container.innerHTML = '';

  // Ensure selectedPools is an array and contains valid pools for current language
  if (!Array.isArray(state.selectedPools)) {
    state.selectedPools = [state.selectedPools || 'animales_naturaleza'];
  }

  // Filter out pools that don't exist in current language
  const validSelectedPools = state.selectedPools.filter(id =>
    availablePools.some(p => p.id === id)
  );

  // If no valid pools selected, select first 2 available
  if (validSelectedPools.length === 0 && availablePools.length > 0) {
    state.selectedPools = availablePools.slice(0, 2).map(p => p.id);
    saveState();
  } else {
    state.selectedPools = validSelectedPools;
  }

  availablePools.forEach(pool => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pool-btn';
    btn.textContent = `${pool.emoji || '🎲'} ${pool.name || pool.id}`;
    if (state.selectedPools.includes(pool.id)) btn.classList.add('selected');
    btn.onclick = () => {
      // Toggle multiple selection
      if (state.selectedPools.includes(pool.id)) {
        state.selectedPools = state.selectedPools.filter(id => id !== pool.id);
        // Ensure at least one is selected
        if (state.selectedPools.length === 0) {
          state.selectedPools = [pool.id];
        }
      } else {
        state.selectedPools.push(pool.id);
      }
      saveState();
      renderPoolButtons();
    };
    container.appendChild(btn);
  });
}

// ---------- Setup and player names ----------
function goToPools() {
  let nPlayers = parseInt(document.getElementById('num-players').value) || MIN_PLAYERS;
  nPlayers = Math.min(Math.max(nPlayers, MIN_PLAYERS), MAX_PLAYERS);
  const maxImpostors = Math.max(1, Math.floor(nPlayers / 2));
  let nImpostors = parseInt(document.getElementById('num-impostors').value) || defaultImpostors(nPlayers);
  nImpostors = Math.min(Math.max(1, nImpostors), maxImpostors);
  let gTime = parseInt(document.getElementById('game-time').value) || defaultGameTime(nPlayers);
  gTime = Math.min(Math.max(gTime, 60), 900);
  let dTime = parseInt(document.getElementById('deliberation-time').value) || defaultDeliberation(gTime);
  dTime = Math.min(Math.max(dTime, 30), Math.round(900 / 3));
  if (nImpostors >= nPlayers) { alert(t('impostorsMustBeLess')); return; }
  state.numPlayers = nPlayers;
  state.numImpostors = nImpostors;
  state.gameTime = gTime;
  state.deliberationTime = dTime;
  showScreen('pools-screen');
}

function goToNames() {
  buildNameInputs();
  showScreen('names-screen');
}

function buildNameInputs() {
  const list = document.getElementById('player-names-list');
  list.innerHTML = '';
  for (let i = 0; i < state.numPlayers; i++) {
    const div = document.createElement('div');
    div.className = 'player-name-item';
    const playerLabel = `${t('player')} ${i+1}`;
    div.innerHTML = `<span>${playerLabel}:</span><input id="player-name-${i}" value="${state.playerNames[i] || playerLabel}" />`;
    list.appendChild(div);
  }
}

// ---------- Game start ----------
function startGame() {
  state.playerNames = [];
  for (let i = 0; i < state.numPlayers; i++) {
    const val = document.getElementById(`player-name-${i}`).value.trim();
    state.playerNames.push(val || `Jugador ${i+1}`);
  }
  pickWords().then(({civilian, impostor}) => {
    state.civilianWord = civilian;
    state.impostorWord = impostor;
    finalizeStart();
  }).catch(() => {
    const fallback = EMBEDDED_POOLS[0].words;
    const shuffled = [...fallback].sort(() => Math.random() - 0.5);
    const wordPair = shuffled[0];
    state.civilianWord = wordPair[0];
    state.impostorWord = wordPair[1];
    finalizeStart();
  });
}

function finalizeStart() {
  state.roles = Array(state.numPlayers - state.numImpostors).fill('CIVIL').concat(Array(state.numImpostors).fill('IMPOSTOR')).sort(() => Math.random()-0.5);
  state.startPlayer = Math.floor(Math.random() * state.numPlayers);
  state.turnDirection = Math.random() < 0.5 ? 'horario' : 'antihorario';
  const step = state.turnDirection === 'horario' ? 1 : -1;
  state.revealOrder = Array.from({length: state.numPlayers}, (_, k) => (state.startPlayer + step * k + state.numPlayers) % state.numPlayers);
  state.currentReveal = 0; state.phase = 'pre-reveal'; state.votes = {}; state.votingPlayer = 0; state.selections = []; state.executed = []; state.timerEndAt = null; state.timerPhase = null;
  state.votingPool = null; state.isTiebreak = false; state.tiebreakCandidates = [];
  saveState();
  renderSummary();
  showScreen('pre-reveal-screen');
}

// Adjust defaults when player count is edited
document.getElementById('num-players').addEventListener('change', () => {
  let nPlayers = parseInt(document.getElementById('num-players').value) || MIN_PLAYERS;
  nPlayers = Math.min(Math.max(nPlayers, MIN_PLAYERS), MAX_PLAYERS);
  document.getElementById('num-players').value = nPlayers;
  const imp = defaultImpostors(nPlayers);
  const gTime = defaultGameTime(nPlayers);
  const dTime = defaultDeliberation(gTime);
  document.getElementById('num-impostors').max = Math.max(1, Math.floor(nPlayers / 2));
  document.getElementById('num-impostors').value = imp;
  document.getElementById('game-time').value = gTime;
  document.getElementById('deliberation-time').value = dTime;
});

function renderSummary() {
  const el = document.getElementById('config-summary');
  const fmt = secs => `${Math.floor(secs/60)}:${(secs%60).toString().padStart(2,'0')}`;
  const startName = state.playerNames[state.startPlayer] || `${t('player')} ${state.startPlayer+1}`;

  // Generate list of selected pools
  const selectedIds = Array.isArray(state.selectedPools) ? state.selectedPools : [state.selectedPools || 'animales_naturaleza'];
  const poolsText = selectedIds.map(id => {
    const pool = availablePools.find(p => p.id === id) || EMBEDDED_POOLS.find(p => p.id === id);
    return pool ? `${pool.emoji || '🎲'} ${pool.name || pool.id}` : id;
  }).join(', ');

  el.innerHTML = `
    <p><strong>${t('players')}:</strong> ${state.numPlayers}</p>
    <p><strong>${t('impostors')}:</strong> ${state.numImpostors}</p>
    <p><strong>${t('gameTime')}:</strong> ${fmt(state.gameTime)}</p>
    <p><strong>${t('deliberationTime')}:</strong> ${fmt(state.deliberationTime)}</p>
    <p><strong>${t('poolsLabel')}:</strong> ${poolsText}</p>
    <p><strong>${t('starts')}:</strong> ${startName} · <strong>${t('order')}:</strong> ${state.turnDirection === 'horario' ? t('clockwise') : t('counterclockwise')}</p>
  `;
}

// ---------- Role revelation ----------
function loadCurrentReveal() {
  state.phase = 'reveal'; saveState();

  // Activar Wake Lock para mantener pantalla encendida durante el juego
  requestWakeLock();

  if (!state.revealOrder || state.revealOrder.length !== state.numPlayers) {
    const step = state.turnDirection === 'horario' ? 1 : -1;
    state.revealOrder = Array.from({length: state.numPlayers}, (_, k) => (state.startPlayer + step * k + state.numPlayers) % state.numPlayers);
  }
  const idx = state.revealOrder[state.currentReveal];
  const name = state.playerNames[idx];
  document.getElementById('current-player-name').textContent = name;

  // Update curtain text
  const revealText = document.querySelector('#reveal-screen .info-text');
  if (revealText) {
    revealText.innerHTML = `${t('turnOf')}: <strong><span id="current-player-name">${name}</span></strong><br><small>${t('othersLookAway')}</small>`;
  }

  const curtainText = document.querySelector('.curtain-cover div:last-child');
  if (curtainText) {
    curtainText.textContent = t('liftCurtain');
  }

  // Reset curtain state
  curtainState.isRevealed = false;
  const coverEl = document.getElementById('curtain-cover');
  coverEl.style.transform = 'translateY(0)';
  coverEl.style.transition = '';

  document.getElementById('next-player-btn').style.display = 'none';
  document.getElementById('start-game-btn').style.display = 'none';
}

function liftCurtain() {
  const cover = document.getElementById('curtain-cover');
  if (cover.classList.contains('lifted')) return;

  // Restore CSS transition and use the class
  cover.style.transition = '';
  cover.style.transform = '';
  cover.classList.add('lifted');

  const idx = state.revealOrder[state.currentReveal];
  const role = state.roles[idx];
  const word = role === 'CIVIL' ? state.civilianWord : state.impostorWord;
  document.getElementById('role-text').textContent = role;
  document.getElementById('role-text').className = 'role ' + (role === 'CIVIL' ? 'civil' : 'impostor');
  document.getElementById('word-text').textContent = word;
  setTimeout(() => {
    if (state.currentReveal + 1 < state.numPlayers) document.getElementById('next-player-btn').style.display = 'block';
    else document.getElementById('start-game-btn').style.display = 'block';
  }, 700);
}

function nextReveal() { state.currentReveal++; saveState(); loadCurrentReveal(); }

// Curtain system with GRAVITY - The curtain always tends to fall
// Supports both touch (mobile) and mouse (desktop)
// On desktop: curtain stays up while mouse button is held, even if cursor leaves the area
let curtainState = { isRevealed: false };
let curtainDragState = {
  startY: null,
  isDragging: false,
  currentTranslateY: 0
};

function initCurtainHandlers() {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;

  // Function to get Y position from event (touch or mouse)
  const getY = (e) => {
    return e.touches ? e.touches[0].clientY : e.clientY;
  };

  // Start function (touch and mouse)
  const handleStart = (e) => {
    curtainDragState.startY = getY(e);
    curtainDragState.isDragging = true;
    curtainDragState.currentTranslateY = 0;
    if (e.type === 'mousedown') {
      e.preventDefault(); // Prevent text selection on desktop
    }
  };

  // Move function (touch and mouse)
  const handleMove = (e) => {
    if (curtainDragState.startY === null || !curtainDragState.isDragging) return;
    const currentY = getY(e);
    const dy = currentY - curtainDragState.startY;
    const coverEl = document.getElementById('curtain-cover');
    if (!coverEl) return;

    // Calculate displacement: negative = up, positive = down
    // Allow going further up than the curtain height (user can keep dragging up)
    // but don't allow going below initial position (0)
    curtainDragState.currentTranslateY = Math.min(dy, 0);

    coverEl.style.transform = `translateY(${curtainDragState.currentTranslateY}px)`;
    coverEl.style.transition = 'none';

    // If lifted enough, show content
    if (curtainDragState.currentTranslateY < -80 && !curtainState.isRevealed) {
      curtainState.isRevealed = true;
      const idx = state.revealOrder[state.currentReveal];
      const role = state.roles[idx];
      const word = role === 'CIVIL' ? state.civilianWord : state.impostorWord;
      const roleText = t(role.toLowerCase());
      document.getElementById('role-text').textContent = roleText;
      document.getElementById('role-text').className = 'role ' + (role === 'CIVIL' ? 'civil' : 'impostor');
      document.getElementById('word-text').textContent = word;
    }

    e.preventDefault(); // Prevent selection
  };

  // End function (touch and mouse)
  const handleEnd = (e) => {
    if (!curtainDragState.isDragging || curtainDragState.startY === null) return;
    const coverEl = document.getElementById('curtain-cover');
    if (!coverEl) return;

    // ALWAYS bring the curtain down when released (GRAVITY)
    coverEl.style.transition = 'transform 0.4s ease';
    coverEl.style.transform = 'translateY(0)';

    // If content was revealed, show button after it falls
    if (curtainState.isRevealed) {
      setTimeout(() => {
        if (state.currentReveal + 1 < state.numPlayers) {
          document.getElementById('next-player-btn').style.display = 'block';
        } else {
          document.getElementById('start-game-btn').style.display = 'block';
        }
      }, 400);
    }

    curtainDragState.startY = null;
    curtainDragState.isDragging = false;
    curtainDragState.currentTranslateY = 0;
  };

  // Touch events (mobile)
  curtain.addEventListener('touchstart', handleStart, {passive: false});
  curtain.addEventListener('touchmove', handleMove, {passive: false});
  curtain.addEventListener('touchend', handleEnd, {passive: true});
  curtain.addEventListener('touchcancel', handleEnd, {passive: true});

  // Mouse events (desktop) - start on curtain only
  curtain.addEventListener('mousedown', handleStart);

  // Mouse move and up events on WINDOW so we can track even when cursor leaves everything
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleEnd);
}

// Initialize curtain handlers when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCurtainHandlers);
} else {
  initCurtainHandlers();
}

// ---------- Screen Wake Lock (prevent screen from sleeping during timers) ----------
let wakeLock = null;
let wakeLockVideo = null; // For iOS workaround

// Detect if device is iOS
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Check if screen lock is enabled in settings
function isScreenLockEnabled() {
  const saved = localStorage.getItem(SCREEN_LOCK_STORAGE_KEY);
  return saved === null ? true : saved === 'true'; // Default enabled
}

// Save screen lock preference
function setScreenLockEnabled(enabled) {
  localStorage.setItem(SCREEN_LOCK_STORAGE_KEY, enabled.toString());
  updateScreenLockButton();
}

async function requestWakeLock() {
  if (!isScreenLockEnabled()) return;

  // Try native Wake Lock API first (works on Android Chrome, etc.)
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        wakeLock = null;
      });
      console.log('Wake Lock activated (native API)');
      return;
    } catch (err) {
      console.log('Wake lock request failed:', err);
    }
  }

  // Fallback for iOS - use hidden video loop
  if (isIOS() && !wakeLockVideo) {
    try {
      wakeLockVideo = document.createElement('video');
      wakeLockVideo.setAttribute('playsinline', '');
      wakeLockVideo.setAttribute('muted', '');
      wakeLockVideo.style.position = 'fixed';
      wakeLockVideo.style.opacity = '0';
      wakeLockVideo.style.pointerEvents = 'none';
      wakeLockVideo.style.width = '1px';
      wakeLockVideo.style.height = '1px';

      // Minimal base64 encoded video (1 frame, silent)
      wakeLockVideo.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0AAACrQYF//+p3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1NSByMjkwMSA3ZDBmZjIyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxOCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAwWWIhAAz//727L4FNf2f0JcRLMXaSnA+KqSAgHc0wAAAAwAAAwAAJuKiZ0WFMeJsgAAAHGAFBCwCPCVC';
      wakeLockVideo.loop = true;

      document.body.appendChild(wakeLockVideo);
      await wakeLockVideo.play();
      console.log('Wake Lock activated (iOS video workaround)');
    } catch (err) {
      console.log('iOS wake lock workaround failed:', err);
    }
  }
}

function releaseWakeLock() {
  // Release native Wake Lock
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }

  // Stop iOS video workaround
  if (wakeLockVideo) {
    wakeLockVideo.pause();
    wakeLockVideo.remove();
    wakeLockVideo = null;
  }
}

// Re-request wake lock when page becomes visible again
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && (wakeLock !== null || wakeLockVideo !== null)) {
    await requestWakeLock();
  }
});

// ---------- Timers ----------
let timerInterval = null;
async function startPhaseTimer(phase, seconds, elementId, onEnd) {
  if (timerInterval) clearInterval(timerInterval);

  // Request wake lock to keep screen on during timer
  await requestWakeLock();

  const now = Date.now();
  state.timerPhase = phase;
  state.timerEndAt = now + seconds*1000;
  saveState();
  const el = document.getElementById(elementId);
  const tick = () => {
    const remaining = Math.max(0, Math.round((state.timerEndAt - Date.now())/1000));
    updateTimerDisplay(el, remaining);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      releaseWakeLock(); // Release wake lock when timer ends
      playBeep();
      onEnd();
    }
  };
  tick();
  timerInterval = setInterval(tick, 1000);
}

function resumeTimerIfNeeded() {
  if (!state.timerEndAt || !state.timerPhase) return;
  const remaining = Math.round((state.timerEndAt - Date.now())/1000);
  if (remaining <= 0) { state.timerEndAt = null; saveState(); return; }
  if (state.timerPhase === 'game') { showScreen('game-screen'); startPhaseTimer('game', remaining, 'game-timer', startDeliberationPhase); }
  else if (state.timerPhase === 'deliberation') { showScreen('deliberation-screen'); startPhaseTimer('deliberation', remaining, 'deliberation-timer', startVotingPhase); }
}

function updateTimerDisplay(el, remaining) {
  const minutes = Math.floor(remaining/60); const secs = remaining%60;
  el.textContent = `${minutes}:${secs.toString().padStart(2,'0')}`;
  el.className = 'timer';
  if (remaining <= 10) el.classList.add('danger'); else if (remaining <= 30) el.classList.add('warning');
}

function playBeep() {
  // Play alarm sound - 3 ascending beeps pattern repeated twice
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;

  // Frequencies for alarm pattern (ascending)
  const frequencies = [523, 659, 784]; // C5, E5, G5
  const beepDuration = 0.15;
  const gapDuration = 0.08;
  const patternGap = 0.3;

  let time = now;

  // Play pattern twice
  for (let pattern = 0; pattern < 2; pattern++) {
    for (let i = 0; i < frequencies.length; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = frequencies[i];
      osc.type = 'square'; // More alarm-like sound

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.25, time + 0.02);
      gain.gain.setValueAtTime(0.25, time + beepDuration - 0.02);
      gain.gain.linearRampToValueAtTime(0, time + beepDuration);

      osc.start(time);
      osc.stop(time + beepDuration);

      time += beepDuration + gapDuration;
    }
    time += patternGap;
  }
}

// ---------- Game phases ----------
function startGamePhase() { state.phase = 'game'; saveState(); showScreen('game-screen'); startPhaseTimer('game', state.gameTime, 'game-timer', startDeliberationPhase); }
function startDeliberationPhase() { state.phase = 'deliberation'; saveState(); showScreen('deliberation-screen'); startPhaseTimer('deliberation', state.deliberationTime, 'deliberation-timer', startVotingPhase); }
function startVotingPhase(candidates = null, isTiebreak = false) {
  releaseWakeLock(); // Release wake lock when voting starts (no timer)
  state.phase = 'voting';
  state.votingPlayer = 0;
  state.votes = {};
  state.selections = [];
  state.votingPool = candidates;
  state.isTiebreak = isTiebreak;
  saveState();
  renderVoting();
  showScreen('voting-screen');
}
function skipToDeliberation() { if (timerInterval) clearInterval(timerInterval); releaseWakeLock(); startDeliberationPhase(); }
function skipToVoting() { if (timerInterval) clearInterval(timerInterval); releaseWakeLock(); startVotingPhase(); }
function startTiebreakDeliberation(candidates) {
  state.phase = 'deliberation';
  state.tiebreakCandidates = candidates;
  saveState();
  showScreen('deliberation-screen');
  startPhaseTimer('deliberation', 60, 'deliberation-timer', () => startVotingPhase(candidates, true));
}

// ---------- Secret voting ----------
function renderVoting() {
  const pool = state.votingPool || Array.from({length: state.numPlayers}, (_, i) => i);
  const voter = state.playerNames[state.votingPlayer];
  document.getElementById('voter-name').textContent = voter;
  document.getElementById('votes-needed').textContent = state.numImpostors;

  // Update voting instruction text
  const votingInfo = document.querySelector('#voting-screen .info-text');
  if (votingInfo) {
    votingInfo.innerHTML = `${t('passMobileTo')} <strong id="voter-name">${voter}</strong>. ${t('chooseSuspects')} <span id="votes-needed">${state.numImpostors}</span> ${t('suspect')}.`;
  }

  state.selections = state.selections || [];
  const list = document.getElementById('vote-list'); list.innerHTML = '';
  pool.forEach(i => {
     const item = document.createElement('div');
     item.className = 'player-item';

     // Marcar como disabled ANTES de añadir al DOM para que la animación correcta se aplique
     if (i === state.votingPlayer) {
       item.classList.add('disabled');
       // NO aplicar opacity inline - dejamos que CSS lo maneje con la animación
       item.style.pointerEvents = 'none';
     }

     item.textContent = state.playerNames[i];
     if (state.votes[i]) item.innerHTML += `<span class="vote-count">${t('votes')}: ${state.votes[i]}</span>`;
     if (state.selections.includes(i)) item.classList.add('selected');

     if (i !== state.votingPlayer) {
       item.onclick = () => toggleSelection(i, item);
     }

    list.appendChild(item);
  });
  updateConfirmButton();
}

function toggleSelection(idx, el) {
  if (idx === state.votingPlayer) return;
  if (state.selections.includes(idx)) state.selections = state.selections.filter(x => x !== idx);
  else {
    if (state.selections.length >= state.numImpostors) return;
    state.selections.push(idx);
  }
  saveState();
  renderVoting();
}

function updateConfirmButton() {
  const btn = document.getElementById('confirm-vote-btn');
  btn.disabled = state.selections.length !== state.numImpostors;
}

function confirmCurrentVote() {
  state.selections.forEach(t => { state.votes[t] = (state.votes[t] || 0) + 1; });
  state.votingPlayer++;
  state.selections = [];
  saveState();
  if (state.votingPlayer >= state.numPlayers) { handleVoteOutcome(); return; }
  renderVoting();
}

// ---------- Vote resolution ----------
function handleVoteOutcome() {
  const pool = state.votingPool || Array.from({length: state.numPlayers}, (_, i) => i);
  const counts = pool.map(idx => ({ idx, votes: state.votes[idx] || 0 }));
  counts.sort((a, b) => b.votes - a.votes);

  let slots = state.numImpostors;
  const executed = [];
  for (let i = 0; i < counts.length && slots > 0; ) {
    const currentVotes = counts[i].votes;
    const group = [];
    let j = i;
    while (j < counts.length && counts[j].votes === currentVotes) { group.push(counts[j].idx); j++; }
    if (group.length <= slots) {
      executed.push(...group);
      slots -= group.length;
      i = j;
    } else {
      // Tie for remaining slots
      if (state.isTiebreak) {
        // Second tie: impostors win
        state.executed = [];
        showResults(true);
        return;
      }
      startTiebreakDeliberation(group);
      return;
    }
  }

  state.executed = executed;
  showResults();
}

// ---------- Results ----------
function showResults(isTiebreak = false) {
  state.phase = 'results'; saveState();

  // Liberar Wake Lock cuando termina la partida
  releaseWakeLock();

  const executed = state.executed || [];
  let impostorsAlive = 0;
  state.roles.forEach((r,i) => { if (r === 'IMPOSTOR' && !executed.includes(i)) impostorsAlive++; });
  const winner = impostorsAlive > 0 ? 'IMPOSTORES' : 'CIVILES';
  const results = document.getElementById('results-content');
  const winText = winner === 'CIVILES' ? `✅ ${t('civiliansWin')}` : `❌ ${t('impostorsWin')}`;
  results.innerHTML = `
    <h2>${winText}</h2>
    <p><strong>${t('executed')}:</strong> ${executed.length ? executed.map(i => state.playerNames[i]).join(', ') : t('nobody')}</p>
    <p><strong>${t('votes')}:</strong> ${Object.keys(state.votes).length ? '' : t('noVotes')}</p>
    <h3 style="margin-top:18px;">${t('revealedRoles')}</h3>
    ${state.roles.map((role,i) => {
      const word = role === 'CIVIL' ? state.civilianWord : state.impostorWord;
      const killed = executed.includes(i) ? 'executed' : '';
      const roleText = t(role.toLowerCase());
      return `<div class="role-reveal ${role === 'CIVIL' ? 'civil-reveal' : 'impostor-reveal'} ${killed}"><strong>${state.playerNames[i]}:</strong> ${roleText} — "${word}" ${killed ? '☠️' : ''}</div>`;
    }).join('')}
  `;
  showScreen('results-screen');
}

// ---------- Utilities ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.phase = id.replace('-screen','');
  saveState();
  updateExitButtonVisibility();
}

function newMatch() {
  clearState();
  releaseWakeLock(); // Make sure wake lock is released when exiting game
  if (timerInterval) clearInterval(timerInterval);
  state = { ...state, phase:'welcome', timerEndAt:null, timerPhase:null, votingPool:null, isTiebreak:false, tiebreakCandidates:[] };
  saveState();
  showScreen('welcome-screen');
}

function confirmExitGame() {
  const confirmMessage = currentLanguage === 'es'
    ? '¿Estás seguro de que quieres salir de la partida? Se perderá todo el progreso actual.'
    : 'Are you sure you want to exit the game? All current progress will be lost.';

  if (confirm(confirmMessage)) {
    newMatch();
  }
}

function updateExitButtonVisibility() {
  const exitBtn = document.getElementById('exit-game');
  const langBtn = document.getElementById('language-toggle');
  const screenLockBtn = document.getElementById('screen-lock-toggle');

  // Show exit button and hide language/screen-lock toggles in all phases except welcome and setup
  if (state.phase !== 'welcome' && state.phase !== 'setup') {
    exitBtn.classList.add('visible');
    if (langBtn) langBtn.style.display = 'none';
    if (screenLockBtn) screenLockBtn.classList.remove('visible');
  } else {
    exitBtn.classList.remove('visible');
    if (langBtn) langBtn.style.display = 'inline-flex';
    // Only show screen lock button on iOS
    if (screenLockBtn && isIOS()) {
      screenLockBtn.classList.add('visible');
    }
  }
}

// ---------- Theme system ----------
function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme || getSystemTheme();
}

function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  saveTheme(newTheme);
}

// Initialize theme
const initialTheme = loadTheme();
applyTheme(initialTheme);

// ---------- Screen Lock Button ----------
function updateScreenLockButton() {
  const btn = document.getElementById('screen-lock-toggle');
  if (!btn) return;

  const enabled = isScreenLockEnabled();
  const icon = btn.querySelector('.screen-lock-icon');

  if (enabled) {
    btn.classList.add('active');
    btn.setAttribute('title', 'Bloqueo de pantalla activado');
    if (icon) icon.textContent = '🔒';
  } else {
    btn.classList.remove('active');
    btn.setAttribute('title', 'Bloqueo de pantalla desactivado');
    if (icon) icon.textContent = '🔓';
  }
}

function toggleScreenLock() {
  const currentState = isScreenLockEnabled();
  setScreenLockEnabled(!currentState);

  // If disabling, release any active wake lock
  if (currentState) {
    releaseWakeLock();
  }
}

// Event listener for theme and language buttons
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  const languageToggle = document.getElementById('language-toggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
  }

  const screenLockToggle = document.getElementById('screen-lock-toggle');
  if (screenLockToggle) {
    screenLockToggle.addEventListener('click', toggleScreenLock);
    updateScreenLockButton();
  }

  // Initialize language
  currentLanguage = loadLanguage();
  setLanguage(currentLanguage);

  // Detect system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply automatically if user hasn't manually selected a theme
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});

// ---------- State rehydration ----------
(function init() {
  const restored = loadState();
  loadPoolsList();
  if (!state.turnDirection) state.turnDirection = 'horario';
  if (typeof state.startPlayer !== 'number') state.startPlayer = 0;

  // Set default values in inputs if we're in setup
  if (state.phase === 'setup' || !restored) {
    const defaultPlayers = 6;
    const defaultImp = defaultImpostors(defaultPlayers);
    const defaultGTime = defaultGameTime(defaultPlayers);
    const defaultDTime = defaultDeliberation(defaultGTime);

    document.getElementById('num-players').value = defaultPlayers;
    document.getElementById('num-impostors').value = defaultImp;
    document.getElementById('num-impostors').max = Math.max(1, Math.floor(defaultPlayers / 2));
    document.getElementById('game-time').value = defaultGTime;
    document.getElementById('deliberation-time').value = defaultDTime;
  }

  // Determine initial screen
  if (!restored || state.phase === 'setup' || state.phase === 'welcome') {
    // If no saved state or we're in setup/welcome, show welcome
    showScreen('welcome-screen');
  } else {
    // If there's a game in progress, restore it
    switch (state.phase) {
      case 'names': buildNameInputs(); showScreen('names-screen'); break;
      case 'pre-reveal': renderSummary(); showScreen('pre-reveal-screen'); break;
      case 'reveal': showScreen('reveal-screen'); loadCurrentReveal(); break;
      case 'game': showScreen('game-screen'); resumeTimerIfNeeded(); break;
      case 'deliberation': showScreen('deliberation-screen'); resumeTimerIfNeeded(); break;
      case 'voting': showScreen('voting-screen'); renderVoting(); break;
      case 'results': showResults(); break;
      default: showScreen('welcome-screen');
    }
  }

  // Initialize exit button visibility
  updateExitButtonVisibility();

  // Initialize screen lock button for iOS
  initScreenLockButton();
})();
