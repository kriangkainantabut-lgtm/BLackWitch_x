/* ============================================================
   BLackWitch_x — main.js
   Cursor · Scroll · Particles · Typewriter · Tilt · Ripple · Music
============================================================ */

/* ── Scroll progress bar ── */
const scrollBar = document.getElementById('scroll-bar');
function updateScrollBar() {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (scrollBar) scrollBar.style.width = Math.min(pct, 100) + '%';
}
window.addEventListener('scroll', updateScrollBar, { passive: true });

/* ── Nav scroll effect + active link ── */
const nav = document.querySelector('nav');
const allSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── Mobile hamburger drawer ── */
const burger = document.getElementById('navBurger');
const drawer = document.getElementById('navDrawer');
const dClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.style.display = 'flex';
  requestAnimationFrame(() => drawer.classList.add('open'));
  burger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { drawer.style.display = 'none'; }, 320);
}
if (burger) burger.addEventListener('click', () =>
  drawer.classList.contains('open') ? closeDrawer() : openDrawer()
);
if (dClose) dClose.addEventListener('click', closeDrawer);
if (drawer) drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

/* ── Custom cursor (desktop only) ── */
const isMobile = window.matchMedia('(hover:none)').matches;
if (!isMobile) {
  const curEl  = document.getElementById('cur');
  const dotEl  = document.getElementById('cur-dot');
  const ringEl = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (curEl)  curEl.style.transform  = `translate(${mx-10}px,${my-10}px)`;
    if (dotEl)  dotEl.style.transform  = `translate(${mx-2.5}px,${my-2.5}px)`;
  });

  (function animRing() {
    rx += (mx - rx) * .3;
    ry += (my - ry) * .3;
    if (ringEl) ringEl.style.transform = `translate(${rx-18}px,${ry-18}px)`;
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button,.sk,.proj-c,.cl').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (ringEl) { ringEl.style.width='48px'; ringEl.style.height='48px'; ringEl.style.borderRadius='50%'; ringEl.style.borderColor='rgba(56,189,248,.6)'; }
      if (curEl) curEl.style.opacity = '.3';
    });
    el.addEventListener('mouseleave', () => {
      if (ringEl) { ringEl.style.width='36px'; ringEl.style.height='36px'; ringEl.style.borderRadius='6px'; ringEl.style.borderColor='rgba(56,189,248,.4)'; }
      if (curEl) curEl.style.opacity = '1';
    });
  });
}

/* ── Scroll reveal with stagger ── */
const revEls = document.querySelectorAll('.rev');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = +(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('vis'), delay);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revEls.forEach((el, i) => {
  if (!el.dataset.delay) el.dataset.delay = (i % 7) * 85;
  revObs.observe(el);
});

