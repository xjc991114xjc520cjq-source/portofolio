Project images in this directory are generated placeholder bitmap assets for the first runnable portfolio version. Replace them with real portfolio screenshots when available.

Gallery image setup:

- `image` is the full-resolution file loaded only after a work is opened.
- `thumbnail` is an optional lightweight preview used by the draggable card.
- `thumbnailMode: "cover"` fills the card and accepts `focalPoint`, for example `"42% 30%"`.
- `thumbnailMode: "contain"` keeps transparent or irregular artwork fully visible without a rectangular backing plate.
- `thumbnailMode: "long"` previews a tall page from the top and opens it in fit-width reading mode.
- `thumbnailMode: "wide"` previews a panorama and adds a restrained horizontal hover scan.

If `thumbnailMode` is omitted, very tall and very wide images are detected from their intrinsic dimensions. Large local originals should still provide a separate `thumbnail` to avoid decoding the full file in the gallery.
