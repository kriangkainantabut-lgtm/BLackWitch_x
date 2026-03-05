/* ============================================
   Kriangkai Nantabut — Portfolio Scripts
   ============================================ */

/* ===== CUSTOM CURSOR ===== */
const cur  = document.getElementById('cur');
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.transform = `translate(${mx - 9}px, ${my - 9}px)`;
  dot.style.transform = `translate(${mx - 2.5}px, ${my - 2.5}px)`;
});

(function animRing() {
  rx += (mx - rx) * 0.32;
  ry += (my - ry) * 0.32;
  ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '44px';
    ring.style.height = '44px';
    cur.style.opacity = '.4';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '32px';
    ring.style.height = '32px';
    cur.style.opacity = '1';
  });
});

/* ===== SCROLL REVEAL ===== */
const revEls = document.querySelectorAll('.rev');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = (entry.target.dataset.d || 0) * 80;
      setTimeout(() => entry.target.classList.add('vis'), delay);
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revEls.forEach((el, i) => {
  el.dataset.d = i % 5;
  revObs.observe(el);
});

/* ===== MUSIC PLAYER ===== */
let ytPlayer   = null;
let isPlaying  = false;
let progTimer  = null;

const PLAYLIST_ID = 'RDJdzs-qcURQE';
const VIDEO_ID    = 'Jdzs-qcURQE';

// Load YouTube IFrame API
const ytScript = document.createElement('script');
ytScript.src   = 'https://www.youtube.com/iframe_api';
document.head.appendChild(ytScript);

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '1', width: '1',
    videoId: VIDEO_ID,
    playerVars: {
      listType: 'playlist',
      list: PLAYLIST_ID,
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady:       onPlayerReady,
      onStateChange: onStateChange,
    }
  });
};

function onPlayerReady() {
  updateMeta();
}

function onStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById('playIcon').innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    document.getElementById('musicWave').classList.remove('paused');
    startProgress();
    updateMeta();
  } else {
    isPlaying = false;
    document.getElementById('playIcon').innerHTML = '<path d="M8 5v14l11-7z"/>';
    document.getElementById('musicWave').classList.add('paused');
    clearInterval(progTimer);
  }
}

function startProgress() {
  clearInterval(progTimer);
  progTimer = setInterval(() => {
    if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
    const cur2 = ytPlayer.getCurrentTime() || 0;
    const dur  = ytPlayer.getDuration() || 1;
    document.getElementById('musicProgress').style.width = (cur2 / dur * 100) + '%';
    document.getElementById('musicTime').textContent = fmtTime(cur2);
  }, 800);
}

function fmtTime(s) {
  s = Math.floor(s);
  return Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
}

function updateMeta() {
  if (!ytPlayer || typeof ytPlayer.getVideoData !== 'function') return;
  const data = ytPlayer.getVideoData();
  if (data && data.title) {
    const title = data.title.length > 32 ? data.title.slice(0, 32) + '…' : data.title;
    document.querySelector('.music-title').textContent  = title;
    document.querySelector('.music-artist').textContent = data.author || 'YouTube';
  }
}

// Controls
document.getElementById('playBtn').addEventListener('click', () => {
  if (!ytPlayer) return;
  isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (!ytPlayer) return;
  ytPlayer.nextVideo();
  setTimeout(updateMeta, 1500);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (!ytPlayer) return;
  ytPlayer.previousVideo();
  setTimeout(updateMeta, 1500);
});

document.getElementById('closePlayer').addEventListener('click', () => {
  if (ytPlayer) ytPlayer.pauseVideo();
  const bar = document.getElementById('music-bar');
  bar.style.animation = 'slideDown .4s forwards';
  setTimeout(() => bar.style.display = 'none', 400);
});
