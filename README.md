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
- **`script.js`** — mobile navigation, project search, category filters, progressive project expansion, case-study dialogs, active navigation, email copying, and section reveals.
- **`assets/rana-hamid.webp`** — optimized portrait, displayed in grayscale with color on hover. The supplied PNG is retained for social sharing.
- **`assets/downloads/Rana-Hamid-CV.docx`** — supplied Dynamics 365 technical CV, available to visitors as a Word download.
- **`assets/projects/`** — nine original ERP interface screenshots extracted from the supplied PDF and stored as lossless WebP images.

Typography uses Google Fonts with system fallbacks. All core content, project artwork, and interactions otherwise use local files. Contact buttons open the visitor’s email client; no form service or backend is required.

## Project screenshots

Nine images are extracted directly from `Rana_Dynamics_Expertise.pdf` at their original pixel dimensions. The surrounding slide background and text decorations are excluded; the screenshot pixels are preserved with lossless WebP encoding. Matching project cards show the complete image without cropping. Their case studies display the image at its natural aspect ratio and provide a full-size image link.

| Project | PDF page | Asset |
| --- | --- | --- |
| Aamra | 3 | `assets/projects/aamra-erp.webp` |
| Vitti | 4 | `assets/projects/vitti-nav.webp` |
| MyLeaze | 6 | `assets/projects/myleaze.webp` |
| West Industrial | 7 | `assets/projects/west-industrial.webp` |
| Aged Care & Medical | 8 | `assets/projects/aged-care-medical.webp` |
| TSL ERP | 9 | `assets/projects/tsl-erp.webp` |
| NQC | 10 | `assets/projects/nqc-erp.webp` |
| Outpost Agency | 11 | `assets/projects/outpost-agency.webp` |
| Umojo | 12 | `assets/projects/umojo-erp.webp` |

For additional project photos, place the image in `assets/projects/` and add an `image` record to the corresponding entry in `projects.js`, with `src`, `alt`, original `width` and `height`, and a short `caption`. The page automatically uses that image on the project card and in the case study. The nine current screenshots are also included directly in `index.html` for visitors without JavaScript; update that card’s image markup when replacing one of those assets.

## Content notes

The **complete credential collection** lists all eight credentials individually: MB6-894, MB6-895, MB2-717, MB2-716, MB2-715, MCSA, MCSE, and ITEE FE. Month/year dates follow the supplied credential list and CV tables; MCSA and MCSE are dated April 2019 in the earlier CVs. Five Microsoft exam entries are identified as certification examinations, separately from the MCSA and MCSE certifications. The gallery uses locally served issuer imagery: a Microsoft mark rendered as SVG and the JICA logo from its [official English website](https://www.jica.go.jp/english/) ([original image](https://www.jica.go.jp/english/assets/img/logo-en.png)). These are issuer logos, not personal certificate scans or verification badges. The supplied files contain credential tables but no individual certificate scans. The Microsoft mark identifies [Microsoft](https://www.microsoft.com/) as the issuing organization.

The portfolio includes 26 projects and product components across healthcare, ERP, platforms, and education. The six featured projects appear first; visitors can search the full catalog by project, client, industry, or technology, combine search with category filters, and reveal additional matches six at a time. Without JavaScript, all project summaries remain visible.

New entries cover VAssess, Injury Cloud Telemedicine, Virtual Assistant, PTS Live Classroom, OneWorldSIS, SeaBoard, Amader Ad, MediaGrator, Lathrop, Vector, Credentials Management, Employee Attendance Tracker, and RaysTalk. The ERP portfolio retains Aamra, Vitti, Aged Care & Medical, TSL ERP, NQC, Outpost Agency, Umojo, MyLeaze, and West Industrial. Case studies use a **Project scope** heading where the source describes the engagement without detailing individual implementation tasks.

The November 2026 content expansion reviewed all eight additional supplied files: the 30-page executive CV; `ASP.NET_8Y_RU_RanaHamid-NET-3 page.docx`; `CoverLetter-Rana Hamid.rtf`; `Resume-RanaHamid.docx`; `Resume-RanaHamid_9yrs .NET-BD.pdf`; `ASP.NET_7Y_RU_RanaHamid.docx`; `ASP.NET_8Y_RU_RanaHamid.docx`; and the MMH `ASP.NET_8Y_RU_RanaHamid-NET.docx`. Repeated Word text-box content was deduplicated during extraction. The site also adds leadership context, eight expandable technical-toolkit areas, more career responsibilities, professional recognition, scholarships, Azure data-services training, and further competitive-programming profiles.

Older CVs contain conflicting employment and project dates. The site retains the newer Development Manager / Lead Software Engineer timeline, leaves ambiguous project dates out, and does not present old incomplete graduate-study status as a completed degree. Training and exploratory interests are identified separately from certifications and delivered projects. Original source documents beyond the existing public CV download are not copied into the website assets.

Content is based on Rana Hamid’s supplied CVs, ERP portfolio, and self-introduction. The public site emphasizes Development Manager responsibilities and hands-on Business Central/NAV experience. F&O is presented as certification experience. Nine ERP entries use screenshots from the supplied PDF; other project artwork consists of original CSS illustrations. Dynamic competitive-programming rankings and clinical accuracy figures are intentionally omitted. Certification entries describe credentials earned rather than claiming active certification status.

Update the current role and career history when they change. Keep the contact details, downloadable CV, canonical URL, Open Graph metadata, structured data, and sitemap in sync.
