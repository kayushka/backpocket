const qs  = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

const body      = document.body;
const screenA   = qs('#screen-a');
const screenB   = qs('#screen-b');
const screenC   = qs('#screen-c');
const screenD   = qs('#screen-d');
const heartBtn  = qs('#heart');
const toCBtn    = qs('#to-c');
const yesBtn    = qs('#yes');
const noBtn     = qs('#no');
const maybeBtn  = qs('#maybe');
const particles = qs('#particles');

function setState(state){
  body.dataset.state = state;
  screenA.hidden = state !== 'a';
  screenB.hidden = state !== 'b';
  screenC.hidden = state !== 'c';
  screenD.hidden = state !== 'd';
}

/* --- Screen A -> split, then go to B --- */
heartBtn.addEventListener('click', () => {
  body.classList.add('a-splitting');
  // Wait for panels to finish moving, then switch to B
  const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650;
  setTimeout(() => {
    setState('b');
    body.classList.remove('a-splitting');
  }, duration);
});

/* --- B button -> C --- */
toCBtn.addEventListener('click', () => {
  setState('c');
});

/* --- C: button behaviors --- */
yesBtn.addEventListener('click', () => {
  burstHearts(28);
  setState('d');
});

noBtn.addEventListener('click', () => {
  // lil' shake for Screen C
  screenC.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(0)' },
    ],
    { duration: 220, easing: 'ease-out' }
  );
});

maybeBtn.addEventListener('click', () => {
  // lil' shake for Screen C
  screenC.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(0)' },
    ],
    { duration: 220, easing: 'ease-out' }
  );
});

/* --- Heart particles --- */
function burstHearts(count = 20, opts = {}){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const { gentle = false } = opts;
  const rect = screenC.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = '❤';

    // start pos roughly center area
    const startX = rect.left + rect.width * (0.35 + Math.random()*0.3);
    const startY = rect.top  + rect.height* (0.45 + Math.random()*0.2);

    // randomize offset and size
    const size = 16 + Math.random()*18;               // px
    const dx   = (Math.random() - 0.5) * 160;         // horizontal drift
    const dy   = 120 + Math.random() * (gentle ? 60 : 200);

    el.style.left = `${startX}px`;
    el.style.top  = `${startY}px`;
    el.style.fontSize = `${size}px`;
    el.style.setProperty('--x', '0px');
    el.style.setProperty('--y', '0px');
    el.style.setProperty('--dx', `${dx}px`);
    el.style.setProperty('--dy', `${dy}px`);
    el.style.setProperty('--s', `${0.9 + Math.random()*0.6}`);

    particles.appendChild(el);

    const duration = gentle ? 900 + Math.random()*600 : 800 + Math.random()*1200;
    el.style.animation = `floatUp ${duration}ms ease-out forwards`;
    el.addEventListener('animationend', () => el.remove());
  }
}

/* Accessibility: allow Enter/Space on heart to trigger split even if JS focus weirdness */
heartBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    heartBtn.click();
  }
});

/* Start at Screen A */
setState('a');
