document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const heartBtn = document.getElementById('landing-heart');
  const app = document.getElementById('app');
  const hubView = document.getElementById('hub-view');
  const monthView = document.getElementById('month-view');
  const monthContent = document.getElementById('month-content');
  const homeBtn = document.getElementById('home-btn');
  const monthButtons = document.querySelectorAll('.month-btn');

  // Landing -> App
  heartBtn.addEventListener('click', () => {
    landing.classList.add('landing-open');
    setTimeout(() => {
      landing.style.display = 'none';
      app.style.display = 'block';
    }, 600);
  });

  // Month buttons
  monthButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      openMonth(btn.dataset.month);
    });
  });

  function openMonth(month) {
    hubView.style.display = 'none';
    monthView.style.display = 'block';
    if (month === '0') {
      monthContent.innerHTML = renderMonth0();
      attachMonth0Handlers();
    } else if (month === '1') {
      monthContent.innerHTML = renderMonth1();
    } else {
      monthContent.innerHTML = renderLocked(month);
    }
    enableSwipeBack();
  }

  function showHub() {
    monthView.style.display = 'none';
    hubView.style.display = 'block';
  }

  homeBtn.addEventListener('click', showHub);

  // Month 0
  function renderMonth0() {
    return `
      <div class="month-screen" data-month="0">
        <h2>Our beginning 💖</h2>
        <p style="color:rgba(54,43,57,0.55); margin-top:-.3rem;">The very dramatic reveal.</p>
        <div class="video-wrap">
          <iframe
              id="yt"
              class="video"
              title="YouTube video"
              src="https://www.youtube.com/embed/r5pYL-Y--To"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
        </div>
        <button id="show-question-btn">click here once clarinet solo starts ➜</button>
        <div id="question-step" style="display:none;">
          <p>Wil je verkering met me? 🥹</p>
          <button id="answer-yes">JA 💘</button>
          <button id="answer-no">NE 😈</button>
          <button id="answer-no">MISSCHIEN 😈</button>
        </div>
      </div>`;
  }

  function attachMonth0Handlers() {
    const showQuestionBtn = document.getElementById('show-question-btn');
    const questionStep = document.getElementById('question-step');
    const yesBtn = document.getElementById('answer-yes');
    const noBtn = document.getElementById('answer-no');

    if (showQuestionBtn) {
      showQuestionBtn.addEventListener('click', () => {
        questionStep.style.display = 'block';
        showQuestionBtn.style.display = 'none';
      });
    }

    if (yesBtn) {
      yesBtn.addEventListener('click', () => spawnHearts(18));
    }

    if (noBtn) {
      noBtn.addEventListener('click', () => alert("that is an incorrect answer 😌"));
    }
  }

  // Month 1
  function renderMonth1() {
    return `
      <div class="month-screen" data-month="1">
        <h2>Month 1 🍊</h2>
        <p style="color:rgba(54,43,57,0.55); margin-top:-.3rem;">Still choosing you.</p>
        <div style="background:linear-gradient(140deg, rgba(185,156,255,.55), rgba(255,159,67,.4)); border-radius:1rem; height:180px; display:flex; align-items:center; justify-content:center; color:white; font-weight:600;">
          <img src="assets/italy.jpg" alt="Italy trip photo" />
        </div>
        <p>We managed to get lost and find each other again (figuratively and literally)</p>
      </div>`;
  }

  function renderLocked(month) {
    return `
      <div class="month-screen">
        <h2>Month ${month} 🔒</h2>
        <p>This one isn’t cooked yet. Come back next month 👀</p>
      </div>`;
  }

  // Swipe right to go back
  function enableSwipeBack() {
    let startX = 0;
    let endX = 0;
    monthView.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    monthView.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) showHub();
    }, { passive: true });
  }

  // Floating hearts
  function spawnHearts(count) {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.textContent = Math.random() > 0.4 ? '💖' : '🧡';
      heart.className = 'floating-heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = 20 + Math.random() * 22 + 'px';
      heart.style.animationDuration = 2 + Math.random() * 2.5 + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }
  }

  // Days counter
  const daysCounter = document.getElementById('days-counter');
  if (daysCounter) {
    const startDate = new Date('2025-09-28'); // change to your date
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    daysCounter.textContent = `${days} days of us`;
  }
});
