# 谢敬淳个人作品集

React + Vite portfolio starter for a visual / AI / brand designer.

## Run

```bash
pnpm install
pnpm build
pnpm preview
```

In this Codex workspace, the verified preview is available at:

```text
http://127.0.0.1:4173/
```

## Replace Assets

Project images and portrait assets live in:

```text
public/assets/
```

The current project images are polished placeholders generated for the first runnable version. Replace them with real portfolio screenshots later while keeping the same filenames, or update the image paths in `src/main.jsx`.

## Hero Video

The Hero keeps a video background layer plus animated visual fallback for local preview stability. When a real background video is ready, place it at:

```text
public/assets/hero-video.mp4
```

Then add a `<source src="/assets/hero-video.mp4" type="video/mp4" />` inside the Hero `<video>` element in `src/main.jsx`.
