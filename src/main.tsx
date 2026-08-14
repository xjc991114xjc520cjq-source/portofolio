import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  X,
} from "lucide-react";
import "./styles.css";

const contactEmail = "1498224542@qq.com";
const icpFilingNumber = "闽ICP备e9055130469ef8f5a26f534177de7d81";
const icpFilingUrl = "https://beian.miit.gov.cn/";
const slowFastScrollEase = (progress: number) => progress ** 1.35;
const softFoldScrollEase = (progress: number) => progress * progress * (3 - 2 * progress);

const metrics = [
  { value: "4+", label: "年视觉与电商设计经验" },
  { value: "AI", label: "生成式内容生产与视觉控制" },
  { value: "FULL", label: "从主图到整合 Campaign" },
];

const projectShowcaseItems = [
  {
    index: "01",
    title: "出版电商系统",
    english: "PUBLISHING COMMERCE",
    category: "出版与内容商业视觉",
    categoryEnglish: "COMMERCE SYSTEM",
    year: "2026",
    image: "/assets/works/commerce-andersen-thumb.jpg",
    alt: "儿童立体书电商长图中的产品组合与销售信息",
    backdrop: "PUBLISHING",
    accent: "#89aacc",
    summary: "把多 SKU、复杂封面与长页面销售信息组织成统一、可复用的儿童出版电商视觉系统。",
    brief: "儿童出版产品主题多、产品比例必须准确，同时还需要在主图、详情页和活动物料中快速建立差异化。",
    response: "以产品真实性为底线，统一光影、比例、信息层级与场景规则，再将视觉方向扩展到完整电商触点。",
    role: "电商视觉 / AI 视觉控制",
    scope: "多 SKU 内容系统",
    deliverables: ["商品主图", "详情长图", "活动 Banner", "套系延展"],
    workflow: ["产品输入", "参考控制", "场景构建", "精修排版", "多端输出"],
    system: "以固定产品比例、光影方向和版式层级维持套系一致性，同时允许不同主题拥有清晰辨识度。",
    outcome: "形成能够覆盖主图、详情页和营销物料的视觉框架，减少每次从零开始设计的成本。",
    reflection: "真正困难的不是生成背景，而是在视觉变化中持续保护产品身份。",
    gallery: [
      { src: "/assets/works/commerce-andersen-thumb.jpg", alt: "儿童出版电商视觉主画面", layout: "portrait" },
      { src: "/assets/works/commerce-andersen-long.jpg", alt: "儿童出版电商详情长图", layout: "long" },
    ],
  },
  {
    index: "02",
    title: "空气循环视觉系统",
    english: "AIR CIRCULATION SYSTEM",
    category: "商业渲染",
    categoryEnglish: "COMMERCIAL RENDERING",
    year: "2026",
    image: "/assets/projects/table-fan/table-fan-hero.webp",
    alt: "白色空气循环扇的正面商品主视觉",
    backdrop: "AIR",
    accent: "#89aacc",
    summary: "围绕一款空气循环扇建立从标准产品视图到家庭昼夜场景的完整 AI 商品视觉案例。",
    brief: "智能生活产品既要准确呈现扇叶、机身、底座和控制面板，也要让产品自然进入日间、亲子与夜间使用场景。",
    response: "先用正面、侧面和背面视图锁定结构，再围绕送风感、家庭陪伴与夜间使用构建场景，最后统一产品比例和光线关系。",
    role: "AI Art Direction / 商品视觉",
    scope: "产品一致性与场景扩展",
    deliverables: ["产品主视觉", "标准视图", "生活方式场景", "昼夜场景", "光线实验"],
    workflow: ["结构参考", "视角锁定", "场景生成", "一致性筛选", "系列编排"],
    system: "以产品结构和白色材质为固定基准，通过人物距离、家居尺度与昼夜光线变化建立丰富但连续的内容系统。",
    outcome: "形成七张可覆盖商品展示、生活方式传播与场景卖点表达的核心视觉资产。",
    reflection: "这组案例显示，AI 商品图的关键不是场景数量，而是产品在每种场景中仍然像同一件商品。",
    gallery: [
      { src: "/assets/projects/table-fan/table-fan-hero.webp", alt: "空气循环扇正面商品主视觉", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-views.webp", alt: "空气循环扇正面、侧面与背面标准视图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-lifestyle.webp", alt: "年轻女性在明亮客厅中使用空气循环扇", layout: "wide" },
      { src: "/assets/projects/table-fan/table-fan-family.webp", alt: "亲子阅读场景中的空气循环扇", layout: "wide" },
      { src: "/assets/projects/table-fan/table-fan-night.webp", alt: "夜间卧室中的空气循环扇场景", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-night-detail.webp", alt: "冷暖光线中的空气循环扇夜间特写", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-dayparts.webp", alt: "空气循环扇在四种时段光线中的场景实验", layout: "square" },
    ],
  },
  {
    index: "03",
    title: "全链路电商",
    english: "FULL-FUNNEL COMMERCE",
    category: "电商整合 Campaign",
    categoryEnglish: "FULL-FUNNEL CAMPAIGN",
    year: "2026",
    image: "/assets/project-commerce.png",
    alt: "电商小程序视觉系统与营销页面示意",
    backdrop: "COMMERCE",
    accent: "#89aacc",
    summary: "让一个核心视觉方向贯穿商品主图、PDP、详情页、活动页面与社交内容，形成完整销售叙事。",
    brief: "分散的电商触点容易产生不同视觉语言，导致产品卖点、品牌调性和转化路径彼此割裂。",
    response: "从购买决策路径出发统一视觉层级，再根据不同触点的信息密度调整构图，而不是简单裁切同一张图。",
    role: "电商视觉 / Campaign 统筹",
    scope: "全链路内容设计",
    deliverables: ["商品主图", "PDP", "详情页", "活动页", "社交内容"],
    workflow: ["用户场景", "卖点排序", "主视觉", "触点适配", "内容复盘"],
    system: "以购买决策为主线，为不同触点定义清晰的信息任务和统一的视觉资产。",
    outcome: "让品牌表达和销售信息在整条内容链路中保持连续，避免每个渠道独立生产。",
    reflection: "全链路设计不是尺寸适配，而是让每个触点承担不同但连续的说服任务。",
    gallery: [{ src: "/assets/project-commerce.png", alt: "全链路电商视觉系统示意", layout: "wide" }],
  },
  {
    index: "04",
    title: "人物生活方式",
    english: "LIFESTYLE CAMPAIGN",
    category: "真人 / 场景 / 商品",
    categoryEnglish: "AI LIFESTYLE",
    year: "2026",
    image: "/assets/project-showcase-afterimage.webp",
    alt: "运动中的人物影像与编辑式字体组成生活方式 Campaign",
    backdrop: "LIFESTYLE",
    accent: "#89aacc",
    summary: "把人物、商品、场景与品牌气质组织成连续的生活方式 Campaign，强调多画面中的身份和光影一致性。",
    brief: "AI 人物与商品合成最容易在连续画面中失去身份、比例和光线逻辑，削弱商业可信度。",
    response: "分别控制人物特征、商品参考、镜头语言和环境光，再通过人工筛选与精修建立可用的系列输出。",
    role: "AI Art Direction / Campaign",
    scope: "人物与商品一致性",
    deliverables: ["Campaign KV", "人物套图", "社交内容", "动态延展"],
    workflow: ["角色定义", "商品锁定", "镜头探索", "一致性筛选", "商业精修"],
    system: "为人物身份、商品比例、镜头和光线建立连续性标准，使系列画面能够共同讲述同一场景。",
    outcome: "形成从单张视觉到人物与商品连续叙事的 Campaign 方法。",
    reflection: "生成次数不是能力证明，筛选标准与一致性控制才是。",
    gallery: [{ src: "/assets/project-showcase-afterimage.webp", alt: "人物生活方式 Campaign 视觉", layout: "portrait" }],
  },
  {
    index: "05",
    title: "品牌创意方向",
    english: "BRAND ART DIRECTION",
    category: "文化 / 品牌 / Campaign",
    categoryEnglish: "ART DIRECTION",
    year: "2026",
    image: "/assets/project-showcase-aether-grid.webp",
    alt: "暗场空间中的数字界面与品牌体验视觉",
    backdrop: "DIRECTION",
    accent: "#89aacc",
    summary: "从文化内容或品牌命题出发建立清晰的视觉概念，再将它扩展为 Campaign、空间与数字内容。",
    brief: "文化与品牌项目需要辨识度，也需要避免仅依赖符号拼贴或单一风格化画面。",
    response: "先提炼叙事核心与视觉规则，再选择适合的生成方式，使技术服务概念而不是替代概念。",
    role: "创意指导 / 品牌视觉",
    scope: "概念与视觉语言",
    deliverables: ["视觉概念", "Campaign KV", "内容系统", "数字延展"],
    workflow: ["命题提炼", "视觉语法", "方向探索", "系统延展", "应用校准"],
    system: "把叙事、色彩、构图和媒介规则整理成可以被不同输出共同遵循的视觉语言。",
    outcome: "让传统文化、出版或消费品牌都能从单个概念发展为完整传播系统。",
    reflection: "AI 可以扩展视觉可能性，但方向判断仍然决定项目是否成立。",
    gallery: [{ src: "/assets/project-showcase-aether-grid.webp", alt: "品牌创意与数字体验视觉", layout: "portrait" }],
  },
  {
    index: "06",
    title: "商品动态内容",
    english: "PRODUCT IN MOTION",
    category: "动态广告 / 产品片",
    categoryEnglish: "AI MOTION",
    year: "2026",
    image: "/assets/project-showcase-tide.webp",
    alt: "深蓝玻璃商品与低照度场景组成的动态产品视觉",
    backdrop: "MOTION",
    accent: "#89aacc",
    summary: "将静态商品视觉延展为短视频与产品片，保持产品形态、材质、镜头与品牌节奏的连续性。",
    brief: "图生视频容易产生结构漂移、材质变化和无目的运动，无法直接满足商品内容的可信度要求。",
    response: "先锁定关键帧与商品结构，再为镜头、动作和节奏设定范围，通过短段生成与后期剪辑维持连续性。",
    role: "AI Motion / 视觉指导",
    scope: "静态到动态延展",
    deliverables: ["产品短片", "动态广告", "社交视频", "关键帧系统"],
    workflow: ["关键帧", "运动设计", "分段生成", "连续性检查", "剪辑输出"],
    system: "以关键帧和动作边界控制商品结构，让动态内容继承静态 Campaign 的视觉资产。",
    outcome: "建立能够连接主视觉、短视频和社交媒体的动态内容路径。",
    reflection: "有效的运动应当传达材质、功能或叙事，而不是只让画面发生变化。",
    gallery: [{ src: "/assets/project-showcase-tide.webp", alt: "商品动态内容关键帧视觉", layout: "portrait" }],
  },
] as const;

const aiLabItems = [
  { title: "商品一致性", english: "Product Consistency", description: "固定结构、材质、比例与关键识别点，让商品在不同画面中保持同一身份。" },
  { title: "人物一致性", english: "Human Consistency", description: "控制人物特征、姿态和镜头关系，使生活方式套图具备连续叙事。" },
  { title: "光影迁移", english: "Lighting Transfer", description: "在日间、黄昏和夜间场景中保持产品材质可信，并让光线服务卖点。" },
  { title: "透视控制", english: "Perspective Control", description: "以标准视图校准商品朝向与空间尺度，减少生成过程中的结构漂移。" },
  { title: "图生视频", english: "Image to Video", description: "通过关键帧、动作边界和分段生成，让静态 Campaign 延展为连续动态内容。" },
  { title: "生成式插画", english: "Generative Illustration", description: "将风格探索转化为可重复的内容规则，服务出版与品牌传播。" },
] as const;

type WorkThumbnailMode = "cover" | "contain" | "long" | "wide";

type WorkMediaLayout = "portrait" | "square" | "wide" | "long";

type WorkMedia = {
  src: string;
  alt: string;
  layout: WorkMediaLayout;
};

type WorkItem = {
  id: string;
  title: string;
  year: string;
  image: string;
  alt: string;
  summary: string;
  brief: string;
  approach: string;
  result: string;
  deliverables: string[];
  gallery: WorkMedia[];
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
  description: string;
  role: string;
  deliverables: string[];
  keywords: string[];
  palette: string[];
  works: WorkItem[];
};

const workCategories: WorkCategory[] = [
  {
    id: "commerce",
    label: "商业视觉",
    english: "Commerce",
    index: "01",
    background: "/assets/projects/table-fan/table-fan-night.webp",
    transitionImage: "/assets/category-transitions/commerce-visuals.webp",
    description: "从商品真实性、卖点层级与购买路径出发，把一个视觉方向扩展到主图、详情页和完整电商触点。",
    role: "AI 商业视觉 / 电商系统",
    deliverables: ["商品主视觉", "详情页", "Campaign 延展"],
    keywords: ["商品", "一致性", "卖点", "转化"],
    palette: ["#080B0F", "#E8EEF3", "#89AACC", "#4E85BF"],
    works: [
      {
        id: "fan-commercial-rendering",
        title: "空气循环商业渲染",
        year: "2026",
        image: "/assets/projects/table-fan/table-fan-hero.webp",
        alt: "白色空气循环扇商业渲染主视觉",
        summary: "从标准产品视图到家庭昼夜场景，建立兼顾结构准确、材质可信与商业传播的空气循环产品渲染套装。",
        brief: "让同一产品在标准视图、人物场景与不同光线中保持一致，同时覆盖商品展示与生活方式传播。",
        approach: "先锁定扇叶、机身、底座和控制面板，再以视角、尺度和光线为变量扩展场景。",
        result: "形成七张可以连续使用的商业渲染资产，覆盖主视觉、结构展示、家庭场景和昼夜氛围。",
        deliverables: ["产品主视觉", "结构视图", "生活方式场景", "昼夜光线套图"],
        gallery: [
          { src: "/assets/projects/table-fan/table-fan-hero.webp", alt: "空气循环扇正面商业渲染", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-views.webp", alt: "空气循环扇多视角结构渲染", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-lifestyle.webp", alt: "空气循环扇日间生活方式场景", layout: "wide" },
          { src: "/assets/projects/table-fan/table-fan-family.webp", alt: "空气循环扇家庭陪伴场景", layout: "wide" },
          { src: "/assets/projects/table-fan/table-fan-night.webp", alt: "空气循环扇夜间室内渲染", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-night-detail.webp", alt: "空气循环扇夜间光线特写", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-dayparts.webp", alt: "空气循环扇四种时段光线序列", layout: "square" },
        ],
      },
      {
        id: "publishing-commerce-suite",
        title: "出版电商内容系统",
        year: "2026",
        image: "/assets/works/commerce-andersen-long.jpg",
        thumbnail: "/assets/works/commerce-andersen-thumb.jpg",
        thumbnailMode: "long",
        focalPoint: "50% 0%",
        alt: "青葫芦立体剧场书安徒生童话电商详情页设计",
        summary: "以童话舞台感串联产品结构、内容价值与阅读场景，构成可持续展开的出版电商销售叙事。",
        brief: "在长页面中同时说明套系价值、立体结构与亲子阅读体验，避免卖点彼此分散。",
        approach: "先建立主视觉与信息层级，再以章节节奏安排产品特写、内容展示与购买理由。",
        result: "完成从缩略入口到完整详情长图的电商内容套装。",
        deliverables: ["入口主视觉", "详情长图", "产品卖点编排"],
        gallery: [
          { src: "/assets/works/commerce-andersen-thumb.jpg", alt: "安徒生童话出版电商主视觉", layout: "portrait" },
          { src: "/assets/works/commerce-andersen-long.jpg", alt: "安徒生童话出版电商详情长图", layout: "long" },
        ],
      },
      {
        id: "commerce-platform-suite",
        title: "商城与商品内容",
        year: "2024",
        image: "/assets/project-commerce.png",
        thumbnailMode: "wide",
        alt: "商城界面与商品内容视觉",
        summary: "把品牌识别、商品场景和商城界面组织为连续的交易内容，使视觉不仅好看，也承担信息与转化任务。",
        brief: "不同电商触点需要维持统一品牌感，同时根据浏览阶段承载不同信息密度。",
        approach: "以核心商品画面建立视觉基准，再向商城入口和品牌触点适配。",
        result: "形成覆盖商品、品牌与商城界面的基础内容组合。",
        deliverables: ["商城入口", "商品场景", "品牌触点"],
        gallery: [
          { src: "/assets/project-commerce.png", alt: "商城视觉与营销页面", layout: "wide" },
          { src: "/assets/project-brand-vi.png", alt: "电商品牌识别延展", layout: "wide" },
          { src: "/assets/work-photos/1542291026-7eec264c27ff.webp", alt: "消费品场景视觉", layout: "portrait" },
        ],
      },
    ],
  },
  {
    id: "campaign",
    label: "创意企划",
    english: "Campaign",
    index: "02",
    background: "/assets/projects/table-fan/table-fan-family.webp",
    transitionImage: "/assets/category-transitions/editorial-poster.webp",
    description: "以品牌命题和使用场景建立视觉概念，统筹人物、商品、光线与媒介之间的连续叙事。",
    role: "AI Art Direction / Campaign",
    deliverables: ["Campaign KV", "生活方式套图", "传播内容"],
    keywords: ["概念", "人物", "场景", "叙事"],
    palette: ["#090A0C", "#EEECE7", "#89AACC", "#566D84"],
    works: [
      {
        id: "fan-lifestyle-suite",
        title: "清风生活方式企划",
        year: "2026",
        image: "/assets/projects/table-fan/table-fan-lifestyle.webp",
        thumbnailMode: "wide",
        alt: "空气循环扇生活方式企划",
        summary: "通过人物距离、家庭关系和昼夜变化，让功能型产品进入有温度的日常叙事。",
        brief: "在不牺牲商品识别度的前提下，让产品画面具备人物情绪与使用情境。",
        approach: "围绕独处、亲子陪伴和日夜切换设计三组场景，并统一产品尺度和家居光线。",
        result: "得到可以用于 Campaign、社交内容与卖点传播的生活方式套图。",
        deliverables: ["人物场景", "亲子场景", "光线序列", "Campaign 延展"],
        gallery: [
          { src: "/assets/projects/table-fan/table-fan-lifestyle.webp", alt: "空气循环扇人物生活方式场景", layout: "wide" },
          { src: "/assets/projects/table-fan/table-fan-family.webp", alt: "空气循环扇亲子陪伴场景", layout: "wide" },
          { src: "/assets/projects/table-fan/table-fan-dayparts.webp", alt: "空气循环扇昼夜场景序列", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-night.webp", alt: "空气循环扇夜间使用场景", layout: "square" },
        ],
      },
      {
        id: "people-campaign-suite",
        title: "人物叙事 Campaign",
        year: "2024",
        image: "/assets/project-showcase-afterimage.webp",
        alt: "动态人物编辑视觉",
        summary: "以人物动作、造型与编辑式版面建立连续视觉节奏，让单张肖像发展为完整 Campaign。",
        brief: "人物项目需要在身份一致之外，形成能够支撑多画面传播的镜头与版式语言。",
        approach: "从人物姿态和服装轮廓出发，控制运动模糊、留白和文字占位关系。",
        result: "形成兼具人物识别与传播节奏的编辑式视觉组。",
        deliverables: ["人物主视觉", "造型研究", "编辑式延展"],
        gallery: [
          { src: "/assets/project-showcase-afterimage.webp", alt: "人物运动与编辑式排版主视觉", layout: "portrait" },
          { src: "/assets/work-photos/1529139574466-a303027c1d8b.webp", alt: "人物造型与服装轮廓研究", layout: "portrait" },
          { src: "/assets/work-photos/1558655146-9f40138edfeb.webp", alt: "人物镜头与场景延展", layout: "portrait" },
        ],
      },
      {
        id: "brand-campaign-suite",
        title: "品牌传播视觉",
        year: "2023",
        image: "/assets/project-exhibition.png",
        thumbnailMode: "wide",
        alt: "品牌展陈与传播物料设计",
        summary: "把品牌识别、线下展陈与数字场景纳入同一视觉方向，形成跨媒介传播组合。",
        brief: "品牌视觉需要在不同媒介中保持识别度，而不是依赖同一版式反复复制。",
        approach: "固定色彩、字体与图形逻辑，再根据展陈、平面与数字媒介调整信息结构。",
        result: "建立能够跨越物料、空间与数字内容的品牌传播套装。",
        deliverables: ["品牌识别", "展陈物料", "数字延展"],
        gallery: [
          { src: "/assets/project-exhibition.png", alt: "品牌展陈与传播物料", layout: "wide" },
          { src: "/assets/project-brand-vi.png", alt: "品牌视觉识别延展", layout: "wide" },
          { src: "/assets/project-showcase-aether-grid.webp", alt: "品牌数字场景延展", layout: "portrait" },
        ],
      },
    ],
  },
  {
    id: "motion",
    label: "动态内容",
    english: "Motion",
    index: "03",
    background: "/assets/projects/table-fan/table-fan-night-detail.webp",
    transitionImage: "/assets/category-transitions/technology-innovation.webp",
    description: "从静态关键帧延展到产品片与社交视频，用运动传达材质、功能和情绪，而不是制造无目的变化。",
    role: "AI Motion / 动态视觉",
    deliverables: ["关键帧", "产品短片", "动态广告"],
    keywords: ["关键帧", "连续性", "节奏", "输出"],
    palette: ["#070A12", "#E6E9F4", "#89AACC", "#354A8C"],
    works: [
      {
        id: "fan-light-sequence",
        title: "空气循环光线序列",
        year: "2026",
        image: "/assets/projects/table-fan/table-fan-dayparts.webp",
        alt: "四种时段光线中的空气循环扇",
        summary: "以同一商品为固定对象，验证日间、黄昏与夜间光线变化中的结构稳定和材质连续。",
        brief: "动态内容的关键帧需要先建立可靠的光线序列，避免商品在镜头变化中失去身份。",
        approach: "固定视角与商品结构，以环境亮度、冷暖关系和局部光源作为主要变量。",
        result: "形成可继续用于图生视频与剪辑节奏设计的关键帧组。",
        deliverables: ["昼夜关键帧", "冷暖光线实验", "夜间场景"],
        gallery: [
          { src: "/assets/projects/table-fan/table-fan-dayparts.webp", alt: "空气循环扇四时段光线关键帧", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-night.webp", alt: "空气循环扇夜间空间关键帧", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-night-detail.webp", alt: "空气循环扇冷暖光线关键帧", layout: "square" },
        ],
      },
      {
        id: "product-motion-suite",
        title: "商品动态关键帧",
        year: "2025",
        image: "/assets/project-showcase-tide.webp",
        alt: "深蓝玻璃商品关键帧视觉",
        summary: "围绕材质、反射与镜头节奏设计一组商品动态关键帧，为短片生成提供稳定起点。",
        brief: "商品动态需要通过运动说明材质与形态，避免无目的的镜头漂移。",
        approach: "先定义起止关键帧和反射变化，再安排局部推进、旋转与景深节奏。",
        result: "得到适合继续生成产品短片的关键帧套装与镜头方向。",
        deliverables: ["商品关键帧", "镜头方向", "材质运动研究"],
        gallery: [
          { src: "/assets/project-showcase-tide.webp", alt: "深蓝玻璃商品动态关键帧", layout: "portrait" },
          { src: "/assets/project-showcase-field-objects.webp", alt: "商品空间运动关键帧", layout: "portrait" },
          { src: "/assets/project-showcase-nocturne.webp", alt: "低照度商品镜头研究", layout: "portrait" },
        ],
      },
      {
        id: "digital-motion-suite",
        title: "数字场景动态研究",
        year: "2024",
        image: "/assets/project-showcase-aether-grid.webp",
        alt: "暗场数字体验视觉",
        summary: "以空间层次、界面光线和镜头推进构建数字场景序列，探索品牌内容的动态表达。",
        brief: "抽象数字场景仍需具备清晰的视觉焦点和可以被镜头推进的空间关系。",
        approach: "把构图拆分为前景、信息层与背景空间，再为每层设定不同运动速度。",
        result: "形成能够服务片头、品牌短片与社交动态的空间关键帧组。",
        deliverables: ["数字场景", "空间关键帧", "片头方向"],
        gallery: [
          { src: "/assets/project-showcase-aether-grid.webp", alt: "数字场景空间关键帧", layout: "portrait" },
          { src: "/assets/project-showcase-nocturne.webp", alt: "暗场空间动态研究", layout: "portrait" },
          { src: "/assets/hero-commerce-v2.webp", alt: "数字商业内容动态延展", layout: "wide" },
        ],
      },
    ],
  },
  {
    id: "publishing",
    label: "出版内容",
    english: "Publishing",
    index: "04",
    background: "/assets/works/commerce-andersen-thumb.jpg",
    transitionImage: "/assets/category-transitions/packaging-design.webp",
    description: "把内容价值、产品结构与阅读场景转化成清晰的出版商业视觉，同时保留插画与文化叙事的吸引力。",
    role: "出版视觉 / 内容商业化",
    deliverables: ["套系视觉", "详情长图", "内容传播"],
    keywords: ["出版", "内容", "套系", "阅读"],
    palette: ["#0B0D0C", "#E5E0D4", "#89AACC", "#5F6554"],
    works: [
      {
        id: "theatre-book-suite",
        title: "立体剧场书",
        year: "2026",
        image: "/assets/works/commerce-andersen-thumb.jpg",
        alt: "安徒生童话立体剧场书视觉",
        summary: "围绕立体剧场结构与经典童话内容，建立从产品识别到阅读价值说明的出版视觉套装。",
        brief: "既要表现立体书的产品结构，也要让家长快速理解内容价值和阅读体验。",
        approach: "以舞台感作为视觉主线，组合产品陈列、故事元素和分段信息。",
        result: "形成入口主视觉与完整长页面内容，可以覆盖电商与出版传播。",
        deliverables: ["出版主视觉", "详情长图", "内容价值编排"],
        gallery: [
          { src: "/assets/works/commerce-andersen-thumb.jpg", alt: "安徒生童话立体剧场书主视觉", layout: "portrait" },
          { src: "/assets/works/commerce-andersen-long.jpg", alt: "安徒生童话立体剧场书详情长图", layout: "long" },
        ],
      },
      {
        id: "publishing-package-suite",
        title: "出版套系包装",
        year: "2024",
        image: "/assets/project-packaging.png",
        thumbnailMode: "wide",
        alt: "出版套系包装视觉",
        summary: "通过统一识别规则与主题差异，建立能够容纳多册内容的出版套系包装系统。",
        brief: "套系产品需要远看统一、近看可区分，并适应封面、书脊与组合陈列。",
        approach: "固定字体、信息位置与系列标识，再根据不同内容调整主图和主题色。",
        result: "完成从单册包装到套系陈列与电商展示的视觉组合。",
        deliverables: ["套系包装", "组合陈列", "电商延展"],
        gallery: [
          { src: "/assets/project-packaging.png", alt: "出版套系包装系统", layout: "wide" },
          { src: "/assets/works/commerce-andersen-thumb.jpg", alt: "出版产品组合陈列", layout: "portrait" },
          { src: "/assets/hero-editorial-v2.webp", alt: "出版内容视觉延展", layout: "wide" },
        ],
      },
      {
        id: "generative-editorial-suite",
        title: "生成式内容视觉",
        year: "2023",
        image: "/assets/work-photos/1513364776144-60967b0f800f.webp",
        alt: "生成式插画与内容视觉实验",
        summary: "将插画风格、内容编排与材质实验整理为可重复使用的出版内容语言。",
        brief: "生成式插画需要从单张风格实验转化为能够支撑连续页面和传播内容的规则。",
        approach: "提炼色彩、构图与材质约束，再以不同主题验证风格的一致性和延展能力。",
        result: "形成适用于插画、内容页面和宣传画面的生成式视觉组。",
        deliverables: ["生成式插画", "内容编排", "宣传视觉"],
        gallery: [
          { src: "/assets/work-photos/1513364776144-60967b0f800f.webp", alt: "生成式插画材质实验", layout: "portrait" },
          { src: "/assets/work-photos/1523726491678-bf852e717f6a.webp", alt: "出版内容编排场景", layout: "portrait" },
          { src: "/assets/hero-editorial-v2.webp", alt: "生成式内容编辑视觉", layout: "wide" },
        ],
      },
    ],
  },
];

const heroImages = [
  "/assets/hero-landscape-v2.webp",
  "/assets/projects/table-fan/table-fan-hero.webp",
  "/assets/projects/table-fan/table-fan-lifestyle.webp",
  "/assets/works/commerce-andersen-thumb.jpg",
  "/assets/projects/table-fan/table-fan-night.webp",
  "/assets/project-showcase-afterimage.webp",
  "/assets/project-showcase-aether-grid.webp",
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
  } as CSSProperties;

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
    let completionTimer = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        completionTimer = window.setTimeout(onComplete, 90);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
    };
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
  const [activeSection, setActiveSection] = useState("top");
  const pendingEntryCleanup = useRef<(() => void) | null>(null);
  const entryResetTimeout = useRef<number | null>(null);
  const activeEntrySection = useRef<HTMLElement | null>(null);

  const clearComponentEntry = () => {
    if (entryResetTimeout.current !== null) window.clearTimeout(entryResetTimeout.current);
    activeEntrySection.current?.classList.remove("nav-component-enter", "nav-component-pending");
    activeEntrySection.current = null;
    entryResetTimeout.current = null;
  };

  const prepareComponentEntry = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return null;
    clearComponentEntry();
    section.classList.remove("nav-component-enter", "nav-component-pending");
    void section.offsetWidth;
    section.classList.add("nav-component-enter", "nav-component-pending");
    activeEntrySection.current = section;
    return section;
  };

  const startComponentEntry = (section: HTMLElement) => {
    if (activeEntrySection.current !== section) return;
    section.classList.remove("nav-component-pending");
    entryResetTimeout.current = window.setTimeout(() => {
      if (section.id === "top") section.classList.add("nav-component-settled");
      section.classList.remove("nav-component-enter", "nav-component-pending");
      if (activeEntrySection.current === section) activeEntrySection.current = null;
      entryResetTimeout.current = null;
    }, 1300);
  };

  const scheduleComponentEntry = (sectionId: string, target: number) => {
    pendingEntryCleanup.current?.();
    pendingEntryCleanup.current = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearComponentEntry();
      return;
    }
    if (Math.abs(window.scrollY - target) < 1) return;
    const section = prepareComponentEntry(sectionId);
    if (!section) return;
    let fallbackTimeout = 0;
    const finish = () => {
      window.removeEventListener("scrollend", finish);
      if (fallbackTimeout) window.clearTimeout(fallbackTimeout);
      pendingEntryCleanup.current = null;
      startComponentEntry(section);
    };
    window.addEventListener("scrollend", finish, { once: true });
    fallbackTimeout = window.setTimeout(finish, 1400);
    pendingEntryCleanup.current = () => {
      window.removeEventListener("scrollend", finish);
      window.clearTimeout(fallbackTimeout);
    };
  };

  const navigateTo = (sectionId: string, target: number) => {
    const clampedTarget = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
    window.history.replaceState(null, "", `#${sectionId}`);
    scheduleComponentEntry(sectionId, clampedTarget);
    window.scrollTo({
      top: clampedTarget,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const sectionIds = ["top", "profile", "project-showcase", "work", "ai-lab", "contact"];
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -52%", threshold: [0, 0.2, 0.5, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    pendingEntryCleanup.current?.();
    clearComponentEntry();
  }, []);

  const returnHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateTo("top", 0);
  };

  const showProfile = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const profile = document.getElementById("profile");
    if (!profile) return;
    event.preventDefault();
    navigateTo("profile", profile.offsetTop + window.innerHeight * 0.08);
  };

  const showWorks = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const works = document.getElementById("work");
    if (!works) return;
    event.preventDefault();
    const centeredInset = Math.max(0, (window.innerHeight - works.offsetHeight) / 2);
    navigateTo("work", works.offsetTop - centeredInset);
  };

  const showProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const projectShowcase = document.getElementById("project-showcase");
    if (!projectShowcase) return;
    event.preventDefault();
    const centeredInset = Math.max(0, (window.innerHeight - projectShowcase.offsetHeight) / 2);
    navigateTo("project-showcase", projectShowcase.offsetTop - centeredInset);
  };

  const showLab = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const lab = document.getElementById("ai-lab");
    if (!lab) return;
    event.preventDefault();
    navigateTo("ai-lab", lab.offsetTop - 72);
  };

  return (
    <header className="nav">
      <div className="nav-pill">
        <a className="logo" href="#top" aria-label="返回首页" aria-current={activeSection === "top" ? "page" : undefined} onClick={returnHome}>
          <span>XJ</span>
        </a>
        <nav aria-label="主要导航">
          <a href="#project-showcase" onClick={showProjects} aria-current={activeSection === "project-showcase" ? "page" : undefined}>代表项目</a>
          <a href="#work" onClick={showWorks} aria-current={activeSection === "work" ? "page" : undefined}>作品</a>
          <a href="#ai-lab" onClick={showLab} aria-current={activeSection === "ai-lab" ? "page" : undefined}>实验</a>
          <a href="#profile" onClick={showProfile} aria-current={activeSection === "profile" ? "page" : undefined}>关于</a>
        </nav>
        <a className="say-hi" href={`mailto:${contactEmail}`} aria-current={activeSection === "contact" ? "page" : undefined}>
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
  const pointerFrameRef = useRef<number | null>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
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

  const writePhotoSpace = (x: number, y: number) => {
    const space = spaceRef.current;
    if (!space) return;
    space.style.setProperty("--pointer-x", `${x * 8}px`);
    space.style.setProperty("--pointer-y", `${y * 6}px`);
    space.style.setProperty("--pointer-rx", `${y * -3}deg`);
    space.style.setProperty("--pointer-ry", `${x * 3.5}deg`);
    space.style.setProperty("--mid-x", `${x * 4}px`);
    space.style.setProperty("--mid-y", `${y * 3}px`);
    space.style.setProperty("--far-x", `${x * 2}px`);
    space.style.setProperty("--far-y", `${y * 1.5}px`);
  };

  const movePhotoSpace = (event: PointerEvent<HTMLElement>) => {
    if (!motionActive || !spaceRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerTargetRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
    if (pointerFrameRef.current !== null) return;
    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      writePhotoSpace(pointerTargetRef.current.x, pointerTargetRef.current.y);
    });
  };

  const resetPhotoSpace = () => {
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = null;
    pointerTargetRef.current = { x: 0, y: 0 };
    writePhotoSpace(0, 0);
  };

  useEffect(() => () => {
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
  }, []);

  useEffect(() => {
    if (!motionActive) resetPhotoSpace();
  }, [motionActive]);

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
            <span>AI COMMERCE PORTFOLIO</span>
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
          <div className="hero-title-index blur-in" aria-label="AI 商业视觉设计师与 AI 艺术指导作品集">
            <span>AI COMMERCE DESIGNER</span>
            <i aria-hidden="true" />
            <span>AI ART DIRECTOR</span>
            <i aria-hidden="true" />
            <span>2026</span>
          </div>
          <p className="hero-desc blur-in">
            <strong>AI 创新设计 / 电商视觉 / 商业转化</strong>
            <span>以 AI 为生产方式，构建可控、稳定、可扩展的商业视觉系统。</span>
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
      aria-label={`打开作品套装：${work.title}`}
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
            src={thumbnailSource}
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

