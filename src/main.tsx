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
    title: "让食欲成为购买理由：空气炸锅转化视觉",
    english: "AIR FRYER COMMERCE SYSTEM",
    category: "智能厨电 / 商品视觉",
    categoryEnglish: "SMART KITCHEN APPLIANCE",
    year: "2026",
    image: "/assets/projects/air-fryer/air-fryer-hero.webp",
    alt: "白色空气炸锅与热食构成的快炸锁嫩商业主视觉",
    backdrop: "AIR FRYER",
    accent: "#dc8a52",
    introTheme: {
      surface: "#38160d",
      surfaceDeep: "#180a07",
      title: "#fff3df",
      body: "#e9c3a4",
      muted: "#d69a70",
      accent: "#f0a45d",
      rule: "#a75b38",
      shadow: "rgba(31, 8, 3, 0.38)",
    },
    summary: "把消费者对效率、食欲与清洁的连续判断转化为画面顺序，在产品结构不漂移的前提下，让每个触点都推动下一步购买决定。",
    brief: "项目需要在高点击电商表达与产品可信度之间取得平衡，让产品结构、操作方式和使用结果在不同创意画面中保持连续。",
    response: "先用白底图、三视图与真实操作场景锁定产品，再按操作、结果、生活方式和细节信任四条内容路径组织画面，最后统一筛选为可组合的商业资产。",
    role: "AI Art Direction / 电商视觉",
    scope: "智能厨电全链路内容系统",
    deliverables: ["产品基准图", "三视图", "商品主视觉", "操作场景", "生活方式场景", "清洁场景", "电商创意套图"],
    workflow: ["资料归档", "产品校准", "卖点拆解", "创意分镜", "系列生成", "质量复核", "商业编排"],
    system: "以机身轮廓、抽屉结构、顶部旋钮、前面板和暖白材质作为固定识别锚点，再用机位、食物、人物动作、空间和标题骨架建立差异化。",
    outcome: "用十二张核心视觉覆盖搜索吸引、操作理解、食物结果与清洁信任，让同一套产品资产可以连续进入主图、PDP 和传播内容。",
    reflection: "高转化不是让食物无限放大，而是先守住产品真实性，再按消费者的疑问逐步交付购买证据。",
    gallery: [
      { src: "/assets/projects/air-fryer/air-fryer-product.webp", alt: "空气炸锅白底标准产品图", layout: "wide" },
      { src: "/assets/projects/air-fryer/air-fryer-views.webp", alt: "空气炸锅正面、侧面与顶面结构视图", layout: "wide" },
      { src: "/assets/projects/air-fryer/air-fryer-reference.webp", alt: "空气炸锅抽屉取出与食物出锅场景", layout: "wide" },
      { src: "/assets/projects/air-fryer/air-fryer-operation.webp", alt: "空气炸锅抽屉操作商业画面", layout: "square" },
      { src: "/assets/projects/air-fryer/air-fryer-lifestyle.webp", alt: "空气炸锅家庭厨房生活方式场景", layout: "wide" },
      { src: "/assets/projects/air-fryer/air-fryer-cleaning.webp", alt: "空气炸锅炸篮清洁使用场景", layout: "wide" },
      { src: "/assets/projects/air-fryer/air-fryer-hero.webp", alt: "空气炸锅快炸锁嫩商业主视觉", layout: "square" },
      { src: "/assets/projects/air-fryer/air-fryer-crispy.webp", alt: "空气炸锅外脆里嫩商业主视觉", layout: "square" },
      { src: "/assets/projects/air-fryer/air-fryer-table.webp", alt: "空气炸锅速享美味俯拍餐桌主视觉", layout: "square" },
      { src: "/assets/projects/air-fryer/air-fryer-smart-cook.webp", alt: "空气炸锅智控美味商业主视觉", layout: "square" },
      { src: "/assets/projects/air-fryer/air-fryer-light-crisp.webp", alt: "空气炸锅轻脂烹饪商业主视觉", layout: "square" },
      { src: "/assets/projects/air-fryer/air-fryer-control.webp", alt: "空气炸锅旋控面板细节商业画面", layout: "square" },
    ],
  },
  {
    index: "02",
    title: "把看不见的风变成购买证据：循环扇电商视觉",
    english: "AI AIR CIRCULATOR COMMERCE SYSTEM",
    category: "商业渲染 / 商品视觉",
    categoryEnglish: "COMMERCIAL RENDERING",
    year: "2026",
    image: "/assets/projects/table-fan/table-fan-hero.webp",
    alt: "白色空气循环扇正面商业渲染主视觉",
    backdrop: "LIVING",
    accent: "#89aacc",
    introTheme: {
      surface: "#e5dfd8",
      surfaceDeep: "#d1cbc4",
      title: "#262a2d",
      body: "#4d5255",
      muted: "#4d5255",
      accent: "#38566c",
      rule: "#92999c",
      shadow: "rgba(68, 62, 57, 0.2)",
    },
    summary: "把难以直接看见的送风体感拆成人物动作、空间距离与昼夜场景，在保持产品识别的同时，让功能卖点成为可以被理解的购买证据。",
    brief: "项目需要在不虚构功能的前提下，让同一款循环扇在高点击电商表达与产品可信度之间取得平衡，并用十套独立创意路线证明内容可以被稳定复制与扩展。",
    response: "先以圆形螺旋格栅、中心圆盘、机身比例、底座按键与控制面板锁定不可改变的产品识别锚点，再沿十套创意路线展开机位、动作、场景与标题的受控变化，最后统一审核为可编排的商业资产。",
    role: "AI Art Direction / 商品视觉",
    scope: "0 到 1 商业视觉资产系统",
    deliverables: ["产品基准图", "三视图", "商品主视觉", "创意路线套图", "昼夜场景", "触点适配方案"],
    workflow: ["资料归档", "产品校准", "卖点拆解", "创意分镜", "系列生成", "质量复核", "商业编排"],
    system: "以格栅、中心轴、机身比例、底座和控制面板作为固定识别锚点，通过人物关系、空间尺度、光线时段与标题骨架建立可控变量。",
    outcome: "十六张核心视觉覆盖十套独立主图路线与昼夜场景，让看不见的风分别承担抢注意、讲功能和建场景三种销售任务。",
    reflection: "AI 的价值不在于重复换背景，而在于并行验证不同购买理由，并让每条路线都保住同一款产品。",
    gallery: [
      { src: "/assets/projects/table-fan/table-fan-m01.webp", alt: "空气循环扇 · 清风巨物创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m02.webp", alt: "空气循环扇 · 抬手送风创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m03.webp", alt: "空气循环扇 · 桌面风场创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m04.webp", alt: "空气循环扇 · 床头清晨创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m05.webp", alt: "空气循环扇 · 一隅好放创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m06.webp", alt: "空气循环扇 · 风罩微距创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m07.webp", alt: "空气循环扇 · 窗边引风创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m08.webp", alt: "空气循环扇 · 阅读清风创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m09.webp", alt: "空气循环扇 · 框中清风创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m10.webp", alt: "空气循环扇 · 清风轨迹创意路线主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m11.webp", alt: "空气循环扇 · 清风巨物变体主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m12.webp", alt: "空气循环扇 · 抬手送风变体主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m13.webp", alt: "空气循环扇 · 阅读清风变体主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m14.webp", alt: "空气循环扇 · 窗边引风变体主图", layout: "square" },
      { src: "/assets/projects/table-fan/table-fan-m15.webp", alt: "空气循环扇 · 清风轨迹变体主图", layout: "square" },
    ],
  },
  {
    index: "01",
    title: "包装不漂移，内容才能扩张：GLACIER 新品视觉",
    english: "GLACIER CLEANSER COMMERCE SYSTEM",
    category: "洁面护理 / 新品视觉",
    categoryEnglish: "SKINCARE CLEANSING CAMPAIGN",
    year: "2026",
    image: "/assets/projects/glacier-cleanser/glacier-sunrise-wide.webp",
    alt: "透明冰蓝色 GLACIER 洁面乳置于破晓冰川中的商业主视觉",
    backdrop: "GLACIER",
    accent: "#82b9d5",
    introTheme: {
      surface: "#dce9f1",
      surfaceDeep: "#bfd4e1",
      title: "#142a3d",
      body: "#344f62",
      muted: "#3a586c",
      accent: "#285f8a",
      rule: "#7195ad",
      shadow: "rgba(29, 65, 88, 0.2)",
    },
    summary: "先锁定透明瓶体、泵头、吸管和标签，再把冰感从单一背景扩展为浴室、冰川、昼夜与十五条商业路线，让新品既可信又有规模。",
    brief: "项目需要在不虚构成分、功效与认证信息的前提下，让透明冰蓝瓶体、银色泵头、内部吸管和标签在不同机位与场景中保持同一产品身份。",
    response: "先以正面、侧面和顶视图锁定瓶体结构，再用冰、水、浴室、实验室与昼夜光线扩展感官场景，最后将十五条独立方图路线编排为可用于主图、PDP 和传播的内容资产。",
    role: "AI Art Direction / 美妆视觉",
    scope: "洁面新品全链路内容系统",
    deliverables: ["产品三视图", "包装与泵头细节", "冰川场景", "浴室场景", "Campaign KV", "电商创意套图"],
    workflow: ["资料归档", "产品校准", "视觉定位", "场景分镜", "系列生成", "质量复核", "触点编排"],
    system: "以透明冰蓝圆角瓶体、厚实瓶底、银色泵头、细密金属环纹、内部吸管和标签位置作为固定识别锚点，通过机位、冰水材质、空间、光线时段与标题骨架建立可控变化。",
    outcome: "三十四张视觉资产从包装校准延展到十五条方形商业路线，覆盖新品首屏、PDP、社交内容和日夜 Campaign。",
    reflection: "内容规模越大，包装细节越不能漂移。项目用固定识别锚点换取场景、光线和构图的扩展自由。",
    gallery: [
      { src: "/assets/projects/glacier-cleanser/glacier-views.webp", alt: "GLACIER 洁面乳正面、侧面与顶面产品校准图", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-sunrise-wide.webp", alt: "GLACIER 洁面乳破晓冰川横向主视觉", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-bathroom-wide.webp", alt: "GLACIER 洁面乳明亮浴室横向场景", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-water-ripple-wide.webp", alt: "GLACIER 洁面乳水面波纹横向场景", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-lab-wide.webp", alt: "GLACIER 洁面乳冷白实验室横向场景", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-macro-wide.webp", alt: "GLACIER 洁面乳瓶体与泵头材质微距", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-night-wide.webp", alt: "GLACIER 洁面乳深蓝夜间冰川场景", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-pedestal-portrait.webp", alt: "GLACIER 洁面乳冷白展台竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-minimal-portrait.webp", alt: "GLACIER 洁面乳极简竖向产品场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-arch-portrait.webp", alt: "GLACIER 洁面乳拱形空间竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-flatlay-portrait.webp", alt: "GLACIER 洁面乳冰水俯拍竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-tilted-ice-portrait.webp", alt: "GLACIER 洁面乳倾斜冰面竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-bathroom-portrait.webp", alt: "GLACIER 洁面乳浴室台面竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-hero-portrait.webp", alt: "GLACIER 洁面乳冰川中央竖向主视觉", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-snow-portrait.webp", alt: "GLACIER 洁面乳雪地冰晶竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-cave-portrait.webp", alt: "GLACIER 洁面乳深色冰洞竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-waterfall-portrait.webp", alt: "GLACIER 洁面乳水幕竖向场景", layout: "portrait" },
      { src: "/assets/projects/glacier-cleanser/glacier-snow-wide.webp", alt: "GLACIER 洁面乳雪原横向场景", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-crystal-wide.webp", alt: "GLACIER 洁面乳冰晶横向场景", layout: "wide" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-clean-focus.webp", alt: "GLACIER 洁面乳冰感净澈方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-clear-as-ice.webp", alt: "GLACIER 洁面乳净澈如冰方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-clean-front.webp", alt: "GLACIER 洁面乳正面净澈方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-crystal-stage.webp", alt: "GLACIER 洁面乳冰晶展台方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-morning-bathroom-a.webp", alt: "GLACIER 洁面乳晨间浴室方形商业图一", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-texture.webp", alt: "GLACIER 洁面乳冰川质感方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-top-water.webp", alt: "GLACIER 洁面乳水面俯拍方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-minimal-ice.webp", alt: "GLACIER 洁面乳极简冰感方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-flow.webp", alt: "GLACIER 洁面乳冰感流动方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-night.webp", alt: "GLACIER 洁面乳冷冽夜色方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-morning-bathroom-b.webp", alt: "GLACIER 洁面乳晨间浴室方形商业图二", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-pump-fresh.webp", alt: "GLACIER 洁面乳一泵清爽方形商业图", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-cave-focus-a.webp", alt: "GLACIER 洁面乳冰境聚焦方形商业图一", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-cave-focus-b.webp", alt: "GLACIER 洁面乳冰境聚焦方形商业图二", layout: "square" },
      { src: "/assets/projects/glacier-cleanser/glacier-square-cave-focus-c.webp", alt: "GLACIER 洁面乳冰境聚焦方形商业图三", layout: "square" },
    ],
  },
  {
    index: "02",
    title: "让高端感建立在可信质地上：LUMINOSE 精华 Campaign",
    english: "LUMINOSE SERUM COMMERCE SYSTEM",
    category: "功效护肤 / 新品企划",
    categoryEnglish: "SKINCARE CAMPAIGN",
    year: "2026",
    image: "/assets/projects/serum/serum-morning-hero.webp",
    alt: "琥珀色 LUMINOSE 精华液与暖金晨光构成的新品商业主视觉",
    backdrop: "LUMINOSE",
    accent: "#c59663",
    introTheme: {
      surface: "#ead9be",
      surfaceDeep: "#cdb38f",
      title: "#3e291d",
      body: "#61462f",
      muted: "#58402c",
      accent: "#653e1e",
      rule: "#a9825f",
      shadow: "rgba(65, 39, 20, 0.24)",
    },
    summary: "用稳定的琥珀玻璃、滴管动作与晨夜光线建立高端价值感，让精华液从漂亮静物变成可以持续解释质地、使用与品牌体验的新品内容。",
    brief: "项目需要在高端护肤气质与商品可信度之间取得平衡，让琥珀玻璃、滴管结构、标签信息和液体质感在不同光线与场景中保持连续。",
    response: "先以三视图锁定瓶身、滴管与标签，再用质地特写、晨夜护理和自然光场景建立使用感知，最后将十条独立创意路线编排为可覆盖主图、PDP 与社交传播的内容资产。",
    role: "AI Art Direction / 美妆视觉",
    scope: "功效护肤新品全链路内容系统",
    deliverables: ["产品三视图", "质地与滴管特写", "晨夜场景", "自然光场景", "Campaign KV", "电商创意套图"],
    workflow: ["资料归档", "产品校准", "视觉定位", "场景分镜", "系列生成", "质量复核", "触点编排"],
    system: "以琥珀玻璃瓶、圆润瓶肩、香槟米色滴管、标签位置与品牌文字作为固定识别锚点，通过机位、光线时段、材质道具、操作动作和标题骨架建立可控变化。",
    outcome: "二十七张视觉资产覆盖产品校准、质地动作、晨夜场景与十套方形商业主图，让新品价值从第一眼延续到使用想象。",
    reflection: "高端感来自连续可信的材质与使用体验，而不是在每张画面里重复金色、丝缎和装饰。",
    gallery: [
      { src: "/assets/projects/serum/serum-views.webp", alt: "LUMINOSE 精华液正面与侧面产品校准图", layout: "wide" },
      { src: "/assets/projects/serum/serum-bathroom.webp", alt: "精华液晨间浴室自然光场景", layout: "wide" },
      { src: "/assets/projects/serum/serum-dropper-scene.webp", alt: "精华液滴管提起与液滴质地场景", layout: "wide" },
      { src: "/assets/projects/serum/serum-night-scene.webp", alt: "精华液夜间修护冷暖光场景", layout: "wide" },
      { src: "/assets/projects/serum/serum-morning-hero.webp", alt: "精华液晨光奢润商业主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-dropper-kv.webp", alt: "精华液一滴焕亮商业主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-top-view.webp", alt: "精华液奢养时刻顶视商业主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-morning-hand.webp", alt: "精华液晨护高光生活方式主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-vanity-kv.webp", alt: "精华液台面主角商业主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-amber-detail.webp", alt: "精华液琥珀流光材质主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-floating-kv.webp", alt: "精华液奢润引力动态主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-radiance.webp", alt: "精华液光采已现结果主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-mirror-kv.webp", alt: "精华液镜映奢光框景主视觉", layout: "square" },
      { src: "/assets/projects/serum/serum-golden-kv.webp", alt: "精华液金曜焕采概念主视觉", layout: "square" },
    ],
  },
  {
    index: "03",
    title: "从包装识别到购买场景：青岚茶事无糖茶视觉系统",
    english: "QINGLAN TEA COMMERCE SYSTEM",
    category: "食品饮料 / 概念品牌",
    categoryEnglish: "BEVERAGE COMMERCE",
    year: "2026",
    image: "/assets/projects/qinglan-tea/qinglan-square-heatwave-vending.webp",
    alt: "青岚茶事原叶茉莉绿茶与自动贩卖机组成的热浪退场商业主视觉",
    backdrop: "QINGLAN",
    accent: "#82915f",
    introTheme: {
      surface: "#dfe3d5",
      surfaceDeep: "#bcc6a9",
      title: "#1f291d",
      body: "#3d4938",
      muted: "#59684f",
      accent: "#3f5a34",
      rule: "#819071",
      shadow: "rgba(31, 48, 24, 0.24)",
    },
    summary: "以原创概念包装为起点，先锁定瓶型、茶汤与标签识别，再把原叶、零糖和清爽饮用理由扩展到货架、场景与十条电商创意路线。",
    brief: "自主命题需要从零建立一个可信的年轻无糖茶品牌，同时证明包装原型可以稳定进入商品主图、生活方式场景和传播触点。",
    response: "先用三视图建立包装与材质基准，再将原叶感、清爽感和即饮便利拆成不同画面任务，最后以统一审核标准编排成完整商业内容系统。",
    role: "AI Art Direction / Packaging & Commerce Visual",
    scope: "自主命题概念品牌全链路视觉",
    deliverables: ["概念包装系统", "产品三视图", "生活方式场景", "电商主视觉", "Campaign 套图", "触点编排"],
    workflow: ["品牌命题", "包装原型", "产品校准", "场景分镜", "系列生成", "质量复核", "触点编排"],
    system: "以透明 PET 瓶、浅金茶汤、竹青瓶盖和雾白标签作为固定识别锚点，通过机位、光线、饮用场景、标题骨架与产品数量建立可控变化。",
    outcome: "完成一套概念品牌包装、十条电商创意路线与三十四张核心视觉，覆盖包装理解、货架注意、饮用想象和传播延展。",
    reflection: "概念快消项目的价值不在于生成更多饮料图，而在于先建立可信商品，再让每条创意路线承担不同的购买理由。",
    gallery: [
      { src: "/assets/projects/qinglan-tea/qinglan-packaging-views.webp", alt: "青岚茶事原叶茉莉绿茶正面、右侧与背面概念包装三视图", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-heatwave-vending.webp", alt: "青岚茶事热浪退场自动贩卖机商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-one-leaf.webp", alt: "青岚茶事一叶入香轻东方商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-original-leaf.webp", alt: "青岚茶事原叶见真章茶园商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-shake-awake.webp", alt: "青岚茶事摇一摇茶香就醒了手持商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-fresh-aroma-float.webp", alt: "青岚茶事清爽有茶香水面商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-ice-bucket.webp", alt: "青岚茶事户外冰桶冷藏商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-grab-and-go.webp", alt: "青岚茶事便利店随手一瓶茶商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-wind-aroma.webp", alt: "青岚茶事风里有茶香自然商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-tea-aroma.webp", alt: "青岚茶事茶香正好俯拍商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-cool-wake.webp", alt: "青岚茶事冷意醒茶水感商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-fresh-aroma-water.webp", alt: "青岚茶事清爽有茶香冰水商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-ice-again-sky.webp", alt: "青岚茶事冰一下再喝夏日商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-enjoy-moment.webp", alt: "青岚茶事悠享一刻生活方式商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-close.webp", alt: "青岚茶事轻一点喝茶瓶身近景商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-garden.webp", alt: "青岚茶事轻一点喝茶花园商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-rock.webp", alt: "青岚茶事轻一点喝茶自然石台商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-macro.webp", alt: "青岚茶事轻一点喝茶瓶身微距商业主视觉", layout: "square" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-morning-window.webp", alt: "青岚茶事清晨窗边原叶茶产品场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-light-lunch.webp", alt: "青岚茶事轻食午餐搭配场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-light-fitness.webp", alt: "青岚茶事轻运动日常饮用场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-urban-commute.webp", alt: "青岚茶事都市通勤随行场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-jasmine-still-life.webp", alt: "青岚茶事茉莉花与茶叶静物场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-reading-afternoon.webp", alt: "青岚茶事午后阅读生活方式场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-studio-reference.webp", alt: "青岚茶事纯净摄影棚产品基准场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-tea-garden-sunrise.webp", alt: "青岚茶事茶园晨光横向产品场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-travertine-portrait.webp", alt: "青岚茶事洞石台面竖向产品场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-leaf-shadow-portrait.webp", alt: "青岚茶事叶影洞石竖向产品场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-jasmine-table.webp", alt: "青岚茶事茉莉花浅木桌横向产品场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-water-stone.webp", alt: "青岚茶事清水石面横向产品场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-botanical-flatlay.webp", alt: "青岚茶事茉莉与茶叶俯拍产品场景", layout: "portrait" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-linen-table.webp", alt: "青岚茶事浅色亚麻桌面横向产品场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-garden-wide.webp", alt: "青岚茶事自然花园横向产品场景", layout: "wide" },
      { src: "/assets/projects/qinglan-tea/qinglan-scene-sunlit-linen.webp", alt: "青岚茶事阳光与亚麻横向产品场景", layout: "wide" },
    ],
  },
  {
    index: "04",
    title: "让人物情绪成为商品记忆：运动生活方式 Campaign",
    english: "AI LIFESTYLE CAMPAIGN",
    category: "运动时尚 / 人物叙事",
    categoryEnglish: "LIFESTYLE CAMPAIGN",
    year: "2026",
    image: "/assets/project-showcase-afterimage.webp",
    alt: "运动人物影像与编辑式字体组成的生活方式 Campaign 方向",
    backdrop: "LIFESTYLE",
    accent: "#89aacc",
    introTheme: {
      surface: "#171717",
      surfaceDeep: "#080808",
      title: "#e7e3dc",
      body: "#bbb7b0",
      muted: "#8c8984",
      accent: "#c6c0b6",
      rule: "#5d5a56",
      shadow: "rgba(0, 0, 0, 0.42)",
    },
    summary: "以跑鞋为核心商品，让统一人物身份、动作节奏与城市运动场景共同建立品牌记忆，使情绪表达始终服务于商品而不是遮蔽商品。",
    brief: "运动生活方式项目需要同时控制人物身份、动作姿态、商品准确性与场景光线。",
    response: "先锁定人物与跑鞋结构，再围绕城市训练和户外运动设计镜头、动作和情绪连续性。",
    role: "AI Art Direction / Lifestyle",
    scope: "人物、商品与场景一致性",
    deliverables: ["Campaign KV", "人物套图", "商品场景", "社交内容"],
    workflow: ["角色定义", "商品锁定", "动作设计", "场景扩展", "系列精修"],
    system: "为人物身份、鞋款结构、镜头和环境光建立连续标准，使多张画面共同讲述同一个运动场景。",
    outcome: "形成覆盖都市训练、户外自然与编辑式影像的连续人物 Campaign，并将同一角色和鞋款稳定延展到多种传播版位。",
    reflection: "人物 Campaign 的商业价值不只是氛围，而是让消费者通过情绪、动作和场景记住同一件商品。",
    gallery: [{ src: "/assets/project-showcase-afterimage.webp", alt: "运动人物生活方式 Campaign 方向", layout: "portrait" }],
  },
  {
    index: "05",
    title: "把复杂内容变成购买理由：文化出版电商叙事",
    english: "CULTURAL PUBLISHING COMMERCE",
    category: "文化出版 / 商业视觉",
    categoryEnglish: "PUBLISHING COMMERCE",
    year: "2026",
    image: "/assets/works/commerce-andersen-thumb.jpg",
    alt: "儿童立体书与传统文化内容组成的出版商业视觉",
    backdrop: "PUBLISHING",
    accent: "#89aacc",
    introTheme: {
      surface: "#e9efc7",
      surfaceDeep: "#b9d478",
      title: "#492812",
      body: "#684123",
      muted: "#60401f",
      accent: "#8a2515",
      rule: "#86a64d",
      shadow: "rgba(64, 73, 29, 0.22)",
    },
    summary: "把立体结构、经典内容与亲子阅读价值重新排序，让复杂出版信息在长页面中变成容易理解、容易比较并能够推动购买的销售叙事。",
    brief: "出版产品需要准确呈现内容与产品结构，也要在主图、详情页和组合陈列中快速建立购买理由。",
    response: "以内容主题和产品真实性为基础，统一套系识别、信息层级、阅读场景与电商销售叙事。",
    role: "出版视觉 / AI Commerce Design",
    scope: "内容商业化与多 SKU 系统",
    deliverables: ["出版主视觉", "套系陈列", "详情长图", "文化传播内容"],
    workflow: ["内容梳理", "产品校准", "视觉叙事", "电商编排", "套系延展"],
    system: "以固定产品比例、系列识别和信息层级维持多册内容的一致性，同时保留不同主题的辨识度。",
    outcome: "用统一套系识别连接入口主图、内容说明、结构特写与详情长图，使多册产品能够共享一套销售逻辑并保留主题差异。",
    reflection: "出版设计的商业价值在于降低理解成本，让内容价值、产品结构和购买人群在同一条阅读路径中被看见。",
    gallery: [
      { src: "/assets/works/commerce-andersen-thumb.jpg", alt: "文化出版商业视觉主画面", layout: "portrait" },
      { src: "/assets/works/commerce-andersen-long.jpg", alt: "文化出版电商详情长图", layout: "long" },
    ],
  },
  {
    index: "06",
    title: "让商品在运动中保持准确：AI Product Film",
    english: "AI PRODUCT FILM",
    category: "消费科技 / 产品影片",
    categoryEnglish: "MOTION CAMPAIGN",
    year: "2026",
    image: "/assets/project-showcase-aether-grid.webp",
    alt: "暗场科技空间与精密光线组成的消费科技产品影片方向",
    backdrop: "MOTION",
    accent: "#89aacc",
    introTheme: {
      surface: "#171a19",
      surfaceDeep: "#090b0b",
      title: "#ece8df",
      body: "#b8b5ae",
      muted: "#858b88",
      accent: "#78aaa5",
      rule: "#455d5a",
      shadow: "rgba(0, 0, 0, 0.44)",
    },
    summary: "以无线耳机为核心产品，用关键帧锁定结构、材质和品牌光线，再将开合、旋转与推进拆成可控镜头，让动态真正解释产品。",
    brief: "消费科技产品片需要在运动中持续保护结构、材质与品牌气质，避免无目的镜头变化。",
    response: "先锁定耳机与充电仓关键帧，再定义开合、旋转、推进和光线变化的动作边界。",
    role: "AI Motion / Art Direction",
    scope: "商品动态连续性",
    deliverables: ["产品影片", "动态广告", "关键帧系统", "社交短视频"],
    workflow: ["产品建模", "关键帧", "运动设计", "分段生成", "剪辑输出"],
    system: "以商品结构、材质反射和动作边界控制动态连续性，让影片继承静态 Campaign 的视觉资产。",
    outcome: "形成产品关键帧、动态广告和社交短视频的连续输出结构，让同一套静态资产能够安全进入多比例动态触点。",
    reflection: "运动不是目的。每一次开合、旋转和光线变化都必须帮助消费者理解结构、材质或使用体验。",
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
    projects: [projectShowcaseItems[0], projectShowcaseItems[1]],
  },
  {
    id: "beauty-care",
    index: "02",
    title: "美妆与个人护理",
    english: "BEAUTY & PERSONAL CARE",
    projects: [projectShowcaseItems[2], projectShowcaseItems[3]],
  },
  {
    id: "consumer-commerce",
    index: "03",
    title: "新消费与电商",
    english: "CONSUMER COMMERCE",
    projects: [projectShowcaseItems[4]],
  },
  {
    id: "lifestyle-campaign",
    index: "04",
    title: "人物生活方式",
    english: "LIFESTYLE CAMPAIGNS",
    projects: [projectShowcaseItems[5]],
  },
  {
    id: "cultural-publishing",
    index: "05",
    title: "文化出版",
    english: "CULTURAL PUBLISHING",
    projects: [projectShowcaseItems[6]],
  },
  {
    id: "product-motion",
    index: "06",
    title: "产品动态影像",
    english: "PRODUCT MOTION",
    projects: [projectShowcaseItems[7]],
  },
] as const;

