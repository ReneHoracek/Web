# AutoShop Website

Static website for an auto mechanic shop with Decap CMS for managing car listings.
Built with HTML/CSS/JS, Decap CMS, Netlify Identity, and GitHub.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Hosting | Netlify (free tier) |
| CMS | Decap CMS (formerly Netlify CMS) |
| Auth | Netlify Identity |
| Storage | GitHub repository |
| Frontend | Vanilla HTML/CSS/JS |

---

## Deployment – Step by Step

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ReneHoracek/Web.git
git branch -M main
git push -u origin main
```

### 2. Connect to Netlify
- Log in to Netlify → **Add new site** → **Import from Git**
- Pick this repo, Netlify auto-detects it
- No build command needed, publish directory is root (`/`)

---

## Adding a Car Listing

1. Go to `admin/`
2. Click **Nabídky aut → New Nabídky aut**
3. Fill in: name, year, price, mileage, fuel type, description, photo
4. Click **Publish**
5. The markdown file is saved to `content/auta/`
6. To show the new car on the site, edit `auta.html` and add a new card manually

> Future: auto-generation from markdown can be added with a simple build script.

---

## Local Development

Just open `index.html` in a browser – no build step, no dependencies.

For a local server (to test admin panel linking):
```bash
npx serve .
```

---

## File Reference

| File | Purpose |
|---|---|
| `admin/config.yml` | CMS fields and collections config |
| `admin/index.html` | CMS admin interface |
| `content/auta/*.md` | Car listing data files |
| `auta.html` | Car listing page (edit to add/remove cars) |
| `_redirects` | Netlify routing rules |
| `netlify.toml` | Netlify deploy config |

---

## Troubleshooting

**Admin page shows blank / error**
→ Check that Netlify Identity and Git Gateway are both enabled in dashboard.

**Login button does nothing**
→ Make sure the Netlify Identity widget script is loaded in the HTML file.

**Car listing not showing after publish**
→ Edit `auta.html` and add the new car card manually.

**Images not showing**
→ Confirm `media_folder` in `config.yml` matches the actual folder path.
