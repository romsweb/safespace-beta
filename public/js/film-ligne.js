/*
 * « La Ligne » — moteur du scroll-film (GSAP + ScrollTrigger + Lenis).
 * Scènes pinnées d'abord (ordre DOM), ambiant après. Contrat dev ?jump + __ready.
 */
(function () {
  'use strict';

  var JUMP = new URLSearchParams(location.search).get('jump');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Sur tactile, le scroll par élans saute des dizaines de px par frame :
  // un scrub amorti laisse les animations rattraper en douceur au lieu de téléporter.
  var SCRUB = window.matchMedia('(pointer: coarse)').matches ? 0.8 : true;

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

  /* ── Ouverture ── */
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
    stagger: 0.12,
    ease: 'power4.out',
    delay: 0.15,
  });
  gsap.from('.kicker-line, .hero-sub, .hero-ctas, .scroll-hint, .you', {
    opacity: 0,
    y: 18,
    duration: 0.9,
    stagger: 0.09,
    ease: 'power2.out',
    delay: 0.5,
  });
  gsap.from('.city i', { opacity: 0, duration: 1.6, stagger: { each: 0.012, from: 'random' }, ease: 'power1.out' });

  /* ════════ SCÈNES PINNÉES ════════ */

  /* CH.1 — NOUMÉA : zoom vers le point orange */
  var tlNoumea = gsap.timeline({
    scrollTrigger: {
      trigger: '#noumea',
      start: 'top top',
      end: '+=160%',
      pin: true,
      scrub: SCRUB,
    },
  });
  tlNoumea
    .to('.hero-content', { opacity: 0, y: -50, ease: 'power1.in', duration: 0.24 }, 0.05)
    .to('.scroll-hint', { opacity: 0, duration: 0.08 }, 0)
    /* la caméra pique vers vos serveurs (origine = position du point .you) */
    .to('.city', { scale: 3.2, transformOrigin: '71% 76%', ease: 'power2.in', duration: 0.7 }, 0.28)
    .to('.city i', { opacity: 0, ease: 'none', duration: 0.3 }, 0.62)
    .to('.you-label', { opacity: 0, duration: 0.15 }, 0.55)
    .to('.you-dot', { scale: 14, opacity: 0, ease: 'power2.in', duration: 0.28 }, 0.7);

  /* CH.2 — L'ENTRÉE : le tunnel défile */
  var tlEntree = gsap.timeline({
    scrollTrigger: {
      trigger: '#entree',
      start: 'top top',
      end: '+=160%',
      pin: true,
      scrub: SCRUB,
    },
  });
  tlEntree
    .fromTo('.tunnel', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power1.out', duration: 0.25 }, 0)
    .to('.tunnel', { rotate: 26, scale: 1.35, ease: 'none', duration: 0.75 }, 0.25)
    .fromTo('.pkt', { x: -140, opacity: 0 }, { x: 220, opacity: 1, stagger: 0.06, ease: 'power1.in', duration: 0.4 }, 0.2)
    .to('.pkt', { opacity: 0, duration: 0.1 }, 0.72)
    .fromTo('.beat-entree', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.12)
    .to('.beat-entree', { opacity: 0, y: -50, duration: 0.2, ease: 'power1.in' }, 0.8);

  /* CH.3 — LA TRAVERSÉE : run horizontal le long de la ligne */
  var track = document.querySelector('.line-track');
  var horiz = gsap.to(track, {
    x: function () {
      return -(track.scrollWidth - window.innerWidth);
    },
    ease: 'none',
    scrollTrigger: {
      trigger: '#traversee',
      start: 'top top',
      end: function () {
        return '+=' + (track.scrollWidth - window.innerWidth);
      },
      pin: true,
      scrub: SCRUB,
      invalidateOnRefresh: true,
    },
  });
  document.querySelectorAll('.node').forEach(function (node) {
    gsap.fromTo(
      node,
      { y: 26 },
      {
        y: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          containerAnimation: horiz,
          start: 'left right',
          end: 'right left',
          scrub: SCRUB,
        },
      }
    );
  });

  /* CH.4 — LES IMPACTS : les menaces frappent, la ligne tient */
  var tlImpacts = gsap.timeline({
    scrollTrigger: {
      trigger: '#impacts',
      start: 'top top',
      end: '+=180%',
      pin: true,
      scrub: SCRUB,
    },
  });
  [['.i1', 0.1], ['.i2', 0.28], ['.i3', 0.46], ['.i4', 0.64]].forEach(function (pair) {
    var sel = pair[0];
    var at = pair[1];
    tlImpacts
      .fromTo(sel + ' .tag', { y: '-40vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.in', duration: 0.1 }, at)
      .to(sel + ' .ring', { opacity: 1, duration: 0.015 }, at + 0.1)
      .to(sel + ' .ring', { scale: 3.4, opacity: 0, ease: 'power1.out', duration: 0.12 }, at + 0.11)
      .to(sel + ' .tag', { y: '-9vh', opacity: 0, ease: 'power1.out', duration: 0.12 }, at + 0.11);
  });
  tlImpacts
    .fromTo('.beat-impacts', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.16)
    .fromTo('.calm-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.58);

  /* CH.5 — LE COFFRE : les anneaux se scellent */
  var tlCoffre = gsap.timeline({
    scrollTrigger: {
      trigger: '#coffre',
      start: 'top top',
      end: '+=160%',
      pin: true,
      scrub: SCRUB,
    },
  });
  tlCoffre
    .fromTo('.vault-svg', { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.3 }, 0)
    .fromTo('.ring.r1', { rotate: -80 }, { rotate: 0, transformOrigin: '50% 50%', ease: 'power2.out', duration: 0.5 }, 0.05)
    .fromTo('.ring.r2', { rotate: 60 }, { rotate: 0, transformOrigin: '50% 50%', ease: 'power2.out', duration: 0.5 }, 0.05)
    .fromTo('.ring.r3', { rotate: -40 }, { rotate: 0, transformOrigin: '50% 50%', ease: 'power2.out', duration: 0.5 }, 0.05)
    .fromTo('.beat-coffre', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.42)
    .to('.vault-svg', { scale: 1.04, duration: 0.2, ease: 'power1.inOut' }, 0.8);

  /* ════════ AMBIANT (après les pins) ════════ */

  /* Odomètre : distance parcourue sur la ligne */
  var odEl = document.getElementById('odometer');
  var odLabel = document.getElementById('od-label');
  var odKm = document.getElementById('od-km');
  var odFill = document.getElementById('od-fill');
  var chapters = [
    { sel: '#noumea', label: 'CH.01 — Nouméa, 22:47', from: 0, to: 0 },
    { sel: '#entree', label: 'CH.02 — L’entrée', from: 0, to: 12 },
    { sel: '#traversee', label: 'CH.03 — La traversée', from: 12, to: 16742 },
    { sel: '#impacts', label: 'CH.04 — Les impacts', from: 16742, to: 16742 },
    { sel: '#coffre', label: 'CH.05 — Destination', from: 16742, to: 16742 },
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
        var km = Math.round(ch.from + (ch.to - ch.from) * self.progress);
        odLabel.textContent = ch.label;
        odKm.textContent = 'km ' + km.toLocaleString('fr-FR');
      },
    });
  });
  ScrollTrigger.create({
    trigger: '#film',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: function (self) {
      odFill.style.width = (self.progress * 100).toFixed(1) + '%';
    },
    onToggle: function (self) {
      gsap.to(odEl, { opacity: self.isActive ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    },
  });

  /* Compteurs + reveals après-film */
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
