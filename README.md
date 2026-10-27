<div align="center">

# Git a GitHub od základov

**Webová verzia prezentácie o Gite a GitHube.**
Všetko zo slajdov na jednom mieste, doplnené o to, čo k nim hovorím naživo.

[![GitHub Pages](https://img.shields.io/badge/web-online-2ea44f?logo=github)](https://nouzi.github.io/git-a-github-pages/)
![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bez závislostí](https://img.shields.io/badge/z%C3%A1vislosti-0-blue)

### 👉 [nouzi.github.io/git-a-github-pages](https://nouzi.github.io/git-a-github-pages/)

[📥 **Stiahnuť prezentáciu (PDF, 39 slajdov, 8 MB)**](https://nouzi.github.io/git-a-github-pages/git-a-github-od-zakladov.pdf)

</div>

---

## O čom to je

Praktický úvod do Gitu a GitHubu pre úplných začiatočníkov. Každú vec najprv ukážem
**vo VS Code**, hneď pod tým **príkazom v termináli**, a na konci to celé zopakujeme
**cez AI agentov**.

## Obsah

| # | Časť | Čo sa naučíš |
|---|------|--------------|
| 1 | **Git a prvý commit** | čo je Git, rozdiel Git vs. GitHub, tri miesta, repozitár, commit, história, dobré správy |
| 2 | **Vetvy a merge** | čo je vetva, nová vetva, merge, riešenie konfliktov |
| 3 | **GitHub a pull requesty** | remote, push a pull, pull request krok za krokom |
| 4 | **Stash a záchranné brzdy** | odloženie rozrobenej práce, návrat pri chybe |
| 5 | **Zhrnutie** | celý postup na jednom mieste a ťahák príkazov |
| 6 | **To isté cez AI agentov** | tri spôsoby práce, ukážkové rozhovory, pravidlá, kedy čo použiť |
| ✓ | **Otestuj sa** | krátky kvíz na overenie, čo si si zapamätal |

## Čo stránka vie

- 📥 **Stiahnutie prezentácie** – originálne slajdy v PDF priamo z hornej lišty
- 🧭 **Mapa kapitol** – bočný panel na desktope, vysúvacia ponuka na mobile, zvýrazňuje aktuálnu časť
- 📋 **Kopírovanie príkazov jedným klikom** – komentáre sa nekopírujú, takže príkazy fungujú aj v zsh na Macu
- 🧠 **Kvíz** s priebežným skóre
- 📱 **Responzívny dizajn** – dobre sa číta na mobile aj na veľkej obrazovke
- ⚡ **Žiadny build, žiadne závislosti** – čisté HTML, CSS a JavaScript

## Spustenie lokálne

Stačí otvoriť `index.html` v prehliadači. Ak chceš lokálny server:

```bash
python3 -m http.server 8000
```

a otvor [http://localhost:8000](http://localhost:8000).

## Štruktúra

```
.
├── index.html                    # obsah stránky
├── styles.css                    # vzhľad
├── script.js                     # mapa kapitol, kopírovanie príkazov a kvíz
├── git-a-github-od-zakladov.pdf  # prezentácia na stiahnutie
└── .nojekyll                     # GitHub Pages servíruje súbory tak, ako sú
```

## Nasadenie

Stránka beží na **GitHub Pages** priamo z vetvy `main` (priečinok `/ (root)`).
Každý push do `main` ju automaticky aktualizuje, zvyčajne do minúty.

Ak by si to chcel nastaviť vo vlastnom forku:

1. Na GitHube otvor **Settings → Pages**.
2. V časti **Build and deployment** vyber **Deploy from a branch**, vetvu `main` a priečinok `/ (root)`.
3. Ulož. Stránka bude na adrese `https://<meno>.github.io/<repozitar>/`.

---

<div align="center">

Vytvoril **Tomáš Kanko**, 2026

</div>
