import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Maximize2,
  Minus,
  Moon,
  Plus,
  Sun,
  X,
} from "lucide-react";
import "./styles.css";

const contactEmail = "1498224542@qq.com";
const slowFastScrollEase = (progress: number) => progress ** 1.35;
const softFoldScrollEase = (progress: number) => progress * progress * (3 - 2 * progress);

const metrics = [
  { value: "4+", label: "年视觉设计经验" },
  { value: "60%+", label: "小程序到店引流增长" },
  { value: "80%", label: "线上商城电商转型" },
];

const projectShowcaseItems = [
  {
    index: "01",
    title: "夜航电台",
    english: "NOCTURNE FM",
    category: "品牌识别",
    categoryEnglish: "BRAND IDENTITY",
    year: "2026",
    image: "/assets/project-showcase-nocturne.webp",
    alt: "夜航电台品牌识别海报与广播视觉系统",
    backdrop: "NOCTURNE",
  },
  {
    index: "02",
    title: "潮汐零九",
    english: "TIDE / 09",
    category: "商业视觉",
    categoryEnglish: "COMMERCE VISUALS",
    year: "2025",
    image: "/assets/project-showcase-tide.webp",
    alt: "潮汐零九深蓝玻璃材质商业视觉",
    backdrop: "TIDE",
  },
  {
    index: "03",
    title: "场域之物",
    english: "FIELD OBJECTS",
    category: "包装系统",
    categoryEnglish: "PACKAGING SYSTEM",
    year: "2025",
    image: "/assets/project-showcase-field-objects.webp",
    alt: "场域之物灰绿色哑光包装系统",
    backdrop: "FIELD",
  },
  {
    index: "04",
    title: "余像计划",
    english: "AFTERIMAGE",
    category: "编辑海报",
    categoryEnglish: "EDITORIAL POSTER",
    year: "2024",
    image: "/assets/project-showcase-afterimage.webp",
    alt: "余像计划动态人物编辑海报",
    backdrop: "AFTERIMAGE",
  },
  {
    index: "05",
    title: "以太网格",
    english: "AETHER GRID",
    category: "技术创新",
    categoryEnglish: "TECHNOLOGY INNOVATION",
    year: "2026",
    image: "/assets/project-showcase-aether-grid.webp",
    alt: "以太网格暗场技术创新视觉",
    backdrop: "AETHER",
  },
] as const;

// Keep the selected photography inside the deploy so the gallery never depends
// on an overseas image host at viewing time.
const unsplashImage = (id: string) => `/assets/work-photos/${id}.webp`;

const imageAtWidth = (source: string, width: number) => source.includes("images.unsplash.com")
  ? source.replace(/([?&])w=\d+/, `$1w=${width}`)
  : source;

const imageSrcSet = (source: string, widths: number[]) => source.includes("images.unsplash.com")
  ? widths.map((width) => `${imageAtWidth(source, width)} ${width}w`).join(", ")
  : undefined;

type WorkThumbnailMode = "cover" | "contain" | "long" | "wide";

type WorkItem = {
  id: string;
  title: string;
  year: string;
  image: string;
  alt: string;
  thumbnail?: string;
  thumbnailMode?: WorkThumbnailMode;
  focalPoint?: string;
};

type WorkCategory = {
  id: string;
  label: string;
  english: string;
  index: string;
  background: string;
  transitionImage: string;
  works: WorkItem[];
};

const workCategories: WorkCategory[] = [
  {
    id: "brand",
    label: "品牌视觉",
    english: "Brand Identity",
    index: "01",
    background: unsplashImage("1494438639946-1ebd1d20bf85"),
    transitionImage: "/assets/category-transitions/brand-identity.webp",
    works: [
      { id: "brand-01", title: "识别系统", year: "2024", image: unsplashImage("1494438639946-1ebd1d20bf85"), alt: "现代品牌空间与陈设" },
      { id: "brand-02", title: "空间延展", year: "2024", image: unsplashImage("1484101403633-562f891dc89a"), alt: "现代室内空间摄影" },
      { id: "brand-03", title: "品牌影像", year: "2023", image: unsplashImage("1497366754035-f200968a6e72"), alt: "开放式创意办公空间" },
      { id: "brand-04", title: "视觉语法", year: "2023", image: unsplashImage("1518005020951-eccb494ad742"), alt: "建筑几何与光影" },
      { id: "brand-05", title: "质感研究", year: "2022", image: "/assets/project-brand-vi.png", alt: "品牌视觉识别项目" },
    ],
  },
  {
    id: "commerce",
    label: "电商视觉",
    english: "Commerce Visuals",
    index: "02",
    background: unsplashImage("1523275335684-37898b6baf30"),
    transitionImage: "/assets/category-transitions/commerce-visuals.webp",
    works: [
      {
        id: "commerce-andersen",
        title: "安徒生童话详情页",
        year: "2026",
        image: "/assets/works/commerce-andersen-long.jpg",
        thumbnail: "/assets/works/commerce-andersen-thumb.jpg",
        thumbnailMode: "long",
        focalPoint: "50% 0%",
        alt: "青葫芦立体剧场书安徒生童话电商详情页设计",
      },
      { id: "commerce-01", title: "静物陈列", year: "2024", image: unsplashImage("1523275335684-37898b6baf30"), alt: "腕表产品静物摄影" },
      { id: "commerce-02", title: "产品场景", year: "2024", image: unsplashImage("1542291026-7eec264c27ff"), alt: "运动鞋产品摄影" },
      { id: "commerce-03", title: "材质特写", year: "2023", image: unsplashImage("1543163521-1bf539c55dd2"), alt: "产品材质细节摄影" },
      { id: "commerce-04", title: "消费叙事", year: "2023", image: unsplashImage("1495474472287-4d71bcdd2085"), alt: "咖啡与生活方式摄影" },
      { id: "commerce-05", title: "商城视觉", year: "2022", image: "/assets/project-commerce.png", alt: "电商小程序视觉项目" },
    ],
  },
  {
    id: "packaging",
    label: "包装设计",
    english: "Packaging Design",
    index: "03",
    background: unsplashImage("1547891654-e66ed7ebb968"),
    transitionImage: "/assets/category-transitions/packaging-design.webp",
    works: [
      { id: "packaging-01", title: "结构与触感", year: "2024", image: unsplashImage("1547891654-e66ed7ebb968"), alt: "极简产品包装摄影" },
      { id: "packaging-02", title: "系列包装", year: "2024", image: unsplashImage("1513364776144-60967b0f800f"), alt: "色彩与材质艺术摄影" },
      { id: "packaging-03", title: "开箱体验", year: "2023", image: unsplashImage("1523726491678-bf852e717f6a"), alt: "设计桌面与纸张细节" },
      { id: "packaging-04", title: "零售陈列", year: "2023", image: unsplashImage("1503602642458-232111445657"), alt: "零售建筑与展示空间" },
      { id: "packaging-05", title: "礼盒系统", year: "2022", image: "/assets/project-packaging.png", alt: "产品礼盒包装项目" },
    ],
  },
  {
    id: "editorial",
    label: "海报编辑",
    english: "Editorial & Poster",
    index: "04",
    background: unsplashImage("1529139574466-a303027c1d8b"),
    transitionImage: "/assets/category-transitions/editorial-poster.webp",
    works: [
      { id: "editorial-01", title: "造型研究", year: "2024", image: unsplashImage("1529139574466-a303027c1d8b"), alt: "时尚造型编辑摄影" },
      { id: "editorial-02", title: "版面节奏", year: "2024", image: unsplashImage("1515886657613-9f3515b0c78f"), alt: "街头时尚人物摄影" },
      { id: "editorial-03", title: "时尚影像", year: "2023", image: unsplashImage("1483985988355-763728e1935b"), alt: "服装陈列摄影" },
      { id: "editorial-04", title: "城市切片", year: "2023", image: unsplashImage("1509631179647-0177331693ae"), alt: "城市环境中的时尚摄影" },
      { id: "editorial-05", title: "图形实验", year: "2022", image: unsplashImage("1490481651871-ab68de25d43d"), alt: "编辑式人物摄影" },
    ],
  },
  {
    id: "technology",
    label: "技术创新",
    english: "Technology Innovation",
    index: "05",
    background: unsplashImage("1561070791-2526d30994b5"),
    transitionImage: "/assets/category-transitions/technology-innovation.webp",
    works: [
      { id: "digital-01", title: "移动界面", year: "2024", image: unsplashImage("1561070791-2526d30994b5"), alt: "移动端界面设计工作场景" },
      { id: "digital-02", title: "交互原型", year: "2024", image: unsplashImage("1516321318423-f06f85e504b3"), alt: "笔记本电脑交互设计场景" },
      { id: "digital-03", title: "数字场景", year: "2023", image: unsplashImage("1558655146-9f40138edfeb"), alt: "数字产品设计工作台" },
      { id: "digital-04", title: "内容系统", year: "2023", image: unsplashImage("1523726491678-bf852e717f6a"), alt: "创意设计与内容规划桌面" },
      { id: "digital-05", title: "界面视觉", year: "2022", image: "/assets/project-commerce.png", alt: "数字商业界面项目" },
    ],
  },
];

