# Rana Hamid — Portfolio

A responsive personal portfolio for **https://ranahamid.github.io/**, built with plain HTML, CSS, and JavaScript. No package installation or build step is required.

## Preview locally

From this directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open **http://127.0.0.1:4173/** in a browser. A server allows the clipboard interaction to work on localhost.

## Publish with GitHub Pages

1. Commit and push the portfolio files to `main` in `ranahamid/ranahamid.github.io`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Run the **Deploy portfolio to GitHub Pages** workflow from **Actions**, or push another change to `main`.

The included workflow deploys only the public website files and assets. It excludes repository metadata, documentation, and local development files. The site also supports the simpler **Deploy from a branch → main → / (root)** publishing option, because `index.html` is in the repository root and `.nojekyll` is included.

## Editing

- **`index.html`** — biography, skills, experience, education, contact details, social links, project summaries, and search metadata.
- **`projects.js`** — full project case-study content shown in accessible dialogs.
- **`styles.css`** — typography, colors, layouts, responsive breakpoints, print styles, and reduced-motion support.
- **`script.js`** — mobile navigation, project filters and dialogs, active navigation, email copying, and section reveals.
- **`assets/rana-hamid.webp`** — optimized portrait, displayed in grayscale with color on hover. The supplied PNG is retained for social sharing.
- **`assets/downloads/Rana-Hamid-CV.docx`** — supplied Dynamics 365 technical CV, available to visitors as a Word download.

Typography uses Google Fonts with system fallbacks. All core content, project artwork, and interactions otherwise use local files. Contact buttons open the visitor’s email client; no form service or backend is required.

## Content notes

Content is based on Rana Hamid’s supplied CVs, ERP portfolio, and self-introduction. The public site emphasizes Development Manager responsibilities and hands-on Business Central/NAV experience. F&O is presented as certification experience. The case-study artwork is original CSS illustration, not a product screenshot or official client logo. Dynamic competitive-programming rankings and clinical accuracy figures are intentionally omitted. Certification entries describe credentials earned rather than claiming active certification status.

Update the current role and career history when they change. Keep the contact details, downloadable CV, canonical URL, Open Graph metadata, structured data, and sitemap in sync.
