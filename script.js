(() => {
  "use strict";

  /* ---------- mapa kapitol: aktívna časť a podkapitola podľa scrollu ---------- */

  const parts = Array.from(document.querySelectorAll("[data-chapter]"));
  const isNumbered = (p) => /^\d+$/.test(p.dataset.chapter);
  const total = String(parts.filter(isNumbered).length).padStart(2, "0");
  const subsOf = new Map(parts.map((p) => [p.id, Array.from(p.querySelectorAll(":scope > h3[id]"))]));

  const nav = document.getElementById("chapter-map");
  const sheet = document.getElementById("msheet");
  const sheetBtn = document.getElementById("mbar-btn");
  const mKicker = document.getElementById("mbar-kicker");
  const mTitle = document.getElementById("mbar-title");
  const mCount = document.getElementById("mbar-count");
  const defaultKicker = mKicker ? mKicker.textContent : "";
  const defaultTitle = mTitle ? mTitle.textContent : "";

  // Mobilná ponuka používa tú istú mapu ako bočný panel.
  if (nav && sheet) {
    const copy = nav.cloneNode(true);
    copy.removeAttribute("id");
    sheet.appendChild(copy);
  }

  const setSheet = (open) => {
    if (!sheet || !sheetBtn) return;
    sheet.hidden = !open;
    sheetBtn.setAttribute("aria-expanded", String(open));
  };

  if (sheetBtn) sheetBtn.addEventListener("click", () => setSheet(sheet.hidden));
  if (sheet) {
    sheet.addEventListener("click", (e) => {
      if (e.target.closest("a")) setSheet(false);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sheet && !sheet.hidden) {
      setSheet(false);
      sheetBtn.focus();
    }
  });

  let current = "";

  const setActive = (partId, subId) => {
    const key = partId + "|" + subId;
    if (key === current) return;
    current = key;
    const idx = parts.findIndex((p) => p.id === partId);

    parts.forEach((p, i) => {
      document.querySelectorAll('.map > li > a[href="#' + p.id + '"]').forEach((a) => {
        a.classList.toggle("is-active", i === idx);
        a.classList.toggle("is-done", idx > -1 && i < idx);
        if (i === idx) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
        a.parentElement.classList.toggle("is-open", i === idx);
      });
    });

    document.querySelectorAll(".sub a").forEach((a) => {
      const on = subId !== "" && a.getAttribute("href") === "#" + subId;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });

    if (!mTitle || !mCount || !mKicker) return;
    const part = parts[idx];
    if (!part) {
      mKicker.textContent = defaultKicker;
      mTitle.textContent = defaultTitle;
      mCount.textContent = "";
      return;
    }
    const sub = subId ? document.getElementById(subId) : null;
    mKicker.textContent = sub ? part.dataset.title : "Obsah";
    mTitle.textContent = sub ? sub.textContent : part.dataset.title;
    mCount.textContent = isNumbered(part) ? part.dataset.chapter + " / " + total : "";
  };

  const update = () => {
    const line = window.innerHeight * 0.3;
    let part = null;
    for (const p of parts) {
      if (p.getBoundingClientRect().top <= line) part = p;
      else break;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && parts.length) part = parts[parts.length - 1];

    let sub = null;
    if (part) {
      for (const h of subsOf.get(part.id)) {
        if (h.getBoundingClientRect().top <= line) sub = h;
        else break;
      }
    }
    setActive(part ? part.id : "", sub ? sub.id : "");
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* ---------- kopírovanie príkazov ---------- */

  const flash = (btn, text) => {
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = text;
    btn.classList.add("is-done");
    clearTimeout(btn._t);
    btn._t = setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("is-done");
    }, 1800);
  };

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pre = btn.closest(".pane").querySelector("pre");
      if (!pre) return;
      // Komentáre sa nekopírujú, aby príkazy fungovali aj v zsh na Macu.
      const clone = pre.cloneNode(true);
      clone.querySelectorAll(".c").forEach((n) => n.remove());
      const text = clone.textContent
        .split("\n")
        .map((l) => l.replace(/\s+$/, ""))
        .filter((l) => l.trim() !== "")
        .join("\n");

      const selectFallback = () => {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        flash(btn, "Označené, skopíruj ručne");
      };

      try {
        navigator.clipboard.writeText(text).then(() => flash(btn, "Skopírované"), selectFallback);
      } catch (err) {
        selectFallback();
      }
    });
  });

  /* ---------- kvíz ---------- */

  const quiz = document.querySelector("[data-quiz]");
  if (quiz) {
    const questions = Array.from(quiz.querySelectorAll("[data-q]"));
    const scoreEl = quiz.querySelector("[data-score]");
    const resetBtn = quiz.querySelector("[data-reset]");
    const count = questions.length;
    let answered = 0;
    let right = 0;

    const renderScore = () => {
      if (answered < count) {
        scoreEl.textContent = "Zodpovedané " + answered + " zo " + count + ", správne " + right + ".";
      } else if (right === count) {
        scoreEl.textContent = "Všetkých " + count + " správne. Git máš v malíčku.";
      } else if (right >= count - 2) {
        scoreEl.textContent = "Správne " + right + " zo " + count + ". Dobrý základ, prejdi si ešte časti, kde si zaváhal.";
      } else {
        scoreEl.textContent = "Správne " + right + " zo " + count + ". Vráť sa k jednotlivým častiam a skús to znova.";
      }
      resetBtn.hidden = answered === 0;
    };

    questions.forEach((q) => {
      const opts = Array.from(q.querySelectorAll(".opt"));
      const why = q.querySelector(".q-why");
      const verdict = why.querySelector("b");

      opts.forEach((opt) => {
        opt.addEventListener("click", () => {
          if (q.dataset.done) return;
          q.dataset.done = "1";
          answered += 1;

          const ok = opt.hasAttribute("data-correct");
          if (ok) right += 1;

          opts.forEach((o) => {
            o.setAttribute("aria-disabled", "true");
            if (o.hasAttribute("data-correct")) o.classList.add("is-right");
          });
          if (!ok) opt.classList.add("is-wrong");
          opt.setAttribute("aria-pressed", "true");

          verdict.textContent = ok ? "Správne." : "Nie celkom.";
          why.classList.toggle("is-right", ok);
          why.classList.toggle("is-wrong", !ok);
          why.hidden = false;
          renderScore();
        });
      });
    });

    resetBtn.addEventListener("click", () => {
      questions.forEach((q) => {
        delete q.dataset.done;
        q.querySelectorAll(".opt").forEach((o) => {
          o.classList.remove("is-right", "is-wrong");
          o.removeAttribute("aria-disabled");
          o.removeAttribute("aria-pressed");
        });
        const why = q.querySelector(".q-why");
        why.hidden = true;
        why.classList.remove("is-right", "is-wrong");
      });
      answered = 0;
      right = 0;
      renderScore();
      questions[0].scrollIntoView({ block: "start" });
      const first = questions[0].querySelector(".opt");
      if (first) first.focus({ preventScroll: true });
    });

    renderScore();
  }
})();
