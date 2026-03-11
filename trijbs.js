/* ============================================================
   TRIJBS.JS — Personality, Easter Eggs & Delight System
   trijbsworld.nl / trijbs.github.io
   ============================================================ */

// ── 1. DEVELOPER CONSOLE ────────────────────────────────────

function devConsoleGreeting() {
  console.log(
    "%c T R I J B S ",
    "background:#F8333C;color:#000;font-size:20px;font-weight:900;font-family:Montserrat,sans-serif;padding:8px 16px;letter-spacing:4px;"
  );
  console.log(
    "%cwhere visuals, code & culture collide",
    "color:#93A8AC;font-size:13px;font-family:Inter,sans-serif;"
  );
  console.log(" ");
  console.log("─────────────────────────────────────────");
  console.log("👋  hey. you found the console.");
  console.log("    that already says something about you.");
  console.log("─────────────────────────────────────────");
  console.log(" ");
  console.log("%c[ THE MANIFESTO ]", "color:#F8333C;font-weight:700;");
  console.log("  I.   make the thing before it's ready.");
  console.log("  II.  ship it ugly. fix it live.");
  console.log("  III. the work is the brand. everything else is noise.");
  console.log(" ");
  console.log("%c[ EASTER EGG HINT ]", "color:#F8333C;font-weight:700;");
  console.log("  there are 8 hidden things on this site.");
  console.log("  you found one already. this one doesn't count.");
  console.log("  try the logo. try the scroll. try staying too long.");
  console.log(" ");
  console.log("%c[ LET'S BUILD ]", "color:#F8333C;font-weight:700;");
  console.log("  if you're looking at this, you're probably the kind");
  console.log("  of person worth building with.");
  console.log(" ");
  console.log("  → trijbsworld.nl");
  console.log("  → github.com/trijbs");
  console.log(" ");
  console.log("  (this message is not automated. someone wrote it.");
  console.log("   that person wants to see what you're building.)");
  console.log(" ");
  console.log("─────────────────────────────────────────");
  console.log("  create something today even if it sucks.");
  console.log("─────────────────────────────────────────");
}

// ── 2. AFTER-HOURS MESSAGE ───────────────────────────────────

function initAfterHours() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 4) {
    const hero = document.querySelector('.fullscreen-hero p');
    if (!hero) return;
    const late = document.createElement('p');
    late.textContent = "you're up late. the best things usually get made now.";
    late.style.cssText = 'font-size:0.85rem;color:#93A8AC;font-style:italic;margin-top:0.5rem;opacity:0.8;';
    hero.insertAdjacentElement('afterend', late);
  }
}

// ── 3. REFERRAL CONTEXT ──────────────────────────────────────

function initReferralContext() {
  const ref = document.referrer;
  const params = new URLSearchParams(window.location.search);
  const utm = params.get('utm_source') || '';
  const sub = document.querySelector('.fullscreen-hero p');
  if (!sub) return;

  let msg = '';
  if (ref.includes('instagram.com') || utm === 'instagram') {
    msg = "you saw it on the grid. now see the rest.";
  } else if (ref.includes('tiktok.com') || utm === 'tiktok') {
    msg = "you scrolled here. good call.";
  } else if (ref.includes('twitter.com') || ref.includes('t.co') || utm === 'twitter') {
    msg = "someone linked this. they were right.";
  }

  if (msg) {
    const original = sub.textContent;
    sub.textContent = msg;
    sub.style.transition = 'opacity 0.4s';
    setTimeout(() => {
      sub.style.opacity = '0';
      setTimeout(() => {
        sub.textContent = original;
        sub.style.opacity = '1';
      }, 400);
    }, 4000);
  }
}

// ── 4. MONDAY MARQUEE SWAP ───────────────────────────────────

function initMondayMarquee() {
  const day = new Date().getDay();   // 1 = Monday
  const hour = new Date().getHours();
  if (day === 1 && hour >= 8 && hour < 12) {
    const marquee = document.querySelector('.marquee-text');
    if (marquee) {
      const original = marquee.textContent;
      marquee.textContent = 'MONDAY. STILL HERE. STILL BUILDING. — ' + original;
    }
  }
}

// ── 5. RETURN AFTER 14 DAYS ──────────────────────────────────

function initReturnBanner() {
  const now = Date.now();
  const last = parseInt(localStorage.getItem('trijbs_last_visit') || '0', 10);
  localStorage.setItem('trijbs_last_visit', now);
  if (!last) return;
  const daysSince = (now - last) / (1000 * 60 * 60 * 24);
  if (daysSince >= 14) {
    const banner = document.createElement('div');
    banner.id = 'return-banner';
    banner.innerHTML = `You've been gone a while. A lot happened. <a href="#explore">Start here →</a>`;
    banner.style.cssText = `
      position:fixed;top:0;left:0;right:0;z-index:9000;
      background:#111;color:#fff;text-align:center;
      padding:10px 16px;font-size:0.85rem;font-family:Inter,sans-serif;
      border-bottom:1px solid #333;cursor:pointer;
    `;
    const link = banner.querySelector('a');
    if (link) link.style.cssText = 'color:#F8333C;text-decoration:none;margin-left:4px;';
    document.body.prepend(banner);
    setTimeout(() => banner.remove(), 6000);
    banner.addEventListener('click', () => banner.remove());
  }
}

// ── 6. EASTER EGG: BOTTOM OF PAGE ───────────────────────────

