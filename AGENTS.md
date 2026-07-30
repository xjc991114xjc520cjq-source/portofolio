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

## Engineering Rules

- Follow existing component and CSS patterns before adding dependencies or abstractions.
- Do not mix Windows and WSL `node_modules` directories.
- Keep generated output out of manual edits.
- Preserve unrelated user changes.
- A task is complete only after the production build passes and the affected page is visually checked.
