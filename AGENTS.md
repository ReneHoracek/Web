# AutoShop Web – Agent Instructions

## Project Overview
Static website for an auto mechanic shop with Decap CMS on Netlify.
Stack: vanilla HTML/CSS/JS, Decap CMS, Netlify Identity, GitHub.

## Hard Rules – Never Break These
- NEVER use React, Vue, Angular, or any JS framework
- NEVER use npm packages – zero dependencies
- NEVER use Tailwind, Bootstrap, or any CSS framework – custom CSS only
- NEVER use a backend server – static files only
- NEVER put inline styles in HTML files

## Content Management
- All car listings are hardcoded in `auta.html`
- Each `<div class="car-card">` uses `data-palivo` and `data-cena` attributes for filtering
- Markdown files in `content/auta/*.md` serve as CMS data backup only
- Images go to `images/uploads/`
- Admin interface is always at `admin/`

## Project Structure – Follow Exactly
/
├── index.html
├── auta.html               # car listing page (edit to add/remove cars)
├── _redirects
├── netlify.toml
├── package.json
├── README.md
├── AGENTS.md
├── admin/
│   ├── index.html
│   └── config.yml
├── content/
│   └── auta/
│       └── *.md            # Car listing data files (backup for CMS)
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── uploads/

## Car Card Schema (in auta.html)
```html
<div class="car-card" data-palivo="Diesel" data-cena="389000">
    <div class="car-image">
        <img src="images/uploads/..." alt="...">
        <!-- or -->
        <div class="img-placeholder">Bez fotografie</div>
    </div>
    <div class="car-content">
        <h3>Název vozu</h3>
        <div class="car-specs">
            <span>📅 2019</span>
            <span>⛽ Diesel</span>
            <span>🛣️ 87000 km</span>
        </div>
        <div class="car-price">389000 Kč</div>
    </div>
</div>
```

Supported fuel values for `data-palivo`: `Benzín`, `Diesel`, `Elektro`, `Hybrid`

## Checklist – Verify After Every Change
1. Does `admin/` load without JS console errors?
2. Is Netlify Identity widget script present in every HTML file?
3. Is `admin/config.yml` valid YAML (no tabs, correct indentation)?
4. Does `_redirects` contain the correct rules?
5. Do all paths use relative URLs (no leading `/`)?
6. Do all pages work by opening `index.html` directly in a browser?

## Code Style
- Comments in English
- Indentation: 2 spaces
- No inline CSS
- No unused variables or dead code
- Every file must work standalone

## Netlify Identity – Required in Every HTML File
Before `</head>`:
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

Before `</body>`:
```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "admin/";
        });
      }
    });
  }
</script>
```

## When in Doubt
- Simpler is always better
- If two approaches work, pick the one with fewer files and dependencies
- The target user is non-technical – admin UI must be foolproof