function initBottomReveal() {
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'height:1px;width:100%;';
  document.body.appendChild(sentinel);

  const msg = document.createElement('p');
  msg.id = 'bottom-reveal';
  msg.textContent = "You made it to the bottom. Nobody does that. You're different.";
  msg.style.cssText = `
    text-align:center;font-size:0.75rem;color:#93A8AC;
    opacity:0;transition:opacity 0.6s ease;padding:12px;
    font-family:Inter,sans-serif;font-style:italic;
  `;
  document.body.appendChild(msg);

  let revealTimer;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealTimer = setTimeout(() => { msg.style.opacity = '1'; }, 2000);
      } else {
        clearTimeout(revealTimer);
        msg.style.opacity = '0';
      }
    });
  }, { threshold: 1.0 });

  observer.observe(sentinel);
}

// ── 7. EASTER EGG: IDLE TOAST ────────────────────────────────

function initIdleToast() {
  let idleTimer;

  function resetTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showToast, 90000);
  }

  function showToast() {
    if (document.getElementById('idle-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'idle-toast';
    toast.textContent = "Still here? Respect. Most people leave faster than that.";
    toast.style.cssText = `
      position:fixed;bottom:24px;left:24px;z-index:9999;
      background:#000;color:#fff;border:1px solid #333;
      padding:12px 16px;border-radius:8px;font-size:0.85rem;
      font-family:Inter,sans-serif;max-width:280px;
      animation:slideInLeft 0.3s ease;
    `;
    const dot = document.createElement('span');
    dot.style.cssText = 'display:inline-block;width:6px;height:6px;border-radius:50%;background:#F8333C;margin-right:8px;vertical-align:middle;';
    toast.prepend(dot);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  ['mousemove','scroll','click','keydown','touchstart'].forEach(e =>
    document.addEventListener(e, resetTimer, { passive: true })
  );
  resetTimer();
}

// ── 8. EASTER EGG: LOGO RAPID CLICK GLITCH ──────────────────

function initLogoGlitch() {
  const logo = document.getElementById('logo-img') || document.querySelector('.hero-logo');
  if (!logo) return;

  let clickCount = 0;
  let clickTimer;

  logo.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

    if (clickCount >= 7) {
      clickCount = 0;
      logo.classList.add('glitch-active');
      const originalTitle = document.title;
      document.title = 'ok ok ok we get it';
      setTimeout(() => {
        logo.classList.remove('glitch-active');
        document.title = originalTitle;
      }, 3000);
    }
  });
}

// ── 9. EASTER EGG: MARQUEE REVERSE ──────────────────────────

function initMarqueeReverse() {
  const marquee = document.querySelector('.marquee-text');
  if (!marquee) return;

  marquee.style.cursor = 'pointer';
  marquee.addEventListener('click', () => {
    const original = marquee.textContent;
    marquee.style.opacity = '0';
    setTimeout(() => {
      marquee.textContent = 'going the other way now. respect.';
      marquee.style.animationDirection = 'reverse';
      marquee.style.opacity = '1';
    }, 200);
    setTimeout(() => {
      marquee.style.opacity = '0';
      setTimeout(() => {
        marquee.textContent = original;
        marquee.style.animationDirection = 'normal';
        marquee.style.opacity = '1';
      }, 200);
    }, 5000);
  });
}

// ── 10. EASTER EGG: KONAMI CODE ──────────────────────────────

function initKonamiCode() {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let seq = [];

  document.addEventListener('keydown', (e) => {
    seq.push(e.key);
    seq = seq.slice(-KONAMI.length);
    if (seq.join(',') === KONAMI.join(',')) {
      triggerKonami();
    }
  });

  function triggerKonami() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:#fff;display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      animation:konamiFlash 2.5s ease forwards;
    `;
    const logoEl = document.createElement('img');
    logoEl.src = 'logo.png';
    logoEl.style.cssText = 'width:120px;filter:none;animation:konamiLogo 2.5s ease forwards;';
    const text = document.createElement('p');
    text.textContent = 'You looked for a secret. You found one. That\'s the whole point.';
    text.style.cssText = `
      margin-top:1rem;font-family:Montserrat,sans-serif;font-weight:700;
      color:#000;font-size:1rem;animation:fadeIn 0.6s ease 0.8s both;
    `;
    overlay.append(logoEl, text);
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 2500);
  }
}

// ── 11. PRELOADER: FIRST vs RETURN VISIT ─────────────────────

function initSmartPreloader() {
  const isFirstVisit = !localStorage.getItem('trijbs_visited');
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  if (isFirstVisit) {
    // First visit: type out tagline + red rule
    localStorage.setItem('trijbs_visited', '1');
    const tagline = document.createElement('div');
    tagline.id = 'preloader-tagline';
    tagline.style.cssText = `
      color:#fff;font-family:Montserrat,sans-serif;font-weight:700;
      font-size:0.75rem;letter-spacing:3px;margin-top:1rem;
      overflow:hidden;white-space:nowrap;border-right:2px solid #F8333C;
      width:0;animation:typeOut 1.2s steps(40,end) 0.5s forwards;
    `;
    tagline.textContent = 'WHERE VISUALS, CODE & CULTURE COLLIDE';
    const rule = document.createElement('div');
    rule.style.cssText = `
      height:2px;background:#F8333C;width:0;margin-top:0.5rem;
      animation:expandRule 0.4s ease 1.8s forwards;
    `;
    preloader.appendChild(tagline);
    preloader.appendChild(rule);
  } else {
    // Return visit: instant logo, no delay
    preloader.style.transition = 'none';
    const loaderLogo = preloader.querySelector('.loader-logo');
    if (loaderLogo) {
      loaderLogo.style.animation = 'none';
      loaderLogo.style.opacity = '1';
    }
  }
}

// ── INIT ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  devConsoleGreeting();
  initAfterHours();
  initReferralContext();
  initMondayMarquee();
  initReturnBanner();
  initBottomReveal();
  initIdleToast();
  initLogoGlitch();
  initMarqueeReverse();
  initKonamiCode();
  initSmartPreloader();
});