type SampledColor = {
  red: number;
  green: number;
  blue: number;
  count: number;
};

type PaletteMode = "auto" | "default";

const workPaletteCache = new Map<string, string[]>();

const colorDistance = (first: SampledColor, second: SampledColor) => Math.sqrt(
  (first.red - second.red) ** 2
  + (first.green - second.green) ** 2
  + (first.blue - second.blue) ** 2,
);

const colorToHex = ({ red, green, blue }: SampledColor) => `#${[red, green, blue]
  .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
  .join("")}`.toUpperCase();

const extractWorkPalette = (image: HTMLImageElement, cacheKey: string) => {
  const cachedPalette = workPaletteCache.get(cacheKey);
  if (cachedPalette) return cachedPalette;

  try {
    const longestSide = 56;
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const sampleWidth = imageRatio >= 1
      ? longestSide
      : Math.max(12, Math.round(longestSide * imageRatio));
    const sampleHeight = imageRatio >= 1
      ? Math.max(12, Math.round(longestSide / imageRatio))
      : longestSide;
    const canvas = document.createElement("canvas");
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(image, 0, 0, sampleWidth, sampleHeight);
    const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
    const buckets = new Map<string, SampledColor>();
    const quantizeStep = 24;

    for (let index = 0; index < pixels.length; index += 4) {
      const alpha = pixels[index + 3];
      if (alpha < 180) continue;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const key = [red, green, blue]
        .map((channel) => Math.min(255, Math.round(channel / quantizeStep) * quantizeStep))
        .join("-");
      const bucket = buckets.get(key);
      if (bucket) {
        bucket.red += red;
        bucket.green += green;
        bucket.blue += blue;
        bucket.count += 1;
      } else {
        buckets.set(key, { red, green, blue, count: 1 });
      }
    }

    const rankedColors = Array.from(buckets.values())
      .map((bucket) => ({
        red: bucket.red / bucket.count,
        green: bucket.green / bucket.count,
        blue: bucket.blue / bucket.count,
        count: bucket.count,
      }))
      .sort((first, second) => {
        const firstRange = Math.max(first.red, first.green, first.blue) - Math.min(first.red, first.green, first.blue);
        const secondRange = Math.max(second.red, second.green, second.blue) - Math.min(second.red, second.green, second.blue);
        return second.count * (1 + secondRange / 1020) - first.count * (1 + firstRange / 1020);
      });

    const selectedColors: SampledColor[] = [];
    for (const minimumDistance of [92, 68, 44, 0]) {
      for (const color of rankedColors) {
        if (selectedColors.includes(color)) continue;
        if (selectedColors.every((selected) => colorDistance(color, selected) >= minimumDistance)) {
          selectedColors.push(color);
        }
        if (selectedColors.length === 4) break;
      }
      if (selectedColors.length === 4) break;
    }

    if (selectedColors.length === 0) return null;
    const palette = selectedColors.map(colorToHex);
    workPaletteCache.set(cacheKey, palette);
    return palette;
  } catch {
    // Remote images without permissive CORS can still display; only palette
    // sampling falls back to the category defaults in that case.
    return null;
  }
};