const heroImages = [
  "/assets/hero-landscape-v2.webp",
  "/assets/hero-commerce-v2.webp",
  "/assets/hero-editorial-v2.webp",
  "/assets/project-brand-vi.png",
  "/assets/project-commerce.png",
  "/assets/project-packaging.png",
  "/assets/project-exhibition.png",
  "/assets/hero-poster.png",
];

const streamBlueprints = [
  { stream: 1, duration: 2, widths: [9.2, 7.4, 5.8, 8.2, 6.6, 7.8], ratios: [0.78, 1.28, 0.74, 0.82, 1.2, 0.76] },
  { stream: 2, duration: 2.2, widths: [8.8, 6.2, 7.8, 5.6, 7, 6.4], ratios: [1.24, 0.76, 0.82, 1.34, 0.78, 1.16] },
  { stream: 3, duration: 2.4, widths: [9.6, 7.2, 5.6, 8.4, 6.8, 7.6], ratios: [0.8, 1.3, 0.72, 0.78, 1.18, 0.76] },
  { stream: 4, duration: 2, widths: [8.6, 6.4, 7.6, 5.4, 7.2, 6.2], ratios: [1.22, 0.76, 0.82, 1.28, 0.8, 1.18] },
  { stream: 5, duration: 2.2, widths: [7.8, 5.8, 8.4, 6.4, 7.2, 5.6], ratios: [0.8, 1.24, 0.74, 1.18, 0.82, 1.28] },
  { stream: 6, duration: 2.4, widths: [8.2, 6, 7.4, 5.6, 6.8, 7.6], ratios: [1.2, 0.78, 1.3, 0.76, 1.18, 0.82] },
] as const;

const heroMedia = streamBlueprints.flatMap((blueprint, groupIndex) =>
  blueprint.widths.map((width, slot) => ({
    id: `stream-${blueprint.stream}-photo-${slot + 1}`,
    image: heroImages[(groupIndex * 3 + slot) % heroImages.length],
    stream: blueprint.stream,
    slot,
    depth: slot % 3 === 0 ? "near" : slot % 3 === 1 ? "mid" : "far",
    width,
    ratio: blueprint.ratios[slot],
    rotate: ((slot % 3) - 1) * 5 + (groupIndex % 2 ? 2 : -2),
    opacity: slot % 3 === 0 ? 0.8 : slot % 3 === 1 ? 0.52 : 0.3,
    blur: slot % 3 === 0 ? 1 : slot % 3 === 1 ? 4 : 7.5,
    duration: blueprint.duration,
    delay: -(slot * blueprint.duration / blueprint.widths.length) - groupIndex * 1.1,
    stackX: ((slot % 3) - 1) * 9 + (slot > 2 ? 4 : -4),
    stackY: ((slot % 2) - 0.5) * 12 + (slot > 2 ? 3 : -3),
    mobileHidden: slot > 2,
    objectPosition: slot % 3 === 0 ? "40% 50%" : slot % 3 === 1 ? "60% 50%" : "50% 50%",
  })),
);

const heroPriorityIds = new Set(
  heroImages
    .map((image) => heroMedia.find((item) => item.image === image)?.id)
    .filter((id): id is string => Boolean(id)),
);

function HeroMedia({ item, index }: { item: (typeof heroMedia)[number]; index: number }) {
  const style = {
    "--media-width": `${item.width}vw`,
    "--media-ratio": item.ratio,
    "--media-rotate": `${item.rotate}deg`,
    "--media-opacity": item.opacity,
    "--media-blur": `${item.blur}px`,
    "--stream-duration": `${item.duration}s`,
    "--stream-delay": `${item.delay}s`,
    "--stack-x": `${item.stackX}px`,
    "--stack-y": `${item.stackY}px`,
    "--enter-delay": `${0.18 + index * 0.045}s`,
    "--float-x": `${index % 2 ? -7 : 8}px`,
    "--float-y": `${index % 3 ? -9 : 7}px`,
  } as React.CSSProperties;

  return (
    <div className={`media-flight stream-${item.stream} depth-${item.depth}${item.mobileHidden ? " mobile-hidden" : ""}`} style={style}>
      <figure className="hero-media">
        <img
          src={item.image}
          alt=""
          loading={heroPriorityIds.has(item.id) ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: item.objectPosition }}
        />
      </figure>
    </div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const words = ["Design", "Create", "Inspire"];
  const word = words[Math.min(words.length - 1, Math.floor(count / 34))];

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 90);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <div className="loader" aria-label="Portfolio loading">
      <span className="loader-label">Portfolio</span>
      <strong key={word}>{word}</strong>
      <em>{String(count).padStart(3, "0")}</em>
      <div className="loader-progress">
        <i style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}

function Nav() {
  const returnHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.history.replaceState(null, "", "#top");
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <header className="nav">
      <div className="nav-pill">
        <a className="logo" href="#top" aria-label="Back to top" onClick={returnHome}>
          <span>XJ</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#top" onClick={returnHome}>首页</a>
          <a href="#profile">履历</a>
        </nav>
        <a className="say-hi" href={`mailto:${contactEmail}`}>
          联系
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const motionActive = !reduceMotion && motionEnabled && heroVisible;
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const centerOpacity = useTransform(scrollYProgress, [0, 0.52, 0.88, 1], [1, 1, 0, 0]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const centerScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.96, 0.84]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.68, 1], [1, 1.08, 1.3]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.78, 0.16]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.72, 0.18]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (motionActive) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [motionActive]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.12),
      { threshold: [0, 0.12] },
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  const movePhotoSpace = (event: React.PointerEvent<HTMLElement>) => {
    if (!motionActive || !spaceRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    spaceRef.current.style.setProperty("--pointer-x", `${x * 8}px`);
    spaceRef.current.style.setProperty("--pointer-y", `${y * 6}px`);
    spaceRef.current.style.setProperty("--pointer-rx", `${y * -3}deg`);
    spaceRef.current.style.setProperty("--pointer-ry", `${x * 3.5}deg`);
    spaceRef.current.style.setProperty("--near-x", `${x * 8}px`);
    spaceRef.current.style.setProperty("--near-y", `${y * 6}px`);
    spaceRef.current.style.setProperty("--mid-x", `${x * 4}px`);
    spaceRef.current.style.setProperty("--mid-y", `${y * 3}px`);
    spaceRef.current.style.setProperty("--far-x", `${x * 2}px`);
    spaceRef.current.style.setProperty("--far-y", `${y * 1.5}px`);
  };

  const resetPhotoSpace = () => {
    spaceRef.current?.style.setProperty("--pointer-x", "0px");
    spaceRef.current?.style.setProperty("--pointer-y", "0px");
    spaceRef.current?.style.setProperty("--pointer-rx", "0deg");
    spaceRef.current?.style.setProperty("--pointer-ry", "0deg");
    spaceRef.current?.style.setProperty("--near-x", "0px");
    spaceRef.current?.style.setProperty("--near-y", "0px");
    spaceRef.current?.style.setProperty("--mid-x", "0px");
    spaceRef.current?.style.setProperty("--mid-y", "0px");
    spaceRef.current?.style.setProperty("--far-x", "0px");
    spaceRef.current?.style.setProperty("--far-y", "0px");
  };

  return (
    <div className="hero-scene" id="top" ref={sceneRef}>
        <section
          className={`hero ${motionActive ? "motion-on" : "motion-off"}`}
          onPointerMove={movePhotoSpace}
          onPointerLeave={resetPhotoSpace}
        >
        <motion.video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/hero-poster.png"
          preload="metadata"
          src="/assets/aura-background.mp4"
          style={motionActive ? { scale: videoScale, opacity: videoOpacity } : undefined}
        />
        <div className="hero-shade" />
        <motion.div
          className="hero-orbit"
          aria-hidden="true"
          style={motionActive ? { scale: orbitScale, rotate: orbitRotate, opacity: orbitOpacity } : undefined}
        >
          <div className="hero-space" ref={spaceRef}>
            {heroMedia.map((item, index) => (
              <HeroMedia item={item} index={index} key={item.id} />
            ))}
          </div>
        </motion.div>
        <motion.div
          className="hero-center"
          style={motionActive ? { opacity: centerOpacity, y: centerY, scale: centerScale } : undefined}
        >
          <p className="hero-signature blur-in">
            <span>XIE JINGCHUN</span>
            <i aria-hidden="true" />
            <span>PORTFOLIO</span>
          </p>
          <h1 className="name-reveal" aria-label="DESIGN WORKS">
            <span className="title-line design-line" aria-hidden="true">
              <b>DESIGN</b>
            </span>
            <span className="title-line works-line" aria-hidden="true">
              <b>WORKS</b>
            </span>
            <span className="title-glyph title-glyph-d" data-letter="D" aria-hidden="true">D</span>
            <span className="title-glyph title-glyph-w" data-letter="W" aria-hidden="true">W</span>
          </h1>
          <div className="hero-title-index blur-in" aria-label="精选设计作品，品牌、数字体验与动态视觉，2021 至 2026">
            <span><b>01</b> SELECTED WORKS</span>
            <i aria-hidden="true" />
            <span>BRAND · DIGITAL · MOTION</span>
            <i aria-hidden="true" />
            <span>2021-2026</span>
          </div>
          <p className="hero-desc blur-in">
            <strong>视觉设计 / 品牌系统 / AIGC 视觉</strong>
            <span>以策略为起点，构建从品牌识别、视觉叙事到数字体验的完整设计作品。</span>
          </p>
        </motion.div>
        <motion.div className="hero-controls" style={motionActive ? { opacity: centerOpacity } : undefined}>
          <div className="hero-motion-toggle" aria-label="头屏动效设置">
            <button
              className={motionEnabled ? "active" : ""}
              type="button"
              aria-pressed={motionEnabled}
              onClick={() => setMotionEnabled(true)}
            >
              动态
            </button>
            <button
              className={!motionEnabled ? "active" : ""}
              type="button"
              aria-pressed={!motionEnabled}
              onClick={() => setMotionEnabled(false)}
            >
              静止
            </button>
          </div>
          <a className="hero-work-link" href="#work">
            <span>查看作品</span>
            <b aria-hidden="true">↘</b>
          </a>
        </motion.div>
        </section>
    </div>
  );
}

