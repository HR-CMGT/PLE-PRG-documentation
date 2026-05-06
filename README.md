# CMGT Projecten — Statistiekenpagina

Een vanilla JavaScript webapplicatie die live statistieken toont van de [CMGT projectenserver](https://cmgt.hr.nl/api/projects/).  
Dit project is gemaakt als **documentatievoorbeeldproject** voor derdejaarsstudenten Mediatechnologie.

---

## Inhoud

- [Wat doet dit project?](#wat-doet-dit-project)
- [Projectstructuur](#projectstructuur)
- [Installatie en opstarten](#installatie-en-opstarten)
- [ESLint](#eslint)
- [JSDoc](#jsdoc)
- [Bijdragen](#bijdragen)

---

## Wat doet dit project?

De pagina haalt alle projecten op van de CMGT API en toont vier statistieken:

| Statistiek | Beschrijving |
|---|---|
| **Projecten per tag** | Hoeveel projecten zijn er per tag (Web, AI, Games, …)? |
| **Projecten per jaar** | Hoeveel projecten zijn er per studiejaar (Jaar 1 t/m 4)? |
| **Foto's per project** | Hoeveel schermafbeeldingen heeft elk project? |
| **Woorden per beschrijving** | Hoe lang is de beschrijving van elk project? |

---

## Projectstructuur

```
ple-documentatie/
├── index.html        # HTML-pagina met de statistieken
├── app.js            # Hoofdbestand: orkestreert data, statistieken en DOM
├── data.js           # Haalt data op van de CMGT API
├── statistics.js     # Berekent de statistieken (pure functies)
├── types.js          # JSDoc type-definities (geen uitvoerbare code)
├── eslint.config.js  # ESLint-configuratie
├── package.json      # NPM-projectbestand
└── README.md         # Deze documentatie
```

### Verantwoordelijkheden per bestand

**`index.html`**  
De enige HTML-pagina. Bevat de basisstructuur, CSS-stijlen en laadt `app.js` als ES module.

**`app.js`**  
Het startpunt van de applicatie. Dit bestand:
- luistert op het `DOMContentLoaded`-event,
- roept `fetchAllProjects()` aan,
- geeft de ruwe data door aan de statistiekfuncties,
- rendert de resultaten naar de DOM.

**`data.js`**  
Verantwoordelijk voor alles wat met de API te maken heeft.  
De rest van de code weet niet *hoe* de data opgehaald wordt — die vraagt alleen om een array van projecten.

**`statistics.js`**  
Pure functies die statistieken berekenen. Geen DOM-manipulatie, geen neveneffecten.  
Gemakkelijk te testen omdat de uitvoer alleen afhangt van de invoer.

**`types.js`**  
Bevat uitsluitend JSDoc `@typedef`-commentaar. Dit bestand heeft geen uitvoerbare code maar documenteert de datastructuren die in het hele project gebruikt worden.

---

## Installatie en opstarten

### Vereisten

- [Node.js](https://nodejs.org/) (v18 of hoger) — alleen nodig voor ESLint
- Een moderne webbrowser

### Stap 1: Afhankelijkheden installeren

```bash
npm install
```

### Stap 2: De applicatie openen

Omdat de browser geen ES modules (`import`/`export`) kan laden via een `file://`-URL, moet je een lokale webserver gebruiken.

**Met de VS Code Live Server-extensie:**  
Klik rechts op `index.html` → *Open with Live Server*.

**Of via de terminal (Node.js):**  
```bash
npx serve .
```

Open daarna `http://localhost:3000` in je browser.

---

## ESLint

[ESLint](https://eslint.org/) is een **linter**: een tool die je code automatisch analyseert op fouten en stijlproblemen, zonder de code uit te voeren.

### Waarom ESLint?

- Vangt veelgemaakte fouten vroegtijdig op (bijv. variabelen die niet gebruikt worden).
- Zorgt voor een consistente codestijl in het hele project.
- Maakt code reviews eenvoudiger.

### Configuratie

De regels staan in [`eslint.config.js`](./eslint.config.js).  
Enkele voorbeeldregels uit dit project:

```js
"no-var": "error",        // gebruik const/let, niet var
"prefer-const": "warn",   // gebruik const als de waarde niet wijzigt
"eqeqeq": ["error", "always"],  // gebruik === in plaats van ==
"semi": ["error", "always"],    // puntkomma's zijn verplicht
```

### ESLint uitvoeren

```bash
npm run lint
```

Een regelnummer en uitleg verschijnen voor elke gevonden overtreding:

```
app.js
  12:3  warning  'foo' is assigned a value but never used  no-unused-vars
```

### ESLint in VS Code

Installeer de [ESLint-extensie voor VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Overtredingen worden dan direct in de editor onderstreept.

---

## JSDoc

[JSDoc](https://jsdoc.app/) is een standaard voor het documenteren van JavaScript-code met gestructureerde commentaarblokken. VS Code gebruikt deze commentaren automatisch voor code-aanvulling en typecontrole.

### Anatomie van een JSDoc-commentaar

```js
/**
 * Korte omschrijving van de functie.
 *
 * Langere uitleg die meer context geeft, optioneel.
 *
 * @param {string[]} projects - De volledige lijst van projecten.
 * @returns {CountByLabel[]}  Een gesorteerde array per label.
 *
 * @example
 * const stats = countProjectsPerTag(projecten);
 * // [{ label: "Web", count: 87 }, ...]
 */
export function countProjectsPerTag(projects) { ... }
```

| Tag | Betekenis |
|---|---|
| `@param {type} naam` | Beschrijft een parameter |
| `@returns {type}` | Beschrijft de returnwaarde |
| `@typedef {Object} Naam` | Definieert een herbruikbaar type |
| `@property {type} naam` | Beschrijft een eigenschap van een typedef |
| `@example` | Toont een gebruiksvoorbeeld |
| `@module` | Geeft de modulenaam aan |
| `@fileoverview` | Beschrijft het hele bestand |

### Types met `@typedef`

In [`types.js`](./types.js) staan alle datatypes van dit project gedefinieerd:

```js
/**
 * Een tag die aan een project gekoppeld is.
 *
 * @typedef {Object} Tag
 * @property {number} id   - Uniek ID van de tag.
 * @property {string} name - Naam van de tag, bijv. "Jaar 2" of "Web".
 */
```

Door dit type eenmalig te definiëren, kan het overal in het project worden gebruikt:

```js
/** @param {Tag[]} tags */
function doSomethingWithTags(tags) { ... }
```

VS Code toont dan automatisch de juiste velden bij code-aanvulling.

### JSDoc-documentatie genereren

Installeer JSDoc globaal en genereer HTML-documentatie:

```bash
npm install -g jsdoc
jsdoc app.js data.js statistics.js types.js -d docs/
```

Open `docs/index.html` in je browser voor een volledige API-referentie.

---

## Bijdragen

1. Fork of clone dit project.
2. Maak een nieuwe branch: `git checkout -b feature/mijn-aanpassing`
3. Voer ESLint uit voor je commit: `npm run lint`
4. Stuur een pull request met een duidelijke beschrijving.

---

*Hogeschool Rotterdam — Creative Media and Game Technologies (CMGT)*
