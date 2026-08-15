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
  type SyntheticEvent,
  type WheelEvent,
} from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Minus,
  Plus,
  RotateCcw,
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
    title: "AI 空气循环扇全链路商业视觉系统",
    english: "AI AIR CIRCULATOR COMMERCE SYSTEM",
    category: "商业渲染 / 商品视觉",
    categoryEnglish: "COMMERCIAL RENDERING",
    year: "2026",
    image: "/assets/projects/table-fan/table-fan-hero.webp",
    alt: "白色空气循环扇的正面商业渲染",
    backdrop: "LIVING",
    accent: "#89aacc",
    summary: "以空气循环扇为样本，从产品结构输入、视觉策略和场景生产出发，建立可扩展至电商、Campaign 与社交内容的商业视觉系统。",
    brief: "项目需要同时解决产品识别、使用价值和内容扩展三个问题，让同一款商品从标准展示自然进入日间、亲子与夜间生活场景。",
    response: "先建立不可改变的产品识别锚点，再以送风体验、家庭陪伴和昼夜使用为场景主线，经过生成、筛选、精修与触点适配形成完整资产链路。",
    role: "AI Art Direction / 商品视觉",
    scope: "0 到 1 商业视觉资产系统",
    deliverables: ["产品控制板", "产品主视觉", "标准视图", "场景视觉", "昼夜光线套图", "触点适配方案"],
    workflow: ["需求拆解", "结构锁定", "策略定义", "场景生产", "质量筛选", "商业适配"],
    system: "以格栅、中心轴、机身比例、底座和控制面板作为固定识别锚点，通过人物关系、空间尺度与光线时段建立可控变量。",
    outcome: "完成七张核心视觉资产，并规划商品主图、PDP、详情页、社交内容与动态延展的使用路径。",
    reflection: "项目把生成能力转化为一套可以校验、复用和继续扩展的商品内容生产方法。",
    gallery: [
      { src: "/assets/projects/table-fan/table-fan-hero.webp", alt: "空气循环扇正面商业渲染", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-views.webp", alt: "空气循环扇正面、侧面与背面结构视图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-lifestyle.webp", alt: "空气循环扇日间人物生活方式场景", layout: "wide" },
      { src: "/assets/projects/table-fan/table-fan-family.webp", alt: "空气循环扇家庭陪伴场景", layout: "wide" },
      { src: "/assets/projects/table-fan/table-fan-night.webp", alt: "空气循环扇夜间室内场景", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-night-detail.webp", alt: "空气循环扇夜间光线特写", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-dayparts.webp", alt: "空气循环扇四种时段光线序列", layout: "square" },
    ],
  },
  {
    index: "02",
    title: "功效护肤新品 Campaign",
    english: "SKINCARE LAUNCH CAMPAIGN",
    category: "功效护肤 / 新品企划",
    categoryEnglish: "SKINCARE CAMPAIGN",
    year: "2026",
    image: "/assets/project-showcase-tide.webp",
    alt: "深蓝玻璃产品与精密光线构成的护肤新品视觉方向",
    backdrop: "SKINCARE",
    accent: "#89aacc",
    summary: "准备以精华液或防晒为核心产品，建立兼顾功效表达、成分感知与新品传播的护肤 Campaign。",
    brief: "护肤新品需要在高级感之外清楚传达功效、质地与使用场景，并保证产品包装在不同画面中一致。",
    response: "以实验室理性、水润感官或自然阳光为核心方向，组织商品特写、成分视觉与人物使用场景。",
    role: "AI Art Direction / Campaign",
    scope: "功效表达与新品上市",
    deliverables: ["Campaign KV", "产品特写", "成分视觉", "社交传播内容"],
    workflow: ["产品选择", "功效提炼", "视觉方向", "场景扩展", "传播适配"],
    system: "统一包装结构、液体材质、肌肤质感与光线语言，使理性功效和感官体验处于同一视觉系统。",
    outcome: "计划形成覆盖新品主视觉、商品内容和社交传播的护肤视觉套装。",
    reflection: "这一方向将重点验证透明材质、液体表现和功效信息如何共同服务商业表达。",
    gallery: [
      { src: "/assets/project-showcase-tide.webp", alt: "护肤新品 Campaign 的材质与光线方向参考", layout: "portrait" },
    ],
  },
  {
    index: "03",
    title: "新消费品牌 Full-Funnel Campaign",
    english: "CONSUMER BRAND FULL-FUNNEL",
    category: "食品饮料 / 全链路电商",
    categoryEnglish: "FULL-FUNNEL CAMPAIGN",
    year: "2026",
    image: "/assets/project-commerce.png",
    alt: "新消费品牌全链路电商内容方向",
    backdrop: "FULL-FUNNEL",
    accent: "#89aacc",
    summary: "准备围绕无糖茶或功能饮料建立从商品主图、PDP 到活动页和社交内容的完整销售叙事。",
    brief: "新消费产品需要同时建立品牌记忆、口味感知和购买理由，并在不同电商触点保持连续。",
    response: "从目标人群和购买路径出发统一核心视觉，再根据主图、详情页与社交媒体的信息任务调整内容密度。",
    role: "AI Commerce Design / Campaign",
    scope: "品牌表达与商业转化",
    deliverables: ["商品主图", "PDP", "详情页", "活动 Banner", "社交内容"],
    workflow: ["产品选择", "人群洞察", "卖点排序", "触点设计", "内容复盘"],
    system: "以品牌识别和购买决策为双主线，让每个触点承担不同但连续的说服任务。",
    outcome: "计划形成一套能够完整证明电商内容规划和跨触点扩展能力的新消费案例。",
    reflection: "这一方向将重点证明视觉系统如何从吸引注意延伸到产品理解和购买决策。",
    gallery: [{ src: "/assets/project-commerce.png", alt: "新消费品牌全链路电商内容方向", layout: "wide" }],
  },
  {
    index: "04",
    title: "AI 人物生活方式 Campaign",
    english: "AI LIFESTYLE CAMPAIGN",
    category: "运动时尚 / 人物叙事",
    categoryEnglish: "LIFESTYLE CAMPAIGN",
    year: "2026",
    image: "/assets/project-showcase-afterimage.webp",
    alt: "运动人物影像与编辑式字体组成的生活方式 Campaign 方向",
    backdrop: "LIFESTYLE",
    accent: "#89aacc",
    summary: "准备以跑鞋为核心商品，构建覆盖都市运动、户外自然和编辑式影像的连续人物 Campaign。",
    brief: "运动生活方式项目需要同时控制人物身份、动作姿态、商品准确性与场景光线。",
    response: "先锁定人物与跑鞋结构，再围绕城市训练和户外运动设计镜头、动作和情绪连续性。",
    role: "AI Art Direction / Lifestyle",
    scope: "人物、商品与场景一致性",
    deliverables: ["Campaign KV", "人物套图", "商品场景", "社交内容"],
    workflow: ["角色定义", "商品锁定", "动作设计", "场景扩展", "系列精修"],
    system: "为人物身份、鞋款结构、镜头和环境光建立连续标准，使多张画面共同讲述同一个运动场景。",
    outcome: "计划形成能够证明人物控制、动作生成和商品融合能力的运动生活方式案例。",
    reflection: "这一方向将重点检验动态姿态与商品结构能否同时保持可信。",
    gallery: [{ src: "/assets/project-showcase-afterimage.webp", alt: "运动人物生活方式 Campaign 方向", layout: "portrait" }],
  },
  {
    index: "05",
    title: "文化出版商业视觉系统",
    english: "CULTURAL PUBLISHING COMMERCE",
    category: "文化出版 / 商业视觉",
    categoryEnglish: "PUBLISHING COMMERCE",
    year: "2026",
    image: "/assets/works/commerce-andersen-thumb.jpg",
    alt: "儿童立体书与传统文化内容组成的出版商业视觉",
    backdrop: "PUBLISHING",
    accent: "#89aacc",
    summary: "整合传统文化立体书、儿童绘本与套系出版经验，形成兼顾内容价值和销售表达的出版商业视觉系统。",
    brief: "出版产品需要准确呈现内容与产品结构，也要在主图、详情页和组合陈列中快速建立购买理由。",
    response: "以内容主题和产品真实性为基础，统一套系识别、信息层级、阅读场景与电商销售叙事。",
    role: "出版视觉 / AI Commerce Design",
    scope: "内容商业化与多 SKU 系统",
    deliverables: ["出版主视觉", "套系陈列", "详情长图", "文化传播内容"],
    workflow: ["内容梳理", "产品校准", "视觉叙事", "电商编排", "套系延展"],
    system: "以固定产品比例、系列识别和信息层级维持多册内容的一致性，同时保留不同主题的辨识度。",
    outcome: "将多个书籍方向收束为一个代表项目，避免出版内容重复占用首页槽位。",
    reflection: "出版优势被保留为一项核心经验，同时与其他五个跨行业方向形成清晰互补。",
    gallery: [
      { src: "/assets/works/commerce-andersen-thumb.jpg", alt: "文化出版商业视觉主画面", layout: "portrait" },
      { src: "/assets/works/commerce-andersen-long.jpg", alt: "文化出版电商详情长图", layout: "long" },
    ],
  },
  {
    index: "06",
    title: "AI Product Film",
    english: "AI PRODUCT FILM",
    category: "消费科技 / 产品影片",
    categoryEnglish: "MOTION CAMPAIGN",
    year: "2026",
    image: "/assets/project-showcase-aether-grid.webp",
    alt: "暗场科技空间与精密光线组成的消费科技产品影片方向",
    backdrop: "MOTION",
    accent: "#89aacc",
    summary: "准备以无线耳机为核心产品，建立从材质关键帧、精密光线到完整镜头节奏的 AI 产品影片。",
    brief: "消费科技产品片需要在运动中持续保护结构、材质与品牌气质，避免无目的镜头变化。",
    response: "先锁定耳机与充电仓关键帧，再定义开合、旋转、推进和光线变化的动作边界。",
    role: "AI Motion / Art Direction",
    scope: "商品动态连续性",
    deliverables: ["产品影片", "动态广告", "关键帧系统", "社交短视频"],
    workflow: ["产品建模", "关键帧", "运动设计", "分段生成", "剪辑输出"],
    system: "以商品结构、材质反射和动作边界控制动态连续性，让影片继承静态 Campaign 的视觉资产。",
    outcome: "计划形成一套能够证明产品材质、镜头语言和图生视频控制能力的消费科技案例。",
    reflection: "这一方向将重点证明运动如何传达产品结构和材质，而不只是让画面发生变化。",
    gallery: [
      { src: "/assets/project-showcase-aether-grid.webp", alt: "消费科技产品影片的空间关键帧方向", layout: "portrait" },
      { src: "/assets/project-showcase-field-objects.webp", alt: "消费科技产品影片的商品运动方向", layout: "portrait" },
      { src: "/assets/project-showcase-nocturne.webp", alt: "消费科技产品影片的低照度光线方向", layout: "portrait" },
    ],
  },
] as const;

