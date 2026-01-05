const STORAGE_KEY = 'impostorGameStateV2';
const MAX_PLAYERS = 10;
const MIN_PLAYERS = 3;
const POOLS_CACHE_KEY = 'impostorWordPoolsV1';
const POOLS_MANIFEST_URL = 'word-pools/manifest.json';
const THEME_STORAGE_KEY = 'impostorGameTheme';

// Pools embebidas con palabras de impostores [palabra_civil, palabra_impostor]
const EMBEDDED_POOLS = [
  { id: 'animales_naturaleza', name: 'Animales y Naturaleza', emoji: '🌿', words: [['Oso','Pez'],['Pavo real','Abanico'],['Camello','Arena'],['Lirio','Rana'],['Lobo','Luna'],['Represa','Castor'],['Elefante','Safari'],['Flamenco','Camarón'],['Búho','Nieve'],['Canguro','Koala'],['Jungla','Serpiente'],['Muerte','Cuervo'],['Delfín','Orca'],['Zorro','Gallina'],['Tortuga','Galápagos'],['León','Sabana'],['Polo Sur','Pingüino'],['Hormiga','Trabajo'],['Abeja','Verano'],['Ballena','Dory'],['Mandíbula','Tiburón'],['Río de Janeiro','Loro'],['Caballo','Libertad'],['Gorila','Plata'],['Murciélago','Fruta'],['Venado','Tambor'],['Misisipi','Águila'],['Cisne','Lago'],['Grillo','Campo'],['Leopardo','Manchas'],['Mascarilla','Mapache'],['Chita','Velocidad'],['Araña','Nueva York'],['Playa','Medusa'],['Glaciar','Oso polar'],['Jirafa','Madagascar'],['Maine','Langosta'],['Pulpo','Pluma'],['Cuervo','Pantera'],['Foca','Rosa'],['Mariposa','Algodoncillo'],['Burro','Santorini'],['Lluvia','Caracol'],['Cangrejo','Araña'],['Rana','Grillo'],['Siberia','Tigre'],['Gaviota','Playa'],['Cocodrilo','Nilo'],['Pingüino','Nueva Zelanda'],['Loro','Gato'],['Cuervo','Bandada'],['Conejo','Agujero'],['Tiburón','Paleozoico'],['Trueno','Júpiter'],['Sol','Playa'],['Océano Atlántico','Huracán'],['Tsunami','Derrumbe'],['Ola','Hawái'],['Papel','Árbol'],['Universo','Energía'],['Vida','Tiempo'],['Océano','Tormenta'],['Lago','Sal'],['Oxígeno','Fuego'],['Biología','Célula'],['Tiza','Hielo'],['Clima','Invierno'],['Planeta','Gas'],['Era de hielo','Bellota'],['Avalancha','Montaña'],['Bisonte','Llanuras'],['Floración','Néctar'],['Cañón','Águila'],['Ardilla listada','Nueces'],['Coral','Arrecife'],['Desierto','Espejismo'],['Ecosistema','Equilibrio'],['Halcón','Picado'],['Luciérnaga','Brillo'],['Gecko','Hoja'],['Colibrí','Azúcar'],['Koala','Eucalipto'],['Meteoro','Cráter'],['Nutria','Río'],['Selva tropical','Dosel'],['Rinoceronte','Cuerno'],['Volcán','Ceniza'],['Naturaleza salvaje','Huellas']] },
  { id: 'objetos_cotidianos', name: 'Objetos Cotidianos', emoji: '🏠', words: [['Martillo','Tiburón'],['Silla','Espalda'],['Mesa','Café'],['Cuchara','Crema'],['Tenedor','Posidón'],['Cuchillo','Mantequilla'],['Plata','Plato'],['Copa','Campeonato'],['Vidrio','Arena'],['Botella','Aerosol'],['Lata','Boda'],['Teléfono','Radio'],['Laptop','Tarjeta'],['Teclado','Piano'],['Ratón','Laboratorio'],['Marco','Pantalla'],['Control','Satélite'],['Lámpara','Aceite'],['Horno','Bombilla'],['Vela','Corona de flores'],['Carro','Espejo'],['Ventana','Caja'],['Puerta','Armario'],['Llave','Auto'],['Candado','Sello'],['Monedero','Piel'],['Cartera','Etiqueta'],['Mochila','Avión'],['Maleta','Toalla'],['Sombrero','Paja'],['Zapatos','Vela'],['Calcetas','Medida'],['Playera','Algodón'],['Cierre','Pantalón'],['Abrigo','Pelo'],['Paraguas','Ala'],['Vacaciones','Gafas de sol'],['Reloj de pulsera','Monitor'],['Rueda','Anillo'],['Collar','Tiara'],['Manga','Tatuaje'],['Cama','Monstruo'],['Funda','Media'],['Manta','Cuna'],['Colchón','Aire'],['Libro','Pop-up'],['Revista','Diario'],['Periódico','Columna'],['Pluma','Bola'],['Lápiz','Delineador'],['Borrador','Goma'],['Dibujo','Cuaderno'],['Tijeras','Cabello'],['Regla','Parrilla'],['Pegamento','Tubo'],['Cinta adhesiva','Clip'],['Pincel','Escoba'],['Cesto','Arco'],['Caja','Zapato'],['Sobre','Carta'],['Sello','Fecha'],['Calendario','Luna'],['Reloj','Campana'],['Radio','Onda'],['Bocina','Pared'],['DJ','Audífonos'],['Micrófono','Televisión'],['Televisión','Imagen'],['Cámara','Láser'],['Trípode','Pierna'],['Ventilador','Oxígeno'],['Calefactor','Secadora'],['Estufa','Carbón'],['Refrigerador','Leche'],['Congelador','Helado'],['Microondas','Radar'],['Tostadora','Horno'],['Licuadora','Espátula'],['Olla','Sopa'],['Acero','Sartén'],['Tetera','Cobre'],['Esponja','Gelatina'],['Jabón','Barra'],['Toalla','Ducha'],['Cepillo de dientes','Lengua'],['Pasta de dientes','Gel'],['Marfil','Peine'],['Cepillo','Rastrillo'],['Navaja','Jabón'],['Champú','Sábila'],['Acondicionador','Espuma'],['Loción','Seda'],['Balde','Tierra'],['Trapeador','Piso'],['Escoba','Avión'],['Recogedor','Nube'],['Basurero','Camión'],['Reciclaje','Papel'],['Escalera','Cuerda']] }
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
  selectedPools: ['animales_naturaleza', 'objetos_cotidianos'], // Ahora es un array para múltiples pools
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
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  return lines.map(line => {
    // Formato: palabra_civil|palabra_impostor
    if (line.includes('|')) {
      const [civil, impostor] = line.split('|').map(s => s.trim());
      return [civil, impostor];
    }
    // Fallback: si no tiene pipe, usar la misma palabra para ambos
    return [line, line];
  });
}

