import { useEffect, useRef, type ReactNode, type VideoHTMLAttributes } from "react";

type VideoSource = {
  src: string;
  type?: string;
};

type PortfolioVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "children" | "src"> & {
  src?: string;
  sources?: readonly VideoSource[];
  reduceMotion: boolean | null;
  scrollRoot?: { readonly current: Element | null };
  children?: ReactNode;
};

/**
 * Shared playback contract for every case-study video.
 * A muted video starts as soon as it enters the detail viewport,
 * loops while it remains visible, and pauses after it leaves or the tab hides.
 */
export function PortfolioVideo({
  src,
  sources,
  reduceMotion,
  scrollRoot,
  controls = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "metadata",
  children,
  ...videoProps
}: PortfolioVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;

    const syncPlayback = () => {
      if (visible && !document.hidden && reduceMotion === false) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0;
        syncPlayback();
      },
      {
        root: scrollRoot?.current ?? null,
        threshold: 0,
      },
    );

    video.pause();
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reduceMotion, scrollRoot]);

  return (
    <video
      {...videoProps}
      ref={videoRef}
      src={src}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
    >
      {sources?.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
      {children}
    </video>
  );
}
