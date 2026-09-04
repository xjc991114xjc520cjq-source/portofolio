# Portfolio Workflow

## Stack

- React 18, TypeScript, Vite, Tailwind CSS, Motion, and Lucide React.
- Use pnpm for dependency management.

## Commands

- Install: `pnpm install`
- Develop: `pnpm dev`
- Build and verify: `pnpm build`
- Preview production build: `pnpm preview`

## Design Direction

- Preserve the portfolio's major content sections and Xie Jingchun's personal information.
- Keep the visual language dark, restrained, cinematic, and design-led.
- Avoid template-like layouts, excessive glass cards, large empty bands, and repetitive copy blocks.
- Maintain clear continuity between sections and verify desktop-first layouts around a 1700px content width.
- Keep interactions smooth and purposeful; respect `prefers-reduced-motion`.

## Approved Project Heroes — Protected Scope

- Do not change any approved project-detail hero unless the user explicitly requests a hero change. Requests to optimize details, curate assets, enrich a case, or strengthen an extension-gallery control authorize body work only.
- Preserve hero imagery, image crop/position, titles and copy, typography, palette, gradient overlays, full-image/overlaid-text composition, navigation relationship, and responsive behavior. Do not replace these with a new shared layout or a split-column design.
- Previous error (2026-09-04): body refinement accidentally redesigned all older heroes and replaced some images/titles. The user rejected this. Commit `0b47d65` restores the approved heroes from `21d813b`; use this as the reference until an explicitly approved later hero change supersedes it.
- Scope body styles beneath `.project-detail-copy` or dedicated body components. Check ancestor classes and shared CSS for indirect hero effects. Before publishing body changes, compare hero screenshots and image/title selections with the approved baseline at desktop and mobile widths.
- If a genuine hero issue is discovered during unrelated work, report it and obtain explicit direction before changing its design. Do not infer authorization from “optimize” or “follow portfolio standards.”

## Engineering Rules

- Follow existing component and CSS patterns before adding dependencies or abstractions.
- Do not mix Windows and WSL `node_modules` directories.
- Keep generated output out of manual edits.
- Preserve unrelated user changes.
- A task is complete only after the production build passes and the affected page is visually checked.

## GitHub Sync

- After every completed project change, commit the intended files with a concise message and push the current branch to `origin`.
- Never commit credentials, local caches, generated previews, or unrelated user files.
- If authentication or the network blocks a push, preserve the local commit and report the exact blocker.