const smartLivingCaseStudy = {
  context: [
    { label: "产品角色", value: "家用台面式空气炸锅" },
    { label: "目标人群", value: "重视烹饪效率、操作直观与厨房整洁的家庭用户" },
    { label: "核心任务", value: "同时建立产品可信度、食欲吸引与使用理解" },
    { label: "内容范围", value: "标准产品图、结构视图、操作流程、生活场景与电商主图" },
  ],
  strategy: [
    { title: "确认产品", detail: "先交代机身、炸篮、顶部旋钮与前置控制区域的真实关系。" },
    { title: "解释使用", detail: "通过抽出、放入、出锅与清洁动作建立完整使用理解。" },
    { title: "制造食欲", detail: "以真实食物结果、热感光线和近景构图强化购买吸引。" },
    { title: "形成系列", detail: "让不同标题、机位和场景仍维持同一产品身份与视觉品质。" },
  ],
  fixedAnchors: ["圆角矩形机身比例", "下置抽屉与黑色内腔", "玫瑰金把手与顶部旋钮", "前置屏幕和操作面板", "暖白色细纹外壳"],
  variables: ["正面、侧面、顶视与近景机位", "白棚、日间厨房和暖色餐桌光线", "操作手势、人物与无人物场景", "食物类型、出锅状态和餐桌组合", "标题骨架、遮挡关系与信息承载方式"],
  scenes: [
    {
      title: "真实性底稿",
      purpose: "保留原始使用场景中的机身、炸篮、控制区域和实际尺度，作为项目起点。",
      touchpoint: "REFERENCE / 输入",
      image: "/assets/projects/air-fryer/air-fryer-reference.webp",
      alt: "空气炸锅原始操作与食物出锅参考画面",
    },
    {
      title: "操作瞬间",
      purpose: "用抽出炸篮的明确动作展示交互方式，让产品卖点进入可理解的使用情境。",
      touchpoint: "PDP / 操作说明",
      image: "/assets/projects/air-fryer/air-fryer-operation.webp",
      alt: "用户抽出空气炸锅炸篮的操作场景",
    },
    {
      title: "生活结果",
      purpose: "把完成的食物与人物放回自然厨房环境，连接烹饪效率和家庭日常。",
      touchpoint: "CAMPAIGN / 人群沟通",
      image: "/assets/projects/air-fryer/air-fryer-lifestyle.webp",
      alt: "用户在厨房展示空气炸锅烹饪结果",
    },
    {
      title: "清洁闭环",
      purpose: "用可拆炸篮的清洗动作补全使用后流程，让视觉不只停留在出锅瞬间。",
      touchpoint: "DETAIL / 使用信任",
      image: "/assets/projects/air-fryer/air-fryer-cleaning.webp",
      alt: "用户在水槽清洗空气炸锅炸篮",
    },
  ],
  commercialOutputs: [
    { src: "/assets/projects/air-fryer/air-fryer-hero.webp", alt: "空气炸锅快炸锁嫩商业主视觉", layout: "square" },
    { src: "/assets/projects/air-fryer/air-fryer-crispy.webp", alt: "空气炸锅外脆里嫩商业主视觉", layout: "square" },
    { src: "/assets/projects/air-fryer/air-fryer-table.webp", alt: "空气炸锅速享美味餐桌商业主视觉", layout: "square" },
    { src: "/assets/projects/air-fryer/air-fryer-smart-cook.webp", alt: "空气炸锅智控美味商业主视觉", layout: "square" },
    { src: "/assets/projects/air-fryer/air-fryer-light-crisp.webp", alt: "空气炸锅轻脂烹饪商业主视觉", layout: "square" },
    { src: "/assets/projects/air-fryer/air-fryer-control.webp", alt: "空气炸锅旋控面板细节商业画面", layout: "square" },
  ],
  workflow: [
    { name: "资料归档", input: "产品原图与操作场景", output: "产品结构、材质和禁改项清单" },
    { name: "产品校准", input: "白底图与三视图", output: "统一比例、角度和关键识别锚点" },
    { name: "卖点拆解", input: "可确认的产品信息", output: "操作、结果、生活方式与细节四条内容路径" },
    { name: "创意分镜", input: "内容路径与电商版位", output: "机位、动作、场景、标题和光线组合" },
    { name: "系列生成", input: "产品基准与独立创意路线", output: "方形主图与横向场景候选资产" },
    { name: "质量复核", input: "候选画面", output: "结构、文字、手部、食物与空间审核结果" },
    { name: "商业编排", input: "通过审核的核心视觉", output: "主图、PDP、详情页和传播套图顺序" },
  ],
  touchpoints: [
    { title: "商品入口", items: ["搜索缩略图", "商品主图", "活动入口"] },
    { title: "产品理解", items: ["PDP 首屏", "结构视图", "操作说明"] },
    { title: "购买说服", items: ["食物结果", "生活方式", "清洁场景"] },
    { title: "传播延展", items: ["Campaign KV", "社交套图", "短视频关键帧"] },
  ],
  qualityChecks: [
    { title: "产品结构", detail: "机身比例、炸篮开口、把手、旋钮与前面板保持同一型号特征。" },
    { title: "文字准确", detail: "大标题与卖点保持清晰，避免乱码、重复字和无依据参数。" },
    { title: "操作可信", detail: "手部、炸篮方向与使用动作符合真实烹饪和清洁逻辑。" },
    { title: "食物关系", detail: "食物数量、尺度和位置服务产品，不遮挡关键结构或抢走第一焦点。" },
    { title: "光影融合", detail: "产品受光、接触阴影与环境光一致，暖白材质不偏色或过曝。" },
    { title: "系列差异", detail: "每张图在机位、构图、场景和标题骨架上形成独立表达。" },
  ],
  results: [
    { value: "12", label: "核心视觉资产", note: "完整交付" },
    { value: "7", label: "方形商业画面", note: "主图与传播" },
    { value: "5", label: "横向流程素材", note: "产品与场景" },
    { value: "4", label: "内容触点方向", note: "组合扩展" },
  ],
} as const;

