const STORAGE_KEY = 'impostorGameStateV2';
const MAX_PLAYERS = 10;
const MIN_PLAYERS = 3;
const POOLS_CACHE_KEY = 'impostorWordPoolsV1';
const POOLS_MANIFEST_URL = 'word-pools/manifest.json';

const EMBEDDED_POOLS = [
  { id: 'animales_naturaleza', name: 'Animales y naturaleza', emoji: '🌿', words: ['Perro','Gato','Lobo','Zorro','Oso','Tigre','León','Pantera','Jaguar','Puma','Guepardo','Elefante','Rinoceronte','Hipopótamo','Jirafa','Cebra','Camello','Dromedario','Canguro','Koala','Panda','Mapache','Nutria','Castor','Foca','Morsa','Delfín','Ballena','Tiburón','Orca','Pulpo','Calamar','Medusa','Tortuga','Lagarto','Cocodrilo','Serpiente','Anaconda','Iguana','Rana','Sapo','Búho','Halcón','Águila','Cóndor','Gaviota','Loro','Flamenco','Pingüino','Avestruz','Gallina','Pato','Ganso','Cisne','Abeja','Hormiga','Mariquita','Libélula','Mariposa','Escarabajo','Grillo','Saltamontes','Araña','Escorpión','Lombriz','Caracol','Estrella de mar','Coral','Musgo','Helecho','Pino','Roble','Encina','Palmera','Cactus','Bambú','Rosa','Tulipán','Girasol','Lavanda','Montaña','Río','Lago','Mar','Playa','Desierto','Selva','Bosque','Pradera','Glaciar','Volcán'] },
  { id: 'vida_cotidiana', name: 'Vida cotidiana', emoji: '🏠', words: ['Pan','Leche','Café','Té','Agua','Jugo','Refresco','Cerveza','Vino','Pizza','Hamburguesa','Sándwich','Taco','Burrito','Pasta','Arroz','Paella','Sushi','Ramen','Ensalada','Sopa','Croqueta','Tortilla','Empanada','Arepa','Queso','Jamón','Chorizo','Pollo','Carne','Cerdo','Pescado','Marisco','Patata','Tomate','Cebolla','Ajo','Pimiento','Zanahoria','Lechuga','Brócoli','Coliflor','Manzana','Plátano','Naranja','Pera','Uva','Fresa','Mango','Piña','Melón','Sandía','Yogur','Galletas','Chocolate','Helado','Cereales','Mantequilla','Aceite','Sal','Pimienta','Azúcar','Harina','Huevo','Cuchara','Tenedor','Cuchillo','Plato','Vaso','Taza','Olla','Sartén','Microondas','Horno','Nevera','Mesa','Silla','Sofá','Cama','Almohada','Sábana','Toalla','Ducha','Jabón','Champú','Cepillo','Pasta de dientes'] },
  { id: 'deportes', name: 'Deportes', emoji: '🏅', words: ['Fútbol','Baloncesto','Tenis','Pádel','Bádminton','Voleibol','Béisbol','Rugby','Hockey hielo','Hockey césped','Golf','Boxeo','MMA','Judo','Karate','Taekwondo','Esgrima','Tiro con arco','Halterofilia','Crossfit','Atletismo','Maratón','Triatlón','Ciclismo ruta','Ciclismo montaña','BMX','Natación','Waterpolo','Surf','Vela','Remo','Piragüismo','Esquí','Snowboard','Patinaje artístico','Patinaje velocidad','Curling','Escalada','Senderismo','Trail running','Parkour','Gimnasia artística','Gimnasia rítmica','Trampolín','Skate','Breakdance','Carreras coches','Fórmula 1','Rally','Karting','Motociclismo','Enduro','Motocross','Equitación','Polo','Críquet','Billar','Dardos','Petanca','Pickleball','Ultimate frisbee','Paintball','Airsoft','eSports'] },
  { id: 'marcas', name: 'Marcas', emoji: '🛍️', words: ['Apple','Samsung','Google','Microsoft','Amazon','Meta','Tesla','Toyota','Honda','Ford','BMW','Mercedes','Audi','Volkswagen','Porsche','Ferrari','Lamborghini','Maserati','McLaren','Chevrolet','Nissan','Kia','Hyundai','Peugeot','Renault','Volvo','Jaguar','Land Rover','Fiat','Alfa Romeo','Ducati','Yamaha','Canon','Nikon','Sony','Panasonic','LG','Philips','Siemens','Bosch','Whirlpool','Ikea','Zara','H&M','Uniqlo','Nike','Adidas','Puma','Reebok','New Balance','Under Armour','Converse','Vans','Patagonia','The North Face','Columbia','Levi’s','Calvin Klein','Gucci','Prada','Louis Vuitton','Chanel','Hermès','Dior','Rolex','Omega','Casio','Pepsi','Coca-Cola','Fanta','Red Bull','Monster','Starbucks','Nespresso','Nestlé','Danone','Kellogg’s','Oreo','Intel','AMD','Nvidia','Qualcomm','TikTok','Netflix','Disney','Warner Bros','HBO','Spotify','Airbnb','Uber','Booking'] },
  { id: 'musica', name: 'Música', emoji: '🎵', words: ['Guitarra','Piano','Violín','Batería','Bajo','Saxofón','Trompeta','Flauta','Clarinete','Acordeón','Ukelele','Arpa','Sintetizador','DJ','Micrófono','Altavoz','Concierto','Festival','Vinilo','Rock','Pop','Punk','Metal','Heavy','Thrash','Death metal','Jazz','Blues','Soul','Funk','R&B','Rap','Hip hop','Trap','Reggaetón','Salsa','Bachata','Merengue','Cumbia','Vallenato','Flamenco','Rumba','Bossa nova','Samba','Tango','Country','EDM','Techno','House','Trance','Dubstep','Drum and bass','Lo-fi','Reggae','Ska','K-pop','J-pop','Indie','Gospel','Ópera','Sinfonía','Orquesta','Coro','Cantautor','Balada','Bolero','Ranchera','Corrido','Mariachi'] },
  { id: 'personajes', name: 'Personajes', emoji: '🧙', words: ['Sherlock Holmes','Harry Potter','Hermione Granger','Ron Weasley','Albus Dumbledore','Voldemort','Frodo Bolsón','Sam Gamyi','Gandalf','Aragorn','Legolas','Gimli','Gollum','Bilbo Bolsón','Katniss Everdeen','Peeta Mellark','Batman','Bruce Wayne','Joker','Harley Quinn','Superman','Clark Kent','Lois Lane','Wonder Woman','Diana Prince','Flash','Barry Allen','Aquaman','Arthur Curry','Spider-Man','Peter Parker','Iron Man','Tony Stark','Capitán América','Steve Rogers','Black Widow','Natasha Romanoff','Hulk','Bruce Banner','Thor','Loki','Thanos','Doctor Strange','Wanda Maximoff','Vision','Star-Lord','Gamora','Groot','Rocket','Drax','Deadpool','Wolverine','Magneto','Professor X','Storm','Cyclops','Jean Grey','Mystique','Darth Vader','Luke Skywalker','Leia Organa','Han Solo','Chewbacca','Yoda','Obi-Wan Kenobi','Anakin Skywalker','Rey','Kylo Ren','R2-D2','C-3PO','Indiana Jones','Lara Croft','James Bond','Mario','Luigi','Princesa Peach','Bowser','Link','Zelda','Geralt de Rivia','Ciri','Yennefer','Kratos','Atreus','Ellie','Joel Miller','Nathan Drake','Master Chief','Cortana','Sonic','Tails','Ash Ketchum','Pikachu','Goku','Vegeta','Naruto','Sasuke','Luffy','Zoro','Nami','Tanjiro','Nezuko','Saitama','Light Yagami','L Lawliet'] }
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
  selectedPool: 'animales_naturaleza',
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

// ---------- Defaults ----------
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

// ---------- Pools ----------
async function loadPoolsList() {
  loadPoolsCache();
  let list = [];
  try {
    const res = await fetch(POOLS_MANIFEST_URL);
    if (res.ok) list = await res.json();
  } catch (_) {}
  if (!Array.isArray(list) || list.length === 0) {
    list = EMBEDDED_POOLS.map(p => ({ id: p.id, name: p.name, emoji: p.emoji, count: p.words.length }));
  }
  availablePools = list;
  renderPoolButtons();
}

function parseWordsFile(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (!lines.length) return [];
  if (lines[0].startsWith('#')) return lines.slice(1);
  return lines;
}

async function pickWords() {
  const poolId = state.selectedPool || 'default';
  let words = [];
  if (poolsCache[poolId]?.words) {
    words = poolsCache[poolId].words;
  } else if (poolId !== 'default') {
    const res = await fetch(`word-pools/${poolId}.txt`);
    if (!res.ok) throw new Error('No se pudo cargar el pool');
    const text = await res.text();
    words = parseWordsFile(text);
    poolsCache[poolId] = { words, ts: Date.now() }; savePoolsCache();
  } else {
    words = EMBEDDED_POOLS[0].words;
  }
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return { civilian: shuffled[0], impostor: shuffled[1] };
}

function renderPoolButtons() {
  const container = document.getElementById('pool-buttons');
  if (!container) return;
  container.innerHTML = '';
  availablePools.forEach(pool => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pool-btn';
    btn.textContent = `${pool.emoji || '🎲'} ${pool.name || pool.id}`;
    if (state.selectedPool === pool.id) btn.classList.add('selected');
    btn.onclick = () => { state.selectedPool = pool.id; saveState(); renderPoolButtons(); };
    container.appendChild(btn);
  });
}