/* ── Floating particles ── */
const ptContainer = document.querySelector('.particles');
if (ptContainer) {
  const colors = ['#38bdf8', '#6366f1', '#ec4899', '#7dd3fc'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size  = Math.random() * 3.5 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px;height:${size}px;
      background:${color};
      left:${Math.random()*100}%;
      bottom:${-size}px;
      animation-duration:${8+Math.random()*12}s;
      animation-delay:${Math.random()*10}s;
    `;
    ptContainer.appendChild(p);
  }
}

/* ── Typewriter effect ── */
const typeTarget = document.getElementById('typeText');
if (typeTarget) {
  const words = ['Full-Stack Developer', 'UI/UX Engineer', 'API Architect', 'Open Source Coder'];
  let wi = 0, ci = 0, deleting = false;
  const type = () => {
    const word = words[wi];
    typeTarget.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 50 : 100;
    if (!deleting && ci > word.length)  { delay = 2000; deleting = true; }
    if (deleting  && ci < 0)            { delay = 350; deleting = false; wi = (wi+1) % words.length; ci = 0; }
    setTimeout(type, delay);
  };
  setTimeout(type, 1400);
}

/* ── Card tilt effect (desktop) ── */
if (!isMobile) {
  document.querySelectorAll('.proj-c:not(.proj-more)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 10;
      const y = ((e.clientY - r.top)  / r.height - .5) * 8;
      card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── Ripple click effect ── */
function addRipple(el) {
  el.addEventListener('click', e => {
    const r    = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const rip  = document.createElement('span');
    rip.style.cssText = `
      position:absolute;border-radius:50%;
      background:rgba(255,255,255,.22);
      width:${size}px;height:${size}px;
      left:${e.clientX-r.left-size/2}px;
      top:${e.clientY-r.top-size/2}px;
      transform:scale(0);pointer-events:none;
      animation:ripple .55s ease-out forwards;
    `;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  });
}
document.querySelectorAll('.btn-p,.btn-g,.music-play-btn').forEach(addRipple);

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = target / 80;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur) + suffix;
    if (cur >= target) clearInterval(t);
  }, 16);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); cntObs.unobserve(e.target); }
  });
}, { threshold: .5 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* ── Skill grid stagger delays ── */
document.querySelectorAll('.skill-grid .sk').forEach((el, i) => {
  el.style.setProperty('--i', i);
  el.style.transitionDelay = `${i * 48}ms`;
});

/* ══════════════════════════════════════
   MUSIC PLAYER (YouTube postMessage API)
══════════════════════════════════════ */
(function () {
  const frame    = document.getElementById('yt-frame');
  const ytWrap   = document.getElementById('yt-wrap');
  const bar      = document.getElementById('music-bar');
  const playBtn  = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const wave     = document.getElementById('musicWave');
  const progEl   = document.getElementById('musicProgress');
  const timeEl   = document.getElementById('musicTime');
  const volEl    = document.getElementById('volSlider');
  const vidBtn   = document.getElementById('vidToggle');
  const closeBtn = document.getElementById('closePlayer');
  if (!frame || !bar) return;

  const ICON = {
    play:  '<path d="M8 5v14l11-7z"/>',
    pause: '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
  };
  let playing = false, vidShown = false, timer = null;

  function cmd(func, args) {
    try { frame.contentWindow.postMessage(JSON.stringify({ event:'command', func, args: args||[] }), '*'); }
    catch(e) {}
  }

  window.addEventListener('message', ev => {
    if (!ev.data) return;
    let d;
    try { d = typeof ev.data==='string' ? JSON.parse(ev.data) : ev.data; } catch(e){ return; }

    if (d.event === 'onStateChange') {
      const playing1 = d.info === 1;
      playing = playing1;
      playIcon.innerHTML = playing1 ? ICON.pause : ICON.play;
      wave.classList.toggle('paused', !playing1);
      playing1 ? startTimer() : clearInterval(timer);
    }
    if (d.event === 'infoDelivery' && d.info?.currentTime != null) {
      const c = d.info.currentTime || 0, u = d.info.duration || 1;
      progEl.style.width = (c/u*100) + '%';
      if (timeEl) timeEl.textContent = fmt(c);
    }
  });

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      try { frame.contentWindow.postMessage(JSON.stringify({ event:'listening', id:1, channel:'widget' }), '*'); }
      catch(e){}
    }, 1000);
  }
  function fmt(s) {
    s = Math.floor(s);
    return Math.floor(s/60) + ':' + (s%60<10?'0':'') + (s%60);
  }

  frame.addEventListener('load', () => setTimeout(() => cmd('setVolume', [70]), 1200));

  playBtn.addEventListener('click',  () => cmd(playing ? 'pauseVideo' : 'playVideo'));
  if (prevBtn) prevBtn.addEventListener('click', () => cmd('previousVideo'));
  if (nextBtn) nextBtn.addEventListener('click', () => cmd('nextVideo'));
  if (volEl)   volEl.addEventListener('input', function() { cmd('setVolume', [+this.value]); });

  if (vidBtn) vidBtn.addEventListener('click', () => {
    vidShown = !vidShown;
    ytWrap?.classList.toggle('show', vidShown);
    vidBtn.classList.toggle('on', vidShown);
  });

  if (closeBtn) closeBtn.addEventListener('click', () => {
    cmd('pauseVideo');
    bar.style.animation = 'slideDown .35s forwards';
    if (ytWrap) ytWrap.style.display = 'none';
    setTimeout(() => bar.style.display = 'none', 380);
  });
})();
