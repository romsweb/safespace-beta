/*
 * « 1h47 » — moteur du scroll-film (GSAP + ScrollTrigger + Lenis).
 * Même loi d'ordre que les autres versions : scènes pinnées d'abord (ordre DOM),
 * triggers ambiants (timecode, compteurs, reveals) après.
 * Contrat dev : ?jump=<scrollY> + window.__ready.
 */
(function () {
  'use strict';

  var JUMP = new URLSearchParams(location.search).get('jump');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markReady() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        window.__ready = true;
      });
    });
  }

  if (reduced || !window.gsap || !window.ScrollTrigger) {
    markReady();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (JUMP !== null) {
    history.scrollRestoration = 'manual';
    document.documentElement.style.scrollBehavior = 'auto';
  }

  var lenis = null;
  if (JUMP === null && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) {
      lenis.raf(t * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  function fmtClock(minutesFrom8) {
    var total = 8 * 60 + Math.round(minutesFrom8);
    var h = Math.floor(total / 60);
    var m = total % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  /* ── Ouverture : titre héros ── */
  document.querySelectorAll('.hero-title .line').forEach(function (line) {
    var text = line.textContent;
    line.textContent = '';
    var inner = document.createElement('span');
    inner.textContent = text;
    line.appendChild(inner);
  });
  gsap.from('.hero-title .line > span', {
    yPercent: 120,
    duration: 1.1,
    stagger: 0.11,
    ease: 'power4.out',
    delay: 0.15,
  });
  gsap.from('.kicker-line, .hero-sub, .hero-ctas, .scroll-hint', {
    opacity: 0,
    y: 18,
    duration: 0.9,
    stagger: 0.09,
    ease: 'power2.out',
    delay: 0.5,
  });
  gsap.from('.window', { opacity: 0, y: 40, rotateY: -8, duration: 1.1, ease: 'power3.out', delay: 0.35 });

  /* ════════ SCÈNES PINNÉES ════════ */

  /* CH.1 — LE MATIN : la fenêtre vit, l'horloge tourne, puis la frappe */
  var winClock = document.getElementById('win-clock');
  var tlMatin = gsap.timeline({
    scrollTrigger: {
      trigger: '#matin',
      start: 'top top',
      end: '+=170%',
      pin: true,
      scrub: true,
      onUpdate: function (self) {
        // 08:02 → 08:17 sur la durée de la scène
        if (winClock) winClock.textContent = fmtClock(self.progress * 15);
      },
    },
  });
  tlMatin
    .to('.hero-copy', { opacity: 0, y: -40, ease: 'power1.in', duration: 0.22 }, 0.1)
    .to('.scroll-hint', { opacity: 0, duration: 0.08 }, 0)
    .to('.window', { scale: 1.06, x: '-12%', ease: 'none', duration: 0.5 }, 0.1)
    /* pré-tremblements */
    .to('.glitch-slice', { opacity: 0.5, duration: 0.015, stagger: 0.01 }, 0.5)
    .to('.glitch-slice', { opacity: 0, duration: 0.02 }, 0.55)
    .to('.window', { x: '-11%', duration: 0.01 }, 0.5)
    .to('.window', { x: '-12%', duration: 0.01 }, 0.52)
    /* la frappe : fichiers verrouillés un à un */
    .to('.n-ok', { opacity: 0, duration: 0.05, stagger: 0.045 }, 0.6)
    .to('.n-locked', { opacity: 1, duration: 0.05, stagger: 0.045 }, 0.6)
    .to('.glitch-slice', { opacity: 0.75, duration: 0.02, stagger: 0.015 }, 0.62)
    .to('.glitch-slice', { opacity: 0, duration: 0.03 }, 0.72)
    /* l'écran de rançon */
    .to('.ransom', { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.12 }, 0.82)
    .to('.win-bar', { backgroundColor: '#2a1416', duration: 0.1 }, 0.82);

  /* CH.2 — LA FRAPPE : le constat */
  var tlFrappe = gsap.timeline({
    scrollTrigger: {
      trigger: '#frappe',
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
    },
  });
  tlFrappe
    .fromTo('.beat-frappe', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.06)
    .from('.strike-stats div', { opacity: 0, y: 30, stagger: 0.07, duration: 0.16, ease: 'power2.out' }, 0.3)
    .to('.beat-frappe', { opacity: 0, y: -40, duration: 0.2, ease: 'power1.in' }, 0.82);

  /* CH.3 — LA BASCULE : le chrono tourne, tout se rallume */
  var chrono = document.getElementById('chrono-big');
  var tlBascule = gsap.timeline({
    scrollTrigger: {
      trigger: '#bascule',
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: true,
      onUpdate: function (self) {
        // 00:00 → 01:47 (heures:minutes écoulées depuis la frappe)
        var mins = Math.round(self.progress * 107);
        var h = Math.floor(mins / 60);
        var m = mins % 60;
        if (chrono) chrono.textContent = '0' + h + ':' + (m < 10 ? '0' : '') + m;
      },
    },
  });
  tlBascule
    .fromTo('.beat-bascule', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.03)
    .fromTo('.ops', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.12)
    .to('.log-line', { opacity: 1, y: 0, stagger: 0.085, duration: 0.06 }, 0.2)
    .to('.vm-dot', { backgroundColor: '#2ecc8f', boxShadow: '0 0 10px #2ecc8f', stagger: 0.055, duration: 0.05 }, 0.32)
    .to('.vm', { color: '#d9f5e8', borderColor: 'rgba(46,204,143,0.35)', stagger: 0.055, duration: 0.05 }, 0.32);

  /* CH.4 — LA REPRISE : le tampon 1h47 */
  var tlReprise = gsap.timeline({
    scrollTrigger: {
      trigger: '#reprise',
      start: 'top top',
      end: '+=140%',
      pin: true,
      scrub: true,
    },
  });
  tlReprise
    .fromTo('.final-chrono', { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, ease: 'power3.out', duration: 0.24 }, 0.08)
    .fromTo(
      '.beat-reprise h2, .beat-reprise .beat-sub, .beat-reprise .fine, .beat-reprise .btn-primary',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.2, ease: 'power2.out' },
      0.24
    );

  /* ════════ AMBIANT (après les pins) ════════ */

  /* Timecode : heure du récit + progression */
  var tcEl = document.getElementById('timecode');
  var tcLabel = document.getElementById('tc-label');
  var tcTime = document.getElementById('tc-time');
  var tcFill = document.getElementById('tc-fill');
  var chapters = [
    { sel: '#matin', label: 'CH.01 — Un lundi comme les autres', from: 0, to: 15 },
    { sel: '#frappe', label: 'CH.02 — La frappe', from: 15, to: 15 },
    { sel: '#bascule', label: 'CH.03 — La bascule', from: 29, to: 107 },
    { sel: '#reprise', label: 'CH.04 — Redémarré', from: 107, to: 107 },
  ];
  chapters.forEach(function (ch) {
    ScrollTrigger.create({
      trigger: ch.sel,
      start: 'top top',
      end: function () {
        var pin = ScrollTrigger.getAll().find(function (st) {
          return st.trigger === document.querySelector(ch.sel) && st.pin;
        });
        return pin ? pin.end - pin.start + 'px' : '+=100%';
      },
      onUpdate: function (self) {
        tcLabel.textContent = ch.label;
        tcTime.textContent = fmtClock(ch.from + (ch.to - ch.from) * self.progress);
      },
    });
  });
  ScrollTrigger.create({
    trigger: '#film',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: function (self) {
      tcFill.style.width = (self.progress * 100).toFixed(1) + '%';
    },
    onToggle: function (self) {
      gsap.to(tcEl, { opacity: self.isActive ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    },
  });

  /* Compteurs + reveals du contenu après-film */
  document.querySelectorAll('.stat-n').forEach(function (el) {
    var target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.fromTo(
          el,
          { textContent: 0 },
          { textContent: target, duration: 1.6, ease: 'power2.out', snap: { textContent: 1 } }
        );
      },
    });
  });
  gsap.utils.toArray('.sol-card, .stat, .quote, .why, .essai-card').forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 34,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* ════════ Contrat dev ════════ */
  var frames = [];
  var last = performance.now();
  function jankTick(now) {
    frames.push(now - last);
    last = now;
    if (frames.length >= 120) {
      var sorted = frames.slice().sort(function (a, b) {
        return a - b;
      });
      console.log(
        '[jank] p95=' + sorted[Math.floor(sorted.length * 0.95)].toFixed(1) + 'ms max=' + sorted[sorted.length - 1].toFixed(1) + 'ms'
      );
      frames = [];
    }
    requestAnimationFrame(jankTick);
  }
  requestAnimationFrame(jankTick);

  function settle() {
    if (JUMP !== null) {
      window.scrollTo(0, +JUMP || 0);
      ScrollTrigger.refresh();
      window.scrollTo(0, +JUMP || 0);
      ScrollTrigger.update();
      ScrollTrigger.getAll().forEach(function (st) {
        if (st.animation) st.animation.totalProgress(st.progress);
      });
    }
    markReady();
  }

  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle);
})();