// ---------- Configuración y nombres ----------
function goToNames() {
  let nPlayers = parseInt(document.getElementById('num-players').value) || MIN_PLAYERS;
  nPlayers = Math.min(Math.max(nPlayers, MIN_PLAYERS), MAX_PLAYERS);
  const maxImpostors = Math.max(1, Math.floor(nPlayers / 2));
  let nImpostors = parseInt(document.getElementById('num-impostors').value) || defaultImpostors(nPlayers);
  nImpostors = Math.min(Math.max(1, nImpostors), maxImpostors);
  let gTime = parseInt(document.getElementById('game-time').value) || defaultGameTime(nPlayers);
  gTime = Math.min(Math.max(gTime, 60), 900);
  let dTime = parseInt(document.getElementById('deliberation-time').value) || defaultDeliberation(gTime);
  dTime = Math.min(Math.max(dTime, 30), Math.round(900 / 3));
  if (nImpostors >= nPlayers) { alert('Impostores debe ser menor que jugadores'); return; }
  state.numPlayers = nPlayers; state.numImpostors = nImpostors; state.gameTime = gTime; state.deliberationTime = dTime;
  buildNameInputs();
  showScreen('names-screen');
}

function buildNameInputs() {
  const list = document.getElementById('player-names-list');
  list.innerHTML = '';
  for (let i = 0; i < state.numPlayers; i++) {
    const div = document.createElement('div');
    div.className = 'player-name-item';
    div.innerHTML = `<span>Jugador ${i+1}:</span><input id="player-name-${i}" value="${state.playerNames[i] || 'Jugador '+(i+1)}" />`;
    list.appendChild(div);
  }
}