const getPaletteAccent = (palette: string[], fallback: string) => {
  const candidates = palette.flatMap((color) => {
    const match = /^#([\dA-F]{2})([\dA-F]{2})([\dA-F]{2})$/i.exec(color);
    if (!match) return [];
    const [red, green, blue] = match.slice(1).map((value) => Number.parseInt(value, 16));
    const maximum = Math.max(red, green, blue);
    const minimum = Math.min(red, green, blue);
    const saturation = maximum === 0 ? 0 : (maximum - minimum) / maximum;
    const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    if (luminance < 72 || luminance > 232) return [];
    return [{ color, score: saturation * 1.4 + (1 - Math.abs(luminance - 154) / 154) * 0.45 }];
  });
  return candidates.sort((first, second) => second.score - first.score)[0]?.color ?? fallback;
};

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [detectedLong, setDetectedLong] = useState(false);
  const [palette, setPalette] = useState(() => workPaletteCache.get(work.image) ?? category.palette);
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(() => (
    workPaletteCache.has(work.image) ? "auto" : "default"
  ));
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const isLong = work.gallery.length > 1
    || work.gallery.some((media) => media.layout === "long")
    || work.thumbnailMode === "long"
    || detectedLong;
  const thumbnailSource = work.thumbnail ?? work.image;
  const workPosition = category.works.findIndex((item) => item.id === work.id);
  const workNumber = String(Math.max(0, workPosition) + 1).padStart(2, "0");
  const workDescription = work.summary;
  const titleId = `work-dossier-title-${work.id}`;
  const summaryId = `work-dossier-summary-${work.id}`;
  const accentColor = getPaletteAccent(palette, category.palette[2]);

  const requestClose = () => {
    if (viewerRef.current) viewerRef.current.style.pointerEvents = "none";
    onClose();
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageFailed(false);
    setDetectedLong(false);
    const cachedPalette = workPaletteCache.get(work.image);
    setPalette(cachedPalette ?? category.palette);
    setPaletteMode(cachedPalette ? "auto" : "default");
    scrollRef.current?.scrollTo({ top: 0, left: 0 });
  }, [category.palette, work.id, work.image]);

  useEffect(() => {
    viewerRef.current?.focus({ preventScroll: true });
  }, []);

  const jumpLongImage = (event: MouseEvent<HTMLButtonElement>) => {
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
    if (event.key === "Tab" && viewerRef.current) {
      const focusable = Array.from(viewerRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <motion.div
      ref={viewerRef}
      className="work-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
      onClick={requestClose}
      onKeyDown={handleKeyDown}
    >
      <motion.article
        className="work-dossier"
        style={{ "--work-accent": accentColor } as CSSProperties}
        initial={reduceMotion ? false : {
          opacity: 0,
          y: 22,
          scale: 0.985,
          clipPath: "inset(16% 2% 16% 2%)",
          filter: "blur(8px)",
        }}
        animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)" }}
        exit={reduceMotion ? undefined : {
          opacity: 0,
          y: 14,
          scale: 0.988,
          clipPath: "inset(12% 2% 12% 2%)",
          filter: "blur(6px)",
        }}
        transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.32, 0.72, 0, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="work-dossier-header">
          <div className="work-dossier-mark" aria-hidden="true">
            <span>{category.index}</span>
            <i />
            <strong>PROJECT DOSSIER</strong>
          </div>
          <div className="work-dossier-controls">
            <button type="button" onClick={() => onNavigate(-1)} aria-label="上一件作品">
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span>{workNumber} / {String(category.works.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => onNavigate(1)} aria-label="下一件作品">
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button className="work-dossier-close" type="button" onClick={requestClose} aria-label="关闭作品介绍">
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="work-dossier-layout">
          <section className="work-dossier-copy">
            <p className="work-dossier-kicker">
              <span>{category.label}</span>
              <i />
              <span>{category.english}</span>
            </p>
            <div className="work-dossier-title">
              <div className="work-dossier-title-meta" aria-hidden="true">
                <span>{work.year}</span>
                <i />
                <small>SELECTED WORK SET</small>
              </div>
              <h2 id={titleId}>{work.title}</h2>
            </div>
            <p className="work-dossier-summary" id={summaryId}>{workDescription}</p>

            <div className="work-dossier-story">
              <article>
                <span>BRIEF / 命题</span>
                <p>{work.brief}</p>
              </article>
              <article>
                <span>METHOD / 方法</span>
                <p>{work.approach}</p>
              </article>
              <article>
                <span>RESULT / 结果</span>
                <p>{work.result}</p>
              </article>
            </div>

            <dl className="work-dossier-facts">
              <div>
                <dt>ROLE / 职责</dt>
                <dd>{category.role}</dd>
              </div>
              <div>
                <dt>OUTPUT / 交付</dt>
                <dd>{work.deliverables.join(" / ")}</dd>
              </div>
            </dl>

            <div className="work-dossier-keywords">
              <span>KEYWORDS / 关键词</span>
              <ul>
                {category.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
              </ul>
            </div>

            <div className="work-dossier-palette" aria-label="从作品图片自动提取的项目配色">
              <span aria-live="polite">COLOR SAMPLE / {paletteMode === "auto" ? "AUTO" : "DEFAULT"}</span>
              <div>
                {palette.map((color) => (
                  <i key={color} style={{ backgroundColor: color }} title={color} />
                ))}
              </div>
            </div>

            <p className="work-dossier-hint">使用 ← → 切换作品组 / ESC 关闭</p>
          </section>

          <section className={`work-dossier-media${isLong ? " is-long" : ""}`} aria-label="作品套装预览">
            <header>
              <span>OUTPUT SET / {String(work.gallery.length).padStart(2, "0")}</span>
              <small>{isLong ? "SCROLL THE SET" : "FULL FRAME"}</small>
            </header>
            <div className="work-dossier-grid" aria-hidden="true" />
            <div ref={scrollRef} className="work-dossier-scroll">
              {!imageLoaded && !imageFailed ? (
                <div
                  className="work-dossier-loading"
                  style={{ backgroundImage: `url("${thumbnailSource}")` }}
                  aria-label="作品正在加载"
                />
              ) : null}

              {imageFailed ? (
                <div className="work-dossier-error" role="alert">
                  <strong>图像暂时无法读取</strong>
                  <span>请关闭后重新打开，或检查作品文件是否仍在项目中。</span>
                </div>
              ) : (
                <div className="work-dossier-suite">
                  {work.gallery.map((media, mediaIndex) => (
                    <figure
                      className={`${mediaIndex === 0 && !imageLoaded ? "" : "is-loaded"} is-${media.layout}`}
                      key={`${work.id}-${media.src}`}
                    >
                      <img
                        src={media.src}
                        alt={media.alt}
                        loading={mediaIndex === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                        onLoad={mediaIndex === 0 ? (event) => {
                          const { naturalWidth, naturalHeight } = event.currentTarget;
                          setDetectedLong(naturalWidth / naturalHeight < 0.52);
                          const extractedPalette = extractWorkPalette(event.currentTarget, work.image);
                          if (extractedPalette) {
                            setPalette(extractedPalette);
                            setPaletteMode("auto");
                          }
                          setImageLoaded(true);
                        } : undefined}
                        onError={mediaIndex === 0 ? () => setImageFailed(true) : undefined}
                      />
                    </figure>
                  ))}
                </div>
              )}
            </div>

            {isLong ? (
              <button
                className="work-dossier-progress"
                type="button"
                onClick={jumpLongImage}
                aria-label="跳转到长图位置"
                title="点击跳转"
              >
                <motion.i style={{ scaleY: scrollYProgress }} />
              </button>
            ) : null}
          </section>
        </div>
      </motion.article>
    </motion.div>
  );
}

function SelectedWorks({
  sectionRef,
  handoffProgress,
  exitProgress,
}: {
  sectionRef: RefObject<HTMLElement>;
  handoffProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
}) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);
  const [expandedWork, setExpandedWork] = useState<GalleryWork | null>(null);
  const [viewerSession, setViewerSession] = useState(0);
  const [categoryTransition, setCategoryTransition] = useState<CategoryTransition | null>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [isCardTransitioning, setIsCardTransitioning] = useState(false);
  const suppressCardClick = useRef(false);
  const dragResetTimeout = useRef<number | null>(null);
  const lightboxReturnFocus = useRef<HTMLElement | null>(null);
  const categorySwitcherRef = useRef<HTMLDivElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (!categoryMenuOpen) return;
    const closeOnOutsidePress = (event: globalThis.PointerEvent) => {
      if (!categorySwitcherRef.current?.contains(event.target as Node)) setCategoryMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [categoryMenuOpen]);

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
      openExpandedWork(work);
      return;
    }

    const travel = Math.abs(relativePosition);
    const duration = Math.min(0.92, 0.58 + travel * 0.12);
    settleGalleryTrack(target, duration, [0.16, 1, 0.3, 1]);
    openExpandedWork(work);
  };

  const changeCategory = (index: number) => {
    if (index === categoryIndex || categoryTransition) return;
    setCategoryMenuOpen(false);
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

  const startGalleryDrag = (event: PointerEvent<HTMLDivElement>) => {
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

  const moveGalleryDrag = (event: PointerEvent<HTMLDivElement>) => {
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

  const finishGalleryDrag = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
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
        if ((event.target as HTMLElement).closest(".category-switcher")) return;
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
                src={category.background}
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
          <span>{category.index} / {String(workCategories.length).padStart(2, "0")}</span>
        </motion.header>

        <motion.nav
          className="works-footer"
          aria-label="作品导航"
          style={reduceMotion ? undefined : { opacity: footerOpacityIn, x: footerXIn, y: footerYIn }}
        >
          <div className="active-work-meta">
            <span>{category.english}</span>
            <strong>{activeWork.title}</strong>
            <small>{activeWork.year} / WORK SET</small>
          </div>

          <div
            ref={categorySwitcherRef}
            className={`category-switcher${categoryMenuOpen ? " is-open" : ""}`}
            onKeyDown={(event) => {
              if (event.key !== "Escape") return;
              event.stopPropagation();
              setCategoryMenuOpen(false);
              categoryButtonRef.current?.focus({ preventScroll: true });
            }}
          >
            <button
              ref={categoryButtonRef}
              className="category-current"
              type="button"
              aria-label="展开并切换作品分类"
              aria-haspopup="menu"
              aria-expanded={categoryMenuOpen}
              aria-controls="work-category-menu"
              onClick={() => setCategoryMenuOpen((open) => !open)}
            >
              <span className="category-current-index" aria-hidden="true">
                <b>{category.index}</b>
                <small>/ {String(workCategories.length).padStart(2, "0")}</small>
              </span>
              <span className="category-current-copy">
                <strong>{category.label}</strong>
                <em>{category.english}</em>
              </span>
              <span className="category-current-action" aria-hidden="true">
                <small className="category-current-note">
                  点击选择分类
                </small>
                <span className="category-current-toggle">
                  <ChevronDown size={17} strokeWidth={1.45} />
                </span>
              </span>
            </button>
            <div
              id="work-category-menu"
              className="category-menu"
              role="menu"
              aria-label="作品分类"
              aria-hidden={!categoryMenuOpen}
            >
              {workCategories.map((item, index) => (
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={categoryMenuOpen ? 0 : -1}
                  key={item.id}
                  className={index === categoryIndex ? "is-current" : ""}
                  aria-current={index === categoryIndex ? "true" : undefined}
                  disabled={Boolean(categoryTransition)}
                  onClick={() => {
                    categoryButtonRef.current?.focus({ preventScroll: true });
                    setCategoryMenuOpen(false);
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

          <p className="works-instruction">拖动切换作品组<br />点击查看完整套装</p>
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

  const stageOpacity = useTransform(pacedRevealProgress, [0, 0.05, 0.28, 0.34], [0, 0, 0.98, 1]);
  const shellY = useTransform(pacedRevealProgress, [0, 0.34], [140, 0]);
  const toplineOpacity = useTransform(pacedRevealProgress, [0.04, 0.32], [0, 1]);
  const toplineY = useTransform(pacedRevealProgress, [0.04, 0.34], [-34, 0]);
  const backdropOpacity = useTransform(pacedRevealProgress, [0.08, 0.34], [0, 1]);
  const backdropY = useTransform(pacedRevealProgress, [0.04, 0.34], [82, 0]);
  const backdropScale = useTransform(pacedRevealProgress, [0.04, 0.34], [1.16, 1]);
  const portraitOpacity = useTransform(pacedRevealProgress, [0.08, 0.34], [0, 1]);
  const portraitY = useTransform(pacedRevealProgress, [0.04, 0.34], [184, 0]);
  const portraitScale = useTransform(pacedRevealProgress, [0.04, 0.34], [0.88, 1]);
  const copyOpacity = useTransform(pacedRevealProgress, [0.08, 0.32], [0, 1]);
  const copyX = useTransform(pacedRevealProgress, [0.08, 0.34], [-92, 0]);
  const copyY = useTransform(pacedRevealProgress, [0.08, 0.34], [42, 0]);
  const factsOpacity = useTransform(pacedRevealProgress, [0.15, 0.34], [0, 1]);
  const factsX = useTransform(pacedRevealProgress, [0.14, 0.34], [96, 0]);
  const bottomlineOpacity = useTransform(pacedRevealProgress, [0.22, 0.34], [0, 1]);
  const bottomlineY = useTransform(pacedRevealProgress, [0.22, 0.34], [34, 0]);
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
          <span>AI COMMERCE DESIGNER / AI ART DIRECTOR</span>
          <span>GENERATIVE CONTENT PRODUCTION</span>
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
            <span>AI 商业视觉</span><span>电商系统</span><span>创意指导</span>
          </strong>
          <p className="profile-intro">
            <strong className="profile-intro-lead">以 AI 为生产方式</strong>
            <span className="profile-intro-copy">
              <span>把商业目标转译为可控、稳定的视觉方向，</span>
              <span>并扩展到商品、Campaign、内容与动态触点。</span>
            </span>
          </p>
          <span className="profile-location">COMMERCE / CAMPAIGN / MOTION / PUBLISHING</span>
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
            <span className="profile-statement-label">CORE PRACTICE</span>
            <strong>
              <span className="profile-statement-lead">可控、稳定、可扩展</span>
              <span className="profile-statement-copy">让 AI 创意成为可以进入真实商业链路的视觉资产。</span>
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
            <span>合作咨询</span>
            <b aria-hidden="true">↗</b>
          </a>
        </motion.aside>

        <motion.div
          className="profile-bottomline"
          style={reduceMotion ? undefined : { opacity: composedBottomlineOpacity, y: composedBottomlineY }}
        >
          <span>AI COMMERCE / ART DIRECTION / GENERATIVE PRODUCTION</span>
          <span>SYSTEM / SCALE / CONSISTENCY</span>
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
  const projectRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const { scrollYProgress: projectEntryScroll } = useScroll({
    target: projectRef,
    offset: ["start 92%", "start 22%"],
  });
  const { scrollYProgress: worksEntryScroll } = useScroll({
    target: worksRef,
    offset: ["start 86%", "start 22%"],
  });
  const projectEntryTarget = useTransform(projectEntryScroll, [0, 1], [0, 1], { ease: softFoldScrollEase });
  const projectEntryProgress = useSpring(projectEntryTarget, { stiffness: 140, damping: 28, mass: 0.55 });
  const worksEntryTarget = useTransform(worksEntryScroll, [0, 1], [0, 1], { ease: slowFastScrollEase });
  const worksEntryProgress = useSpring(worksEntryTarget, { stiffness: 140, damping: 28, mass: 0.55 });
  const worksExitProgress = useTransform(worksEntryScroll, () => 0);

  return (
    <>
      <Profile handoffProgress={projectEntryProgress} />
      <ProjectShowcase sectionRef={projectRef} entryProgress={projectEntryProgress} />
      <SelectedWorks
        sectionRef={worksRef}
        handoffProgress={worksEntryProgress}
        exitProgress={worksExitProgress}
      />
    </>
  );
}

type ProjectShowcaseItem = (typeof projectShowcaseItems)[number];

function ProjectDetailViewer({
  item,
  currentIndex,
  reduceMotion,
  onClose,
  onNavigate,
}: {
  item: ProjectShowcaseItem;
  currentIndex: number;
  reduceMotion: boolean | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const titleId = `project-detail-title-${item.index}`;
  const summaryId = `project-detail-summary-${item.index}`;
  const total = projectShowcaseItems.length;

  useEffect(() => {
    viewerRef.current?.focus({ preventScroll: true });
  }, []);

  const requestClose = () => {
    if (viewerRef.current) viewerRef.current.style.pointerEvents = "none";
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setKeyboardNavigation(true);
      onNavigate(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setKeyboardNavigation(true);
      onNavigate(1);
      return;
    }
    if (event.key !== "Tab" || !viewerRef.current) return;

    const focusable = Array.from(viewerRef.current.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
    ));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      ref={viewerRef}
      className="project-detail-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={summaryId}
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
      onClick={requestClose}
      onKeyDown={handleKeyDown}
    >
      <motion.article
        className="project-detail-panel"
        style={{ "--project-detail-accent": item.accent } as CSSProperties}
        initial={reduceMotion ? false : {
          opacity: 0,
          x: "4%",
          scale: 0.988,
          clipPath: "inset(0 0 0 18%)",
          filter: "blur(8px)",
        }}
        animate={{ opacity: 1, x: "0%", scale: 1, clipPath: "inset(0 0 0 0%)", filter: "blur(0px)" }}
        exit={reduceMotion ? undefined : {
          opacity: 0,
          x: "4%",
          scale: 0.99,
          clipPath: "inset(0 0 0 18%)",
          filter: "blur(6px)",
        }}
        transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.32, 0.72, 0, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="project-detail-header">
          <div className="project-detail-identity" aria-hidden="true">
            <strong>{item.index}</strong>
            <i />
            <span>PROJECT FILE</span>
          </div>
          <div className="project-detail-controls">
            <button type="button" onClick={() => { setKeyboardNavigation(false); onNavigate(-1); }} aria-label="上一个项目">
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span>{String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <button type="button" onClick={() => { setKeyboardNavigation(false); onNavigate(1); }} aria-label="下一个项目">
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button className="project-detail-close" type="button" onClick={requestClose} aria-label="关闭项目详情">
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="project-detail-layout"
            key={item.index}
            initial={reduceMotion ? false : { opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: reduceMotion || keyboardNavigation ? 0 : 0.26, ease: [0.23, 1, 0.32, 1] }}
          >
            <figure className="project-detail-visual">
              <img src={item.image} alt={item.alt} decoding="async" />
              <span className="project-detail-visual-shade" aria-hidden="true" />
              <figcaption>
                <span>{item.categoryEnglish}</span>
                <b>{item.year}</b>
              </figcaption>
              <strong aria-hidden="true">{item.backdrop}</strong>
            </figure>

            <section className="project-detail-copy">
              <p className="project-detail-kicker">
                <span>CASE STUDY</span>
                <i />
                <span>{item.category}</span>
              </p>
              <div className="project-detail-title">
                <small>{item.english}</small>
                <h2 id={titleId}>{item.title}</h2>
              </div>
              <p className="project-detail-summary" id={summaryId}>{item.summary}</p>

              <div className="project-detail-narrative">
                <article>
                  <span>DESIGN BRIEF</span>
                  <h3>设计命题</h3>
                  <p>{item.brief}</p>
                </article>
                <article>
                  <span>DESIGN RESPONSE</span>
                  <h3>设计回应</h3>
                  <p>{item.response}</p>
                </article>
              </div>

              <section className="project-detail-process" aria-label="项目工作流">
                <div>
                  <span>PROCESS / 工作流</span>
                  <h3>从输入到商业输出</h3>
                </div>
                <ol>
                  {item.workflow.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </section>

              <section className="project-detail-gallery" aria-label="项目视觉输出">
                <div className="project-detail-section-heading">
                  <span>SELECTED OUTPUTS</span>
                  <h3>核心视觉输出</h3>
                </div>
                <div className="project-detail-gallery-grid">
                  {item.gallery.map((visual) => (
                    <figure className={`is-${visual.layout}`} key={visual.src}>
                      <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" />
                    </figure>
                  ))}
                </div>
              </section>

              <section className="project-detail-system" aria-label="项目系统与结果">
                <article>
                  <span>VISUAL SYSTEM</span>
                  <h3>视觉系统</h3>
                  <p>{item.system}</p>
                </article>
                <article>
                  <span>OUTCOME</span>
                  <h3>项目成果</h3>
                  <p>{item.outcome}</p>
                </article>
                <article>
                  <span>REFLECTION</span>
                  <h3>项目复盘</h3>
                  <p>{item.reflection}</p>
                </article>
              </section>

              <footer className="project-detail-footer">
                <dl>
                  <div>
                    <dt>ROLE / 职责</dt>
                    <dd>{item.role}</dd>
                  </div>
                  <div>
                    <dt>FOCUS / 重点</dt>
                    <dd>{item.scope}</dd>
                  </div>
                </dl>
                <div className="project-detail-deliverables">
                  <span>DELIVERABLES / 交付内容</span>
                  <ul>
                    {item.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                  </ul>
                </div>
              </footer>
            </section>
          </motion.div>
        </AnimatePresence>
      </motion.article>
    </motion.div>
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
  item: ProjectShowcaseItem;
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
      className={`project-showcase-item${isFocused ? " is-focused" : ""}${isSuppressed ? " is-suppressed" : ""}`}
      type="button"
      data-project-index={index}
      aria-label={`查看项目：${item.title}`}
      aria-haspopup="dialog"
      aria-expanded={isActive}
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
  sectionRef: RefObject<HTMLElement>;
  entryProgress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const isMobile = useViewportMatch("(max-width: 720px)");
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const projectReturnFocus = useRef<HTMLElement | null>(null);
  const displayIndex = hoveredIndex ?? focusedIndex;
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
  const activeProject = detailIndex === null ? null : projectShowcaseItems[detailIndex];

  useDocumentScrollLock(detailIndex !== null);

  const openProject = (index: number) => {
    const card = document.querySelector<HTMLElement>(`[data-project-index="${index}"]`);
    projectReturnFocus.current = card ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setDetailIndex(index);
  };

  const closeProject = () => {
    setDetailIndex(null);
  };

  const navigateProject = (direction: number) => {
    setDetailIndex((current) => {
      if (current === null) return current;
      return (current + direction + projectShowcaseItems.length) % projectShowcaseItems.length;
    });
  };

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
            Featured Case Studies
          </span>
          <h2 id="project-showcase-title">
            <span>代表</span>
            <span>项目</span>
          </h2>
          <div className="project-showcase-heading-meta">
            <strong>FEATURED PROJECTS</strong>
            <span>SIX REPRESENTATIVE CASE STUDIES</span>
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
              isActive={detailIndex === index}
              isFocused={displayIndex === index}
              isSuppressed={displayIndex !== null && displayIndex !== index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onClick={() => openProject(index)}
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
                onClick={() => openProject(index)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {createPortal(
        <AnimatePresence onExitComplete={() => projectReturnFocus.current?.focus({ preventScroll: true })}>
          {activeProject && detailIndex !== null ? (
            <ProjectDetailViewer
              item={activeProject}
              currentIndex={detailIndex}
              reduceMotion={reduceMotion}
              onClose={closeProject}
              onNavigate={navigateProject}
            />
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </motion.section>
  );
}

function AILab() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="ai-lab" id="ai-lab" aria-labelledby="ai-lab-title">
      <div className="ai-lab-shell shell">
        <header className="ai-lab-heading">
          <p>AI LAB / CONTROL STUDIES</p>
          <h2 id="ai-lab-title">
            <span>让实验</span>
            <span>回到商业问题</span>
          </h2>
          <p className="ai-lab-intro">
            AI Lab 不展示随机风格，而是验证商品、人物、光影、透视与动态如何进入稳定生产流程。
          </p>
        </header>

        <motion.figure
          className="ai-lab-visual"
          initial={reduceMotion ? false : { opacity: 0, y: 54, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/assets/projects/table-fan/table-fan-dayparts.webp"
            alt="同一空气循环扇在四种光线环境中的一致性实验"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>同一产品，不同光线</strong>
            <span>结构控制 / 场景延展 / 商业可用性</span>
          </figcaption>
        </motion.figure>

        <div className="ai-lab-workflow" aria-label="AI 商业视觉工作流">
          {['Input', 'Exploration', 'Control', 'Refinement', 'Output'].map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>

        <div className="ai-lab-list">
          {aiLabItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0 : 0.56, delay: reduceMotion ? 0 : index * 0.055, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <strong>{item.title}</strong>
                <span>{item.english}</span>
              </div>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
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
          AI COMMERCE SYSTEMS / ART DIRECTION / GENERATIVE PRODUCTION / AI COMMERCE SYSTEMS / ART DIRECTION /
        </div>
      </div>
      <div className="footer-content shell">
        <p className="eyebrow">Contact</p>
        <h2>让一个视觉方向，成为可控、稳定、可扩展的商业内容系统。</h2>
        <a className="mail-link" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        <div className="footer-bar">
          <span>谢敬淳 / AI Commerce Designer / AI Art Director</span>
          <strong>Available for projects</strong>
        </div>
        <div className="filing-bar" aria-label="网站备案信息">
          <span className="filing-bar-label">REGISTRATION / CN</span>
          <a href={icpFilingUrl} target="_blank" rel="noreferrer">
            <span aria-hidden="true">工信部 ICP 备案</span>
            <strong>{icpFilingNumber}</strong>
          </a>
          <span className="filing-bar-authority">中华人民共和国工业和信息化部</span>
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
        <AILab />
        <Footer />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