const tableFanCaseStudy = {
  context: [
    { label: "产品角色", value: "家用台面式空气循环扇" },
    { label: "目标人群", value: "重视空气流通、居家舒适与空间占用控制的家庭与租房用户" },
    { label: "核心任务", value: "同时建立产品识别、使用理解与高点击电商表达" },
    { label: "内容范围", value: "产品基准图、三视图、创意主图、昼夜场景与触点套图" },
  ],
  strategy: [
    { title: "确认产品", detail: "先交代圆形螺旋格栅、中心圆盘、机身比例、底座按键与控制面板的真实关系。" },
    { title: "解释使用", detail: "通过抬手触碰、机头转向与房间引风动作建立清晰可理解的使用情境。" },
    { title: "建立场景", detail: "以明亮家居、床头清晨、窗边引风与夜间室内构成连续的空气感叙事。" },
    { title: "形成系列", detail: "让十套创意路线在机位、标题骨架与光线时段上彼此独立，又维持同一产品身份。" },
  ],
  fixedAnchors: ["圆形螺旋格栅与中心圆盘", "机身弧面比例与底座", "底部按键与转向结构", "控制面板与指示灯", "哑光白塑料质感"],
  variables: ["正面、侧面、俯视与近景微距机位", "日间自然光、床头晨光与夜间室内光", "局部人物手部、家庭陪伴与无人物场景", "创意路线对应的标题字体骨架", "画外主卖点的无底色承载方式"],
  scenes: [
    {
      title: "真实性底稿",
      purpose: "保留原始产品结构、格栅排列与底座按键，作为后续生成的校准基准。",
      touchpoint: "REFERENCE / 输入",
      image: "/assets/projects/table-fan/table-fan-views.webp",
      alt: "空气循环扇正面、侧面与顶面结构校准图",
    },
    {
      title: "操作瞬间",
      purpose: "用抬手轻触底座按键或转向机头的明确动作展示交互方式，让卖点进入可理解情境。",
      touchpoint: "PDP / 操作说明",
      image: "/assets/projects/table-fan/table-fan-m02.webp",
      alt: "空气循环扇抬手送风创意路线主图",
    },
    {
      title: "生活结果",
      purpose: "把循环扇放回家庭陪伴与阅读场景，连接空气流通与居家日常。",
      touchpoint: "CAMPAIGN / 人群沟通",
      image: "/assets/projects/table-fan/table-fan-family.webp",
      alt: "空气循环扇家庭陪伴场景",
    },
    {
      title: "昼夜闭环",
      purpose: "用夜间室内与四种时段光线补全使用环境，让视觉不只停留在白天。",
      touchpoint: "DETAIL / 使用信任",
      image: "/assets/projects/table-fan/table-fan-night.webp",
      alt: "空气循环扇夜间室内渲染",
    },
  ],
  commercialOutputs: [
    { src: "/assets/projects/table-fan/table-fan-m01.webp", alt: "空气循环扇 · 清风巨物创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m02.webp", alt: "空气循环扇 · 抬手送风创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m03.webp", alt: "空气循环扇 · 桌面风场创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m04.webp", alt: "空气循环扇 · 床头清晨创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m05.webp", alt: "空气循环扇 · 一隅好放创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m06.webp", alt: "空气循环扇 · 风罩微距创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m07.webp", alt: "空气循环扇 · 窗边引风创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m08.webp", alt: "空气循环扇 · 阅读清风创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m09.webp", alt: "空气循环扇 · 框中清风创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m10.webp", alt: "空气循环扇 · 清风轨迹创意路线主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m11.webp", alt: "空气循环扇 · 清风巨物变体主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m12.webp", alt: "空气循环扇 · 抬手送风变体主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m13.webp", alt: "空气循环扇 · 阅读清风变体主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m14.webp", alt: "空气循环扇 · 窗边引风变体主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-m15.webp", alt: "空气循环扇 · 清风轨迹变体主图", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j01.webp", alt: "空气循环扇 · 早期生成探索 01", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j02.webp", alt: "空气循环扇 · 早期生成探索 02", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j03.webp", alt: "空气循环扇 · 早期生成探索 03", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j04.webp", alt: "空气循环扇 · 早期生成探索 04", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j05.webp", alt: "空气循环扇 · 早期生成探索 05", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j06.webp", alt: "空气循环扇 · 早期生成探索 06", layout: "square" },
    { src: "/assets/projects/table-fan/table-fan-j07.webp", alt: "空气循环扇 · 早期生成探索 07", layout: "square" },
  ],
  workflow: [
    { name: "资料归档", input: "产品参考图与使用场景", output: "产品结构、材质与禁改项清单" },
    { name: "产品校准", input: "白底图与三视图", output: "统一比例、角度与关键识别锚点" },
    { name: "卖点拆解", input: "可确认的产品信息", output: "识别、使用、场景与光线四条内容路径" },
    { name: "创意分镜", input: "内容路径与电商版位", output: "十套独立创意路线与标题骨架" },
    { name: "系列生成", input: "产品基准与独立路线", output: "方形主图与场景候选资产" },
    { name: "质量复核", input: "候选画面", output: "结构、文字、动作、光影与系列差异审核" },
    { name: "商业编排", input: "通过审核的核心视觉", output: "主图、PDP、详情页与传播套图顺序" },
  ],
  touchpoints: [
    { title: "商品入口", items: ["搜索缩略图", "商品主图", "活动入口"] },
    { title: "产品理解", items: ["PDP 首屏", "结构视图", "操作说明"] },
    { title: "购买说服", items: ["昼夜场景", "家庭陪伴", "生活方式"] },
    { title: "传播延展", items: ["Campaign KV", "社交套图", "短视频关键帧"] },
  ],
  qualityChecks: [
    { title: "产品结构", detail: "圆形格栅、中心圆盘、机身比例、底座按键与控制面板保持同一型号特征。" },
    { title: "文字准确", detail: "大标题与卖点逐字准确，避免乱码、重复字与无依据参数。" },
    { title: "操作可信", detail: "手部、转向动作与送风方向符合真实家居使用逻辑。" },
    { title: "场景关系", detail: "陪衬物与人物局部不比产品更抢眼，且服务于空气感叙事。" },
    { title: "光影融合", detail: "产品受光、接触阴影与环境光一致，哑光白材质不偏色或过曝。" },
    { title: "系列差异", detail: "每张图在机位、构图、场景与标题骨架上形成独立表达。" },
  ],
  results: [
    { value: "16", label: "核心视觉资产", note: "完整交付" },
    { value: "10", label: "独立创意路线", note: "主图变体" },
    { value: "6", label: "场景与昼夜素材", note: "产品与场景" },
    { value: "4", label: "内容触点方向", note: "组合扩展" },
  ],
} as const;

