# Dave_Jay | Developer & ICT Specialist

A responsive personal portfolio for David Jusu, built with semantic HTML, CSS, and vanilla JavaScript. Designed for GitHub Pages and other static hosts.

## Included
- Responsive, dark navy / electric-blue visual system
- Scroll-reveal transitions and subtle animated identity card
- Reduced-motion support and keyboard-accessible dialogs
- Skills grouped by self-assessed proficiency
- Project cards with editable overview dialogs
- Services and pricing placeholders (set real rates before launch)
- Email quote links without a server-side backend
- QR-code generation for the deployed URL
- GitHub Pages deployment workflow

## Before publishing
1. Review the biography and make sure every sentence represents you accurately.
2. Confirm the implementation status of each project and add approved screenshots or repository/demo links.
3. Edit `SITE_CONFIG.prices` in `script.js` with your actual starting prices. Do not publish the default placeholder prices.
4. Verify every social media profile URL and add any missing links.
5. Add your own professional photo if you want one; this starter uses a typographic monogram instead of inventing a portrait.
6. Check that the `qrcodejs` CDN and Google Fonts load. QR generation requires an internet connection.

## Publish on GitHub Pages
1. Create a new public repository named `DaveJay007.github.io` if you want the clean account-level URL `https://DaveJay007.github.io/`, or use a repository such as `davejay-portfolio` for a project URL.
2. Upload the contents of this folder to the repository's `main` branch.
3. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The included workflow deploys the static site after a push to `main`.
5. Open the Pages URL shown in the repository settings / Actions deployment.
6. Test the website on a phone and desktop. The QR code is generated from the live URL.

## Hosting note
GitHub Pages supports static websites, which is suitable for this portfolio. It does not run a server-side Python, PHP, or Node backend. If a future version needs user accounts, secure form processing, or stored requests, add a separate backend or use a static host plus a suitable backend service. Do not put secrets or private client data in this repository.

## Edit guide
- Main copy and page structure: `index.html`
- Design, layout, and animations: `styles.css`
- Skills, project overview text, pricing, and interactions: `script.js`
- Browser tab icon: `assets/favicon.svg`