// ---------- Inicio de partida ----------
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
    state.civilianWord = shuffled[0];
    state.impostorWord = shuffled[1];
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

// Ajustar defaults cuando se edita el nº de jugadores
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
  const startName = state.playerNames[state.startPlayer] || `Jugador ${state.startPlayer+1}`;
  const poolMeta = availablePools.find(p => p.id === state.selectedPool) || EMBEDDED_POOLS[0];
  el.innerHTML = `
    <p><strong>Jugadores:</strong> ${state.numPlayers}</p>
    <p><strong>Impostores:</strong> ${state.numImpostors}</p>
    <p><strong>Tiempo de partida:</strong> ${fmt(state.gameTime)}</p>
    <p><strong>Tiempo de deliberación:</strong> ${fmt(state.deliberationTime)}</p>
    <p><strong>Pool:</strong> ${poolMeta.emoji || '🎲'} ${poolMeta.name || poolMeta.id}</p>
    <p><strong>Empieza:</strong> ${startName} · <strong>Orden:</strong> ${state.turnDirection === 'horario' ? 'Horario' : 'Antihorario'}</p>
  `;
}

// ---------- Revelación ----------
function loadCurrentReveal() {
  state.phase = 'reveal'; saveState();
  if (!state.revealOrder || state.revealOrder.length !== state.numPlayers) {
    const step = state.turnDirection === 'horario' ? 1 : -1;
    state.revealOrder = Array.from({length: state.numPlayers}, (_, k) => (state.startPlayer + step * k + state.numPlayers) % state.numPlayers);
  }
  const idx = state.revealOrder[state.currentReveal];
  const name = state.playerNames[idx];
  document.getElementById('current-player-name').textContent = name;
  document.getElementById('curtain-cover').classList.remove('lifted');
  document.getElementById('next-player-btn').style.display = 'none';
  document.getElementById('start-game-btn').style.display = 'none';
}