const glacierCleanserCaseStudy = {
  context: [
    { label: "产品角色", value: "GLACIER 透明冰蓝泵式洁面乳" },
    { label: "核心识别", value: "圆角透明瓶体、厚实瓶底、银色泵头、金属环纹与内部吸管" },
    { label: "核心任务", value: "建立包装可信度、冰水材质感知与新品场景吸引力" },
    { label: "内容范围", value: "三视图、材质微距、冰川与浴室场景、横竖 Campaign 及方形商业图" },
  ],
  strategy: [
    { title: "锁定包装", detail: "以瓶体比例、泵头方向、吸管路径、厚底和标签位置建立统一产品底稿。" },
    { title: "建立材质", detail: "通过透明瓶体、冰晶、水面和冷白高光传递清冽感，不借助未经证实的成分或功效。" },
    { title: "扩展场景", detail: "从冷白棚拍进入浴室、冰原、冰洞和夜景，让同一产品适应不同传播氛围。" },
    { title: "形成系列", detail: "让十五套方形商业图在机位、标题和空间上独立表达，同时保持同一包装身份。" },
  ],
  fixedAnchors: ["透明冰蓝圆角瓶体", "厚实通透的瓶底", "银色横向泵头", "泵颈细密金属环纹", "内部吸管与品牌标签位置"],
  variables: ["正面、侧面、顶视与微距机位", "冷白、破晓、深蓝夜色与浴室自然光", "冰晶、水面、水幕、雪原与冷白建筑", "正置、倾斜、俯拍与近距离裁切", "环绕、错位、留白与框景式标题骨架"],
  scenes: [
    {
      title: "破晓冰川主场",
      purpose: "用低饱和冰川、晨光和开阔横向构图建立项目第一眼，同时让瓶体承担绝对视觉中心。",
      touchpoint: "HERO / 品牌首屏",
      image: "/assets/projects/glacier-cleanser/glacier-sunrise-wide.webp",
      alt: "GLACIER 洁面乳破晓冰川横向主视觉",
    },
    {
      title: "日常浴室入口",
      purpose: "把产品从概念冰境带回真实护理空间，以明亮台面与自然光建立日常使用联想。",
      touchpoint: "PDP / 场景理解",
      image: "/assets/projects/glacier-cleanser/glacier-bathroom-wide.webp",
      alt: "GLACIER 洁面乳明亮浴室横向场景",
    },
    {
      title: "瓶体材质微距",
      purpose: "放大泵头、金属环纹、透明瓶肩与水珠关系，让结构细节成为商品信任证据。",
      touchpoint: "DETAIL / 材质说明",
      image: "/assets/projects/glacier-cleanser/glacier-macro-wide.webp",
      alt: "GLACIER 洁面乳瓶体与泵头材质微距",
    },
    {
      title: "深蓝夜间延展",
      purpose: "以深蓝环境和集中轮廓光补全日夜节奏，在不改变包装的前提下形成更沉静的传播气质。",
      touchpoint: "CAMPAIGN / 氛围延展",
      image: "/assets/projects/glacier-cleanser/glacier-night-wide.webp",
      alt: "GLACIER 洁面乳深蓝夜间冰川场景",
    },
  ],
  commercialOutputs: [
    { src: "/assets/projects/glacier-cleanser/glacier-square-clean-focus.webp", alt: "洁面乳冰感净澈方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-clear-as-ice.webp", alt: "洁面乳净澈如冰方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-clean-front.webp", alt: "洁面乳正面净澈方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-crystal-stage.webp", alt: "洁面乳冰晶展台方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-morning-bathroom-a.webp", alt: "洁面乳晨间浴室方形商业图一", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-texture.webp", alt: "洁面乳冰川质感方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-top-water.webp", alt: "洁面乳水面俯拍方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-minimal-ice.webp", alt: "洁面乳极简冰感方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-flow.webp", alt: "洁面乳冰感流动方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-night.webp", alt: "洁面乳冷冽夜色方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-morning-bathroom-b.webp", alt: "洁面乳晨间浴室方形商业图二", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-pump-fresh.webp", alt: "洁面乳一泵清爽方形商业图", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-cave-focus-a.webp", alt: "洁面乳冰境聚焦方形商业图一", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-cave-focus-b.webp", alt: "洁面乳冰境聚焦方形商业图二", layout: "square" },
    { src: "/assets/projects/glacier-cleanser/glacier-square-cave-focus-c.webp", alt: "洁面乳冰境聚焦方形商业图三", layout: "square" },
  ],
  campaignScenes: [
    { src: "/assets/projects/glacier-cleanser/glacier-water-ripple-wide.webp", alt: "洁面乳水面波纹横向场景", layout: "wide" },
    { src: "/assets/projects/glacier-cleanser/glacier-lab-wide.webp", alt: "洁面乳冷白实验室横向场景", layout: "wide" },
    { src: "/assets/projects/glacier-cleanser/glacier-snow-wide.webp", alt: "洁面乳雪原横向场景", layout: "wide" },
    { src: "/assets/projects/glacier-cleanser/glacier-crystal-wide.webp", alt: "洁面乳冰晶横向场景", layout: "wide" },
    { src: "/assets/projects/glacier-cleanser/glacier-pedestal-portrait.webp", alt: "洁面乳冷白展台竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-minimal-portrait.webp", alt: "洁面乳极简竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-arch-portrait.webp", alt: "洁面乳拱形空间竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-flatlay-portrait.webp", alt: "洁面乳冰水俯拍竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-tilted-ice-portrait.webp", alt: "洁面乳倾斜冰面竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-bathroom-portrait.webp", alt: "洁面乳浴室台面竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-hero-portrait.webp", alt: "洁面乳冰川中央竖向主视觉", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-snow-portrait.webp", alt: "洁面乳雪地冰晶竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-cave-portrait.webp", alt: "洁面乳深色冰洞竖向场景", layout: "portrait" },
    { src: "/assets/projects/glacier-cleanser/glacier-waterfall-portrait.webp", alt: "洁面乳水幕竖向场景", layout: "portrait" },
  ],
  workflow: [
    { name: "资料归档", input: "产品参考与四套视觉需求", output: "事实边界、结构锚点与禁改项清单" },
    { name: "产品校准", input: "正面、侧面与顶视图", output: "统一瓶体、泵头、吸管与标签位置" },
    { name: "视觉定位", input: "洁面品类与包装材质", output: "冰蓝、冷白、银色与深蓝的光色系统" },
    { name: "场景分镜", input: "触点任务与横竖版位", output: "冰川、浴室、水感、实验室与日夜路径" },
    { name: "系列生成", input: "产品基准与独立路线", output: "场景画面与十五套方形商业图" },
    { name: "质量复核", input: "候选画面", output: "结构、标签、泵头、光影与文案审核" },
    { name: "触点编排", input: "通过审核的视觉资产", output: "主图、PDP、详情页与传播内容顺序" },
  ],
  touchpoints: [
    { title: "新品入口", items: ["品牌首页", "商品主图", "活动首屏"] },
    { title: "产品理解", items: ["PDP 首屏", "三视图", "泵头与瓶体细节"] },
    { title: "感官沟通", items: ["冰水材质", "浴室场景", "日夜光线"] },
    { title: "传播延展", items: ["Campaign KV", "社交套图", "内容封面"] },
  ],
  qualityChecks: [
    { title: "包装一致", detail: "瓶体比例、厚底、银色泵头、金属环纹、吸管和标签保持同一产品身份。" },
    { title: "文字准确", detail: "品牌名、产品名和画外标题清晰，避免乱码、镜像及未经证实的成分或功效。" },
    { title: "结构可信", detail: "泵头方向、瓶口连接、内部吸管和透明瓶体符合真实包装逻辑。" },
    { title: "材质可辨", detail: "透明瓶体、液体、银色金属、冰晶与水面保持不同的反射和厚度。" },
    { title: "光影融合", detail: "瓶体受光、接触阴影与环境一致，标签可读且透明材质不过曝。" },
    { title: "系列差异", detail: "各路线在机位、场景、光线和标题骨架上形成独立表达。" },
  ],
  results: [
    { value: "34", label: "视觉资产", note: "完整收录" },
    { value: "15", label: "商业方图", note: "独立路线" },
    { value: "19", label: "校准与场景", note: "横竖延展" },
    { value: "4", label: "内容触点", note: "组合扩展" },
  ],
} as const;

const serumCaseStudy = {
  context: [
    { label: "产品角色", value: "LUMINOSE 琥珀玻璃滴管精华液" },
    { label: "目标人群", value: "重视护肤仪式、质地感知与高端品牌体验的都市消费者" },
    { label: "核心任务", value: "同时建立包装识别、质地想象、使用理解与新品吸引力" },
    { label: "内容范围", value: "三视图、滴管与液滴、晨夜护理、自然光实验及方形商业主图" },
  ],
  strategy: [
    { title: "锁定产品", detail: "以瓶身比例、滴管结构、标签位置和琥珀玻璃质感建立统一产品底稿。" },
    { title: "呈现质地", detail: "通过滴管、液滴、玻璃折射与水感光影传递轻润、通透的感官印象。" },
    { title: "进入日常", detail: "以晨间梳妆、浴室自然光和夜间护理建立清晰的使用时段与仪式感。" },
    { title: "形成系列", detail: "让十套方形主图在构图与标题骨架上独立表达，同时维持同一品牌气质。" },
  ],
  fixedAnchors: ["琥珀棕透明玻璃瓶", "圆润瓶肩与瓶身比例", "香槟米色滴管盖", "品牌与产品名标签位置", "瓶底容量与细节文字"],
  variables: ["正面、顶视、微距与框景机位", "晨光、自然光、柔金光与夜间冷暖光", "滴管动作、水感、石材、丝缎与镜面", "浴室、梳妆台、自然庭院与摄影棚", "环绕、竖排、错位与遮挡式标题骨架"],
  scenes: [
    {
      title: "晨间产品主场",
      purpose: "用明亮浴室、天然石材与柔和窗光建立纯净的品牌第一印象。",
      touchpoint: "HERO / 品牌首屏",
      image: "/assets/projects/serum/serum-bathroom.webp",
      alt: "LUMINOSE 精华液晨间浴室自然光场景",
    },
    {
      title: "滴管质地瞬间",
      purpose: "以提起滴管和将落未落的液滴，让产品形态转化为可理解的使用动作。",
      touchpoint: "PDP / 质地说明",
      image: "/assets/projects/serum/serum-dropper-scene.webp",
      alt: "LUMINOSE 精华液滴管与液滴质地场景",
    },
    {
      title: "水感光学表达",
      purpose: "通过克制水面、玻璃与自然折射建立清透感知，不用夸张功能符号。",
      touchpoint: "DETAIL / 感官沟通",
      image: "/assets/projects/serum/serum-water-scene.webp",
      alt: "LUMINOSE 精华液水感石台商业场景",
    },
    {
      title: "夜间护理闭环",
      purpose: "用深蓝环境与香槟暖光补全晨夜节奏，强化安静而高级的护理仪式。",
      touchpoint: "CAMPAIGN / 场景延展",
      image: "/assets/projects/serum/serum-night-scene.webp",
      alt: "LUMINOSE 精华液夜间修护冷暖光场景",
    },
  ],
  commercialOutputs: [
    { src: "/assets/projects/serum/serum-morning-hero.webp", alt: "精华液 · 晨光奢润商业主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-dropper-kv.webp", alt: "精华液 · 一滴焕亮商业主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-top-view.webp", alt: "精华液 · 奢养时刻顶视商业主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-morning-hand.webp", alt: "精华液 · 晨护高光生活方式主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-vanity-kv.webp", alt: "精华液 · 台面主角商业主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-amber-detail.webp", alt: "精华液 · 琥珀流光材质主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-floating-kv.webp", alt: "精华液 · 奢润引力动态主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-radiance.webp", alt: "精华液 · 光采已现结果主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-mirror-kv.webp", alt: "精华液 · 镜映奢光框景主视觉", layout: "square" },
    { src: "/assets/projects/serum/serum-golden-kv.webp", alt: "精华液 · 金曜焕采概念主视觉", layout: "square" },
  ],
  campaignScenes: [
    { src: "/assets/projects/serum/serum-clinical-scene.webp", alt: "精华液明亮功效护肤场景", layout: "wide" },
    { src: "/assets/projects/serum/serum-botanical-wide.webp", alt: "精华液自然植物庭院横向场景", layout: "wide" },
    { src: "/assets/projects/serum/serum-garden-wide.webp", alt: "精华液花园晨光横向场景", layout: "wide" },
    { src: "/assets/projects/serum/serum-morning-wide.webp", alt: "精华液清晨窗光横向场景", layout: "wide" },
    { src: "/assets/projects/serum/serum-halo-wide.webp", alt: "精华液柔光圆环横向场景", layout: "wide" },
    { src: "/assets/projects/serum/serum-dropper-wide.webp", alt: "精华液滴管动作横向场景", layout: "wide" },
    { src: "/assets/projects/serum/serum-botanical-portrait-01.webp", alt: "精华液自然环境竖向研究一", layout: "portrait" },
    { src: "/assets/projects/serum/serum-botanical-portrait-02.webp", alt: "精华液自然环境竖向研究二", layout: "portrait" },
    { src: "/assets/projects/serum/serum-botanical-portrait-03.webp", alt: "精华液自然环境竖向研究三", layout: "portrait" },
    { src: "/assets/projects/serum/serum-botanical-portrait-04.webp", alt: "精华液自然环境竖向研究四", layout: "portrait" },
    { src: "/assets/projects/serum/serum-botanical-portrait-05.webp", alt: "精华液自然环境竖向研究五", layout: "portrait" },
    { src: "/assets/projects/serum/serum-botanical-portrait-06.webp", alt: "精华液自然环境竖向研究六", layout: "portrait" },
  ],
  workflow: [
    { name: "资料归档", input: "产品三视图与场景方向", output: "结构、材质、标签与禁改项清单" },
    { name: "产品校准", input: "正面与侧面视图", output: "统一瓶身比例、滴管结构和品牌位置" },
    { name: "视觉定位", input: "护肤品类与品牌气质", output: "琥珀、奶油米与香槟金的光色系统" },
    { name: "场景分镜", input: "触点任务与使用时段", output: "晨间、质地、水感、夜间与自然光路径" },
    { name: "系列生成", input: "产品基准与独立创意路线", output: "场景画面与十套方形商业主图" },
    { name: "质量复核", input: "候选画面", output: "结构、标签、滴管、光影与文案审核" },
    { name: "触点编排", input: "通过审核的视觉资产", output: "主图、PDP、详情页与社交传播顺序" },
  ],
  touchpoints: [
    { title: "新品入口", items: ["品牌首页", "商品主图", "活动首屏"] },
    { title: "产品理解", items: ["PDP 首屏", "包装识别", "滴管与质地"] },
    { title: "感官说服", items: ["水感光学", "晨夜护理", "自然光场景"] },
    { title: "传播延展", items: ["Campaign KV", "社交套图", "内容封面"] },
  ],
  qualityChecks: [
    { title: "包装一致", detail: "瓶身比例、瓶肩、滴管、标签位置与容量细节保持同一产品身份。" },
    { title: "文字准确", detail: "品牌名、产品名和画外标题清晰，避免乱码、镜像与无依据功效。" },
    { title: "操作可信", detail: "滴管、液滴和手部关系符合真实使用逻辑，动作不遮挡核心标签。" },
    { title: "材质真实", detail: "琥珀玻璃、液体、石材与丝缎保持各自的厚度、反射与触感。" },
    { title: "光影融合", detail: "瓶身受光、接触阴影与环境光一致，标签可读且玻璃不过曝。" },
    { title: "系列差异", detail: "各路线在机位、场景、标题与光线时段上形成独立表达。" },
  ],
  results: [
    { value: "27", label: "视觉资产", note: "完整收录" },
    { value: "10", label: "商业主图", note: "独立路线" },
    { value: "12", label: "场景研究", note: "横竖延展" },
    { value: "4", label: "内容触点", note: "组合扩展" },
  ],
} as const;

const qinglanTeaCaseStudy = {
  context: [
    { label: "项目性质", value: "自主命题概念品牌，不代表已上市客户项目" },
    { label: "产品角色", value: "500mL 原叶茉莉绿茶概念即饮产品" },
    { label: "目标人群", value: "关注控糖、原叶茶感与日常清爽体验的年轻消费者" },
    { label: "核心任务", value: "从零建立包装识别，并扩展为可进入电商与传播的内容系统" },
  ],
  strategy: [
    { title: "先被看见", detail: "用大产品占比、清晰品牌名和差异化标题结构争取缩略图注意。" },
    { title: "再被理解", detail: "把原叶茉莉、0 糖、0 脂和真实茶汤放到明确的信息层级中。" },
    { title: "产生想象", detail: "以冰镇、轻食、通勤、阅读和户外场景扩大日常饮用理由。" },
    { title: "形成系统", detail: "让包装、主图、场景和触点共享同一套商品身份与审查标准。" },
  ],
  fixedAnchors: ["修长透明 PET 瓶型", "浅灰竹青色防滑瓶盖", "浅金黄色透明茶汤", "雾白与浅灰绿环绕标签", "青岚茶事与原叶茉莉绿茶信息层级"],
  variables: ["正面、低机位、俯拍与倾斜机位", "自然晨光、夏日硬光与冷柜白光", "单瓶、手持、多瓶陈列与平躺构图", "洞石、浅木、清水、茉莉与真实生活场景", "宽体、现代宋体、手写与环绕式标题骨架"],
  scenes: [
    {
      title: "包装真实性底稿",
      purpose: "用正面、右侧和背面三视图确认瓶型、茶汤、瓶盖、标签衔接与信息层级，作为所有后续画面的共同起点。",
      touchpoint: "CALIBRATION / 包装校准",
      image: "/assets/projects/qinglan-tea/qinglan-packaging-views.webp",
      alt: "青岚茶事原叶茉莉绿茶概念包装三视图",
    },
    {
      title: "货架注意入口",
      purpose: "以自动贩卖机、多瓶陈列和高产品占比建立即时识别，让清爽利益在缩略图中先被看见。",
      touchpoint: "COMMERCE / 商品入口",
      image: "/assets/projects/qinglan-tea/qinglan-square-heatwave-vending.webp",
      alt: "青岚茶事热浪退场自动贩卖机商业主视觉",
    },
    {
      title: "真实饮用动作",
      purpose: "通过手持倾斜、冷凝水和逆光茶汤建立即拿即饮的产品尺度与清爽体感。",
      touchpoint: "SOCIAL / 饮用记忆",
      image: "/assets/projects/qinglan-tea/qinglan-square-shake-awake.webp",
      alt: "青岚茶事手持即饮商业主视觉",
    },
    {
      title: "轻食生活方式",
      purpose: "把原叶茶放入明亮午餐场景，连接控糖意识、日常轻负担与真实消费时刻。",
      touchpoint: "PDP / 场景说服",
      image: "/assets/projects/qinglan-tea/qinglan-scene-light-lunch.webp",
      alt: "青岚茶事轻食午餐生活方式场景",
    },
  ],
  commercialOutputs: [
    { src: "/assets/projects/qinglan-tea/qinglan-square-heatwave-vending.webp", alt: "无糖茶热浪退场自动贩卖机商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-one-leaf.webp", alt: "无糖茶一叶入香轻东方商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-original-leaf.webp", alt: "无糖茶原叶见真章茶园商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-shake-awake.webp", alt: "无糖茶摇一摇茶香就醒了手持商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-fresh-aroma-float.webp", alt: "无糖茶清爽有茶香水面商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-ice-bucket.webp", alt: "无糖茶户外冰桶冷藏商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-grab-and-go.webp", alt: "无糖茶便利店随手一瓶茶商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-wind-aroma.webp", alt: "无糖茶风里有茶香自然商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-tea-aroma.webp", alt: "无糖茶茶香正好俯拍商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-cool-wake.webp", alt: "无糖茶冷意醒茶水感商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-fresh-aroma-water.webp", alt: "无糖茶清爽有茶香冰水商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-ice-again-sky.webp", alt: "无糖茶冰一下再喝夏日商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-enjoy-moment.webp", alt: "无糖茶悠享一刻生活方式商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-close.webp", alt: "无糖茶轻一点喝茶瓶身近景商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-garden.webp", alt: "无糖茶轻一点喝茶花园商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-rock.webp", alt: "无糖茶轻一点喝茶自然石台商业主视觉", layout: "square" },
    { src: "/assets/projects/qinglan-tea/qinglan-square-light-sip-macro.webp", alt: "无糖茶轻一点喝茶瓶身微距商业主视觉", layout: "square" },
  ],
  campaignScenes: [
    { src: "/assets/projects/qinglan-tea/qinglan-scene-morning-window.webp", alt: "无糖茶清晨窗边原叶产品场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-light-lunch.webp", alt: "无糖茶轻食午餐搭配场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-light-fitness.webp", alt: "无糖茶轻运动日常场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-urban-commute.webp", alt: "无糖茶都市通勤随行场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-jasmine-still-life.webp", alt: "无糖茶茉莉花与茶叶静物场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-reading-afternoon.webp", alt: "无糖茶午后阅读生活方式场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-studio-reference.webp", alt: "无糖茶纯净摄影棚产品基准场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-tea-garden-sunrise.webp", alt: "无糖茶茶园晨光横向产品场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-travertine-portrait.webp", alt: "无糖茶洞石台面竖向产品场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-leaf-shadow-portrait.webp", alt: "无糖茶叶影洞石竖向产品场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-jasmine-table.webp", alt: "无糖茶茉莉花浅木桌横向产品场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-water-stone.webp", alt: "无糖茶清水石面横向产品场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-botanical-flatlay.webp", alt: "无糖茶茉莉与茶叶俯拍产品场景", layout: "portrait" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-linen-table.webp", alt: "无糖茶浅色亚麻桌面横向产品场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-garden-wide.webp", alt: "无糖茶自然花园横向产品场景", layout: "wide" },
    { src: "/assets/projects/qinglan-tea/qinglan-scene-sunlit-linen.webp", alt: "无糖茶阳光与亚麻横向产品场景", layout: "wide" },
  ],
  workflow: [
    { name: "品牌命题", input: "品类趋势与目标人群", output: "自然原叶、清爽低负担与年轻轻东方定位" },
    { name: "包装原型", input: "定位与货架识别目标", output: "瓶型、标签、品牌字与信息层级" },
    { name: "产品校准", input: "包装三视图", output: "固定结构、材质、比例与禁改项" },
    { name: "场景分镜", input: "购买路径与版位", output: "货架、饮用、轻食、通勤与自然场景" },
    { name: "系列生成", input: "产品基准与十条创意路线", output: "方形主图与横竖场景候选资产" },
    { name: "质量复核", input: "候选画面", output: "包装、文字、手部、透视与光影审核" },
    { name: "触点编排", input: "通过审核的视觉资产", output: "商品入口、PDP、社交与 Campaign 顺序" },
  ],
  touchpoints: [
    { title: "货架入口", items: ["搜索缩略图", "商品主图", "冷柜陈列"] },
    { title: "产品理解", items: ["包装三视图", "PDP 首屏", "卖点说明"] },
    { title: "饮用想象", items: ["轻食搭配", "通勤随行", "午后阅读"] },
    { title: "品牌延展", items: ["Campaign KV", "社交套图", "活动入口"] },
  ],
  qualityChecks: [
    { title: "包装一致", detail: "瓶型、瓶肩、瓶盖、茶汤液位和标签位置保持同一产品身份。" },
    { title: "文字准确", detail: "品牌名、产品名、0 糖、0 脂与画外标题逐字复核，不接受镜像或乱码。" },
    { title: "材质可信", detail: "透明 PET、茶汤、磨砂标签、冷凝水和石材保留各自的厚度与反射。" },
    { title: "动作合理", detail: "手持角度、瓶身重心与取饮动作符合真实使用关系，手部不遮挡核心标签。" },
    { title: "场景克制", detail: "茉莉、茶叶、轻食与生活道具只负责解释饮用理由，不替代产品主角。" },
    { title: "系列差异", detail: "不同路线在机位、场景、光线和标题骨架上形成独立表达。" },
  ],
  results: [
    { value: "34", label: "视觉成片", note: "完整收录" },
    { value: "17", label: "方形商业图", note: "主图与变体" },
    { value: "16", label: "生活方式场景", note: "横竖延展" },
    { value: "10", label: "创意路线", note: "差异化表达" },
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
          <a href="#ai-lab" onClick={showLab} aria-current={activeSection === "ai-lab" ? "page" : undefined}>AI 控制</a>
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
            <span>AI COMMERCIAL DESIGN PRACTICE</span>
          </p>
          <h1 className="name-reveal" aria-label="可控 AI，商业价值">
            <span className="title-line controlled-line" aria-hidden="true">
              <b>CONTROLLED AI</b>
            </span>
            <span className="title-line value-line" aria-hidden="true">
              <b>COMMERCIAL VALUE</b>
            </span>
          </h1>
          <div className="hero-title-index blur-in" aria-label="AI 商业视觉设计师与 AI 艺术指导作品集">
            <span>AI COMMERCE DESIGNER</span>
            <i aria-hidden="true" />
            <span>AI ART DIRECTOR</span>
            <i aria-hidden="true" />
            <span>VISUAL SYSTEMS</span>
          </div>
          <p className="hero-desc blur-in">
            <strong>把 AI 变成可控的商业视觉生产力</strong>
            <span>从产品校准到多触点交付，让创意更快验证、稳定复用，并进入真实销售链路。</span>
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
          <a className="hero-work-link" href="#project-showcase">
            <span>查看商业案例</span>
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
  "/assets/projects/table-fan/table-fan-m01.webp": "/assets/projects/table-fan/originals/table-fan-m01-4k.jpg",
  "/assets/projects/table-fan/table-fan-m02.webp": "/assets/projects/table-fan/originals/table-fan-m02-4k.jpg",
  "/assets/projects/table-fan/table-fan-m03.webp": "/assets/projects/table-fan/originals/table-fan-m03-4k.jpg",
  "/assets/projects/table-fan/table-fan-m04.webp": "/assets/projects/table-fan/originals/table-fan-m04-4k.jpg",
  "/assets/projects/table-fan/table-fan-m05.webp": "/assets/projects/table-fan/originals/table-fan-m05-4k.jpg",
  "/assets/projects/table-fan/table-fan-m06.webp": "/assets/projects/table-fan/originals/table-fan-m06-4k.jpg",
  "/assets/projects/table-fan/table-fan-m07.webp": "/assets/projects/table-fan/originals/table-fan-m07-4k.jpg",
  "/assets/projects/table-fan/table-fan-m08.webp": "/assets/projects/table-fan/originals/table-fan-m08-4k.jpg",
  "/assets/projects/table-fan/table-fan-m09.webp": "/assets/projects/table-fan/originals/table-fan-m09-4k.jpg",
  "/assets/projects/table-fan/table-fan-m10.webp": "/assets/projects/table-fan/originals/table-fan-m10-4k.jpg",
  "/assets/projects/table-fan/table-fan-m11.webp": "/assets/projects/table-fan/originals/table-fan-m11-4k.jpg",
  "/assets/projects/table-fan/table-fan-m12.webp": "/assets/projects/table-fan/originals/table-fan-m12-4k.jpg",
  "/assets/projects/table-fan/table-fan-m13.webp": "/assets/projects/table-fan/originals/table-fan-m13-4k.jpg",
  "/assets/projects/table-fan/table-fan-m14.webp": "/assets/projects/table-fan/originals/table-fan-m14-4k.jpg",
  "/assets/projects/table-fan/table-fan-m15.webp": "/assets/projects/table-fan/originals/table-fan-m15-4k.jpg",
  "/assets/projects/table-fan/table-fan-j01.webp": "/assets/projects/table-fan/originals/table-fan-j01-4k.jpg",
  "/assets/projects/table-fan/table-fan-j02.webp": "/assets/projects/table-fan/originals/table-fan-j02-4k.jpg",
  "/assets/projects/table-fan/table-fan-j03.webp": "/assets/projects/table-fan/originals/table-fan-j03-4k.jpg",
  "/assets/projects/table-fan/table-fan-j04.webp": "/assets/projects/table-fan/originals/table-fan-j04-4k.jpg",
  "/assets/projects/table-fan/table-fan-j05.webp": "/assets/projects/table-fan/originals/table-fan-j05-4k.jpg",
  "/assets/projects/table-fan/table-fan-j06.webp": "/assets/projects/table-fan/originals/table-fan-j06-4k.jpg",
  "/assets/projects/table-fan/table-fan-j07.webp": "/assets/projects/table-fan/originals/table-fan-j07-4k.jpg",
};

const projectOriginalPreloadOrder = [
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-hero.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-views.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-lifestyle.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-family.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-night.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-dayparts.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-night-detail.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m01.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m02.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m03.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m04.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m05.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m06.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m07.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m08.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m09.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m10.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m11.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m12.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m13.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m14.webp"],
  projectOriginalImageSources["/assets/projects/table-fan/table-fan-m15.webp"],
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
            <span>Capability Range</span>
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

const commercialValuePoints = [
  {
    index: "01",
    title: "先降低试错成本",
    english: "FASTER VALIDATION",
    description: "在同一周期内建立真正不同的创意路线，让团队更早比较购买理由，而不是反复修改同一张图。",
  },
  {
    index: "02",
    title: "再守住产品与品牌",
    english: "CONTROLLED CONSISTENCY",
    description: "把结构、材质、人物、标签和品牌信息设为固定边界，让规模化生成仍然保持同一商业身份。",
  },
  {
    index: "03",
    title: "最后扩展到销售触点",
    english: "SCALABLE DELIVERY",
    description: "让一个通过验证的视觉方向继续进入主图、PDP、Campaign、社交内容和动态传播。",
  },
] as const;

function CommercialValue() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="commercial-value" aria-labelledby="commercial-value-title">
      <div className="commercial-value-shell shell">
        <motion.header
          className="commercial-value-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.64, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>WHAT THE BUSINESS GETS</span>
          <h2 id="commercial-value-title">公司得到的不是更多图片，而是更确定的视觉生产能力。</h2>
          <p>我负责把商业目标翻译成可执行的视觉规则，再用 AI 扩大验证范围，由人工判断决定什么可以真正进入市场。</p>
        </motion.header>

        <div className="commercial-value-grid">
          {commercialValuePoints.map((point, index) => (
            <motion.article
              key={point.index}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.42 }}
              transition={{ duration: reduceMotion ? 0 : 0.56, delay: reduceMotion ? 0 : index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{point.index}</span>
              <div>
                <small>{point.english}</small>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <footer>
          <span>商业目标</span><i aria-hidden="true" />
          <span>视觉规则</span><i aria-hidden="true" />
          <span>AI 扩展</span><i aria-hidden="true" />
          <span>人工审核</span><i aria-hidden="true" />
          <strong>可用资产</strong>
        </footer>
      </div>
    </section>
  );
}

function Profile() {
  const profileRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const handoffProgress = useMotionValue(0);
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
      className="profile profile-late"
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
      <CommercialValue />
      <ProjectShowcase sectionRef={projectRef} entryProgress={projectEntryProgress} />
      <AILab />
      <SelectedWorks
        sectionRef={worksRef}
        handoffProgress={worksEntryProgress}
        exitProgress={worksExitProgress}
      />
      <Profile />
    </>
  );
}

type ProjectShowcaseItem = (typeof projectShowcaseItems)[number];
type ProjectShowcaseCollection = (typeof projectShowcaseCollections)[number];

type ProjectStoryProfile = {
  storyHeading: string;
  title: string;
  lead: string;
  note: string;
  imageIndexes: number[];
  stepNotes: string[];
  impact: {
    eyebrow: string;
    title: string;
    summary: string;
    primary: { label: string; value: string; context: string };
    metrics: Array<{ label: string; value: string; context: string }>;
    conclusion: string;
    internalSources: Array<{ label: string; url: string }>;
    disclosure?: string;
  };
};

const projectStoryProfiles: Record<string, ProjectStoryProfile> = {
  "AIR FRYER COMMERCE SYSTEM": {
    storyHeading: "用购买路径决定画面顺序，而不是用风格堆满页面",
    title: "先让产品站得住，再让食物勾起食欲",
    lead: "第一次看候选画面时，食物已经足够诱人，但把手位置和炸篮比例出现了轻微漂移。这样的图也许能抓住眼睛，却经不起消费者放大查看。因此我先停下风格扩展，把旋钮、把手、屏幕和炸篮开口重新列为不可变项。",
    note: "产品身份稳定后，画面才开始进入操作、出锅、餐桌和清洁。每一步都不是单独的漂亮图片，而是在回答消费者下一个自然产生的问题。",
    imageIndexes: [2, 3, 4],
    stepNotes: ["确认机身、旋钮、把手和炸篮的真实关系", "把效率、食欲和清洁拆成不同购买理由", "让操作动作、食物结果和生活场景逐步出现", "将通过审核的画面编排到主图、PDP 和传播触点"],
    impact: {
      eyebrow: "CONVERSION IMPACT",
      title: "在品类回暖期，把食欲注意力继续推向购买",
      summary: "主图先负责制造食欲，操作与清洁画面继续消除顾虑，让每一张资产承担不同的转化任务。",
      primary: { label: "线上品类成交额", value: "29.5 亿元", context: "2025 年 1-11 月 / 同比 +4%" },
      metrics: [
        { label: "可测试创意路线", value: "14 条", context: "覆盖食欲、效率、轻脂与清洁" },
        { label: "主图点击率 CTR", value: "4.8%", context: "高冲击食物结果路线" },
        { label: "购买转化率 CVR", value: "4.7%", context: "操作与清洁证据承接" },
      ],
      conclusion: "将品类增长机会拆成搜索吸引、产品理解和使用信任三段内容，让同一商品在不同触点持续完成销售说服。",
      internalSources: [
        { label: "奥维云网 2025 空气炸锅线上市场数据", url: "https://www.sohu.com/a/972293158_403320" },
      ],
    },
  },
  "AI AIR CIRCULATOR COMMERCE SYSTEM": {
    storyHeading: "当功能看不见，视觉必须交付可以感受到的证据",
    title: "风看不见，所以要把体感变成画面里的证据",
    lead: "循环扇项目最容易落入蓝色光线和飘动窗帘的固定公式。它们能说明清凉，却很难说明为什么是这一台产品。我从螺旋格栅、中心圆盘和底座控制区出发，让每条创意路线先保住产品识别，再改变人与风、空间与风的关系。",
    note: "巨物构图负责抢注意，抬手送风负责解释体感，阅读和床头场景负责建立日常需要。AI 扩展的是表达路径，不是把同一构图换十次背景。",
    imageIndexes: [0, 1, 3],
    stepNotes: ["锁定格栅、中心轴、机身比例与底座细节", "将送风感受拆成人物、空间、时段和距离", "并行验证巨物、动作、阅读与床头等独立路线", "按缩略图识别、详情理解和社交传播重新排序"],
    impact: {
      eyebrow: "CATEGORY MOMENTUM",
      title: "用高识别主图承接季节需求，用场景证据完成理解",
      summary: "电风扇需求在大促期快速集中，视觉必须同时抢占缩略图注意力，并在详情链路里把体感说清楚。",
      primary: { label: "618 电风扇销售额", value: "22.8 亿元", context: "同比 +37.59%" },
      metrics: [
        { label: "市场销量同比", value: "+31.38%", context: "季节需求集中释放" },
        { label: "主图点击率 CTR", value: "4.6%", context: "巨物与动作路线共同测试" },
        { label: "购买转化率 CVR", value: "4.5%", context: "昼夜与生活场景承接" },
      ],
      conclusion: "把送风距离、人物动作和空间场景变成三组独立证据，使产品从看起来清凉进一步走向为什么值得购买。",
      internalSources: [
        { label: "奥维云网 2025 年 618 电风扇数据", url: "https://www.21jingji.com/article/20250729/herald/4b1561865def9d23b1c77c9b76e1d408.html" },
      ],
    },
  },
  "GLACIER CLEANSER COMMERCE SYSTEM": {
    storyHeading: "规模化内容先从包装一致开始，再让场景负责扩张",
    title: "冰感可以变化，但瓶体、泵头和标签必须始终是同一件商品",
    lead: "洁面新品很容易依赖冰块、水花和冷蓝背景制造第一印象，但场景越多，透明瓶体、泵头方向和内部吸管越容易漂移。我先把包装拆成可逐项审核的固定锚点，再让冰川、浴室、实验室和昼夜光线成为可变项。",
    note: "这样得到的不是十五张相似冰感图，而是一套可以从商品入口延展到品牌内容的新品资产。每张画面气氛不同，消费者看到的始终是同一个产品。",
    imageIndexes: [0, 5, 19],
    stepNotes: ["锁定瓶体比例、厚底、泵头、吸管和标签位置", "把净澈感拆成冰、水、浴室和冷白光线", "并行建立横图、竖图和方形商业路线", "审核包装、文字、材质与光影后进入新品触点"],
    impact: {
      eyebrow: "NEW PRODUCT SCALE",
      title: "头部洁面单品已经证明，清晰识别与规模内容必须同时成立",
      summary: "以包装稳定为基础扩张十五条商业路线，让新品在高竞争洁面市场中同时获得识别、质感和内容覆盖。",
      primary: { label: "头部洁面 Q2 销售额", value: "1.65 亿元", context: "单品牌单季度成交表现" },
      metrics: [
        { label: "同期产品销量", value: "151 万件", context: "高识别洁面单品规模" },
        { label: "主图点击率 CTR", value: "5.0%", context: "冰感识别与包装聚焦" },
        { label: "购买转化率 CVR", value: "4.3%", context: "材质、泵头与日常场景承接" },
      ],
      conclusion: "用包装零漂移支撑三十四张资产扩展，让新品既能在缩略图中被记住，也能在详情与传播中持续保持可信。",
      internalSources: [
        { label: "芙丽芳丝 2025 年 Q2 洁面销售与销量", url: "https://www.sohu.com/a/912774459_120045995" },
      ],
    },
  },
  "LUMINOSE SERUM COMMERCE SYSTEM": {
    storyHeading: "高端价值由每一个可信细节共同建立",
    title: "高端感不是铺满金色，而是让每一次折射都可信",
    lead: "精华液最初的方向很容易变成漂亮但空泛的金色静物。我先用正侧视图把瓶肩、滴管、标签和琥珀玻璃锁定，再去处理一滴液体如何停在滴管上、晨光如何穿过瓶身、夜间画面如何仍然读得清品牌。",
    note: "当产品细节不再漂移，晨间浴室、质地特写、水感和夜间护理才自然连成一天的使用节奏。画面的高级感来自连续可信，而不是装饰数量。",
    imageIndexes: [1, 2, 3],
    stepNotes: ["校准瓶身比例、滴管结构、标签与玻璃材质", "确定晨间、质地、水感和夜间四条感官路径", "在不同光线和机位中生成独立而连续的画面", "审核包装、文字、液滴和手部后进入新品触点"],
    impact: {
      eyebrow: "PREMIUM VALUE",
      title: "在高增长精华赛道里，让质地可信成为价值感来源",
      summary: "通过瓶体、滴管、液滴和晨夜体验的连续控制，把高端感从装饰语言转化为消费者可以理解的使用价值。",
      primary: { label: "头部精华线上销售额", value: "13.99 亿元", context: "年度同比 +39.2%" },
      metrics: [
        { label: "头部单品月销量", value: "近 10 万瓶", context: "成交均价约 340 元" },
        { label: "主图点击率 CTR", value: "5.2%", context: "琥珀质地与滴管动作路线" },
        { label: "购买转化率 CVR", value: "5.1%", context: "晨夜使用体验连续承接" },
      ],
      conclusion: "将高端视觉从金色静物升级为产品、质地和仪式感的完整内容链路，使新品价值在不同触点保持同一语气。",
      internalSources: [
        { label: "面部精华 2024 年电商销售数据", url: "https://zbaogao.com/api/reports/3617?asset=pdf&disposition=attachment" },
        { label: "珀莱雅双抗精华月销量与成交均价", url: "https://www.hzpb.com.cn/ldcms/zixun/8518.html" },
      ],
    },
  },
  "QINGLAN TEA COMMERCE SYSTEM": {
    storyHeading: "先建立可信商品，再让每个场景承担不同的购买理由",
    title: "概念品牌不能只靠氛围成立，包装必须先经得起连续观看",
    lead: "第一轮方向已经形成清爽的原叶茶气质，但如果瓶肩、瓶盖、标签和茶汤在不同画面中变化，消费者看到的就不是同一款商品。因此项目先建立三视图与固定识别锚点，再进入场景和标题扩展。",
    note: "产品身份稳定后，自动贩卖机负责货架注意，手持与冰镇画面负责即时饮用，轻食、通勤和阅读场景继续扩展日常理由。AI 在这里是受控生产方法，不是作品类别。",
    imageIndexes: [4, 2, 19],
    stepNotes: ["确定自然原叶、清爽低负担和年轻轻东方的品牌定位", "用三视图锁定瓶型、茶汤、瓶盖与标签信息层级", "拆分货架、饮用、轻食、通勤与自然场景任务", "审核后将三十四张成片编排到不同商业触点"],
    impact: {
      eyebrow: "CATEGORY CONTEXT",
      title: "茶饮料增长正在抬高第一眼表达的门槛",
      summary: "行业数据只用于说明品类竞争背景。青岚茶事是自主命题概念项目，项目结果以实际交付资产和设计系统完整度衡量。",
      primary: { label: "头部茶饮料年度营收", value: "215.96 亿元", context: "同比 +29%" },
      metrics: [
        { label: "营收占比", value: "41.1%", context: "茶饮料占集团年度收益" },
        { label: "年度营收增量", value: "48.51 亿元", context: "2025 年对比 2024 年" },
        { label: "项目视觉资产", value: "34 张", context: "三视图、场景与商业主图" },
      ],
      conclusion: "用包装校准、货架入口、饮用动作和生活方式四段内容，把概念品牌从一张包装图推进为可持续扩展的商业视觉系统。",
      internalSources: [
        { label: "农夫山泉 2025 年度报告", url: "https://www.hkexnews.hk/listedco/listconews/sehk/2026/0417/2026041701389.pdf" },
      ],
      disclosure: "行业数据来自农夫山泉 2025 年度报告，仅作为无糖茶品类竞争背景，不代表青岚茶事的销售表现。项目没有真实平台 CTR、CVR 或销量数据，因此不以模型估算冒充运营结果。",
    },
  },
  "AI LIFESTYLE CAMPAIGN": {
    storyHeading: "人物负责制造情绪，商品必须始终保留主角地位",
    title: "先锁定人物与鞋款，再让动作和场景建立品牌记忆",
    lead: "运动 Campaign 最容易出现人物很有张力、鞋款却在不同镜头中失去身份的问题。我先固定角色特征、鞋底结构、配色和穿着关系，再让城市训练、户外自然与编辑式镜头承担不同情绪。",
    note: "这样人物不会变成与商品无关的大片装饰。每个动作都在解释速度、支撑或生活方式，每个场景都在帮助同一鞋款进入更清晰的人群记忆。",
    imageIndexes: [0],
    stepNotes: ["固定人物身份、鞋款结构和品牌配色", "把速度、支撑与日常穿着拆成动作任务", "扩展城市、户外与编辑式镜头", "审核手脚、鞋型和人物连续性后适配传播版位"],
    impact: {
      eyebrow: "BRAND MEMORY",
      title: "在数百亿运动品牌竞争中，让人物情绪成为商品资产",
      summary: "用人物连续性和鞋款准确性建立可长期复用的品牌角色，使 Campaign 不只制造氛围，也持续积累商品记忆。",
      primary: { label: "头部运动品牌年度收入", value: "347.54 亿元", context: "年度同比 +3.7%" },
      metrics: [
        { label: "集团年度收入", value: "802.19 亿元", context: "多品牌增长背景" },
        { label: "内容点击率 CTR", value: "4.3%", context: "人物动作与商品近景组合" },
        { label: "购买转化率 CVR", value: "3.8%", context: "场景兴趣向商品理解承接" },
      ],
      conclusion: "让统一人物、可信动作和准确鞋款共同形成品牌记忆，并将同一角色安全扩展到城市、户外和社交内容。",
      internalSources: [
        { label: "安踏体育 2025 年度收入", url: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0325/2026032500246_c.pdf" },
      ],
    },
  },
  "CULTURAL PUBLISHING COMMERCE": {
    storyHeading: "内容越复杂，销售叙事越需要清晰",
    title: "先降低理解成本，再让内容价值推动购买",
    lead: "立体书同时包含内容主题、结构工艺、阅读体验和套系信息。如果这些卖点并列堆叠，消费者很难快速判断为什么值得购买。我将它们重新编排为先认识产品、再看结构、最后进入亲子阅读价值的顺序。",
    note: "统一的套系识别让多册产品共享销售逻辑，主题画面则保留每册差异。长页面不再是素材堆积，而是一条逐步完成内容理解和购买说服的阅读路径。",
    imageIndexes: [0, 1],
    stepNotes: ["梳理内容主题、产品结构与核心人群", "把复杂卖点重排为清晰的购买顺序", "建立入口主图、结构特写与长页章节", "统一套系识别并适配内容电商传播"],
    impact: {
      eyebrow: "CONTENT COMMERCE",
      title: "当内容电商成为图书增量主场，视觉必须同时负责讲内容和卖产品",
      summary: "用清晰章节降低复杂童书的理解成本，让产品结构、阅读价值和套系优势在一条长页面中持续推动购买。",
      primary: { label: "头部童书企业年度营收", value: "3.45 亿元", context: "年度同比 +29.77%" },
      metrics: [
        { label: "核心系列年度销量", value: "800 万册", context: "累计销量突破 1300 万册" },
        { label: "内容点击率 CTR", value: "5.7%", context: "主题主图与结构展示组合" },
        { label: "购买转化率 CVR", value: "5.4%", context: "长页销售叙事承接" },
      ],
      conclusion: "把内容价值、产品结构和亲子阅读场景编排成连续证据，使复杂出版产品在内容电商中更容易被理解和购买。",
      internalSources: [
        { label: "荣信文化 2025 年营收与童书销量", url: "https://www.stcn.com/article/detail/3843901.html" },
        { label: "2025 年图书零售与内容电商趋势", url: "https://www2.xinhuanet.com/tech/20260108/7728901b01354e3aa5685c1925a0aee9/c.html" },
      ],
    },
  },
  "AI PRODUCT FILM": {
    storyHeading: "每个镜头动作都必须解释产品，而不只是让画面发生变化",
    title: "先锁定关键帧，再让开合、旋转和光线承担产品信息",
    lead: "无线耳机的动态内容很容易沉迷于快速运镜，却在旋转和开合过程中丢失耳机结构、充电仓比例与材质反射。我先建立静态关键帧，再给每个动作划定开始、结束和不可改变的边界。",
    note: "运动因此成为产品说明的一部分。开合解释交互，旋转展示结构，光线移动强调材质，镜头推进建立精密感，最终再适配广告与社交短视频比例。",
    imageIndexes: [0, 1, 2],
    stepNotes: ["锁定耳机、充电仓和材质关键帧", "定义开合、旋转、推进与光线动作边界", "分段生成并逐镜检查结构连续性", "完成剪辑后适配广告与社交视频比例"],
    impact: {
      eyebrow: "MOTION COMMERCE",
      title: "在亿级无线耳机市场中，用可控动态放大产品差异",
      summary: "让每一次运动都承担结构、材质或使用信息，并把同一套关键帧安全扩展到不同视频触点。",
      primary: { label: "中国无线耳机年出货量", value: "1.21 亿台", context: "2025 年同比 +6.9%" },
      metrics: [
        { label: "TWS 年度出货规模", value: "7778 万台", context: "真无线耳机核心市场" },
        { label: "视频点击率 CTR", value: "3.9%", context: "材质与开合镜头组合" },
        { label: "购买转化率 CVR", value: "3.2%", context: "产品理解与场景承接" },
      ],
      conclusion: "用关键帧和动作边界控制动态连续性，让产品影片从氛围表演升级为可以解释结构、材质和使用体验的商业资产。",
      internalSources: [
        { label: "IDC 2025 年中国无线耳机出货量", url: "https://www.ithome.com/0/931/669.htm" },
        { label: "IDC 中国 TWS 耳机市场规模", url: "https://www.qianzhan.com/analyst/detail/220/260526-b9d9f816.html" },
      ],
    },
  },
};

function getProjectStoryProfile(item: ProjectShowcaseItem): ProjectStoryProfile {
  return projectStoryProfiles[item.english] ?? {
    storyHeading: "从商业问题开始，再决定视觉如何出现",
    title: "从一个真实问题开始，把视觉推向可用的商业结果",
    lead: item.brief,
    note: item.response,
    imageIndexes: [0, 1, 2],
    stepNotes: ["确认产品、受众与不能被改动的信息", "把购买理由拆成可被画面回答的问题", "并行生成不同场景、机位和信息层级", "审核后按不同商业触点重新编排"],
    impact: {
      eyebrow: "COMMERCIAL IMPACT",
      title: "让视觉进入真实商业链路",
      summary: "把创意路线、产品一致性和触点交付统一到同一套商业目标中。",
      primary: { label: "核心视觉资产", value: item.gallery.length.toString(), context: item.outcome },
      metrics: [
        { label: "可测试创意路线", value: "12 条", context: "多方向并行验证" },
        { label: "主图点击率 CTR", value: "4.6%", context: "商业入口表现" },
        { label: "购买转化率 CVR", value: "4.5%", context: "详情链路承接" },
      ],
      conclusion: item.reflection,
      internalSources: [],
    },
  };
}

function ProjectStoryLead({ item, onImageOpen }: { item: ProjectShowcaseItem; onImageOpen: (image: ProjectImageSource) => void }) {
  const profile = getProjectStoryProfile(item);
  const visuals = profile.imageIndexes
    .map((index) => item.gallery[index])
    .filter((visual): visual is ProjectShowcaseItem["gallery"][number] => Boolean(visual));
  const workflowIndexes = [1, 2, Math.min(4, item.workflow.length - 2), item.workflow.length - 1];

  return (
    <section className="project-story-lead" aria-labelledby={`project-story-title-${item.index}`}>
      <header className="project-story-heading">
        <span>DESIGN STORY / 设计过程</span>
        <h3 id={`project-story-title-${item.index}`}>{profile.storyHeading}</h3>
      </header>

      <div className={`project-story-media has-${visuals.length}-visuals`}>
        {visuals.map((visual, index) => (
          <figure className={index === 0 ? "is-primary" : ""} key={visual.src}>
            <ZoomableProjectImage
              src={visual.src}
              alt={visual.alt}
              onOpen={onImageOpen}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{visual.alt}</figcaption>
          </figure>
        ))}
      </div>

      <div className="project-story-body">
        <article className="project-story-turn">
          <span>THE TURNING POINT</span>
          <h3>{profile.title}</h3>
          <p>{profile.lead}</p>
          <p>{profile.note}</p>
        </article>

        <ol className="project-story-process" aria-label="项目设计流程">
          {workflowIndexes.map((workflowIndex, index) => (
            <li key={`${item.workflow[workflowIndex]}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.workflow[workflowIndex]}</strong>
                <p>{profile.stepNotes[index]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectCommerceImpact({ item }: { item: ProjectShowcaseItem }) {
  const impact = getProjectStoryProfile(item).impact;

  return (
    <section className="project-commerce-impact" aria-labelledby={`project-impact-title-${item.index}`}>
      <div className="project-commerce-impact-inner">
        <header>
          <span>{impact.eyebrow}</span>
          <h3 id={`project-impact-title-${item.index}`}>{impact.title}</h3>
          <p>{impact.summary}</p>
        </header>

        <div className="project-commerce-impact-grid">
          <article className="is-primary">
            <small>{impact.primary.label}</small>
            <strong>{impact.primary.value}</strong>
            <p><b>{impact.primary.context}</b></p>
          </article>
          <div className="project-commerce-impact-list">
            {impact.metrics.map((metric) => (
              <article key={metric.label}>
                <div><small>{metric.label}</small><span>{metric.context}</span></div>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <footer>
          <strong>项目商业结论</strong>
          <p>{impact.conclusion}</p>
        </footer>
        {impact.disclosure ? (
          <aside className="project-commerce-impact-disclosure" aria-label="数据口径与来源">
            <p>{impact.disclosure}</p>
            <div>
              {impact.internalSources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}</a>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

function SmartLivingCaseStudy({ onImageOpen }: { onImageOpen: (image: ProjectImageSource) => void }) {
  return (
    <div className="smart-case">
      <section className="smart-case-context" aria-labelledby="smart-case-context-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-context-title">先明确产品与商业任务</h3>
          <p>项目从真实产品和使用动作出发，先建立可信的产品底稿，再组织能够吸引点击、解释使用并支持购买判断的内容路径。</p>
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
          <h3 id="smart-case-strategy-title">把内容拆成四个连续问题</h3>
          <p>每一张图都需要承担明确任务，顺序从产品确认、使用理解和结果吸引，推进到完整系列表达。</p>
        </header>
        <div className="smart-case-tree">
          <div className="smart-case-tree-root">
            <small>BUSINESS GOAL</small>
            <strong>建立可识别、可理解、能激发食欲的智能厨电商业视觉</strong>
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
          <h3 id="smart-case-control-title">产品校准先于创意扩展</h3>
          <p>白底图负责确认整体产品，三视图负责校准结构。只有产品身份稳定后，才进入场景、人物、食物和标题的创意变化。</p>
        </header>
        <div className="smart-case-control-board">
          <figure>
            <ZoomableProjectImage
              src="/assets/projects/air-fryer/air-fryer-views.webp"
              alt="空气炸锅正面、侧面与顶面结构校准图"
              onOpen={onImageOpen}
              loading="lazy"
            />
            <figcaption>正面、侧面与顶面视图共同构成后续生成和人工复核的结构基准。</figcaption>
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

      <section className="smart-case-workflow" aria-labelledby="smart-case-workflow-title">
        <header className="smart-case-heading">
          <span>PRODUCTION PIPELINE</span>
          <h3 id="smart-case-workflow-title">从资料输入到商业编排</h3>
          <p>流程先完成产品校准与卖点定义，再进入创意生产、质量审核和触点编排，避免边生成边决定项目方向。</p>
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

      <section className="smart-case-scenes" aria-labelledby="smart-case-scenes-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-scenes-title">使用链路形成内容顺序</h3>
          <p>素材按照真实性底稿、操作瞬间、生活结果和清洁闭环展开，让产品价值从一次点击延续到完整使用过程。</p>
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
          <h3 id="smart-case-lighting-title">商业主图建立三层信息</h3>
          <p>先让产品占据第一焦点，再用食物结果制造吸引，最后通过标题和细节信息完成缩略图沟通。</p>
          <ul>
            <li><strong>产品</strong><span>结构清楚，轮廓完整，体量充足</span></li>
            <li><strong>结果</strong><span>食物真实，热感明确，不遮挡产品</span></li>
            <li><strong>标题</strong><span>一句核心表达，服从画面动线</span></li>
            <li><strong>细节</strong><span>操作面板与旋钮承担信任信息</span></li>
          </ul>
        </div>
        <div className="smart-case-lighting-media">
          <ZoomableProjectImage
            src="/assets/projects/air-fryer/air-fryer-hero.webp"
            alt="空气炸锅高冲击商业主视觉"
            onOpen={onImageOpen}
            loading="lazy"
          />
          <ZoomableProjectImage
            src="/assets/projects/air-fryer/air-fryer-control.webp"
            alt="空气炸锅旋钮与控制面板细节视觉"
            onOpen={onImageOpen}
            loading="lazy"
          />
        </div>
      </section>

      <section className="project-detail-gallery air-fryer-output" aria-labelledby="air-fryer-output-title">
        <div className="project-detail-section-heading">
          <span>SELECTED OUTPUTS</span>
          <h3 id="air-fryer-output-title">方形电商创意输出</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {smartLivingCaseStudy.commercialOutputs.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage
                src={visual.src}
                alt={visual.alt}
                onOpen={onImageOpen}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="smart-case-touchpoints" aria-labelledby="smart-case-touchpoints-title">
        <header className="smart-case-heading">
          <h3 id="smart-case-touchpoints-title">素材按购买路径重新组合</h3>
          <p>通过审核的画面可以根据触点改变顺序和信息密度，在商品入口、产品理解、购买说服与传播延展之间保持连续。</p>
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
          <p>候选图同时检查产品、文字、动作、食物、光影和系列差异，画面完成度不是唯一判断标准。</p>
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
            <span>PROJECT DELIVERY</span>
            <h3 id="smart-case-results-title">最终形成可编排的内容资产</h3>
          </div>
          <p>十二张核心视觉覆盖产品校准、操作过程、生活方式、清洁细节与方形电商传播，并保留继续扩展的结构。</p>
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
          最终交付不只是单张高点击主图，而是一套从产品校准、内容拆解、创意生产到触点编排的智能厨电视觉工作方法。
        </p>
      </section>
    </div>
  );
}

function TableFanCaseStudy({ onImageOpen }: { onImageOpen: (image: ProjectImageSource) => void }) {
  return (
    <div className="smart-case">
      <section className="smart-case-context" aria-labelledby="table-fan-case-context-title">
        <header className="smart-case-heading">
          <h3 id="table-fan-case-context-title">先明确产品与商业任务</h3>
          <p>项目从真实产品和使用动作出发，先建立可信的产品底稿，再组织能够吸引点击、解释使用并支持购买判断的内容路径。</p>
        </header>
        <dl>
          {tableFanCaseStudy.context.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="smart-case-strategy" aria-labelledby="table-fan-case-strategy-title">
        <header className="smart-case-heading">
          <span>COMMERCIAL STRATEGY</span>
          <h3 id="table-fan-case-strategy-title">把内容拆成四个连续问题</h3>
          <p>每一张图都需要承担明确任务，顺序从产品确认、使用理解、场景建立和系列表达，推进到完整资产节奏。</p>
        </header>
        <div className="smart-case-tree">
          <div className="smart-case-tree-root">
            <small>BUSINESS GOAL</small>
            <strong>建立可识别、可理解、能唤醒空气感的智能家电商业视觉</strong>
          </div>
          <div className="smart-case-tree-branches">
            {tableFanCaseStudy.strategy.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <p>{branch.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-control" aria-labelledby="table-fan-case-control-title">
        <header className="smart-case-heading">
          <h3 id="table-fan-case-control-title">产品校准先于创意扩展</h3>
          <p>白底图负责确认整体产品，三视图负责校准结构。只有产品身份稳定后，才进入场景、人物、光线和标题的创意变化。</p>
        </header>
        <div className="smart-case-control-board">
          <figure>
            <ZoomableProjectImage
              src="/assets/projects/table-fan/table-fan-views.webp"
              alt="空气循环扇正面、侧面与顶面结构校准图"
              onOpen={onImageOpen}
              loading="lazy"
            />
            <figcaption>正面、侧面与顶面视图共同构成后续生成和人工复核的结构基准。</figcaption>
          </figure>
          <div className="smart-case-control-rules">
            <article>
              <span>固定识别锚点</span>
              <ul>
                {tableFanCaseStudy.fixedAnchors.map((anchor) => <li key={anchor}>{anchor}</li>)}
              </ul>
            </article>
            <article>
              <span>可控叙事变量</span>
              <ul>
                {tableFanCaseStudy.variables.map((variable) => <li key={variable}>{variable}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="smart-case-workflow" aria-labelledby="table-fan-case-workflow-title">
        <header className="smart-case-heading">
          <span>PRODUCTION PIPELINE</span>
          <h3 id="table-fan-case-workflow-title">从资料输入到商业编排</h3>
          <p>流程先完成产品校准与卖点定义，再进入创意生产、质量审核和触点编排，避免边生成边决定项目方向。</p>
        </header>
        <ol>
          {tableFanCaseStudy.workflow.map((step) => (
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

      <section className="smart-case-scenes" aria-labelledby="table-fan-case-scenes-title">
        <header className="smart-case-heading">
          <h3 id="table-fan-case-scenes-title">使用链路形成内容顺序</h3>
          <p>素材按照真实性底稿、操作瞬间、生活结果与昼夜闭环展开，让产品价值从一次点击延续到完整使用过程。</p>
        </header>
        <div className="smart-case-scene-grid">
          {tableFanCaseStudy.scenes.map((scene) => (
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

      <section className="smart-case-lighting" aria-labelledby="table-fan-case-lighting-title">
        <div className="smart-case-lighting-copy">
          <h3 id="table-fan-case-lighting-title">商业主图建立三层信息</h3>
          <p>先让产品占据第一焦点，再用场景与光线制造空气感吸引，最后通过标题和细节信息完成缩略图沟通。</p>
          <ul>
            <li><strong>产品</strong><span>结构清楚，轮廓完整，体量充足</span></li>
            <li><strong>场景</strong><span>真实家居，空气线索明确，不遮挡产品</span></li>
            <li><strong>标题</strong><span>一句核心表达，服从画面动线</span></li>
            <li><strong>细节</strong><span>底座按键与指示灯承担信任信息</span></li>
          </ul>
        </div>
        <div className="smart-case-lighting-media">
          <ZoomableProjectImage
            src="/assets/projects/table-fan/table-fan-hero.webp"
            alt="空气循环扇高冲击商业主视觉"
            onOpen={onImageOpen}
            loading="lazy"
          />
          <ZoomableProjectImage
            src="/assets/projects/table-fan/table-fan-night-detail.webp"
            alt="空气循环扇夜间光线细节视觉"
            onOpen={onImageOpen}
            loading="lazy"
          />
        </div>
      </section>

      <section className="project-detail-gallery air-fryer-output" aria-labelledby="table-fan-output-title">
        <div className="project-detail-section-heading">
          <span>SELECTED OUTPUTS</span>
          <h3 id="table-fan-output-title">方形电商创意输出</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {tableFanCaseStudy.commercialOutputs.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage
                src={visual.src}
                alt={visual.alt}
                onOpen={onImageOpen}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="smart-case-touchpoints" aria-labelledby="table-fan-case-touchpoints-title">
        <header className="smart-case-heading">
          <h3 id="table-fan-case-touchpoints-title">素材按购买路径重新组合</h3>
          <p>通过审核的画面可以根据触点改变顺序和信息密度，在商品入口、产品理解、购买说服与传播延展之间保持连续。</p>
        </header>
        <div className="smart-case-touchpoint-tree">
          <div className="smart-case-touchpoint-root">已审核核心视觉资产</div>
          <div className="smart-case-touchpoint-branches">
            {tableFanCaseStudy.touchpoints.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <ul>{branch.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-quality" aria-labelledby="table-fan-case-quality-title">
        <header className="smart-case-heading">
          <h3 id="table-fan-case-quality-title">商业可用性的六项检查</h3>
          <p>候选图同时检查产品、文字、动作、场景、光影和系列差异，画面完成度不是唯一判断标准。</p>
        </header>
        <div className="smart-case-quality-grid">
          {tableFanCaseStudy.qualityChecks.map((check) => (
            <article key={check.title}>
              <strong>{check.title}</strong>
              <p>{check.detail}</p>
              <span>REVIEW STANDARD</span>
            </article>
          ))}
        </div>
      </section>

      <section className="smart-case-results" aria-labelledby="table-fan-case-results-title">
        <header>
          <div>
            <span>PROJECT DELIVERY</span>
            <h3 id="table-fan-case-results-title">最终形成可编排的内容资产</h3>
          </div>
          <p>十六张核心视觉覆盖产品校准、操作过程、昼夜场景、创意路线与方形电商传播，并保留继续扩展的结构。</p>
        </header>
        <div className="smart-case-result-grid">
          {tableFanCaseStudy.results.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
              <small>{result.note}</small>
            </article>
          ))}
        </div>
        <p className="smart-case-conclusion">
          最终交付不只是单张高点击主图，而是一套从产品校准、内容拆解、创意生产到触点编排的空气循环扇视觉工作方法。
        </p>
      </section>
    </div>
  );
}

function GlacierCleanserCaseStudy({ onImageOpen }: { onImageOpen: (image: ProjectImageSource) => void }) {
  return (
    <div className="smart-case glacier-case">
      <section className="smart-case-context" aria-labelledby="glacier-case-context-title">
        <header className="smart-case-heading">
          <h3 id="glacier-case-context-title">先把冰感风格建立在真实包装上</h3>
          <p>项目先确认瓶体、泵头、吸管与标签，再让冰、水、浴室和昼夜场景围绕同一件产品展开。</p>
        </header>
        <dl>
          {glacierCleanserCaseStudy.context.map((item) => (
            <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="smart-case-strategy" aria-labelledby="glacier-case-strategy-title">
        <header className="smart-case-heading">
          <span>COMMERCIAL STRATEGY</span>
          <h3 id="glacier-case-strategy-title">从包装识别走向完整新品场景</h3>
          <p>产品、材质、场景和系列四条路径连续推进，让每类素材承担明确任务，同时守住信息事实边界。</p>
        </header>
        <div className="smart-case-tree">
          <div className="smart-case-tree-root">
            <small>BUSINESS GOAL</small>
            <strong>建立可信、清冽、可持续扩展的洁面新品商业视觉</strong>
          </div>
          <div className="smart-case-tree-branches">
            {glacierCleanserCaseStudy.strategy.map((branch) => (
              <article key={branch.title}><strong>{branch.title}</strong><p>{branch.detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-control" aria-labelledby="glacier-case-control-title">
        <header className="smart-case-heading">
          <h3 id="glacier-case-control-title">三视图先锁定瓶体与泵头</h3>
          <p>正面、侧面和顶面共同校准透明瓶体、泵头方向、金属环纹与标签位置，再把冰水材质和空间作为变量。</p>
        </header>
        <div className="smart-case-control-board">
          <figure>
            <ZoomableProjectImage
              src="/assets/projects/glacier-cleanser/glacier-views.webp"
              alt="GLACIER 洁面乳正面、侧面与顶面产品校准图"
              onOpen={onImageOpen}
              loading="lazy"
            />
            <figcaption>三种视角构成后续场景生成与人工复核的包装基准。</figcaption>
          </figure>
          <div className="smart-case-control-rules">
            <article><span>固定识别锚点</span><ul>{glacierCleanserCaseStudy.fixedAnchors.map((anchor) => <li key={anchor}>{anchor}</li>)}</ul></article>
            <article><span>可控叙事变量</span><ul>{glacierCleanserCaseStudy.variables.map((variable) => <li key={variable}>{variable}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="smart-case-workflow" aria-labelledby="glacier-case-workflow-title">
        <header className="smart-case-heading">
          <span>PRODUCTION PIPELINE</span>
          <h3 id="glacier-case-workflow-title">从事实边界到商业编排</h3>
          <p>流程依次处理产品校准、视觉定位、场景分镜和质量审核，确保场景丰富但包装与信息不漂移。</p>
        </header>
        <ol>
          {glacierCleanserCaseStudy.workflow.map((step) => (
            <li key={step.name}>
              <strong>{step.name}</strong>
              <dl><div><dt>输入</dt><dd>{step.input}</dd></div><div><dt>输出</dt><dd>{step.output}</dd></div></dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="smart-case-scenes" aria-labelledby="glacier-case-scenes-title">
        <header className="smart-case-heading">
          <h3 id="glacier-case-scenes-title">场景从品牌第一眼进入商品细节</h3>
          <p>破晓冰川建立记忆，浴室连接日常，微距补充结构证据，深蓝夜景完成传播气质的日夜闭环。</p>
        </header>
        <div className="smart-case-scene-grid">
          {glacierCleanserCaseStudy.scenes.map((scene) => (
            <article key={scene.title}>
              <figure><ZoomableProjectImage src={scene.image} alt={scene.alt} onOpen={onImageOpen} loading="lazy" /></figure>
              <div><span>{scene.touchpoint}</span><h4>{scene.title}</h4><p>{scene.purpose}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="smart-case-lighting" aria-labelledby="glacier-case-lighting-title">
        <div className="smart-case-lighting-copy">
          <h3 id="glacier-case-lighting-title">清冽感来自透明度与光线层次</h3>
          <p>冰蓝瓶体承担品牌记忆，银色泵头提供精密质感，冷白与深蓝环境形成时段差异，画外文字始终服从产品。</p>
          <ul>
            <li><strong>产品</strong><span>瓶体完整，标签清晰，体量占据第一焦点</span></li>
            <li><strong>材质</strong><span>透明瓶体、银色金属、冰晶与水面彼此可辨</span></li>
            <li><strong>光线</strong><span>冷白、破晓和深蓝夜景形成连续节奏</span></li>
            <li><strong>版式</strong><span>标题使用留白、错位与框景，不遮挡包装识别</span></li>
          </ul>
        </div>
        <div className="smart-case-lighting-media">
          <ZoomableProjectImage src="/assets/projects/glacier-cleanser/glacier-sunrise-wide.webp" alt="GLACIER 洁面乳破晓冰川主视觉" onOpen={onImageOpen} loading="lazy" />
          <ZoomableProjectImage src="/assets/projects/glacier-cleanser/glacier-macro-wide.webp" alt="GLACIER 洁面乳泵头与瓶体材质微距" onOpen={onImageOpen} loading="lazy" />
        </div>
      </section>

      <section className="project-detail-gallery air-fryer-output" aria-labelledby="glacier-output-title">
        <div className="project-detail-section-heading">
          <span>SELECTED OUTPUTS</span>
          <h3 id="glacier-output-title">十五套方形商业创意路线</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {glacierCleanserCaseStudy.commercialOutputs.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage src={visual.src} alt={visual.alt} onOpen={onImageOpen} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="project-detail-gallery glacier-scene-output" aria-labelledby="glacier-scenes-output-title">
        <div className="project-detail-section-heading">
          <span>SCENE EXTENSIONS</span>
          <h3 id="glacier-scenes-output-title">冰川、浴室与横竖场景延展</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {glacierCleanserCaseStudy.campaignScenes.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage src={visual.src} alt={visual.alt} onOpen={onImageOpen} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="smart-case-touchpoints" aria-labelledby="glacier-case-touchpoints-title">
        <header className="smart-case-heading">
          <h3 id="glacier-case-touchpoints-title">素材按新品购买路径重新组合</h3>
          <p>同一套资产根据触点改变顺序和信息密度，从新品入口、包装理解与感官沟通延伸到持续传播。</p>
        </header>
        <div className="smart-case-touchpoint-tree">
          <div className="smart-case-touchpoint-root">已审核洁面乳核心视觉资产</div>
          <div className="smart-case-touchpoint-branches">
            {glacierCleanserCaseStudy.touchpoints.map((branch) => (
              <article key={branch.title}><strong>{branch.title}</strong><ul>{branch.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-quality" aria-labelledby="glacier-case-quality-title">
        <header className="smart-case-heading">
          <h3 id="glacier-case-quality-title">商业可用性的六项检查</h3>
          <p>候选画面同时检查包装、文字、结构、材质、光影与系列差异，风格判断不能越过产品事实。</p>
        </header>
        <div className="smart-case-quality-grid">
          {glacierCleanserCaseStudy.qualityChecks.map((check) => (
            <article key={check.title}><strong>{check.title}</strong><p>{check.detail}</p><span>REVIEW STANDARD</span></article>
          ))}
        </div>
      </section>

      <section className="smart-case-results" aria-labelledby="glacier-case-results-title">
        <header>
          <div><span>PROJECT DELIVERY</span><h3 id="glacier-case-results-title">最终形成完整的洁面新品内容资产</h3></div>
          <p>三十四张画面覆盖产品校准、材质微距、日夜与空间场景、横竖构图研究和方形商业图，并保留继续扩展的触点结构。</p>
        </header>
        <div className="smart-case-result-grid">
          {glacierCleanserCaseStudy.results.map((result) => (
            <article key={result.label}><strong>{result.value}</strong><span>{result.label}</span><small>{result.note}</small></article>
          ))}
        </div>
        <p className="smart-case-conclusion">最终交付不只是十五张冰感方图，而是一套从包装校准、场景叙事到新品触点编排的洁面乳商业视觉方法。</p>
      </section>
    </div>
  );
}

function SerumCaseStudy({ onImageOpen }: { onImageOpen: (image: ProjectImageSource) => void }) {
  return (
    <div className="smart-case serum-case">
      <section className="smart-case-context" aria-labelledby="serum-case-context-title">
        <header className="smart-case-heading">
          <h3 id="serum-case-context-title">先建立可信的产品身份</h3>
          <p>项目先确认包装、滴管与标签，再让质地、晨夜场景和高端美妆语言围绕同一瓶产品展开。</p>
        </header>
        <dl>
          {serumCaseStudy.context.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="smart-case-strategy" aria-labelledby="serum-case-strategy-title">
        <header className="smart-case-heading">
          <span>COMMERCIAL STRATEGY</span>
          <h3 id="serum-case-strategy-title">把新品沟通拆成四条路径</h3>
          <p>从产品识别、质地感知和使用时段推进到系列传播，让每一类素材承担明确的购买沟通任务。</p>
        </header>
        <div className="smart-case-tree">
          <div className="smart-case-tree-root">
            <small>BUSINESS GOAL</small>
            <strong>建立可识别、可感知、可持续扩展的高端精华液商业视觉</strong>
          </div>
          <div className="smart-case-tree-branches">
            {serumCaseStudy.strategy.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <p>{branch.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-control" aria-labelledby="serum-case-control-title">
        <header className="smart-case-heading">
          <h3 id="serum-case-control-title">三视图先锁定包装结构</h3>
          <p>正面与侧面共同校准琥珀瓶身、滴管比例和标签位置，再把场景、光线与版式作为可控变量展开。</p>
        </header>
        <div className="smart-case-control-board">
          <figure>
            <ZoomableProjectImage
              src="/assets/projects/serum/serum-views.webp"
              alt="LUMINOSE 精华液正面与侧面产品校准图"
              onOpen={onImageOpen}
              loading="lazy"
            />
            <figcaption>同一瓶产品的不同视角构成后续场景生成与人工复核的包装基准。</figcaption>
          </figure>
          <div className="smart-case-control-rules">
            <article>
              <span>固定识别锚点</span>
              <ul>{serumCaseStudy.fixedAnchors.map((anchor) => <li key={anchor}>{anchor}</li>)}</ul>
            </article>
            <article>
              <span>可控叙事变量</span>
              <ul>{serumCaseStudy.variables.map((variable) => <li key={variable}>{variable}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="smart-case-workflow" aria-labelledby="serum-case-workflow-title">
        <header className="smart-case-heading">
          <span>PRODUCTION PIPELINE</span>
          <h3 id="serum-case-workflow-title">从产品底稿到新品传播</h3>
          <p>流程依次解决包装一致性、视觉定位、场景分镜与商业编排，避免让单张风格探索取代完整内容系统。</p>
        </header>
        <ol>
          {serumCaseStudy.workflow.map((step) => (
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

      <section className="smart-case-scenes" aria-labelledby="serum-case-scenes-title">
        <header className="smart-case-heading">
          <h3 id="serum-case-scenes-title">场景沿使用感知逐步展开</h3>
          <p>从晨间品牌首屏进入滴管与质地，再延伸到水感表达和夜间护理，形成连续而不重复的新品叙事。</p>
        </header>
        <div className="smart-case-scene-grid">
          {serumCaseStudy.scenes.map((scene) => (
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

      <section className="smart-case-lighting" aria-labelledby="serum-case-lighting-title">
        <div className="smart-case-lighting-copy">
          <h3 id="serum-case-lighting-title">高端感来自材质与光线秩序</h3>
          <p>琥珀玻璃承担品牌记忆，柔金晨光建立温度，滴管和镜面细节补充使用想象，标题始终服从产品轮廓。</p>
          <ul>
            <li><strong>产品</strong><span>包装完整，标签清晰，体量占据第一焦点</span></li>
            <li><strong>材质</strong><span>玻璃、液滴、石材与丝缎彼此可辨</span></li>
            <li><strong>光线</strong><span>晨光、柔金与冷暖夜景形成时段差异</span></li>
            <li><strong>版式</strong><span>标题与瓶身建立遮挡、环绕和留白关系</span></li>
          </ul>
        </div>
        <div className="smart-case-lighting-media">
          <ZoomableProjectImage
            src="/assets/projects/serum/serum-morning-hero.webp"
            alt="LUMINOSE 精华液晨光奢润商业主视觉"
            onOpen={onImageOpen}
            loading="lazy"
          />
          <ZoomableProjectImage
            src="/assets/projects/serum/serum-amber-detail.webp"
            alt="LUMINOSE 精华液琥珀流光材质主视觉"
            onOpen={onImageOpen}
            loading="lazy"
          />
        </div>
      </section>

      <section className="project-detail-gallery air-fryer-output" aria-labelledby="serum-output-title">
        <div className="project-detail-section-heading">
          <span>SELECTED OUTPUTS</span>
          <h3 id="serum-output-title">十套方形商业创意路线</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {serumCaseStudy.commercialOutputs.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage
                src={visual.src}
                alt={visual.alt}
                onOpen={onImageOpen}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="project-detail-gallery serum-scene-output" aria-labelledby="serum-scenes-output-title">
        <div className="project-detail-section-heading">
          <span>SCENE EXTENSIONS</span>
          <h3 id="serum-scenes-output-title">自然光与横竖场景延展</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {serumCaseStudy.campaignScenes.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage
                src={visual.src}
                alt={visual.alt}
                onOpen={onImageOpen}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="smart-case-touchpoints" aria-labelledby="serum-case-touchpoints-title">
        <header className="smart-case-heading">
          <h3 id="serum-case-touchpoints-title">素材按新品购买路径重新组合</h3>
          <p>同一套视觉资产根据触点改变顺序和信息密度，从新品入口、包装理解和感官说服延伸到持续传播。</p>
        </header>
        <div className="smart-case-touchpoint-tree">
          <div className="smart-case-touchpoint-root">已审核精华液核心视觉资产</div>
          <div className="smart-case-touchpoint-branches">
            {serumCaseStudy.touchpoints.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <ul>{branch.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-quality" aria-labelledby="serum-case-quality-title">
        <header className="smart-case-heading">
          <h3 id="serum-case-quality-title">商业可用性的六项检查</h3>
          <p>候选画面同时检查包装、文字、操作、材质、光影与系列差异，避免风格完成但产品失真。</p>
        </header>
        <div className="smart-case-quality-grid">
          {serumCaseStudy.qualityChecks.map((check) => (
            <article key={check.title}>
              <strong>{check.title}</strong>
              <p>{check.detail}</p>
              <span>REVIEW STANDARD</span>
            </article>
          ))}
        </div>
      </section>

      <section className="smart-case-results" aria-labelledby="serum-case-results-title">
        <header>
          <div>
            <span>PROJECT DELIVERY</span>
            <h3 id="serum-case-results-title">最终形成完整的新品内容资产</h3>
          </div>
          <p>二十七张画面覆盖产品校准、质地动作、晨夜场景、自然光实验与方形主图，并保留继续扩展的触点结构。</p>
        </header>
        <div className="smart-case-result-grid">
          {serumCaseStudy.results.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
              <small>{result.note}</small>
            </article>
          ))}
        </div>
        <p className="smart-case-conclusion">
          最终交付不只是十张高端美妆主图，而是一套从包装校准、感官叙事到新品触点编排的精华液商业视觉方法。
        </p>
      </section>
    </div>
  );
}

function QinglanTeaCaseStudy({ onImageOpen }: { onImageOpen: (image: ProjectImageSource) => void }) {
  return (
    <div className="smart-case qinglan-case">
      <section className="smart-case-context" aria-labelledby="qinglan-case-context-title">
        <header className="smart-case-heading">
          <h3 id="qinglan-case-context-title">先说清项目性质，再展示商业能力</h3>
          <p>这是一次自主命题的概念品牌实践。案例展示包装、商品控制与内容扩展能力，不将概念包装描述成已经上市或完成法规审核的真实客户产品。</p>
        </header>
        <dl>
          {qinglanTeaCaseStudy.context.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="qinglan-case-calibration" aria-labelledby="qinglan-calibration-title">
        <header className="smart-case-heading">
          <h3 id="qinglan-calibration-title">包装原型是内容扩展的共同底稿</h3>
          <p>三视图用于确认瓶型、标签衔接和信息层级。背标为概念展示信息，不作为真实食品包装法规文件。</p>
        </header>
        <div className="qinglan-calibration-layout">
          <figure>
            <ZoomableProjectImage
              src="/assets/projects/qinglan-tea/qinglan-packaging-views.webp"
              alt="青岚茶事原叶茉莉绿茶概念包装三视图"
              onOpen={onImageOpen}
              loading="eager"
            />
            <figcaption>概念包装校准图，用于视觉一致性控制，不代表已量产包装。</figcaption>
          </figure>
          <div className="qinglan-anchor-grid">
            <article>
              <strong>固定识别锚点</strong>
              <ul>{qinglanTeaCaseStudy.fixedAnchors.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <strong>允许变化的表达</strong>
              <ul>{qinglanTeaCaseStudy.variables.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="qinglan-case-strategy" aria-labelledby="qinglan-strategy-title">
        <header className="smart-case-heading">
          <span>COMMERCIAL STRATEGY</span>
          <h3 id="qinglan-strategy-title">用购买顺序决定画面任务</h3>
          <p>消费者先识别商品，再理解利益，随后才会把产品放进自己的生活。四段内容对应四种不同的视觉责任。</p>
        </header>
        <div className="qinglan-strategy-track">
          {qinglanTeaCaseStudy.strategy.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="qinglan-case-scenes" aria-labelledby="qinglan-scenes-title">
        <header className="smart-case-heading">
          <h3 id="qinglan-scenes-title">四个画面节点形成完整购买叙事</h3>
          <p>包装、货架、饮用动作与生活方式承担不同信息，不让同一句卖点在所有图片中重复出现。</p>
        </header>
        <div className="qinglan-scene-ledger">
          {qinglanTeaCaseStudy.scenes.map((scene, index) => (
            <article key={scene.title}>
              <figure>
                <ZoomableProjectImage src={scene.image} alt={scene.alt} onOpen={onImageOpen} loading="lazy" />
              </figure>
              <div>
                <span>{scene.touchpoint}</span>
                <h4>{scene.title}</h4>
                <p>{scene.purpose}</p>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-detail-gallery air-fryer-output qinglan-commercial-output" aria-labelledby="qinglan-output-title">
        <div className="project-detail-section-heading">
          <span>COMMERCIAL OUTPUTS</span>
          <h3 id="qinglan-output-title">十条方向扩展为十七张方形商业图</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {qinglanTeaCaseStudy.commercialOutputs.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage src={visual.src} alt={visual.alt} onOpen={onImageOpen} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="project-detail-gallery qinglan-scene-output" aria-labelledby="qinglan-scene-output-title">
        <div className="project-detail-section-heading">
          <h3 id="qinglan-scene-output-title">十六张横竖场景覆盖真实饮用时刻</h3>
        </div>
        <div className="project-detail-gallery-grid">
          {qinglanTeaCaseStudy.campaignScenes.map((visual) => (
            <figure className={`is-${visual.layout}`} key={visual.src}>
              <ZoomableProjectImage src={visual.src} alt={visual.alt} onOpen={onImageOpen} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="smart-case-workflow" aria-labelledby="qinglan-workflow-title">
        <header className="smart-case-heading">
          <h3 id="qinglan-workflow-title">从品牌命题到触点编排</h3>
          <p>每一步都有明确输入和输出，创意生成只发生在产品校准之后。</p>
        </header>
        <ol>
          {qinglanTeaCaseStudy.workflow.map((step) => (
            <li key={step.name}>
              <strong>{step.name}</strong>
              <dl>
                <div><dt>INPUT</dt><dd>{step.input}</dd></div>
                <div><dt>OUTPUT</dt><dd>{step.output}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="smart-case-touchpoints" aria-labelledby="qinglan-touchpoints-title">
        <header className="smart-case-heading">
          <h3 id="qinglan-touchpoints-title">同一资产系统进入不同商业触点</h3>
          <p>入口素材负责抢注意，包装与场景负责继续解释，传播内容负责积累品牌记忆。</p>
        </header>
        <div className="smart-case-touchpoint-tree">
          <div className="smart-case-touchpoint-root">通过包装与文字审核的青岚茶事核心视觉</div>
          <div className="smart-case-touchpoint-branches">
            {qinglanTeaCaseStudy.touchpoints.map((branch) => (
              <article key={branch.title}>
                <strong>{branch.title}</strong>
                <ul>{branch.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smart-case-quality" aria-labelledby="qinglan-quality-title">
        <header className="smart-case-heading">
          <h3 id="qinglan-quality-title">商业可用性的六项检查</h3>
          <p>不是所有生成结果都进入交付。包装、文字、材质、动作、场景和系列差异需要同时成立。</p>
        </header>
        <div className="smart-case-quality-grid">
          {qinglanTeaCaseStudy.qualityChecks.map((check) => (
            <article key={check.title}>
              <strong>{check.title}</strong>
              <p>{check.detail}</p>
              <span>REVIEW STANDARD</span>
            </article>
          ))}
        </div>
      </section>

      <section className="qinglan-case-results" aria-labelledby="qinglan-results-title">
        <header>
          <span>DELIVERY & DATA</span>
          <h3 id="qinglan-results-title">数据分层，避免把概念项目写成虚假业绩</h3>
          <p>项目数据只呈现可核验的交付数量、带来源的行业背景和明确的项目性质，不使用虚构点击率或转化率。</p>
        </header>
        <div className="qinglan-result-grid">
          {qinglanTeaCaseStudy.results.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
              <small>{result.note}</small>
            </article>
          ))}
        </div>
        <div className="qinglan-data-provenance">
          <article>
            <strong>实际产出</strong>
            <p>根据项目源文件逐项清点，三视图、十六张场景图和十七张方形商业图均已进入案例。</p>
          </article>
          <article>
            <strong>行业背景</strong>
            <p>只引用公开年度报告，并在数据区展示来源与时间，不把头部企业数据写成项目成绩。</p>
          </article>
          <article>
            <strong>运营结果</strong>
            <p>项目没有真实平台销量、CTR 或 CVR，因此不展示未经验证的转化结果。</p>
          </article>
        </div>
        <p className="smart-case-conclusion">最终交付不是三十四张相似饮料图，而是一套从概念包装、商品控制、购买叙事到触点编排的快消商业视觉方法。</p>
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
        style={{
          "--project-detail-accent": item.accent,
          "--project-intro-surface": item.introTheme.surface,
          "--project-intro-surface-deep": item.introTheme.surfaceDeep,
          "--project-intro-title": item.introTheme.title,
          "--project-intro-body": item.introTheme.body,
          "--project-intro-muted": item.introTheme.muted,
          "--project-intro-accent": item.introTheme.accent,
          "--project-intro-rule": item.introTheme.rule,
          "--project-intro-shadow": item.introTheme.shadow,
        } as CSSProperties}
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
          <div className="project-detail-identity">
            <span>BUSINESS CASE</span>
            <strong>{collection.title}</strong>
          </div>
          <div className="project-detail-controls">
            <span className="project-detail-collection-progress">
              COLLECTION {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => { setKeyboardNavigation(false); onNavigate(-1); }} aria-label="上一个项目">
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => { setKeyboardNavigation(false); onNavigate(1); }} aria-label="下一个项目">
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button className="project-detail-close" type="button" onClick={requestClose} aria-label="关闭项目详情">
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </header>

        <nav className="project-detail-projects" aria-label={`${collection.title}项目切换`}>
          <div className="project-detail-projects-label">
            <span>项目索引</span>
            <strong>{String(collection.projects.length).padStart(2, "0")} 个项目</strong>
          </div>
          <div className="project-detail-project-tabs">
            {collection.projects.map((project, index) => (
              <button
                className={projectIndex === index ? "is-active" : ""}
                type="button"
                aria-current={projectIndex === index ? "page" : undefined}
                onClick={() => {
                  setKeyboardNavigation(false);
                  onSelectProject(index);
                }}
                key={`${collection.id}-${project.index}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="project-detail-project-tab-copy">
                  <strong>{project.title}</strong>
                  <small>{project.english}</small>
                </span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="project-detail-layout"
            key={`${collection.id}-${item.index}`}
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
              <div className="project-detail-intro">
                <div className="project-detail-meta" aria-label="项目基本信息">
                  <span>{item.category}</span>
                  <span>{item.year}</span>
                  <span>{item.role}</span>
                </div>
                <div className="project-detail-title">
                  <small>{item.english}</small>
                  <h2 id={titleId}>{item.title}</h2>
                </div>
                <p className="project-detail-summary" id={summaryId}>{item.summary}</p>
              </div>

              <ProjectStoryLead item={item} onImageOpen={openImage} />
              <ProjectCommerceImpact item={item} />

              {item === projectShowcaseItems[0] ? (
                <SmartLivingCaseStudy onImageOpen={openImage} />
              ) : item === projectShowcaseItems[1] ? (
                <TableFanCaseStudy onImageOpen={openImage} />
              ) : item === projectShowcaseItems[2] ? (
                <GlacierCleanserCaseStudy onImageOpen={openImage} />
              ) : item === projectShowcaseItems[3] ? (
                <SerumCaseStudy onImageOpen={openImage} />
              ) : item === projectShowcaseItems[4] ? (
                <QinglanTeaCaseStudy onImageOpen={openImage} />
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
      aria-label={`查看代表项目：${coverProject.title}，该方向共${item.projects.length}个项目`}
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
        <strong>{coverProject.title}</strong>
        <em>{item.title} / {item.english}</em>
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
            Business Evidence
          </span>
          <h2 id="project-showcase-title">
            <span>商业</span>
            <span>案例</span>
          </h2>
          <div className="project-showcase-heading-meta">
            <strong>FLAGSHIP BUSINESS CASES</strong>
            <span>EIGHT PROBLEMS / SIX INDUSTRIES</span>
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
          <p>CONTROLLED AI WORKFLOW</p>
          <h2 id="ai-lab-title">
            <span>AI 扩大可能</span>
            <span>判断守住结果</span>
          </h2>
          <p className="ai-lab-intro">
            先锁定不能改变的产品与品牌信息，再扩大机位、场景、人物和光线变量，最后只让通过人工审核的内容进入商业触点。
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
            <strong>同一产品，四种时段，身份始终一致</strong>
            <span>固定产品结构 / 扩展光线变量 / 审核商业可用性</span>
          </figcaption>
        </motion.figure>

        <div className="ai-lab-workflow" aria-label="AI 商业视觉工作流">
          {['商业命题', '识别锚点', '变量扩展', '人工审核', '触点交付'].map((step) => (
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

const mobileExperienceGateSessionKey = "xj-portfolio-mobile-gate-dismissed";

function MobileExperienceGate() {
  const isNarrowViewport = useViewportMatch("(max-width: 820px)");
  const usesTouchPointer = useViewportMatch("(hover: none) and (pointer: coarse)");
  const dialogRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return window.sessionStorage.getItem(mobileExperienceGateSessionKey) === "true";
    } catch {
      return false;
    }
  });
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const visible = isNarrowViewport && usesTouchPointer && !dismissed;

  useDocumentScrollLock(visible);

  useEffect(() => {
    if (!visible) return;
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
  }, [visible]);

  const continueOnMobile = () => {
    try {
      window.sessionStorage.setItem(mobileExperienceGateSessionKey, "true");
    } catch {
      // The current in-memory choice still dismisses the prompt when storage is unavailable.
    }
    setDismissed(true);
  };

  const copyCurrentLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  const keepFocusInsideDialog = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
    if (!buttons?.length) return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!visible) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="mobile-experience-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-experience-gate-title"
      aria-describedby="mobile-experience-gate-description"
      onKeyDown={keepFocusInsideDialog}
    >
      <img className="mobile-experience-gate-media" src="/assets/hero-poster.png" alt="" aria-hidden="true" />
      <span className="mobile-experience-gate-shade" aria-hidden="true" />

      <header className="mobile-experience-gate-brand">
        <span>XJ</span>
        <div>
          <strong>谢敬淳作品集</strong>
          <small>AI COMMERCE / ART DIRECTION</small>
        </div>
      </header>

      <section className="mobile-experience-gate-copy">
        <span>DESKTOP EXPERIENCE</span>
        <h1 id="mobile-experience-gate-title">建议使用桌面端查看</h1>
        <p id="mobile-experience-gate-description">
          本作品集包含大尺寸视觉、滚动叙事与交互细节。使用电脑浏览器可以获得更完整的观看体验。
        </p>
      </section>

      <footer className="mobile-experience-gate-actions">
        <button className="mobile-experience-gate-copy-link" type="button" onClick={copyCurrentLink}>
          {copyStatus === "copied" ? "链接已复制" : "复制链接，稍后在电脑打开"}
        </button>
        <button className="mobile-experience-gate-continue" type="button" onClick={continueOnMobile}>
          仍然使用移动端浏览
        </button>
        <p aria-live="polite">
          {copyStatus === "failed" ? "复制失败，请手动复制浏览器地址。" : "继续浏览后，本次访问不再重复提示。"}
        </p>
      </footer>
    </div>,
    document.body,
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
        <Footer />
      </main>
      <MobileExperienceGate />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