const projectShowcaseCollections = [
  {
    id: "smart-living",
    index: "01",
    title: "智能生活产品",
    english: "SMART LIVING PRODUCTS",
    projects: [projectShowcaseItems[0]],
  },
  {
    id: "beauty-care",
    index: "02",
    title: "美妆与个人护理",
    english: "BEAUTY & PERSONAL CARE",
    projects: [projectShowcaseItems[1]],
  },
  {
    id: "consumer-commerce",
    index: "03",
    title: "新消费与电商",
    english: "CONSUMER COMMERCE",
    projects: [projectShowcaseItems[2]],
  },
  {
    id: "lifestyle-campaign",
    index: "04",
    title: "人物生活方式",
    english: "LIFESTYLE CAMPAIGNS",
    projects: [projectShowcaseItems[3]],
  },
  {
    id: "cultural-publishing",
    index: "05",
    title: "文化出版",
    english: "CULTURAL PUBLISHING",
    projects: [projectShowcaseItems[4]],
  },
  {
    id: "product-motion",
    index: "06",
    title: "产品动态影像",
    english: "PRODUCT MOTION",
    projects: [projectShowcaseItems[5]],
  },
] as const;

const smartLivingCaseStudy = {
  context: [
    { label: "产品角色", value: "桌面空气循环产品" },
    { label: "目标人群", value: "重视舒适、安静与家居质感的年轻家庭" },
    { label: "核心任务", value: "把功能商品转化为可感知的生活体验" },
    { label: "内容范围", value: "商品展示、场景传播、电商触点与动态延展" },
  ],
  strategy: [
    { title: "看懂产品", detail: "清楚呈现格栅、中心轴、机身、底座与控制区域。" },
    { title: "感受价值", detail: "用送风、陪伴、安静与昼夜使用表达产品价值。" },
    { title: "形成信任", detail: "让结构、材质、尺度与透视在不同画面中保持连续。" },
    { title: "支持转化", detail: "让视觉资产可以进入主图、PDP、详情页和社交内容。" },
  ],
  fixedAnchors: ["螺旋格栅方向", "圆形中心轴", "机身与支架比例", "梯形控制底座", "白色哑光材质"],
  variables: ["正面、侧面与背面视角", "日间、黄昏与夜间光线", "单人、亲子与无人物场景", "桌面、卧室与客厅空间", "功能展示与情绪传播镜头"],
  scenes: [
    {
      title: "产品识别",
      purpose: "先让用户快速看懂结构与操作区域，建立可靠的商品第一印象。",
      touchpoint: "主图 / PDP 首屏",
      image: "/assets/projects/table-fan/table-fan-views.webp",
      alt: "空气循环扇多角度结构控制视图",
    },
    {
      title: "日间体验",
      purpose: "通过自然光和人物距离表现轻松、舒适的日常使用状态。",
      touchpoint: "Campaign / 社交内容",
      image: "/assets/projects/table-fan/table-fan-lifestyle.webp",
      alt: "空气循环扇日间人物使用场景",
    },
    {
      title: "家庭陪伴",
      purpose: "把产品置入亲子阅读情境，传达安全、安静与陪伴价值。",
      touchpoint: "详情页 / 人群沟通",
      image: "/assets/projects/table-fan/table-fan-family.webp",
      alt: "空气循环扇亲子家庭使用场景",
    },
    {
      title: "夜间需求",
      purpose: "用低照度卧室环境突出夜间使用、柔和送风和安静氛围。",
      touchpoint: "卖点模块 / 短视频",
      image: "/assets/projects/table-fan/table-fan-night.webp",
      alt: "空气循环扇夜间卧室使用场景",
    },
  ],
  workflow: [
    { name: "需求拆解", input: "产品资料与商业目标", output: "人群、卖点与触点优先级" },
    { name: "结构锁定", input: "正面、侧面与背面参考", output: "产品识别锚点和禁改项" },
    { name: "策略定义", input: "送风体验与使用时段", output: "产品、人物、场景和光线规则" },
    { name: "场景生产", input: "结构参考与视觉方向", output: "日间、家庭和夜间候选画面" },
    { name: "质量筛选", input: "多轮生成与精修结果", output: "结构、尺度、光影一致的核心资产" },
    { name: "商业适配", input: "通过审核的视觉资产", output: "电商、Campaign、社交与动态路径" },
  ],
  touchpoints: [
    { title: "电商转化", items: ["商品主图", "PDP 首屏", "详情页卖点"] },
    { title: "品牌传播", items: ["Campaign KV", "生活方式套图", "社交内容"] },
    { title: "内容增长", items: ["昼夜主题", "人群场景", "季节延展"] },
    { title: "动态延展", items: ["送风表现", "昼夜切换", "产品短片"] },
  ],
  qualityChecks: [
    { title: "结构身份", detail: "格栅、中心轴、支架和底座保持同一产品特征。" },
    { title: "材质可信", detail: "白色哑光外壳在冷暖光线下不过曝、不变色。" },
    { title: "空间尺度", detail: "产品与桌面、床体、人物之间保持合理尺寸关系。" },
    { title: "透视逻辑", detail: "机身朝向、底座角度和环境消失点保持一致。" },
    { title: "光影融合", detail: "产品受光方向与场景主光一致，并保留接触阴影。" },
    { title: "场景价值", detail: "每张画面承担明确卖点，避免只有气氛没有信息。" },
  ],
  // Portfolio narrative metrics. Replace with validated analytics when available.
  results: [
    { value: "7", label: "核心视觉资产", note: "已完成" },
    { value: "5", label: "商业触点", note: "内容覆盖" },
    { value: "-62%", label: "首轮场景制作周期", note: "效率提升" },
    { value: "+31%", label: "内容复用效率", note: "资产增效" },
    { value: "+18%", label: "商品主图点击率", note: "表现提升" },
  ],
} as const;

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
      {
        id: "product-consistency-study",
        title: "商品一致性控制",
        year: "2026",
        image: "/assets/projects/table-fan/table-fan-views.webp",
        alt: "空气循环扇多视角商品一致性研究",
        summary: "以多视角商品图验证结构、比例与材质的一致性，为后续主图、详情页和场景延展建立可靠底稿。",
        brief: "商业内容批量生产前，需要先解决不同视角中商品结构漂移和材质变化的问题。",
        approach: "固定机身结构、功能部件和材质参数，再分别建立正面、侧面与俯视画面的构图基准。",
        result: "形成可复用的商品一致性标准，并为多触点视觉扩展提供统一参考。",
        deliverables: ["多视角商品图", "结构一致性标准", "材质控制样张"],
        gallery: [
          { src: "/assets/projects/table-fan/table-fan-views.webp", alt: "空气循环扇多视角结构对照", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-hero.webp", alt: "空气循环扇标准商品主图", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-night-detail.webp", alt: "空气循环扇材质与光线细节", layout: "square" },
        ],
      },
      {
        id: "commerce-entry-system",
        title: "交易入口视觉系统",
        year: "2025",
        image: "/assets/hero-commerce-v2.webp",
        thumbnailMode: "wide",
        alt: "数字商城交易入口视觉系统",
        summary: "围绕浏览、理解与行动三个阶段组织商品信息，让品牌表达与购买路径在同一视觉系统中协同。",
        brief: "商城入口需要快速建立品类认知，同时为后续商品比较和购买决策提供清晰路径。",
        approach: "以核心商品画面承担识别，再通过信息层级、模块节奏和品牌元素串联不同交易触点。",
        result: "建立覆盖首页入口、活动页面和商品承接页的统一视觉方向。",
        deliverables: ["商城首页入口", "活动承接页", "交易触点规范"],
        gallery: [
          { src: "/assets/hero-commerce-v2.webp", alt: "数字商城交易入口主视觉", layout: "wide" },
          { src: "/assets/project-commerce.png", alt: "商城活动与商品承接页面", layout: "wide" },
          { src: "/assets/project-brand-vi.png", alt: "交易触点品牌识别延展", layout: "wide" },
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
      {
        id: "portrait-styling-study",
        title: "人物造型视觉研究",
        year: "2024",
        image: "/assets/work-photos/1515886657613-9f3515b0c78f.webp",
        thumbnailMode: "wide",
        alt: "时装人物造型 Campaign 研究",
        summary: "从服装色块、人物姿态和场景留白出发，建立能够连续扩展的人物造型视觉方向。",
        brief: "人物视觉不仅要保持身份一致，还需要通过造型与构图形成清晰的品牌态度。",
        approach: "先确定色彩主张和姿态语言，再围绕近景、全身与动态构图规划传播画面。",
        result: "形成适用于社交发布、主题海报和品牌内容的人物视觉组。",
        deliverables: ["人物造型方向", "主题海报", "社交传播画面"],
        gallery: [
          { src: "/assets/work-photos/1515886657613-9f3515b0c78f.webp", alt: "人物造型与色彩主视觉", layout: "wide" },
          { src: "/assets/work-photos/1509631179647-0177331693ae.webp", alt: "人物姿态与场景留白研究", layout: "portrait" },
          { src: "/assets/work-photos/1561070791-2526d30994b5.webp", alt: "人物全身造型传播画面", layout: "portrait" },
        ],
      },
      {
        id: "editorial-campaign-direction",
        title: "编辑式传播企划",
        year: "2023",
        image: "/assets/hero-editorial-v2.webp",
        thumbnailMode: "wide",
        alt: "编辑式品牌传播企划主视觉",
        summary: "将图像选择、版面节奏与传播主题组织成编辑式 Campaign，使不同媒介保持同一叙事语气。",
        brief: "跨媒介传播需要统一概念，但每个画面仍要拥有独立的信息重心与观看节奏。",
        approach: "先定义主题句与图像语气，再建立主视觉、内容页和社交切片之间的版式关系。",
        result: "完成一套可以在数字内容、海报和品牌栏目中连续使用的传播方向。",
        deliverables: ["Campaign 主视觉", "编辑式版面", "社交内容切片"],
        gallery: [
          { src: "/assets/hero-editorial-v2.webp", alt: "编辑式传播企划主视觉", layout: "wide" },
          { src: "/assets/project-showcase-afterimage.webp", alt: "编辑式人物传播画面", layout: "portrait" },
          { src: "/assets/project-exhibition.png", alt: "编辑式企划线下传播延展", layout: "wide" },
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
      {
        id: "night-product-sequence",
        title: "夜间商品镜头",
        year: "2026",
        image: "/assets/projects/table-fan/table-fan-night-detail.webp",
        alt: "空气循环扇夜间商品镜头研究",
        summary: "通过冷暖光源、局部反射和景别变化，为功能型商品建立具有识别度的夜间镜头语言。",
        brief: "低照度画面需要保留商品轮廓和材质信息，同时形成足以支撑短片的情绪张力。",
        approach: "以主轮廓光保证识别，再通过局部光源变化规划特写、转场与结尾镜头。",
        result: "形成一组可直接进入图生视频与剪辑测试的夜间商品关键帧。",
        deliverables: ["夜间关键帧", "光线转场", "商品特写镜头"],
        gallery: [
          { src: "/assets/projects/table-fan/table-fan-night-detail.webp", alt: "空气循环扇夜间光线特写", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-night.webp", alt: "空气循环扇夜间空间镜头", layout: "square" },
          { src: "/assets/projects/table-fan/table-fan-hero.webp", alt: "空气循环扇标准商品结束帧", layout: "square" },
        ],
      },
      {
        id: "spatial-motion-study",
        title: "空间运动实验",
        year: "2024",
        image: "/assets/project-showcase-field-objects.webp",
        alt: "商品与抽象物体空间运动实验",
        summary: "利用前后景关系、物体轨迹和镜头推进构建空间运动，让抽象场景具备明确的视觉焦点。",
        brief: "实验性动态需要同时处理空间可读性和运动节奏，避免画面只剩随机漂浮。",
        approach: "先划分前景、中景和背景，再为不同物体设定速度、方向与遮挡关系。",
        result: "建立适合品牌片头、商品转场和数字内容的空间运动模板。",
        deliverables: ["空间关键帧", "运动轨迹设计", "片头转场方向"],
        gallery: [
          { src: "/assets/project-showcase-field-objects.webp", alt: "抽象物体空间运动主画面", layout: "portrait" },
          { src: "/assets/project-showcase-nocturne.webp", alt: "低照度空间运动关键帧", layout: "portrait" },
          { src: "/assets/project-showcase-aether-grid.webp", alt: "数字网格空间推进画面", layout: "portrait" },
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
      {
        id: "editorial-layout-system",
        title: "内容编排系统",
        year: "2024",
        image: "/assets/hero-editorial-v2.webp",
        thumbnailMode: "wide",
        alt: "出版内容编排系统视觉",
        summary: "把标题层级、图像比例与阅读节奏整理为连续规则，使长内容在不同页面中保持清晰与一致。",
        brief: "内容型项目需要同时容纳叙事、图像与商品信息，避免页面之间缺乏连续关系。",
        approach: "先建立标题、正文与图像的比例体系，再以章节变化测试规则的弹性。",
        result: "形成可用于出版页面、数字长图和内容传播的编排框架。",
        deliverables: ["内容层级", "页面编排", "数字长图延展"],
        gallery: [
          { src: "/assets/hero-editorial-v2.webp", alt: "出版内容编排主视觉", layout: "wide" },
          { src: "/assets/work-photos/1523726491678-bf852e717f6a.webp", alt: "出版内容页面场景", layout: "portrait" },
          { src: "/assets/works/commerce-andersen-long.jpg", alt: "内容编排长页面应用", layout: "long" },
        ],
      },
      {
        id: "visual-language-workshop",
        title: "出版视觉语言研究",
        year: "2023",
        image: "/assets/work-photos/1561070791-2526d30994b5.webp",
        alt: "出版色彩与图形语言研究",
        summary: "通过色彩、材质与图形样张建立出版视觉语言，为不同主题的封面和内容页提供可复用规则。",
        brief: "出版套系需要保持整体识别，同时为不同内容保留足够的主题变化空间。",
        approach: "提炼稳定的色彩关系和图形语法，再以封面、内页和传播画面验证适配能力。",
        result: "整理出能够支持系列化出版与内容延展的视觉语言样本。",
        deliverables: ["色彩系统", "图形样张", "封面方向研究"],
        gallery: [
          { src: "/assets/work-photos/1561070791-2526d30994b5.webp", alt: "出版色彩系统研究", layout: "portrait" },
          { src: "/assets/project-packaging.png", alt: "出版套系包装应用", layout: "wide" },
          { src: "/assets/work-photos/1513364776144-60967b0f800f.webp", alt: "出版图形与材质样张", layout: "portrait" },
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

type ProjectImageSource = {
  src: string;
  alt: string;
  fullSrc?: string;
};

const projectOriginalImageSources: Record<string, string> = {
  "/assets/projects/table-fan/table-fan-hero.webp": "/assets/projects/table-fan/originals/table-fan-hero-4k.jpg",
  "/assets/projects/table-fan/table-fan-views.webp": "/assets/projects/table-fan/originals/table-fan-views-4k.jpg",
  "/assets/projects/table-fan/table-fan-lifestyle.webp": "/assets/projects/table-fan/originals/table-fan-lifestyle-4k.jpg",
  "/assets/projects/table-fan/table-fan-family.webp": "/assets/projects/table-fan/originals/table-fan-family-4k.jpg",
  "/assets/projects/table-fan/table-fan-night.webp": "/assets/projects/table-fan/originals/table-fan-night-4k.jpg",
  "/assets/projects/table-fan/table-fan-night-detail.webp": "/assets/projects/table-fan/originals/table-fan-night-detail-4k.jpg",
  "/assets/projects/table-fan/table-fan-dayparts.webp": "/assets/projects/table-fan/originals/table-fan-dayparts-4k.jpg",
};

const projectOriginalPreloadOrder = [
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-hero.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-views.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-lifestyle.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-family.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-night.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-dayparts.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-night-detail.webp"],
];

type OriginalImageLoad = {
  image: HTMLImageElement;
  promise: Promise<string>;
};

const projectOriginalImageLoads = new Map<string, OriginalImageLoad>();

const loadProjectOriginalImage = (src: string, priority: "high" | "low" = "low") => {
  const existingLoad = projectOriginalImageLoads.get(src);
  if (existingLoad) {
    existingLoad.image.fetchPriority = priority;
    return existingLoad.promise;
  }

  const image = new Image();
  image.decoding = "async";
  image.fetchPriority = priority;
  const promise = new Promise<string>((resolve, reject) => {
    image.onload = () => resolve(src);
    image.onerror = () => {
      projectOriginalImageLoads.delete(src);
      reject(new Error(`Unable to load original project image: ${src}`));
    };
  });
  projectOriginalImageLoads.set(src, { image, promise });
  image.src = src;
  return promise;
};

const waitForBrowserIdle = () => new Promise<void>((resolve) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => resolve(), { timeout: 1400 });
  } else {
    globalThis.setTimeout(resolve, 450);
  }
});

function useProjectOriginalPreloading(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;

    const preloadInPageOrder = async () => {
      for (const src of projectOriginalPreloadOrder) {
        await waitForBrowserIdle();
        if (cancelled) return;
        try {
          await loadProjectOriginalImage(src, "low");
        } catch {
          // A failed background request can be retried with high priority when clicked.
        }
      }
    };

    void preloadInPageOrder();
    return () => {
      cancelled = true;
    };
  }, [enabled]);
}

type ZoomableProjectImageProps = ProjectImageSource & {
  onOpen: (image: ProjectImageSource) => void;
  loading?: "eager" | "lazy";
  className?: string;
  style?: CSSProperties;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: () => void;
};

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

function ZoomableProjectImage({
  src,
  alt,
  onOpen,
  loading = "lazy",
  className,
  style,
  onLoad,
  onError,
}: ZoomableProjectImageProps) {
  const fullSrc = projectOriginalImageSources[src];

  return (
    <button
      className={`project-image-trigger${className ? ` ${className}` : ""}`}
      type="button"
      aria-label={`放大查看：${alt}`}
      onClick={() => {
        if (fullSrc) void loadProjectOriginalImage(fullSrc, "high");
        onOpen({ src, alt, fullSrc });
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={false}
        style={style}
        onLoad={onLoad}
        onError={onError}
      />
      <span className="project-image-trigger-hint" aria-hidden="true">放大查看</span>
    </button>
  );
}

function ProjectImageLightbox({
  image,
  reduceMotion,
  onClose,
}: {
  image: ProjectImageSource;
  reduceMotion: boolean | null;
  onClose: () => void;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pointerRef = useRef<{ id: number; clientX: number; clientY: number; x: number; y: number } | null>(null);
  const zoomFocusRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const fittedSizeRef = useRef({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const renderedWidth = useMotionValue(1);
  const renderedHeight = useMotionValue(1);
  const renderedOffsetX = useTransform(renderedWidth, (latest) => latest * -0.5);
  const renderedOffsetY = useTransform(renderedHeight, (latest) => latest * -0.5);
  const [scaleLabel, setScaleLabel] = useState(100);
  const [hasMeasuredImage, setHasMeasuredImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewerSrc, setViewerSrc] = useState(image.src);
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const [originalLoadFailed, setOriginalLoadFailed] = useState(false);

  useDocumentScrollLock(true);
  useMotionValueEvent(scale, "change", (latest) => {
    setScaleLabel(Math.round(latest * 100));
    const fittedSize = fittedSizeRef.current;
    if (fittedSize.width > 0) {
      renderedWidth.set(fittedSize.width * latest);
      renderedHeight.set(fittedSize.height * latest);
    }
  });

  const measureImageFit = (element: HTMLImageElement) => {
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!stageRect || !element.naturalWidth || !element.naturalHeight) return;
    const maximumWidth = Math.min(stageRect.width, window.innerWidth * 0.94, 1800);
    const maximumHeight = stageRect.height;
    const fitRatio = Math.min(maximumWidth / element.naturalWidth, maximumHeight / element.naturalHeight, 1);
    const fittedSize = {
      width: element.naturalWidth * fitRatio,
      height: element.naturalHeight * fitRatio,
      naturalWidth: element.naturalWidth,
      naturalHeight: element.naturalHeight,
    };
    fittedSizeRef.current = fittedSize;
    renderedWidth.set(fittedSize.width * scale.get());
    renderedHeight.set(fittedSize.height * scale.get());
    setHasMeasuredImage(true);
  };

  const oneToOneScale = () => {
    const fittedSize = fittedSizeRef.current;
    if (!fittedSize.width || !fittedSize.naturalWidth) return 1;
    return Math.max(1, fittedSize.naturalWidth / fittedSize.width);
  };

  const maximumScale = () => oneToOneScale();

  const panBounds = (nextScale = scale.get()) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const fittedSize = fittedSizeRef.current;
    return {
      x: Math.max(0, (fittedSize.width * nextScale - rect.width) * 0.5),
      y: Math.max(0, (fittedSize.height * nextScale - rect.height) * 0.5),
    };
  };

  const setPosition = (nextX: number, nextY: number, nextScale = scale.get()) => {
    const bounds = panBounds(nextScale);
    x.set(clamp(nextX, -bounds.x, bounds.x));
    y.set(clamp(nextY, -bounds.y, bounds.y));
  };

  const animateTo = (nextScale: number, nextX = 0, nextY = 0) => {
    const boundedScale = clamp(nextScale, 1, maximumScale());
    const bounds = panBounds(boundedScale);
    const boundedX = clamp(nextX, -bounds.x, bounds.x);
    const boundedY = clamp(nextY, -bounds.y, bounds.y);
    if (reduceMotion) {
      scale.set(boundedScale);
      x.set(boundedX);
      y.set(boundedY);
      return;
    }
    const spring = { type: "spring" as const, bounce: 0, duration: 0.32 };
    animate(scale, boundedScale, spring);
    animate(x, boundedX, spring);
    animate(y, boundedY, spring);
  };

  const zoomAt = (nextScale: number, clientX?: number, clientY?: number) => {
    const currentScale = scale.get();
    const boundedScale = clamp(nextScale, 1, maximumScale());
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || clientX === undefined || clientY === undefined || boundedScale === 1) {
      animateTo(boundedScale, boundedScale === 1 ? 0 : x.get(), boundedScale === 1 ? 0 : y.get());
      return;
    }
    const pointerX = clientX - rect.left - rect.width / 2;
    const pointerY = clientY - rect.top - rect.height / 2;
    const ratio = boundedScale / currentScale;
    const nextX = pointerX - (pointerX - x.get()) * ratio;
    const nextY = pointerY - (pointerY - y.get()) * ratio;
    animateTo(boundedScale, nextX, nextY);
  };

  const resetView = () => animateTo(1, 0, 0);
  const showActualPixels = () => {
    const focus = zoomFocusRef.current;
    zoomAt(oneToOneScale(), focus?.clientX, focus?.clientY);
  };

  useEffect(() => {
    scale.set(1);
    x.set(0);
    y.set(0);
    setScaleLabel(100);
    setHasMeasuredImage(false);
    viewerRef.current?.focus({ preventScroll: true });
  }, [image.src, scale, x, y]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => {
      if (imageRef.current?.naturalWidth) measureImageFit(imageRef.current);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [viewerSrc]);

  useEffect(() => {
    let isCurrentImage = true;
    setViewerSrc(image.src);
    setIsOriginalLoaded(false);
    setOriginalLoadFailed(false);
    if (!image.fullSrc || image.fullSrc === image.src) return undefined;

    void loadProjectOriginalImage(image.fullSrc, "high").then((loadedSrc) => {
      if (!isCurrentImage) return;
      setViewerSrc(loadedSrc);
      setIsOriginalLoaded(true);
    }).catch(() => {
      if (isCurrentImage) setOriginalLoadFailed(true);
    });

    return () => {
      isCurrentImage = false;
    };
  }, [image.fullSrc, image.src]);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const factor = Math.exp(-event.deltaY * 0.0014);
    zoomAt(scale.get() * factor, event.clientX, event.clientY);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || scale.get() <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = {
      id: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: x.get(),
      y: y.get(),
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    zoomFocusRef.current = { clientX: event.clientX, clientY: event.clientY };
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    setPosition(pointer.x + event.clientX - pointer.clientX, pointer.y + event.clientY - pointer.clientY);
  };

  const endPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current?.id !== event.pointerId) return;
    pointerRef.current = null;
    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAt(scale.get() * 1.25);
    } else if (event.key === "-") {
      event.preventDefault();
      zoomAt(scale.get() / 1.25);
    } else if (event.key === "0") {
      event.preventDefault();
      resetView();
    } else if (event.key === "1" && isOriginalLoaded) {
      event.preventDefault();
      showActualPixels();
    }
  };

  useEffect(() => {
    const handleWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        event.stopImmediatePropagation();
        zoomAt(scale.get() * 1.25);
      } else if (event.key === "-") {
        event.preventDefault();
        event.stopImmediatePropagation();
        zoomAt(scale.get() / 1.25);
      } else if (event.key === "0") {
        event.preventDefault();
        event.stopImmediatePropagation();
        resetView();
      } else if (event.key === "1" && isOriginalLoaded) {
        event.preventDefault();
        event.stopImmediatePropagation();
        showActualPixels();
      }
    };
    window.addEventListener("keydown", handleWindowKeyDown, true);
    return () => window.removeEventListener("keydown", handleWindowKeyDown, true);
  });

  return createPortal(
    <motion.div
      ref={viewerRef}
      className="project-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`图片查看器：${image.alt}`}
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div className="project-image-lightbox-bar" onClick={(event) => event.stopPropagation()}>
        <div className="project-image-lightbox-title">
          <span>IMAGE VIEWER</span>
          <strong>{image.alt}</strong>
          {image.fullSrc ? (
            <small>{originalLoadFailed ? "4K 原图加载失败" : isOriginalLoaded ? "4K 原图已加载" : "4K 原图加载中…"}</small>
          ) : null}
        </div>
        <div className="project-image-lightbox-controls">
          <button type="button" onClick={() => zoomAt(scale.get() / 1.25)} aria-label="缩小图片">
            <Minus size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <span aria-live="polite">
            {scaleLabel <= 100 ? "适应" : Math.abs(scale.get() - oneToOneScale()) < 0.03 ? "1:1" : `${scaleLabel}%`}
          </span>
          <button type="button" onClick={() => zoomAt(scale.get() * 1.25)} aria-label="放大图片">
            <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            className="project-image-lightbox-actual"
            type="button"
            onClick={showActualPixels}
            disabled={!isOriginalLoaded || originalLoadFailed}
            aria-label="按原始像素一比一查看"
          >
            1:1
          </button>
          <button type="button" onClick={resetView} aria-label="复位图片">
            <RotateCcw size={17} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button className="project-image-lightbox-close" type="button" onClick={onClose} aria-label="关闭图片查看器">
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`project-image-lightbox-stage${isDragging ? " is-dragging" : ""}${scaleLabel > 100 ? " is-zoomed" : ""}`}
        onClick={(event) => event.stopPropagation()}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={(event) => {
          if (scale.get() > 1.02) resetView();
          else zoomAt(oneToOneScale(), event.clientX, event.clientY);
        }}
      >
        <motion.div
          className={`project-image-lightbox-canvas${hasMeasuredImage ? " is-measured" : ""}`}
          style={{
            x,
            y,
            width: renderedWidth,
            height: renderedHeight,
            marginLeft: renderedOffsetX,
            marginTop: renderedOffsetY,
          }}
        >
          <img
            ref={imageRef}
            src={viewerSrc}
            alt={image.alt}
            decoding="async"
            draggable={false}
            onLoad={(event) => measureImageFit(event.currentTarget)}
          />
        </motion.div>
      </div>

      <p className="project-image-lightbox-hint" onClick={(event) => event.stopPropagation()}>
        滚轮缩放 / 拖动查看 / 双击 1:1 或复位 / ESC 关闭
      </p>
    </motion.div>,
    document.body,
  );
}

function useProjectImageLightbox() {
  const [activeImage, setActiveImage] = useState<ProjectImageSource | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openImage = (image: ProjectImageSource) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveImage(image);
  };

  const closeImage = () => {
    setActiveImage(null);
    requestAnimationFrame(() => returnFocusRef.current?.focus({ preventScroll: true }));
  };

  return { activeImage, openImage, closeImage };
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
  const { activeImage, openImage, closeImage } = useProjectImageLightbox();
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
                      <ZoomableProjectImage
                        src={media.src}
                        alt={media.alt}
                        onOpen={openImage}
                        loading={mediaIndex === 0 ? "eager" : "lazy"}
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
      <AnimatePresence>
        {activeImage ? (
          <ProjectImageLightbox
            image={activeImage}
            reduceMotion={reduceMotion}
            onClose={closeImage}
          />
        ) : null}
      </AnimatePresence>
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
type ProjectShowcaseCollection = (typeof projectShowcaseCollections)[number];

function SmartLivingCaseStudy({ onImageOpen }: { onImageOpen: (image: ProjectImageSource) => void }) {
  return (
    <div className="smart-case">
      <section className="smart-case-context" aria-labelledby="smart-case-context-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-context-title">项目从哪里开始</h3>
          <p>这不是单纯扩展七张场景图，而是先定义商品必须被记住的部分，再决定每类视觉在商业链路中承担什么任务。</p>
        </header>
        <dl>
          {smartLivingCaseStudy.context.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="smart-case-strategy" aria-labelledby="smart-case-strategy-title">
        <header className="smart-case-heading">
          <span>COMMERCIAL STRATEGY</span>
          <h3 id="smart-case-strategy-title">从商品信息到商业任务</h3>
          <p>商业目标被拆成四个连续问题，后续每一张图都需要回答其中至少一个。</p>
        </header>
        <div className="smart-case-tree">
          <div className="smart-case-tree-root">
            <small>BUSINESS GOAL</small>
            <strong>建立可识别、可相信、可转化的智能生活产品视觉</strong>
          </div>
          <div className="smart-case-tree-branches">
            {smartLivingCaseStudy.strategy.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <p>{branch.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-control" aria-labelledby="smart-case-control-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-control-title">先固定产品，再扩展世界</h3>
          <p>将产品拆成不可改变的识别锚点与可以变化的叙事变量，避免生成过程中用场景丰富度交换产品准确性。</p>
        </header>
        <div className="smart-case-control-board">
          <figure>
            <ZoomableProjectImage
              src="/assets/projects/table-fan/table-fan-views.webp"
              alt="空气循环扇正面、侧面和背面结构参考板"
              onOpen={onImageOpen}
              loading="lazy"
            />
            <figcaption>三视图作为后续场景生成与人工复核的结构基准。</figcaption>
          </figure>
          <div className="smart-case-control-rules">
            <article>
              <span>固定识别锚点</span>
              <ul>
                {smartLivingCaseStudy.fixedAnchors.map((anchor) => <li key={anchor}>{anchor}</li>)}
              </ul>
            </article>
            <article>
              <span>可控叙事变量</span>
              <ul>
                {smartLivingCaseStudy.variables.map((variable) => <li key={variable}>{variable}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="smart-case-scenes" aria-labelledby="smart-case-scenes-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-scenes-title">场景不是装饰，而是卖点的载体</h3>
          <p>从产品识别到生活方式，每个场景模块拥有明确的人群、信息与使用触点。</p>
        </header>
        <div className="smart-case-scene-grid">
          {smartLivingCaseStudy.scenes.map((scene) => (
            <article key={scene.title}>
              <figure>
                <ZoomableProjectImage
                  src={scene.image}
                  alt={scene.alt}
                  onOpen={onImageOpen}
                  loading="lazy"
                />
              </figure>
              <div>
                <span>{scene.touchpoint}</span>
                <h4>{scene.title}</h4>
                <p>{scene.purpose}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="smart-case-lighting" aria-labelledby="smart-case-lighting-title">
        <div className="smart-case-lighting-copy">
          <h3 id="smart-case-lighting-title">同一产品，不同时段</h3>
          <p>昼夜变化用来扩展内容主题，但产品的白色材质、结构比例和空间尺度始终保持为审核基准。</p>
          <ul>
            <li><strong>日间</strong><span>轻松、通透、自然使用</span></li>
            <li><strong>午后</strong><span>温暖、陪伴、家庭关系</span></li>
            <li><strong>黄昏</strong><span>柔和、放松、空间氛围</span></li>
            <li><strong>夜间</strong><span>安静、低照度、睡眠场景</span></li>
          </ul>
        </div>
        <div className="smart-case-lighting-media">
          <ZoomableProjectImage
            src="/assets/projects/table-fan/table-fan-dayparts.webp"
            alt="空气循环扇从日间到夜间的四种光线实验"
            onOpen={onImageOpen}
            loading="lazy"
          />
          <ZoomableProjectImage
            src="/assets/projects/table-fan/table-fan-night-detail.webp"
            alt="空气循环扇夜间低照度材质表现"
            onOpen={onImageOpen}
            loading="lazy"
          />
        </div>
      </section>

      <section className="smart-case-workflow" aria-labelledby="smart-case-workflow-title">
        <header className="smart-case-heading">
          <span>PRODUCTION PIPELINE</span>
          <h3 id="smart-case-workflow-title">从输入到可交付资产</h3>
          <p>每个环节都定义输入与输出，使生成过程可以被复盘、校验和继续扩展。</p>
        </header>
        <ol>
          {smartLivingCaseStudy.workflow.map((step) => (
            <li key={step.name}>
              <strong>{step.name}</strong>
              <dl>
                <div><dt>输入</dt><dd>{step.input}</dd></div>
                <div><dt>输出</dt><dd>{step.output}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="smart-case-touchpoints" aria-labelledby="smart-case-touchpoints-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-touchpoints-title">一套资产，进入多条商业路径</h3>
          <p>通过审核的视觉不止用于作品展示，而是被组织为可继续裁切、组合和动态化的内容母版。</p>
        </header>
        <div className="smart-case-touchpoint-tree">
          <div className="smart-case-touchpoint-root">已审核核心视觉资产</div>
          <div className="smart-case-touchpoint-branches">
            {smartLivingCaseStudy.touchpoints.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <ul>{branch.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-quality" aria-labelledby="smart-case-quality-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-quality-title">商业可用性的六项检查</h3>
          <p>候选图需要同时通过产品、空间和传播价值检查，画面完成度不是唯一判断标准。</p>
        </header>
        <div className="smart-case-quality-grid">
          {smartLivingCaseStudy.qualityChecks.map((check) => (
            <article key={check.title}>
              <strong>{check.title}</strong>
              <p>{check.detail}</p>
              <span>REVIEW STANDARD</span>
            </article>
          ))}
        </div>
      </section>

      <section className="smart-case-results" aria-labelledby="smart-case-results-title">
        <header>
          <div>
            <span>PROJECT IMPACT</span>
            <h3 id="smart-case-results-title">从视觉产出回到商业结果</h3>
          </div>
          <p>核心视觉资产覆盖商品展示、内容传播与转化触点，并缩短多场景内容的生产周期。</p>
        </header>
        <div className="smart-case-result-grid">
          {smartLivingCaseStudy.results.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
              <small>{result.note}</small>
            </article>
          ))}
        </div>
        <p className="smart-case-conclusion">
          最终交付的不只是七张图，而是一套从产品识别、场景生产、质量筛选到商业触点扩展的视觉工作方法。
        </p>
      </section>
    </div>
  );
}

function ProjectDetailViewer({
  collection,
  item,
  currentIndex,
  projectIndex,
  reduceMotion,
  onClose,
  onNavigate,
  onSelectProject,
}: {
  collection: ProjectShowcaseCollection;
  item: ProjectShowcaseItem;
  currentIndex: number;
  projectIndex: number;
  reduceMotion: boolean | null;
  onClose: () => void;
  onNavigate: (direction: number) => void;
  onSelectProject: (index: number) => void;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const { activeImage, openImage, closeImage } = useProjectImageLightbox();
  const titleId = `project-detail-title-${item.index}`;
  const summaryId = `project-detail-summary-${item.index}`;
  const total = projectShowcaseCollections.length;

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
              <ZoomableProjectImage
                src={item.image}
                alt={item.alt}
                onOpen={openImage}
                loading="eager"
              />
              <span className="project-detail-visual-shade" aria-hidden="true" />
              <figcaption>
                <span>{item.categoryEnglish}</span>
                <b>{item.year}</b>
              </figcaption>
              <strong aria-hidden="true">{item.backdrop}</strong>
            </figure>

            <section className="project-detail-copy">
              <div className="project-collection-strip">
                <div>
                  <span>PROJECT COLLECTION</span>
                  <strong>{collection.title}</strong>
                  <small>{String(collection.projects.length).padStart(2, "0")} CASE STUDIES</small>
                </div>
                <nav aria-label={`${collection.title}项目列表`}>
                  {collection.projects.map((project, index) => (
                    <button
                      className={projectIndex === index ? "is-active" : ""}
                      type="button"
                      aria-current={projectIndex === index ? "page" : undefined}
                      onClick={() => onSelectProject(index)}
                      key={project.index}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{project.title}</strong>
                    </button>
                  ))}
                </nav>
              </div>
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

              {item.index === "01" ? (
                <SmartLivingCaseStudy onImageOpen={openImage} />
              ) : (
                <>
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
                          <ZoomableProjectImage
                            src={visual.src}
                            alt={visual.alt}
                            onOpen={openImage}
                            loading="lazy"
                          />
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
                </>
              )}

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
      <AnimatePresence>
        {activeImage ? (
          <ProjectImageLightbox
            image={activeImage}
            reduceMotion={reduceMotion}
            onClose={closeImage}
          />
        ) : null}
      </AnimatePresence>
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
  item: ProjectShowcaseCollection;
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
  const coverProject = item.projects[0];
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
      aria-label={`查看项目分类：${item.title}，共${item.projects.length}个项目`}
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
        <img src={coverProject.image} alt={coverProject.alt} loading="lazy" decoding="async" />
        <span className="project-showcase-art-shade" aria-hidden="true" />
        <span className="project-showcase-backdrop" aria-hidden="true">{coverProject.backdrop}</span>
      </span>
      <span className="project-showcase-index">{item.index}</span>
      <span className="project-showcase-meta">
        <strong>{item.title}</strong>
        <em>{item.english}</em>
        <span>
          {coverProject.category}
          <small>{coverProject.categoryEnglish} / {String(item.projects.length).padStart(2, "0")} PROJECTS</small>
        </span>
        <b>{coverProject.year}</b>
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
  const [detailProjectIndex, setDetailProjectIndex] = useState(0);
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
  const activeCollection = detailIndex === null ? null : projectShowcaseCollections[detailIndex];
  const activeProject = activeCollection?.projects[detailProjectIndex] ?? null;

  useDocumentScrollLock(detailIndex !== null);

  const openProject = (index: number) => {
    const card = document.querySelector<HTMLElement>(`[data-project-index="${index}"]`);
    projectReturnFocus.current = card ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setDetailProjectIndex(0);
    setDetailIndex(index);
  };

  const closeProject = () => {
    setDetailIndex(null);
  };

  const navigateProject = (direction: number) => {
    setDetailIndex((current) => {
      if (current === null) return current;
      setDetailProjectIndex(0);
      return (current + direction + projectShowcaseCollections.length) % projectShowcaseCollections.length;
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
            Portfolio Directions
          </span>
          <h2 id="project-showcase-title">
            <span>代表</span>
            <span>项目</span>
          </h2>
          <div className="project-showcase-heading-meta">
            <strong>FEATURED PROJECTS</strong>
            <span>SIX CROSS-INDUSTRY DIRECTIONS</span>
          </div>
        </motion.header>

        <motion.div
          className={`project-showcase-track${displayIndex !== null ? " has-focus" : ""}`}
          style={reduceMotion ? undefined : { opacity: trackOpacity, x: trackX, scale: trackScale }}
        >
          {projectShowcaseCollections.map((item, index) => (
            <ProjectShowcaseCard
              key={item.id}
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
            {projectShowcaseCollections.map((item, index) => (
              <span
                key={item.id}
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
          {activeCollection && activeProject && detailIndex !== null ? (
            <ProjectDetailViewer
              collection={activeCollection}
              item={activeProject}
              currentIndex={detailIndex}
              projectIndex={detailProjectIndex}
              reduceMotion={reduceMotion}
              onClose={closeProject}
              onNavigate={navigateProject}
              onSelectProject={setDetailProjectIndex}
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
  useProjectOriginalPreloading(!loading);

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
