# Agentic Reasoning — interactive classroom presentation

**Open `index.html` in Chrome, Edge, Firefox, or Safari.** No server, build, account, or internet connection is required. If using the ZIP, extract it first and keep the files together.

The presentation contains **16 slides** with a **19 minute 30 second** speaking plan, including demonstrations. It covers the survey’s §6.5, pages 57–64, with a WebVoyager case study and two deeper looks at Agent Workflow Memory and Agent Laboratory. Speaker notes are embedded in `slides.js` and available inside the presentation.

## Presenting

| Key / control | Action |
| --- | --- |
| Right arrow, Space, Page Down | Reveal the next teaching stage, then advance slides |
| Left arrow, Page Up | Reverse a stage; from the first stage, return to the preceding completed slide |
| Shift + Right / Left | Move directly between slides |
| R / ↺ | Restart the current slide’s sequence |
| Shift + R | Restart the entire presentation and clear all revealed states |
| N / Notes | Read the current slide’s notes in a panel |
| P | Open a separate presenter window with notes, timer, next slide title, and remote navigation |
| O / ▦ | Open slide overview and jump to a slide |
| F / ⛶ | Toggle fullscreen |
| Home / End | First slide / final synthesis |
| ? | Show shortcuts |
| Ctrl/Cmd + P | Print all completed slides |

The top chapter buttons jump to acting, learning, and collaborating. The bottom progress line tracks slides. A “Reveal” label indicates that the current slide has more stages. Small on-slide buttons advance or replay the interactive loops. The chart provides tooltips by hover, keyboard focus, or tap. Swipe left/right is also supported.

The Mind2Web chart bar animates on first entry; the WebArena bar waits for the next advance. Replay lets you present both manually. Reasoning, memory, delegation, and capability sequences wait for presenter input. Revisiting a slide retains its state; navigating backward from a first stage displays the prior slide completed. Reduced motion follows the operating system’s `prefers-reduced-motion` preference and preserves every teaching state.

For a two-screen setup, open the presenter window with **P**, move it to your own screen, and project the main presentation window. The popup starts a timer and controls the main deck. If blocked by your browser, allow popups for this local file or use **N**. Close the notes panel before projecting the main window. Presenter and deck windows must remain open for synchronization.

## Included files

- `index.html`, `styles.css`, `slides.js`, `app.js`, `assets/mark.svg`: complete editable application.
- `presentation.pdf`: 16-page static backup, with completed diagrams and all revealed content.
- `speaker-notes.md`: standalone notes and slide-by-slide timing.
- `presentation-script.txt`: read-aloud script with slide-by-slide animation cues.
- `summary.md`: assigned-reading summary and brief deep-dive findings.
- `bibliography.md`: original-paper links, version details, quantitative claim ledger, and interpretation limits.
- `qa/report.json`: recorded browser checks.
- `qa/verify.mjs`: reproducible Chrome verification and PDF export script (development dependency only).

All visuals are native HTML, CSS, and SVG. Typography uses local Georgia and Segoe UI/Arial fallbacks. There are **no runtime dependencies, CDNs, web fonts, analytics, API calls, or external image assets**. Original-paper hyperlinks require internet when clicked; the deck and its local documents do not.

## Editing and PDF export

Edit content, citations, timing, and notes in `slides.js`; presentation behavior is in `app.js`; visual styles and print layout are in `styles.css`. The stage is 1600×900 and scales proportionally to the viewport. Small portrait screens retain the full 16:9 canvas; a desktop or landscape display is recommended for reading long notes and presenting.

To export again, open `index.html?print=1` or use browser Print. Choose Save as PDF, enable background graphics, and disable browser headers/footers. The print stylesheet declares 16:9 pages and reveals all content automatically. The included PDF was generated directly from Chrome’s print renderer.

Optional verification requires Node.js and `playwright-core` (the only development dependency). On this Windows workspace:

```powershell
npm install
npm run verify
```

`qa/verify.mjs` uses the installed Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Change that executable path for another machine. Tests run from local files with browser network access disabled, inspect every slide at 1920×1080, test navigation/interactions, check 1366×768, 1024×768, and portrait fitting, exercise normal and reduced motion, verify presenter controls and fullscreen, and regenerate the PDF. `npm run notes` regenerates the standalone notes. `npm run package` rebuilds the offline ZIP using PowerShell on Windows.

## Presentation-day check

Extract and open the deck once on the classroom machine; test its projector and popup policy; then press Shift + R. The speaking plan is a rehearsal target, not an actual timed delivery measurement. Physical projector contrast and the classroom computer’s browser cannot be verified from this workspace. The PDF is available if browser presentation features are unavailable.