type GalleryWork = WorkItem;
type GallerySpread = "desktop" | "tablet" | "mobile";
type CategoryTransition = {
  nextIndex: number;
  phase: "cover" | "reveal";
};

function useViewportMatch(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(media.matches);
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}

function useDocumentScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    root.classList.add("is-scroll-locked");
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.classList.remove("is-scroll-locked");
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [locked]);
}

const wrapGalleryPosition = (position: number, total: number) => {
  const half = total / 2;
  return ((position + half) % total + total) % total - half;
};

function GalleryCard({
  work,
  cardIndex,
  cardCount,
  active,
  spread,
  locked,
  trackProgress,
  onSelect,
}: {
  work: GalleryWork;
  cardIndex: number;
  cardCount: number;
  active: boolean;
  spread: GallerySpread;
  locked: boolean;
  trackProgress: MotionValue<number>;
  onSelect: () => void;
}) {
  const [detectedMode, setDetectedMode] = useState<WorkThumbnailMode>("cover");
  const thumbnailMode = work.thumbnailMode ?? detectedMode;
  const thumbnailSource = work.thumbnail ?? work.image;
  const thumbnailPosition = work.focalPoint ?? (thumbnailMode === "long" ? "50% 0%" : "50% 50%");
  const innerSpread = spread === "mobile" ? 74 : spread === "tablet" ? 126 : 178;
  const outerSpread = spread === "mobile" ? 122 : spread === "tablet" ? 202 : 286;
  const compactness = spread === "mobile" ? 0.72 : spread === "tablet" ? 0.88 : 1;
  const loopPosition = useTransform(trackProgress, (progress) => wrapGalleryPosition(cardIndex + progress, cardCount));
  const cardX = useTransform(loopPosition, (position) => {
    const distance = Math.abs(position);
    if (distance <= 1) return position * innerSpread;
    return Math.sign(position) * (innerSpread + (distance - 1) * (outerSpread - innerSpread));
  });
  const cardY = useTransform(loopPosition, (position) => Math.pow(Math.abs(position), 1.28) * 22 * compactness);
  const cardRotate = useTransform(loopPosition, (position) => position * 3.9 * compactness);
  const cardScale = useTransform(loopPosition, (position) => 1 - Math.min(2.5, Math.abs(position)) * 0.067);
  const cardOpacity = useTransform(loopPosition, (position) => {
    const distance = Math.abs(position);
    const depthOpacity = 1 - Math.min(distance, 2) * 0.125;
    if (distance <= 2) return depthOpacity;
    return depthOpacity * Math.max(0, (2.5 - distance) / 0.5);
  });
  const cardZIndex = useTransform(loopPosition, (position) => Math.round(100 - Math.abs(position) * 20));

  return (
    <motion.button
      className={`gallery-card gallery-card-${thumbnailMode}${active ? " is-active" : ""}`}
      type="button"
      disabled={locked}
      aria-label={active ? `放大作品：${work.title}` : `切换到作品：${work.title}`}
      style={{
        x: cardX,
        y: cardY,
        rotateZ: cardRotate,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: cardZIndex,
      }}
      onClick={onSelect}
    >
      <div className="gallery-card-body">
        <figure className="gallery-card-surface">
          <img
            src={imageAtWidth(thumbnailSource, 1200)}
            srcSet={imageSrcSet(thumbnailSource, [640, 900, 1200])}
            sizes="(max-width: 720px) 70vw, (max-width: 980px) 52vw, 470px"
            alt={work.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ objectPosition: thumbnailPosition }}
            onLoad={(event) => {
              if (work.thumbnailMode) return;
              const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;
              if (ratio < 0.52) setDetectedMode("long");
              else if (ratio > 2.35) setDetectedMode("wide");
              else setDetectedMode("cover");
            }}
          />
          <span className="gallery-card-shine" aria-hidden="true" />
        </figure>
      </div>
    </motion.button>
  );
}

type ViewerMode = "fit" | "width";
type ViewerBackground = "dark" | "light";

function WorkViewer({
  work,
  category,
  reduceMotion,
  onClose,
  onNavigate,
}: {
  work: GalleryWork;
  category: WorkCategory;
  reduceMotion: boolean | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoom = useMotionValue(1);
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewerMode, setViewerMode] = useState<ViewerMode>(
    work.thumbnailMode === "long" ? "width" : "fit",
  );
  const [background, setBackground] = useState<ViewerBackground>("dark");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const detectedRatio = imageSize.height > 0 ? imageSize.width / imageSize.height : 1;
  const isLong = work.thumbnailMode === "long" || detectedRatio < 0.52;
  const canPan = viewerMode === "fit" && zoomLevel > 1.01;
  const thumbnailSource = work.thumbnail ?? imageAtWidth(work.image, 1200);

  const requestClose = () => {
    if (viewerRef.current) viewerRef.current.style.pointerEvents = "none";
    onClose();
  };

  const applyZoom = (nextZoom: number) => {
    const clampedZoom = Math.min(4, Math.max(0.75, nextZoom));
    setZoomLevel(clampedZoom);
    zoom.set(clampedZoom);
    if (clampedZoom <= 1.01) {
      panX.set(0);
      panY.set(0);
    }
  };

  const resetView = (mode: ViewerMode) => {
    setViewerMode(mode);
    applyZoom(1);
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
    setImageSize({ width: 0, height: 0 });
    setViewerMode(work.thumbnailMode === "long" ? "width" : "fit");
    applyZoom(1);
    scrollRef.current?.scrollTo({ top: 0, left: 0 });
  }, [work.id]);

  useEffect(() => {
    viewerRef.current?.focus({ preventScroll: true });
  }, []);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setImageSize({ width, height });
    setImageLoaded(true);
    if (!work.thumbnailMode && width / height < 0.52) {
      setViewerMode("width");
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (viewerMode === "width" && !event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    applyZoom(zoom.get() * Math.exp(-event.deltaY * 0.0012));
  };

  const jumpLongImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const scroller = scrollRef.current;
    if (!scroller) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    scroller.scrollTo({
      top: progress * Math.max(0, scroller.scrollHeight - scroller.clientHeight),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNavigate(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNavigate(1);
      return;
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      applyZoom(zoom.get() + 0.25);
      return;
    }
    if (event.key === "-") {
      event.preventDefault();
      applyZoom(zoom.get() - 0.25);
    }
  };

  return (
    <motion.div
      ref={viewerRef}
      className={`work-viewer viewer-bg-${background}`}
      role="dialog"
      aria-modal="true"
      aria-label={`作品大图：${work.title}`}
      tabIndex={-1}
      initial={false}
      onClick={requestClose}
      onKeyDown={handleKeyDown}
    >
      <div className="viewer-topbar" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => resetView(viewerMode === "fit" ? "width" : "fit")}
          aria-label={viewerMode === "fit" ? "适合宽度" : "适合屏幕"}
          title={viewerMode === "fit" ? "适合宽度" : "适合屏幕"}
        >
          <Maximize2 size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <span>{Math.round(zoomLevel * 100)}%</span>
        <button
          type="button"
          onClick={() => applyZoom(zoom.get() - 0.25)}
          aria-label="缩小作品"
          title="缩小"
        >
          <Minus size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => applyZoom(zoom.get() + 0.25)}
          aria-label="放大作品"
          title="放大"
        >
          <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setBackground((value) => value === "dark" ? "light" : "dark")}
          aria-label={background === "dark" ? "切换浅色背景" : "切换深色背景"}
          title={background === "dark" ? "浅色背景" : "深色背景"}
        >
          {background === "dark"
            ? <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
            : <Moon size={18} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      </div>

      <button
        className="viewer-close"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          requestClose();
        }}
        aria-label="关闭作品大图"
      >
        <X size={22} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <button
        className="viewer-nav viewer-nav-prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="上一件作品"
      >
        <ArrowLeft size={22} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button
        className="viewer-nav viewer-nav-next"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(1);
        }}
        aria-label="下一件作品"
      >
        <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div
        ref={scrollRef}
        className={`viewer-scroll viewer-mode-${viewerMode}${isLong ? " is-long" : ""}`}
        onClick={(event) => event.stopPropagation()}
        onWheel={handleWheel}
      >
        {!imageLoaded && !imageFailed ? (
          <div
            className="viewer-loading"
            style={{ backgroundImage: `url("${thumbnailSource}")` }}
            aria-label="作品正在加载"
          />
        ) : null}

        {imageFailed ? (
          <div className="viewer-error" role="alert">
            <strong>图像暂时无法读取</strong>
            <span>请关闭后重新打开，或检查作品文件是否仍在项目中。</span>
          </div>
        ) : viewerMode === "width" ? (
          <figure
            className={`viewer-long-canvas${imageLoaded ? " is-loaded" : ""}`}
            style={{ "--viewer-width": `${zoomLevel * 100}%` } as React.CSSProperties}
          >
            <img
              src={work.image}
              alt={work.alt}
              decoding="async"
              draggable={false}
              onLoad={handleImageLoad}
              onError={() => setImageFailed(true)}
            />
          </figure>
        ) : (
          <motion.figure
            className={`viewer-fit-canvas${imageLoaded ? " is-loaded" : ""}${canPan ? " can-pan" : ""}`}
            style={{ x: panX, y: panY, scale: zoom }}
            drag={canPan}
            dragMomentum={false}
            dragElastic={0.08}
            onDoubleClick={() => applyZoom(zoomLevel > 1.01 ? 1 : 2)}
          >
            <img
              src={work.image}
              alt={work.alt}
              decoding="async"
              draggable={false}
              onLoad={handleImageLoad}
              onError={() => setImageFailed(true)}
            />
          </motion.figure>
        )}
      </div>

      {isLong && viewerMode === "width" ? (
        <button
          className="viewer-progress"
          type="button"
          onClick={jumpLongImage}
          aria-label="跳转到长图位置"
          title="点击跳转"
        >
          <motion.i style={{ scaleY: scrollYProgress }} />
        </button>
      ) : null}

      <div className="viewer-meta" onClick={(event) => event.stopPropagation()}>
        <span>{category.label} / {category.english}</span>
        <strong>{work.title}</strong>
        <small>{work.year}</small>
      </div>
    </motion.div>
  );
}

