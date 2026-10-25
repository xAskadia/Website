/* Adelina Rrustolli – Webdesign · Interaktionen & Scroll-Animationen */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("load", function () { root.classList.add("is-loaded"); });
  // Falls "load" sehr lange dauert (z. B. große Bilder), trotzdem starten
  setTimeout(function () { root.classList.add("is-loaded"); }, 1200);

  /* ---------- Header beim Scrollen ---------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile Navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = root.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        root.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) {
        root.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Reveal beim Scrollen ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-img, .process-step");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Lichtkegel im Hero folgt der Maus ---------- */
  var hero = document.querySelector(".hero");
  if (hero && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  }

  /* ---------- Storytelling: Schritte steuern die Bühne ---------- */
  var stage = document.querySelector(".story-stage");
  var steps = document.querySelectorAll(".story-step");
  if (stage && steps.length) {
    var progress = stage.querySelector(".stage-progress");
    var typed = stage.querySelector(".typed");
    var typedText = typed ? typed.getAttribute("data-text") : "";
    var typeTimer = null;

    function typeSearch() {
      if (!typed) return;
      clearInterval(typeTimer);
      if (reduceMotion) { typed.textContent = typedText; return; }
      var i = 0;
      typed.textContent = "";
      typeTimer = setInterval(function () {
        typed.textContent = typedText.slice(0, ++i);
        if (i >= typedText.length) clearInterval(typeTimer);
      }, 60);
    }

    function setStep(n) {
      if (stage.getAttribute("data-step") === String(n)) return;
      stage.setAttribute("data-step", n);
      steps.forEach(function (s) { s.classList.toggle("is-active", s.getAttribute("data-step") === String(n)); });
      if (progress) progress.style.setProperty("--p", n / steps.length);
      if (n === 2) typeSearch();
    }

    function updateStory() {
      var mid = window.innerHeight * 0.55;
      var current = 1;
      steps.forEach(function (s) {
        if (s.getBoundingClientRect().top < mid) current = parseInt(s.getAttribute("data-step"), 10);
      });
      setStep(current);
    }
    window.addEventListener("scroll", updateStory, { passive: true });
    window.addEventListener("resize", updateStory);
    updateStory();
  }

  /* ---------- Prozess-Linie wächst mit ---------- */
  var processEl = document.querySelector(".process");
  if (processEl) {
    var line = processEl.querySelector(".process-line");
    function updateLine() {
      var r = processEl.getBoundingClientRect();
      var p = (window.innerHeight * 0.65 - r.top) / r.height;
      line.style.setProperty("--line", Math.max(0, Math.min(1, p)));
    }
    window.addEventListener("scroll", updateLine, { passive: true });
    updateLine();
  }

  /* ---------- Zahlen hochzählen ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        co.unobserve(el);
        if (reduceMotion) { el.textContent = target + suffix; return; }
        var start = null;
        function tick(t) {
          if (!start) start = t;
          var k = Math.min(1, (t - start) / 1400);
          el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
          if (k < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Kontaktformular: Statusmeldung nach dem Senden ---------- */
  var status = document.querySelector(".form-status");
  if (status) {
    var params = new URLSearchParams(window.location.search);
    if (params.has("gesendet") || params.has("sent")) {
      status.textContent = status.getAttribute("data-success");
      status.classList.add("is-success");
    } else if (params.has("fehler") || params.has("error")) {
      status.textContent = status.getAttribute("data-error");
      status.classList.add("is-error");
    }
    if (status.textContent) status.scrollIntoView({ block: "center" });
  }

  // Paket aus Link übernehmen (z. B. kontakt.html?paket=gefunden)
  var paket = new URLSearchParams(window.location.search).get("paket");
  if (paket) {
    var radio = document.querySelector('input[name="paket"][value="' + paket.replace(/[^a-z-]/gi, "") + '"]');
    if (radio) radio.checked = true;
  }

  /* ---------- Jahr im Footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
