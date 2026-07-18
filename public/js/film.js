/*
 * « Sous le Récif » — moteur du scroll-film (Lane A, GSAP + ScrollTrigger + Lenis).
 * Loi d'ordre : les scènes pinnées sont créées d'abord (ordre DOM), les triggers
 * ambiants (altimètre, compteurs, reveals) APRÈS — l'ordre de création est l'ordre
 * de refresh, sinon tout ce qui suit un pin spacer est silencieusement décalé.
 * Contrat dev : ?jump=<scrollY> atterrit pré-scrollé et posé ; window.__ready
 * ne passe à true qu'une fois la page réellement prête.
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
    // Le HTML est déjà entièrement lisible sans animation.
    markReady();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (JUMP !== null) {
    history.scrollRestoration = 'manual';
    // Atterrissage instantané : neutralise le scroll-behavior:smooth du CSS
    document.documentElement.style.scrollBehavior = 'auto';
  }

  /* ── Lenis (désactivé en mode jump : il faut un atterrissage instantané) ── */
  var lenis = null;
  if (JUMP === null && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) {
      lenis.raf(t * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* ── Ouverture : char-split du titre héros (au chargement, pas au scroll) ── */
  document.querySelectorAll('.hero-title .line').forEach(function (line) {
    var text = line.textContent;
    line.textContent = '';
    var inner = document.createElement('span');
    inner.textContent = text;
    line.appendChild(inner);
  });
  gsap.from('.hero-title .line > span', {
    yPercent: 120,
    duration: 1.15,
    stagger: 0.12,
    ease: 'power4.out',
    delay: 0.15,
  });
  gsap.from('.badge, .hero-sub, .hero-ctas, .scroll-hint', {
    opacity: 0,
    y: 18,
    duration: 0.9,
    stagger: 0.09,
    ease: 'power2.out',
    delay: 0.55,
  });

  /* ════════ SCÈNES PINNÉES (dans l'ordre du DOM) ════════ */

  /* CH.1 — LA SURFACE : zoom sur le lagon, l'eau monte, on passe dessous */
  var tlSurface = gsap.timeline({
    scrollTrigger: {
      trigger: '#surface',
      start: 'top top',
      end: '+=160%',
      pin: true,
      scrub: true,
    },
  });
  tlSurface
    .to('.surface-bg', { scale: 1.18, yPercent: 4, ease: 'none' }, 0)
    .to('.hero-content', { yPercent: -14, opacity: 0, ease: 'power1.in' }, 0.05)
    .to('.scroll-hint', { opacity: 0, ease: 'none' }, 0)
    .to('.water-veil', { yPercent: -101, ease: 'power1.inOut' }, 0.28);

  /* CH.2 — LA PLONGÉE : rayons qui s'éteignent avec la profondeur */
  var tlPlongee = gsap.timeline({
    scrollTrigger: {
      trigger: '#plongee',
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
    },
  });
  tlPlongee
    .fromTo('.rays i', { yPercent: -6 }, { yPercent: 10, stagger: 0.04, ease: 'none' }, 0)
    .to('.rays', { opacity: 0.15, ease: 'none' }, 0.35)
    .fromTo('.beat-plongee', { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.28 }, 0.1)
    .to('.beat-plongee', { opacity: 0, y: -50, ease: 'power1.in', duration: 0.22 }, 0.78);

  /* CH.3 — LE RÉCIF : traversée horizontale le long de la barrière */
  var track = document.querySelector('.reef-track');
  var horiz = gsap.to(track, {
    x: function () {
      return -(track.scrollWidth - window.innerWidth);
    },
    ease: 'none',
    scrollTrigger: {
      trigger: '#recif',
      start: 'top top',
      end: function () {
        return '+=' + (track.scrollWidth - window.innerWidth);
      },
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  // Parallaxe des racks dans la traversée (containerAnimation)
  document.querySelectorAll('.reef-panel .rack').forEach(function (rack) {
    gsap.fromTo(
      rack,
      { xPercent: -7 },
      {
        xPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: rack,
          containerAnimation: horiz,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      }
    );
  });

  /* CH.4 — LA TEMPÊTE : éclairs en surface, calme en profondeur */
  var tlStorm = gsap.timeline({
    scrollTrigger: {
      trigger: '#tempete',
      start: 'top top',
      end: '+=170%',
      pin: true,
      scrub: true,
    },
  });
  tlStorm
    .fromTo('.storm-sky', { opacity: 0.4 }, { opacity: 1, ease: 'none', duration: 0.3 }, 0)
    .fromTo('.beat-tempete', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.26, ease: 'power2.out' }, 0.08)
    .to('.flash', { opacity: 0.85, duration: 0.02, ease: 'none' }, 0.22)
    .to('.flash', { opacity: 0, duration: 0.07, ease: 'power1.out' }, 0.24)
    .to('.flash', { opacity: 0.6, duration: 0.015, ease: 'none' }, 0.46)
    .to('.flash', { opacity: 0, duration: 0.06, ease: 'power1.out' }, 0.475)
    .fromTo('.calm-card', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0.42)
    .to('.flash', { opacity: 0.75, duration: 0.018, ease: 'none' }, 0.68)
    .to('.flash', { opacity: 0, duration: 0.08, ease: 'power1.out' }, 0.7)
    .to('.beat-tempete', { opacity: 0, y: -40, duration: 0.2, ease: 'power1.in' }, 0.84);

  /* CH.5 — LE RETOUR : remontée vers l'aube */
  var tlRetour = gsap.timeline({
    scrollTrigger: {
      trigger: '#retour',
      start: 'top top',
      end: '+=130%',
      pin: true,
      scrub: true,
    },
  });
  tlRetour
    .fromTo('.sun', { yPercent: 70, opacity: 0.25 }, { yPercent: 0, opacity: 0.95, ease: 'none' }, 0)
    .fromTo('.beat-retour', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.18);

  /* ════════ AMBIANT (créé APRÈS les pins — loi d'ordre) ════════ */

  /* Marquee des menaces + velocity-skew */
  var row = document.querySelector('.threat-row');
  var marquee = gsap.to(row, { xPercent: -50, ease: 'none', repeat: -1, duration: 26 });
  ScrollTrigger.create({
    trigger: '#tempete',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: function (self) {
      var v = gsap.utils.clamp(-8, 8, self.getVelocity() / 260);
      gsap.to(row, { skewX: v, timeScale: 1 + Math.abs(v) / 5, duration: 0.4, overwrite: 'auto' });
    },
    onLeave: function () {
      marquee.pause();
    },
    onEnterBack: function () {
      marquee.play();
    },
    onEnter: function () {
      marquee.play();
    },
  });

  /* Altimètre : chapitre + profondeur + progression du film */
  var altEl = document.getElementById('altimeter');
  var altChapter = document.getElementById('alt-chapter');
  var altDepth = document.getElementById('alt-depth');
  var altFill = document.getElementById('alt-fill');
  var chapters = [
    { sel: '#surface', label: 'CH.01 — La surface', from: 120, to: 0, sign: '+' },
    { sel: '#plongee', label: 'CH.02 — La plongée', from: 0, to: -24 },
    { sel: '#recif', label: 'CH.03 — Le récif', from: -24, to: -38 },
    { sel: '#tempete', label: 'CH.04 — La tempête', from: -38, to: -40 },
    { sel: '#retour', label: 'CH.05 — Le retour', from: -40, to: 0 },
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
        var d = Math.round(ch.from + (ch.to - ch.from) * self.progress);
        altChapter.textContent = ch.label;
        altDepth.textContent = (d > 0 ? '+' : d < 0 ? '−' : '') + Math.abs(d) + ' m';
      },
    });
  });
  ScrollTrigger.create({
    trigger: '#film',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: function (self) {
      altFill.style.width = (self.progress * 100).toFixed(1) + '%';
    },
    onToggle: function (self) {
      gsap.to(altEl, { opacity: self.isActive ? 1 : 0, duration: 0.4, overwrite: 'auto' });
    },
  });

  /* Compteurs (contenu HTML = valeur finale ; on anime depuis 0) */
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

  /* Reveals doux du contenu après-film */
  gsap.utils.toArray('.sol-card, .stat, .quote, .why, .essai-card').forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 34,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* ════════ Contrat dev : jump + __ready + jank meter ════════ */
  var frames = [];
  var last = performance.now();
  function jankTick(now) {
    frames.push(now - last);
    last = now;
    if (frames.length >= 120) {
      var sorted = frames.slice().sort(function (a, b) {
        return a - b;
      });
      var p95 = sorted[Math.floor(sorted.length * 0.95)];
      var max = sorted[sorted.length - 1];
      console.log('[jank] p95=' + p95.toFixed(1) + 'ms max=' + max.toFixed(1) + 'ms');
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
      // Pose chaque animation scrubbée exactement sur sa position
      ScrollTrigger.getAll().forEach(function (st) {
        if (st.animation) st.animation.totalProgress(st.progress);
      });
    }
    markReady();
  }

  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle);
})();