function SelectedWorks({
  sectionRef,
  handoffProgress,
  exitProgress,
}: {
  sectionRef: React.RefObject<HTMLElement>;
  handoffProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
}) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);
  const [expandedWork, setExpandedWork] = useState<GalleryWork | null>(null);
  const [viewerSession, setViewerSession] = useState(0);
  const [categoryTransition, setCategoryTransition] = useState<CategoryTransition | null>(null);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [isCardTransitioning, setIsCardTransitioning] = useState(false);
  const suppressCardClick = useRef(false);
  const dragResetTimeout = useRef<number | null>(null);
  const lightboxReturnFocus = useRef<HTMLElement | null>(null);
  const settledTrack = useRef(0);
  const workIndexRef = useRef(0);
  const carouselAnimating = useRef(false);
  const gallerySnapAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const galleryPointerSession = useRef<{
    pointerId: number;
    startTrack: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    acceleration: number;
    dragging: boolean;
    interrupted: boolean;
  } | null>(null);
  const reduceMotion = useReducedMotion();
  const isMobileGallery = useViewportMatch("(max-width: 720px)");
  const isTabletGallery = useViewportMatch("(max-width: 980px)");
  const gallerySpread: GallerySpread = isMobileGallery ? "mobile" : isTabletGallery ? "tablet" : "desktop";
  const category = workCategories[categoryIndex];
  const nextCategory = categoryTransition ? workCategories[categoryTransition.nextIndex] : null;
  const activeWork = category.works[workIndex];
  const worksEntryOpacity = useTransform(handoffProgress, [0, 0.08, 0.22], [0, 0.72, 1]);
  const worksEntryY = useTransform(
    handoffProgress,
    [0, 0.24, 0.68, 1],
    [isMobileGallery ? 72 : isTabletGallery ? 98 : 122, isMobileGallery ? 46 : 68, 8, 0],
  );
  const worksEntryScale = useTransform(
    handoffProgress,
    [0, 0.3, 0.72, 1],
    [isMobileGallery ? 0.965 : 0.935, 0.96, 0.994, 1],
  );
  const worksEntryRotateX = useTransform(handoffProgress, [0, 0.58, 1], [isMobileGallery ? 2.5 : 5.5, 1.2, 0]);
  const worksExitY = useTransform(
    exitProgress,
    [0, 0.18, 0.5, 0.72, 0.86, 1],
    [
      0,
      0,
      isMobileGallery ? -2 : -3,
      isMobileGallery ? -8 : isTabletGallery ? -10 : -12,
      isMobileGallery ? -38 : isTabletGallery ? -48 : -60,
      isMobileGallery ? -92 : isTabletGallery ? -116 : -140,
    ],
  );
  const worksExitScaleY = useTransform(
    exitProgress,
    [0, 0.18, 0.5, 0.72, 0.86, 1],
    [1, 1, 0.98, 0.88, 0.58, 0.12],
  );
  const worksExitRotateX = useTransform(
    exitProgress,
    [0, 0.18, 0.48, 0.72, 0.88, 1],
    [0, 0, 1, isMobileGallery ? 2.5 : 3, isMobileGallery ? 6 : 7, isMobileGallery ? 8 : 10],
  );
  const worksExitOpacity = useTransform(exitProgress, [0, 0.52, 0.76, 0.92, 1], [1, 1, 0.92, 0.3, 0]);
  const worksExitFilter = useTransform(
    exitProgress,
    [0, 0.52, 0.78, 1],
    ["blur(0px)", "blur(0px)", "blur(2.5px)", "blur(10px)"],
  );
  const worksOpacity = useTransform(() => worksEntryOpacity.get() * worksExitOpacity.get());
  const worksY = useTransform(() => worksEntryY.get() + worksExitY.get());
  const worksScaleY = useTransform(() => worksEntryScale.get() * worksExitScaleY.get());
  const worksRotateX = useTransform(() => worksEntryRotateX.get() + worksExitRotateX.get());
  const worksPointerEvents = useTransform(() => (
    handoffProgress.get() > 0.36 && exitProgress.get() < 0.58 ? "auto" : "none"
  ));

  const backdropOpacityIn = useTransform(handoffProgress, [0.04, 0.18, 0.5], [0, 0.72, 1]);
  const backdropYIn = useTransform(handoffProgress, [0, 0.68, 1], [isMobileGallery ? 34 : 68, 10, 0]);
  const backdropScaleIn = useTransform(handoffProgress, [0, 0.58, 1], [1.16, 1.035, 1]);

  const toplineOpacityIn = useTransform(handoffProgress, [0.08, 0.24, 0.43], [0, 0.72, 1]);
  const toplineXIn = useTransform(handoffProgress, [0.05, 0.68, 1], [isMobileGallery ? -34 : -96, -8, 0]);
  const toplineYIn = useTransform(handoffProgress, [0.05, 0.7, 1], [-12, 0, 0]);

  const galleryOpacityIn = useTransform(handoffProgress, [0.12, 0.24, 0.42], [0, 0.64, 1]);
  const galleryYIn = useTransform(
    handoffProgress,
    [0.08, 0.38, 0.76, 1],
    [isMobileGallery ? 98 : isTabletGallery ? 126 : 158, isMobileGallery ? 62 : 88, 8, 0],
  );
  const galleryScaleIn = useTransform(handoffProgress, [0.08, 0.38, 0.78, 1], [0.84, 0.9, 0.992, 1]);
  const galleryRotateXIn = useTransform(handoffProgress, [0.08, 0.52, 1], [isMobileGallery ? 5 : 10, 2.4, 0]);
  const galleryRotateZIn = useTransform(handoffProgress, [0.08, 0.54, 1], [isMobileGallery ? -0.5 : -1.15, -0.2, 0]);
  const galleryFoldY = useTransform(exitProgress, [0, 0.22, 0.7, 1], [0, 0, isMobileGallery ? -12 : -18, isMobileGallery ? -22 : -32]);
  const galleryFoldScale = useTransform(exitProgress, [0, 0.2, 0.68, 1], [1, 1, 0.94, 0.88]);
  const galleryFoldRotateX = useTransform(exitProgress, [0, 0.24, 0.72, 1], [0, 0, 2, 4]);
  const galleryY = useTransform(() => galleryYIn.get() + galleryFoldY.get());
  const galleryScale = useTransform(() => galleryScaleIn.get() * galleryFoldScale.get());
  const galleryRotateX = useTransform(() => galleryRotateXIn.get() + galleryFoldRotateX.get());

  const headingOpacityIn = useTransform(handoffProgress, [0.08, 0.2, 0.38], [0, 0.68, 1]);
  const headingXIn = useTransform(handoffProgress, [0.06, 0.6, 1], [isMobileGallery ? -42 : -156, 12, 0]);
  const headingScaleXIn = useTransform(handoffProgress, [0.06, 0.58, 1], [0.74, 1.025, 1]);

  const footerOpacityIn = useTransform(handoffProgress, [0.12, 0.28, 0.48], [0, 0.78, 1]);
  const footerXIn = useTransform(handoffProgress, [0.08, 0.68, 1], [isMobileGallery ? 38 : 104, 8, 0]);
  const footerYIn = useTransform(handoffProgress, [0.08, 0.62, 1], [20, 0, 0]);

  const shutterTopY = useTransform(handoffProgress, [0, 0.08, 0.56, 0.72], ["0%", "0%", "-102%", "-102%"]);
  const shutterBottomY = useTransform(handoffProgress, [0, 0.08, 0.56, 0.72], ["0%", "0%", "102%", "102%"]);
  const shutterOpacity = useTransform(handoffProgress, [0.58, 0.74], [1, 0]);
  const shutterSeamOpacity = useTransform(handoffProgress, [0.03, 0.12, 0.46, 0.62], [0, 0.88, 0.42, 0]);
  const shutterSeamScaleX = useTransform(handoffProgress, [0.03, 0.22, 0.6], [0.08, 1, 0.32]);
  const galleryTrack = useMotionValue(0);
  const galleryCardStep = gallerySpread === "mobile" ? 112 : gallerySpread === "tablet" ? 164 : 218;
  const galleryDragLimit = galleryCardStep * 2.2;
  const galleryDragThreshold = gallerySpread === "mobile" ? 48 : gallerySpread === "tablet" ? 66 : 82;

  useDocumentScrollLock(Boolean(expandedWork) || Boolean(categoryTransition));

  useEffect(() => {
    workCategories.forEach((item) => {
      const transitionImage = new Image();
      transitionImage.src = item.transitionImage;
    });
  }, []);

  useMotionValueEvent(galleryTrack, "change", (track) => {
    const nextWorkIndex = ((-Math.round(track) % category.works.length) + category.works.length) % category.works.length;
    if (nextWorkIndex === workIndexRef.current) return;
    workIndexRef.current = nextWorkIndex;
    setWorkIndex(nextWorkIndex);
  });

  const releaseClickGuard = () => {
    if (dragResetTimeout.current !== null) window.clearTimeout(dragResetTimeout.current);
    dragResetTimeout.current = window.setTimeout(() => {
      suppressCardClick.current = false;
      dragResetTimeout.current = null;
    }, 0);
  };

  const syncWorkIndexFromTrack = (track: number) => {
    const nextWorkIndex = ((-Math.round(track) % category.works.length) + category.works.length) % category.works.length;
    workIndexRef.current = nextWorkIndex;
    setWorkIndex(nextWorkIndex);
  };

  const settleGalleryTrack = (
    target: number,
    duration = 0.78,
    ease: [number, number, number, number] = [0.16, 1, 0.3, 1],
  ) => {
    gallerySnapAnimation.current?.stop();
    carouselAnimating.current = true;
    setIsCardTransitioning(true);
    gallerySnapAnimation.current = animate(galleryTrack, target, {
      duration,
      ease,
      onComplete: () => {
        carouselAnimating.current = false;
        settledTrack.current = target;
        syncWorkIndexFromTrack(target);
        setIsCardTransitioning(false);
        releaseClickGuard();
      },
    });
  };

  const transitionWork = (direction: number, steps = 1) => {
    if (categoryTransition) return;
    gallerySnapAnimation.current?.stop();
    carouselAnimating.current = false;
    setIsCardTransitioning(false);
    const target = Math.round(galleryTrack.get()) - direction * steps;
    if (reduceMotion) {
      galleryTrack.set(target);
      settledTrack.current = target;
      syncWorkIndexFromTrack(target);
      return;
    }
    settleGalleryTrack(target, 0.74);
  };

  const openExpandedWork = (work: GalleryWork) => {
    lightboxReturnFocus.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setViewerSession((session) => session + 1);
    setExpandedWork(work);
  };

  const focusGalleryWork = (cardIndex: number, work: GalleryWork) => {
    if (categoryTransition || suppressCardClick.current) return;
    const currentTrack = galleryTrack.get();
    const relativePosition = wrapGalleryPosition(cardIndex + currentTrack, category.works.length);

    if (cardIndex === workIndexRef.current || Math.abs(relativePosition) < 0.025) {
      openExpandedWork(work);
      return;
    }

    gallerySnapAnimation.current?.stop();
    carouselAnimating.current = false;
    setIsCardTransitioning(false);
    const target = currentTrack - relativePosition;

    if (reduceMotion) {
      galleryTrack.set(target);
      settledTrack.current = target;
      syncWorkIndexFromTrack(target);
      return;
    }

    const travel = Math.abs(relativePosition);
    const duration = Math.min(0.92, 0.58 + travel * 0.12);
    settleGalleryTrack(target, duration, [0.16, 1, 0.3, 1]);
  };

  const changeCategory = (index: number) => {
    if (index === categoryIndex || categoryTransition) return;
    gallerySnapAnimation.current?.stop();
    carouselAnimating.current = false;
    setIsCardTransitioning(false);
    if (reduceMotion) {
      setCategoryIndex(index);
      setWorkIndex(0);
      workIndexRef.current = 0;
      settledTrack.current = 0;
      galleryTrack.set(0);
      return;
    }
    setCategoryTransition({ nextIndex: index, phase: "cover" });
  };

  const closeExpandedWork = () => {
    if (dragResetTimeout.current !== null) {
      window.clearTimeout(dragResetTimeout.current);
      dragResetTimeout.current = null;
    }
    suppressCardClick.current = false;
    galleryPointerSession.current = null;
    setIsGalleryDragging(false);
    setExpandedWork(null);
    window.requestAnimationFrame(() => {
      lightboxReturnFocus.current?.focus({ preventScroll: true });
      lightboxReturnFocus.current = null;
    });
  };

  const navigateExpandedWork = (direction: number) => {
    if (!expandedWork || categoryTransition) return;
    const workCount = category.works.length;
    const currentIndex = category.works.findIndex((work) => work.id === expandedWork.id);
    const nextIndex = (currentIndex + direction + workCount) % workCount;
    const currentTrack = galleryTrack.get();
    const relativePosition = wrapGalleryPosition(nextIndex + currentTrack, workCount);
    const target = currentTrack - relativePosition;

    gallerySnapAnimation.current?.stop();
    carouselAnimating.current = false;
    setIsCardTransitioning(false);
    galleryTrack.set(target);
    settledTrack.current = target;
    syncWorkIndexFromTrack(target);
    setExpandedWork(category.works[nextIndex]);
  };

  const startGalleryDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || categoryTransition || !event.isPrimary || event.button !== 0) return;
    const interrupted = carouselAnimating.current || isCardTransitioning;
    gallerySnapAnimation.current?.stop();
    carouselAnimating.current = false;
    setIsCardTransitioning(false);
    if (dragResetTimeout.current !== null) {
      window.clearTimeout(dragResetTimeout.current);
      dragResetTimeout.current = null;
    }
    suppressCardClick.current = interrupted;
    const currentTrack = galleryTrack.get();
    settledTrack.current = currentTrack;
    galleryPointerSession.current = {
      pointerId: event.pointerId,
      startTrack: currentTrack,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      acceleration: 0,
      dragging: false,
      interrupted,
    };
  };

  const moveGalleryDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const session = galleryPointerSession.current;
    if (!session || session.pointerId !== event.pointerId) return;
    const offsetX = event.clientX - session.startX;
    const offsetY = event.clientY - session.startY;
    if (!session.dragging) {
      if (Math.abs(offsetX) < 5 || Math.abs(offsetX) < Math.abs(offsetY)) return;
      session.dragging = true;
      suppressCardClick.current = true;
      setIsGalleryDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const clampedOffset = Math.max(-galleryDragLimit, Math.min(galleryDragLimit, offsetX));
    const resistedOffset = clampedOffset + (offsetX - clampedOffset) * 0.14;
    galleryTrack.set(session.startTrack + resistedOffset / galleryCardStep);
    const elapsed = Math.max(8, event.timeStamp - session.lastTime);
    const instantVelocity = (event.clientX - session.lastX) / elapsed * 1000;
    const previousVelocity = session.velocity;
    const nextVelocity = session.velocity === 0
      ? instantVelocity
      : session.velocity * 0.58 + instantVelocity * 0.42;
    session.acceleration = (nextVelocity - previousVelocity) / (elapsed / 1000);
    session.velocity = nextVelocity;
    session.lastX = event.clientX;
    session.lastTime = event.timeStamp;
  };

  const finishGalleryDrag = (event: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const session = galleryPointerSession.current;
    if (!session || session.pointerId !== event.pointerId) return;
    galleryPointerSession.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!session.dragging) {
      if (session.interrupted) {
        const interruptedTrack = galleryTrack.get();
        settledTrack.current = interruptedTrack;
        syncWorkIndexFromTrack(interruptedTrack);
        releaseClickGuard();
      }
      return;
    }
    setIsGalleryDragging(false);
    const releaseDelay = event.timeStamp - session.lastTime;
    const decayedVelocity = session.velocity * Math.exp(-releaseDelay / 180);
    const accelerationImpulse = Math.sign(session.acceleration) === Math.sign(decayedVelocity)
      ? Math.max(-1400, Math.min(1400, session.acceleration * 0.014))
      : 0;
    const releaseVelocity = decayedVelocity + accelerationImpulse;
    const velocityContribution = Math.max(-420, Math.min(420, releaseVelocity * 0.18));
    const currentOffset = (galleryTrack.get() - session.startTrack) * galleryCardStep;
    const projectedOffset = currentOffset + velocityContribution;
    const hasMomentum = Math.abs(projectedOffset) >= galleryDragThreshold || Math.abs(releaseVelocity) >= 260;
    if (!cancelled && hasMomentum) {
      const velocityInCards = releaseVelocity / galleryCardStep;
      const speed = Math.abs(velocityInCards);
      const coastFactor = 0.24 + Math.min(speed, 16) / 16 * 0.58;
      const inertiaTravel = Math.max(-9, Math.min(9, velocityInCards * coastFactor));
      let target = Math.round(galleryTrack.get() + inertiaTravel);
      const startSlot = Math.round(session.startTrack);
      if (target === startSlot) target = startSlot + (projectedOffset < 0 ? -1 : 1);
      const travel = Math.abs(target - galleryTrack.get());
      const duration = Math.max(0.52, Math.min(3.2, 0.48 + Math.min(speed, 16) * 0.095 + travel * 0.12));
      settleGalleryTrack(target, duration, [0.07, 0.72, 0.12, 1]);
      releaseClickGuard();
      return;
    }
    if (cancelled || reduceMotion) {
      galleryTrack.set(session.startTrack);
      settledTrack.current = session.startTrack;
      syncWorkIndexFromTrack(session.startTrack);
      releaseClickGuard();
      return;
    }
    settleGalleryTrack(session.startTrack, 0.42, [0.16, 1, 0.3, 1]);
    releaseClickGuard();
  };

  const completeCategoryTransition = () => {
    if (!categoryTransition) return;
    if (categoryTransition.phase === "cover") {
      const nextIndex = categoryTransition.nextIndex;
      setCategoryIndex(nextIndex);
      setWorkIndex(0);
      workIndexRef.current = 0;
      settledTrack.current = 0;
      galleryTrack.set(0);
      setCategoryTransition({ nextIndex, phase: "reveal" });
      return;
    }
    setCategoryTransition(null);
  };

  useEffect(() => () => {
    if (dragResetTimeout.current !== null) window.clearTimeout(dragResetTimeout.current);
    gallerySnapAnimation.current?.stop();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="works"
      id="work"
      tabIndex={-1}
      aria-busy={Boolean(categoryTransition) || isCardTransitioning}
      onKeyDown={(event) => {
        if (expandedWork || categoryTransition || isCardTransitioning) return;
        if (event.key === "ArrowLeft") transitionWork(-1);
        if (event.key === "ArrowRight") transitionWork(1);
      }}
    >
      <motion.div
        className="works-transition-layer"
        style={reduceMotion ? undefined : {
          opacity: worksOpacity,
          y: worksY,
          scaleX: worksEntryScale,
          scaleY: worksScaleY,
          rotateX: worksRotateX,
          filter: worksExitFilter,
          pointerEvents: worksPointerEvents,
        }}
      >
        <motion.div
          className="works-backdrop-entry"
          style={reduceMotion ? undefined : { opacity: backdropOpacityIn, y: backdropYIn, scale: backdropScaleIn }}
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              className="works-backdrop"
              key={category.id}
              initial={reduceMotion || categoryTransition ? false : { opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion || categoryTransition ? undefined : { opacity: 0, scale: 1.02 }}
              transition={{ duration: categoryTransition ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={imageAtWidth(category.background, 1280)}
                srcSet={imageSrcSet(category.background, [900, 1280, 1800])}
                sizes="100vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="works-grain" aria-hidden="true" />
        {!reduceMotion ? (
          <motion.div className="works-reveal-shutter" style={{ opacity: shutterOpacity }} aria-hidden="true">
            <motion.span className="works-reveal-panel works-reveal-panel-top" style={{ y: shutterTopY }} />
            <motion.span className="works-reveal-panel works-reveal-panel-bottom" style={{ y: shutterBottomY }} />
            <motion.i
              className="works-reveal-seam"
              style={{ opacity: shutterSeamOpacity, scaleX: shutterSeamScaleX }}
            />
          </motion.div>
        ) : null}
        <div className="works-stage shell">
        <motion.header
          className="works-topline"
          style={reduceMotion ? undefined : { opacity: toplineOpacityIn, x: toplineXIn, y: toplineYIn }}
        >
          <div className="section-kicker">
            <i />
            <span>Selected Works</span>
          </div>
          <span>{category.index} / 05</span>
        </motion.header>

        <motion.nav
          className="works-footer"
          aria-label="作品导航"
          style={reduceMotion ? undefined : { opacity: footerOpacityIn, x: footerXIn, y: footerYIn }}
        >
          <div className="active-work-meta">
            <span>{category.english}</span>
            <strong>{activeWork.title}</strong>
            <small>{activeWork.year} / VISUAL STUDY</small>
          </div>

          <div className="category-switcher">
            <button
              className="category-current"
              type="button"
              aria-label="展开并切换作品分类"
              aria-haspopup="menu"
            >
              <span className="category-current-index" aria-hidden="true">
                <b>{category.index}</b>
                <small>/ 05</small>
              </span>
              <span className="category-current-copy">
                <strong>{category.label}</strong>
                <em>{category.english}</em>
              </span>
              <span className="category-current-action" aria-hidden="true">
                <small className="category-current-note">
                  <span className="category-current-note-hover">悬停选择分类</span>
                  <span className="category-current-note-tap">点击选择分类</span>
                </small>
                <span className="category-current-toggle">
                  <ChevronDown size={17} strokeWidth={1.45} />
                </span>
              </span>
            </button>
            <div className="category-menu" role="menu" aria-label="作品分类">
              {workCategories.map((item, index) => (
                <button
                  type="button"
                  role="menuitem"
                  key={item.id}
                  className={index === categoryIndex ? "is-current" : ""}
                  aria-current={index === categoryIndex ? "true" : undefined}
                  disabled={Boolean(categoryTransition)}
                  onClick={(event) => {
                    event.currentTarget.blur();
                    changeCategory(index);
                  }}
                >
                  <span className="category-menu-index">{item.index}</span>
                  <span className="category-menu-copy">
                    <strong>{item.label}</strong>
                    <small>{item.english}</small>
                  </span>
                  <span className="category-menu-state" aria-hidden="true">
                    <ArrowRight size={14} strokeWidth={1.45} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="works-instruction">拖动控制方向与速度<br />点击作品组停止惯性</p>
        </motion.nav>

        <motion.div
          className="gallery-heading"
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: headingOpacityIn, x: headingXIn, scaleX: headingScaleXIn }}
        >
          <span>{category.english}</span>
        </motion.div>

        <motion.div
          className="gallery-stage"
          style={reduceMotion ? undefined : {
            opacity: galleryOpacityIn,
            y: galleryY,
            scale: galleryScale,
            rotateX: galleryRotateX,
            rotateZ: galleryRotateZIn,
            transformPerspective: 1200,
          }}
        >
          <button
            className="gallery-arrow gallery-arrow-prev"
            type="button"
            onClick={() => transitionWork(-1)}
            aria-label="上一件作品"
            disabled={Boolean(categoryTransition)}
          >
            <ArrowLeft size={22} strokeWidth={1.5} aria-hidden="true" />
            <span>Prev work</span>
          </button>

          <div className="gallery-stack" aria-live="polite">
            <motion.div
              className={`gallery-drag-layer${isGalleryDragging ? " is-dragging" : ""}`}
              role="group"
              aria-label="拖动切换作品"
              onPointerDown={startGalleryDrag}
              onPointerMove={moveGalleryDrag}
              onPointerUp={finishGalleryDrag}
              onPointerCancel={(event) => finishGalleryDrag(event, true)}
            >
              {category.works.map((work, index) => {
                const position = wrapGalleryPosition(index - workIndex, category.works.length);
                return (
                  <GalleryCard
                    key={work.id}
                    work={work}
                    cardIndex={index}
                    cardCount={category.works.length}
                    active={position === 0}
                    spread={gallerySpread}
                    locked={Boolean(categoryTransition)}
                    trackProgress={galleryTrack}
                    onSelect={() => focusGalleryWork(index, work)}
                  />
                );
              })}
            </motion.div>
            <div className="gallery-stack-index" aria-hidden="true">
              <span>{String(workIndex + 1).padStart(2, "0")}</span>
              <i />
              <span>{String(category.works.length).padStart(2, "0")}</span>
            </div>
          </div>

          <button
            className="gallery-arrow gallery-arrow-next"
            type="button"
            onClick={() => transitionWork(1)}
            aria-label="下一件作品"
            disabled={Boolean(categoryTransition)}
          >
            <span>Next work</span>
            <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </motion.div>
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {categoryTransition && nextCategory ? (
            <motion.div
              className="category-transition"
              key={nextCategory.id}
              initial={{ y: "100%" }}
              animate={{ y: categoryTransition.phase === "cover" ? "0%" : "-100%" }}
              transition={{
                duration: categoryTransition.phase === "cover" ? 0.72 : 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
              onAnimationComplete={completeCategoryTransition}
            >
              <motion.img
                className="category-transition-media"
                src={nextCategory.transitionImage}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{
                  opacity: categoryTransition.phase === "cover" ? 0.9 : 0.56,
                  scale: categoryTransition.phase === "cover" ? 1.015 : 1.07,
                }}
                transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="category-transition-copy"
                role="status"
                aria-live="polite"
                aria-label={`正在切换至${nextCategory.label}`}
                initial={{ opacity: 0, y: 54 }}
                animate={categoryTransition.phase === "cover"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -38 }}
                transition={{
                  duration: categoryTransition.phase === "cover" ? 0.54 : 0.3,
                  delay: categoryTransition.phase === "cover" ? 0.12 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <strong>{nextCategory.label}</strong>
                <span>{nextCategory.english}</span>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}

      {createPortal(
        <AnimatePresence>
          {expandedWork ? (
            <WorkViewer
              key={`work-viewer-${viewerSession}`}
              work={expandedWork}
              category={category}
              reduceMotion={reduceMotion}
              onClose={closeExpandedWork}
              onNavigate={navigateExpandedWork}
            />
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}

function Profile({ handoffProgress }: { handoffProgress: MotionValue<number> }) {
  const profileRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: profileRef,
    offset: ["start 40%", "start -40%"],
  });
  const acceleratedProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { ease: slowFastScrollEase });
  const pacedRevealProgress = useTransform(acceleratedProgress, [0, 1], [0, 0.72]);

  const stageOpacity = useTransform(pacedRevealProgress, [0, 0.05, 0.34, 0.42], [0, 0, 0.98, 1]);
  const shellY = useTransform(pacedRevealProgress, [0, 0.42], [140, 0]);
  const toplineOpacity = useTransform(pacedRevealProgress, [0.04, 0.36], [0, 1]);
  const toplineY = useTransform(pacedRevealProgress, [0.04, 0.54], [-34, 0]);
  const backdropOpacity = useTransform(pacedRevealProgress, [0.08, 0.4], [0, 1]);
  const backdropY = useTransform(pacedRevealProgress, [0.04, 0.42], [82, 0]);
  const backdropScale = useTransform(pacedRevealProgress, [0.04, 0.42], [1.16, 1]);
  const portraitOpacity = useTransform(pacedRevealProgress, [0.08, 0.4], [0, 1]);
  const portraitY = useTransform(pacedRevealProgress, [0.04, 0.42], [184, 0]);
  const portraitScale = useTransform(pacedRevealProgress, [0.04, 0.42], [0.88, 1]);
  const copyOpacity = useTransform(pacedRevealProgress, [0.08, 0.38], [0, 1]);
  const copyX = useTransform(pacedRevealProgress, [0.08, 0.42], [-92, 0]);
  const copyY = useTransform(pacedRevealProgress, [0.08, 0.42], [42, 0]);
  const factsOpacity = useTransform(pacedRevealProgress, [0.15, 0.42], [0, 1]);
  const factsX = useTransform(pacedRevealProgress, [0.14, 0.42], [96, 0]);
  const bottomlineOpacity = useTransform(pacedRevealProgress, [0.22, 0.42], [0, 1]);
  const bottomlineY = useTransform(pacedRevealProgress, [0.22, 0.42], [34, 0]);
  const profileExitOpacity = useTransform(handoffProgress, [0, 0.06, 0.5, 0.78, 1], [1, 1, 0.3, 0.05, 0]);
  const profileExitY = useTransform(handoffProgress, [0, 1], [0, -156]);
  const profileExitScale = useTransform(handoffProgress, [0, 0.28, 1], [1, 0.98, 0.9]);
  const bottomlineExitOpacity = useTransform(handoffProgress, [0, 0.04, 0.34, 0.56], [1, 1, 0.12, 0]);
  const bottomlineExitY = useTransform(handoffProgress, [0, 1], [0, -34]);
  const profileEdgeOpacity = useTransform(handoffProgress, [0, 0.04, 0.3, 0.5], [0.34, 0.28, 0.06, 0]);
  const profileEdgeScaleX = useTransform(handoffProgress, [0, 0.5], [1, 0.58]);
  const profileEdgeY = useTransform(handoffProgress, [0, 0.5], [0, -18]);
  const composedStageOpacity = useTransform(() => stageOpacity.get() * profileExitOpacity.get());
  const composedShellY = useTransform(() => shellY.get() + profileExitY.get());
  const composedBottomlineOpacity = useTransform(() => bottomlineOpacity.get() * bottomlineExitOpacity.get());
  const composedBottomlineY = useTransform(() => bottomlineY.get() + bottomlineExitY.get());
  const composedPointerEvents = useTransform(() => pacedRevealProgress.get() > 0.22 && handoffProgress.get() < 0.72 ? "auto" : "none");

  const stageStyle = reduceMotion ? undefined : { opacity: composedStageOpacity, pointerEvents: composedPointerEvents };

  return (
    <motion.section
      ref={profileRef}
      className="profile"
      id="profile"
      style={stageStyle}
    >
      <motion.div
        className="profile-shell shell"
        style={reduceMotion ? undefined : { y: composedShellY, scale: profileExitScale }}
      >
        <motion.div
          className="profile-topline"
          style={reduceMotion ? undefined : { opacity: toplineOpacity, y: toplineY }}
        >
          <span>VISUAL DESIGNER / DIGITAL CREATOR</span>
          <span>AVAILABLE FOR SELECTED PROJECTS <b aria-hidden="true">✦</b></span>
        </motion.div>

        <motion.div
          className="profile-backdrop"
          aria-hidden="true"
          style={reduceMotion ? undefined : { opacity: backdropOpacity, y: backdropY, scale: backdropScale }}
        >
          PROFILE
        </motion.div>

        <motion.div
          className="profile-copy"
          style={reduceMotion ? undefined : { opacity: copyOpacity, x: copyX, y: copyY }}
        >
          <div className="section-kicker">
            <i />
            <span>About</span>
          </div>
          <p className="profile-script">Hello, I’m</p>
          <h2>
            <span>谢敬淳</span>
            <em>XIE JINGCHUN</em>
          </h2>
          <strong className="profile-role">
            <span>视觉设计师</span><span>品牌体验</span><span>AIGC 创意</span>
          </strong>
          <p className="profile-intro">
            <strong className="profile-intro-lead">以品牌策略为起点</strong>
            <span className="profile-intro-copy">
              <span>把概念转译为清晰、有记忆点的视觉系统，</span>
              <span>持续探索平面、数字体验与生成式视觉之间的边界。</span>
            </span>
          </p>
          <span className="profile-location">CHENGDU, CN / WORKING WORLDWIDE</span>
        </motion.div>

        <motion.figure
          className="profile-portrait"
          style={reduceMotion ? undefined : { opacity: portraitOpacity, y: portraitY, scale: portraitScale }}
        >
          <img src="/assets/profile-person-user.webp" alt="人物肖像" loading="lazy" decoding="async" />
          <figcaption>PORTRAIT</figcaption>
        </motion.figure>

        <motion.aside
          className="profile-facts"
          style={reduceMotion ? undefined : { opacity: factsOpacity, x: factsX }}
        >
          <p className="profile-statement">
            <span className="profile-statement-label">DESIGN PHILOSOPHY</span>
            <strong>
              <span className="profile-statement-lead">系统性的视觉语言</span>
              <span className="profile-statement-copy">让创意成为可识别、可传播的品牌资产。</span>
            </strong>
          </p>
          <div className="metric-strip">
            {metrics.map((metric, index) => (
              <article className={index === 0 ? "metric-primary" : "metric-secondary"} key={metric.label}>
                <strong>{metric.value}</strong>
                <span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <small>{metric.label}</small>
                </span>
              </article>
            ))}
          </div>
          <a className="profile-contact" href={`mailto:${contactEmail}`}>
            <span>START A PROJECT</span>
            <b aria-hidden="true">↗</b>
          </a>
        </motion.aside>

        <motion.div
          className="profile-bottomline"
          style={reduceMotion ? undefined : { opacity: composedBottomlineOpacity, y: composedBottomlineY }}
        >
          <span>BRAND / COMMERCE / CAMPAIGN / AIGC</span>
          <span>SELECTED WORKS / NEXT</span>
        </motion.div>
      </motion.div>
      <motion.span
        className="profile-exit-edge"
        aria-hidden="true"
        style={reduceMotion ? undefined : { opacity: profileEdgeOpacity, scaleX: profileEdgeScaleX, y: profileEdgeY }}
      />
    </motion.section>
  );
}

function PortfolioSequence() {
  const worksRef = useRef<HTMLElement>(null);
  const projectRef = useRef<HTMLElement>(null);
  const { scrollYProgress: worksEntryScroll } = useScroll({
    target: worksRef,
    offset: ["start 80%", "start 20%"],
  });
  const { scrollYProgress: projectEntryScroll } = useScroll({
    target: projectRef,
    offset: ["start 92%", "start 22%"],
  });
  const handoffProgress = useTransform(worksEntryScroll, [0, 1], [0, 1], { ease: slowFastScrollEase });
  const projectEntryTarget = useTransform(projectEntryScroll, [0, 1], [0, 1], { ease: softFoldScrollEase });
  const projectEntryProgress = useSpring(projectEntryTarget, { stiffness: 140, damping: 28, mass: 0.55 });

  return (
    <>
      <Profile handoffProgress={handoffProgress} />
      <SelectedWorks
        sectionRef={worksRef}
        handoffProgress={handoffProgress}
        exitProgress={projectEntryProgress}
      />
      <ProjectShowcase sectionRef={projectRef} entryProgress={projectEntryProgress} />
    </>
  );
}

function ProjectShowcaseCard({
  item,
  index,
  entryProgress,
  isActive,
  isFocused,
  isSuppressed,
  onFocus,
  onBlur,
  onClick,
}: {
  item: (typeof projectShowcaseItems)[number];
  index: number;
  entryProgress: MotionValue<number>;
  isActive: boolean;
  isFocused: boolean;
  isSuppressed: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const start = 0.1 + index * 0.045;
  const settle = 0.68 + index * 0.055;
  const opacity = useTransform(entryProgress, [start, start + 0.16, settle], [0, 0.7, 1]);
  const y = useTransform(entryProgress, [start, settle], [180 + index * 18, 0]);
  const x = useTransform(entryProgress, [start, settle], [(index - 2) * 32, 0]);
  const scale = useTransform(entryProgress, [start, settle], [0.82 + index * 0.018, 1]);
  const rotateZ = useTransform(entryProgress, [start, settle], [(2 - index) * 1.65, 0]);

  return (
    <motion.button
      className={`project-showcase-item${isActive ? " is-active" : ""}${isFocused ? " is-focused" : ""}${isSuppressed ? " is-suppressed" : ""}`}
      type="button"
      aria-label={`查看项目：${item.title}`}
      aria-pressed={isActive}
      aria-expanded={isFocused}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      style={reduceMotion ? undefined : {
        opacity,
        y,
        x,
        scale,
        rotateZ,
        transformPerspective: 1200,
        transformOrigin: "center bottom",
      }}
    >
      <span className="project-showcase-art">
        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
        <span className="project-showcase-art-shade" aria-hidden="true" />
        <span className="project-showcase-backdrop" aria-hidden="true">{item.backdrop}</span>
      </span>
      <span className="project-showcase-index">{item.index}</span>
      <span className="project-showcase-meta">
        <strong>{item.title}</strong>
        <em>{item.english}</em>
        <span>
          {item.category}
          <small>{item.categoryEnglish}</small>
        </span>
        <b>{item.year}</b>
      </span>
    </motion.button>
  );
}

function ProjectShowcase({
  sectionRef,
  entryProgress,
}: {
  sectionRef: React.RefObject<HTMLElement>;
  entryProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useViewportMatch("(max-width: 720px)");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const displayIndex = hoveredIndex ?? focusedIndex ?? activeIndex;
  const panelOpacity = useTransform(entryProgress, [0, 0.1, 0.42, 1], [0, 0.12, 0.96, 1]);
  const panelY = useTransform(entryProgress, [0, 0.76, 1], [isMobile ? 112 : 238, -8, 0]);
  const panelScaleY = useTransform(entryProgress, [0, 0.78, 1], [isMobile ? 0.95 : 0.88, 1.008, 1]);
  const panelRotateX = useTransform(entryProgress, [0, 0.78, 1], [isMobile ? 4.5 : 11, -0.7, 0]);
  const panelPointerEvents = useTransform(entryProgress, (progress) => progress > 0.42 ? "auto" : "none");
  const headingOpacity = useTransform(entryProgress, [0.26, 0.44, 0.68], [0, 0.62, 1]);
  const headingX = useTransform(entryProgress, [0.22, 0.72, 1], [isMobile ? -42 : -112, 8, 0]);
  const headingRotateZ = useTransform(entryProgress, [0.22, 0.72, 1], [isMobile ? -1.2 : -2.6, 0.24, 0]);
  const trackOpacity = useTransform(entryProgress, [0.08, 0.3, 0.72], [0, 0.74, 1]);
  const trackX = useTransform(entryProgress, [0.08, 0.74, 1], [isMobile ? 82 : 246, -12, 0]);
  const trackScale = useTransform(entryProgress, [0.08, 0.78, 1], [isMobile ? 0.94 : 0.86, 1.012, 1]);
  const entryEdgeOpacity = useTransform(entryProgress, [0.02, 0.12, 0.72, 0.92], [0, 1, 0.7, 0]);
  const entryEdgeScaleX = useTransform(entryProgress, [0.02, 0.58, 1], [0.025, 1, 1]);

  return (
    <motion.section
      ref={sectionRef}
      className="project-showcase"
      id="project-showcase"
      aria-labelledby="project-showcase-title"
      style={reduceMotion ? undefined : {
        opacity: panelOpacity,
        y: panelY,
        scaleY: panelScaleY,
        rotateX: panelRotateX,
        pointerEvents: panelPointerEvents,
      }}
    >
      {!reduceMotion ? (
        <motion.span
          className="project-showcase-entry-edge"
          aria-hidden="true"
          style={{ opacity: entryEdgeOpacity, scaleX: entryEdgeScaleX }}
        />
      ) : null}
      <motion.div
        className="project-showcase-frame"
      >
        <motion.header
          className="project-showcase-heading"
          style={reduceMotion ? undefined : { opacity: headingOpacity, x: headingX, rotateZ: headingRotateZ }}
        >
          <span className="project-showcase-kicker">
            <i aria-hidden="true" />
            Selected Projects
          </span>
          <h2 id="project-showcase-title">
            <span>项目</span>
            <span>展示</span>
          </h2>
          <div className="project-showcase-heading-meta">
            <strong>PROJECT SHOWCASE</strong>
            <span>FIVE SELECTED STUDIES</span>
          </div>
        </motion.header>

        <motion.div
          className={`project-showcase-track${displayIndex !== null ? " has-focus" : ""}`}
          style={reduceMotion ? undefined : { opacity: trackOpacity, x: trackX, scale: trackScale }}
        >
          {projectShowcaseItems.map((item, index) => (
            <ProjectShowcaseCard
              key={item.index}
              item={item}
              index={index}
              entryProgress={entryProgress}
              isActive={activeIndex === index}
              isFocused={displayIndex === index}
              isSuppressed={displayIndex !== null && displayIndex !== index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onClick={() => setActiveIndex((current) => current === index ? null : index)}
            />
          ))}
          <div
            className="project-showcase-hit-zones"
            aria-hidden="true"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {projectShowcaseItems.map((item, index) => (
              <span
                key={item.index}
                className={displayIndex === index ? "is-focused" : displayIndex !== null ? "is-suppressed" : ""}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setActiveIndex((current) => current === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "220px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (footerVisible && !reduceMotion) video.play().catch(() => undefined);
    else video.pause();
  }, [footerVisible, reduceMotion]);

  return (
    <footer ref={footerRef} className={`footer${footerVisible ? " is-visible" : ""}`} id="contact">
      <video
        ref={videoRef}
        className="footer-video"
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/hero-poster.png"
        src="/assets/aura-background.mp4"
      />
      <div className="marquee" aria-hidden="true">
        <div>
          BUILDING VISUAL SYSTEMS / BRAND MEMORY / DESIGN ASSETS / BUILDING VISUAL SYSTEMS / BRAND MEMORY /
        </div>
      </div>
      <div className="footer-content shell">
        <p className="eyebrow">Contact</p>
        <h2>让视觉从好看，继续走向可识别、可传播、可转化。</h2>
        <a className="mail-link" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        <div className="footer-bar">
          <span>谢敬淳 / Visual Designer / Brand Designer / AIGC Designer</span>
          <strong>Available for projects</strong>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  return (
    <>
      {loading ? <LoadingScreen onComplete={() => setLoading(false)} /> : null}
      <Nav />
      <main className="app">
        <Hero />
        <PortfolioSequence />
        <Footer />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