function liftCurtain() {
  const cover = document.getElementById('curtain-cover');
  if (cover.classList.contains('lifted')) return;
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

// swipe support
(() => {
  const curtain = document.getElementById('curtain');
  let startY = null;
  curtain.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, {passive:true});
  curtain.addEventListener('touchmove', e => { if (startY === null) return; const dy = e.touches[0].clientY - startY; if (dy < -40) { liftCurtain(); startY = null; } }, {passive:true});
  curtain.addEventListener('click', liftCurtain);
})();

// ---------- Timers ----------
let timerInterval = null;
function startPhaseTimer(phase, seconds, elementId, onEnd) {
  if (timerInterval) clearInterval(timerInterval);
  const now = Date.now();
  state.timerPhase = phase;
  state.timerEndAt = now + seconds*1000;
  saveState();
  const el = document.getElementById(elementId);
  const tick = () => {
    const remaining = Math.max(0, Math.round((state.timerEndAt - Date.now())/1000));
    updateTimerDisplay(el, remaining);
    if (remaining <= 0) { clearInterval(timerInterval); playBeep(); onEnd(); }
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
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = 820; osc.type = 'sine';
  gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
  osc.start(); osc.stop(ctx.currentTime + 0.45);
}

// ---------- Fases ----------
function startGamePhase() { state.phase = 'game'; saveState(); showScreen('game-screen'); startPhaseTimer('game', state.gameTime, 'game-timer', startDeliberationPhase); }
function startDeliberationPhase() { state.phase = 'deliberation'; saveState(); showScreen('deliberation-screen'); startPhaseTimer('deliberation', state.deliberationTime, 'deliberation-timer', startVotingPhase); }
function startVotingPhase(candidates = null, isTiebreak = false) {
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
function skipToDeliberation() { if (timerInterval) clearInterval(timerInterval); startDeliberationPhase(); }
function skipToVoting() { if (timerInterval) clearInterval(timerInterval); startVotingPhase(); }
function startTiebreakDeliberation(candidates) {
  state.phase = 'deliberation';
  state.tiebreakCandidates = candidates;
  saveState();
  showScreen('deliberation-screen');
  startPhaseTimer('deliberation', 60, 'deliberation-timer', () => startVotingPhase(candidates, true));
}

// ---------- Votación secreta ----------
function renderVoting() {
  const pool = state.votingPool || Array.from({length: state.numPlayers}, (_, i) => i);
  const voter = state.playerNames[state.votingPlayer];
  document.getElementById('voter-name').textContent = voter;
  document.getElementById('votes-needed').textContent = state.numImpostors;
  state.selections = state.selections || [];
  const list = document.getElementById('vote-list'); list.innerHTML = '';
  pool.forEach(i => {
     const item = document.createElement('div');
     item.className = 'player-item';
     item.textContent = state.playerNames[i];
     if (state.votes[i]) item.innerHTML += `<span class="vote-count">Votos: ${state.votes[i]}</span>`;
     if (state.selections.includes(i)) item.classList.add('selected');
     if (i === state.votingPlayer) {
       item.classList.add('disabled');
       item.style.opacity = '0.5';
       item.style.pointerEvents = 'none';
    } else {
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

// ---------- Resolución de voto ----------
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
        // segunda vez empatados: ganan impostores
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

// ---------- Resultados ----------
function showResults(isTiebreak = false) {
  state.phase = 'results'; saveState();
  const executed = state.executed || [];
  let impostorsAlive = 0;
  state.roles.forEach((r,i) => { if (r === 'IMPOSTOR' && !executed.includes(i)) impostorsAlive++; });
  const winner = impostorsAlive > 0 ? 'IMPOSTORES' : 'CIVILES';
  const results = document.getElementById('results-content');
  results.innerHTML = `
    <h2>${winner === 'CIVILES' ? '✅ ¡GANAN LOS CIVILES!' : '❌ ¡GANAN LOS IMPOSTORES!'}</h2>
    <p><strong>Ejecutados:</strong> ${executed.length ? executed.map(i => state.playerNames[i]).join(', ') : 'Nadie'}</p>
    <p><strong>Votos:</strong> ${Object.keys(state.votes).length ? '' : 'Sin votos'}</p>
    <h3 style="margin-top:18px;">Roles revelados</h3>
    ${state.roles.map((role,i) => {
      const word = role === 'CIVIL' ? state.civilianWord : state.impostorWord;
      const killed = executed.includes(i) ? 'executed' : '';
      return `<div class="role-reveal ${role === 'CIVIL' ? 'civil-reveal' : 'impostor-reveal'} ${killed}"><strong>${state.playerNames[i]}:</strong> ${role} — "${word}" ${killed ? '☠️' : ''}</div>`;
    }).join('')}
  `;
  showScreen('results-screen');
}

// ---------- Utilidades ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  state.phase = id.replace('-screen','');
  saveState();
}

function newMatch() { clearState(); state = { ...state, phase:'setup', timerEndAt:null, timerPhase:null, votingPool:null, isTiebreak:false, tiebreakCandidates:[] }; location.reload(); }

// ---------- Rehidratación ----------
(function init() {
  const restored = loadState();
  showScreen('setup-screen');
  loadPoolsList();
  if (!state.turnDirection) state.turnDirection = 'horario';
  if (typeof state.startPlayer !== 'number') state.startPlayer = 0;
  switch (state.phase) {
    case 'setup': showScreen('setup-screen'); break;
    case 'names': buildNameInputs(); showScreen('names-screen'); break;
    case 'pre-reveal': renderSummary(); showScreen('pre-reveal-screen'); break;
    case 'reveal': showScreen('reveal-screen'); loadCurrentReveal(); break;
    case 'game': showScreen('game-screen'); resumeTimerIfNeeded(); break;
    case 'deliberation': showScreen('deliberation-screen'); resumeTimerIfNeeded(); break;
    case 'voting': showScreen('voting-screen'); renderVoting(); break;
    case 'results': showResults(); break;
    default: showScreen('setup-screen');
  }
})();