async function pickWords() {
  const selectedIds = state.selectedPools && state.selectedPools.length > 0 ? state.selectedPools : ['animales_naturaleza'];
  let allWords = [];

  // Recopilar palabras de todos los pools seleccionados
  for (const poolId of selectedIds) {
    let words = [];

    // Buscar en pools embebidas primero
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
    // Fallback a pool embebida
    allWords = EMBEDDED_POOLS[0].words;
  }

  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const wordPair = shuffled[0];

  // wordPair es [palabra_civil, palabra_impostor]
  return { civilian: wordPair[0], impostor: wordPair[1] };
}

function renderPoolButtons() {
  const container = document.getElementById('pool-buttons');
  if (!container) return;
  container.innerHTML = '';

  // Asegurar que selectedPools sea un array
  if (!Array.isArray(state.selectedPools)) {
    state.selectedPools = [state.selectedPools || 'animales_naturaleza'];
  }

  availablePools.forEach(pool => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pool-btn';
    btn.textContent = `${pool.emoji || '🎲'} ${pool.name || pool.id}`;
    if (state.selectedPools.includes(pool.id)) btn.classList.add('selected');
    btn.onclick = () => {
      // Toggle selección múltiple
      if (state.selectedPools.includes(pool.id)) {
        state.selectedPools = state.selectedPools.filter(id => id !== pool.id);
        // Asegurar que al menos haya uno seleccionado
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

  // Generar lista de pools seleccionadas
  const selectedIds = Array.isArray(state.selectedPools) ? state.selectedPools : [state.selectedPools || 'animales_naturaleza'];
  const poolsText = selectedIds.map(id => {
    const pool = availablePools.find(p => p.id === id) || EMBEDDED_POOLS.find(p => p.id === id);
    return pool ? `${pool.emoji || '🎲'} ${pool.name || pool.id}` : id;
  }).join(', ');

  el.innerHTML = `
    <p><strong>Jugadores:</strong> ${state.numPlayers}</p>
    <p><strong>Impostores:</strong> ${state.numImpostors}</p>
    <p><strong>Tiempo de partida:</strong> ${fmt(state.gameTime)}</p>
    <p><strong>Tiempo de deliberación:</strong> ${fmt(state.deliberationTime)}</p>
    <p><strong>Pools:</strong> ${poolsText}</p>
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

  // Resetear estado de la cortina
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

  // Restablecer la transición CSS y usar la clase
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

// Sistema de cortina con GRAVEDAD - La cortina siempre tiende a bajar
// Soporta tanto touch (móvil) como mouse (escritorio)
let curtainState = { isRevealed: false };

(() => {
  const curtain = document.getElementById('curtain');
  const cover = document.getElementById('curtain-cover');
  let startY = null;
  let isDragging = false;

  // Función para obtener la posición Y del evento (touch o mouse)
  const getY = (e) => {
    return e.touches ? e.touches[0].clientY : e.clientY;
  };

  // Función de inicio (touch y mouse)
  const handleStart = (e) => {
    const coverEl = document.getElementById('curtain-cover');
    startY = getY(e);
    isDragging = true;
    if (e.type === 'mousedown') {
      e.preventDefault(); // Prevenir selección de texto en escritorio
    }
  };

  // Función de movimiento (touch y mouse)
  const handleMove = (e) => {
    if (startY === null || !isDragging) return;
    const currentY = getY(e);
    const dy = currentY - startY;
    const coverEl = document.getElementById('curtain-cover');

    // Calcular el desplazamiento: negativo = arriba, positivo = abajo
    // Limitar el movimiento hacia arriba (no más allá de la altura de la cortina)
    // y no permitir bajar más de la posición inicial (0)
    const translateY = Math.max(Math.min(dy, 0), -cover.offsetHeight);

    coverEl.style.transform = `translateY(${translateY}px)`;
    coverEl.style.transition = 'none';

    // Si levanta suficiente, mostrar contenido
    if (translateY < -80 && !curtainState.isRevealed) {
      curtainState.isRevealed = true;
      const idx = state.revealOrder[state.currentReveal];
      const role = state.roles[idx];
      const word = role === 'CIVIL' ? state.civilianWord : state.impostorWord;
      document.getElementById('role-text').textContent = role;
      document.getElementById('role-text').className = 'role ' + (role === 'CIVIL' ? 'civil' : 'impostor');
      document.getElementById('word-text').textContent = word;
    }

    if (e.type === 'mousemove') {
      e.preventDefault(); // Prevenir selección en escritorio
    }
  };

  // Función de finalización (touch y mouse)
  const handleEnd = (e) => {
    if (!isDragging || startY === null) return;
    const coverEl = document.getElementById('curtain-cover');

    // SIEMPRE volver a bajar la cortina cuando se suelta (GRAVEDAD)
    coverEl.style.transition = 'transform 0.4s ease';
    coverEl.style.transform = 'translateY(0)';

    // Si ya se reveló el contenido, mostrar botón después de que baje
    if (curtainState.isRevealed) {
      setTimeout(() => {
        if (state.currentReveal + 1 < state.numPlayers) {
          document.getElementById('next-player-btn').style.display = 'block';
        } else {
          document.getElementById('start-game-btn').style.display = 'block';
        }
      }, 400);
    }

    startY = null;
    isDragging = false;
  };

  // Eventos touch (móvil)
  curtain.addEventListener('touchstart', handleStart, {passive:true});
  curtain.addEventListener('touchmove', handleMove, {passive:true});
  curtain.addEventListener('touchend', handleEnd, {passive:true});
  curtain.addEventListener('touchcancel', handleEnd, {passive:true});

  // Eventos mouse (escritorio)
  curtain.addEventListener('mousedown', handleStart);
  curtain.addEventListener('mousemove', handleMove);
  curtain.addEventListener('mouseup', handleEnd);
  curtain.addEventListener('mouseleave', (e) => {
    // Si el mouse sale del área mientras arrastra, soltar (gravedad)
    if (isDragging) {
      handleEnd(e);
    }
  });
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

function newMatch() {
  clearState();
  state = { ...state, phase:'welcome', timerEndAt:null, timerPhase:null, votingPool:null, isTiebreak:false, tiebreakCandidates:[] };
  saveState();
  showScreen('welcome-screen');
}

// ---------- Sistema de temas ----------
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

// Inicializar tema
const initialTheme = loadTheme();
applyTheme(initialTheme);

// Event listener para el botón de tema
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Detectar cambios en el tema del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Solo aplicar automáticamente si el usuario no ha seleccionado un tema manualmente
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});

// ---------- Rehidratación ----------
(function init() {
  const restored = loadState();
  loadPoolsList();
  if (!state.turnDirection) state.turnDirection = 'horario';
  if (typeof state.startPlayer !== 'number') state.startPlayer = 0;

  // Establecer valores por defecto en los inputs si estamos en setup
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

  // Determinar pantalla inicial
  if (!restored || state.phase === 'setup' || state.phase === 'welcome') {
    // Si no hay estado guardado o estamos en setup/welcome, mostrar bienvenida
    showScreen('welcome-screen');
  } else {
    // Si hay una partida en curso, restaurarla
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
})();
