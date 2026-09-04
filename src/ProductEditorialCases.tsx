import { useState, type CSSProperties, type ReactNode } from "react";
import sizes from "./case-image-sizes.json";

type Visual = { src: string; alt: string; caption?: string };
type Chapter = { title: string; description: string; rows: Visual[][]; kind?: "scenes" | "details" };
type Case = {
  name: string; label: string; title: string; intro: string; task: string; approach: string;
  opening: Visual; chapters: Chapter[]; channels: [string, string][]; conclusion: string; disclosure?: string;
};
type Props = { renderImage: (src: string, alt: string) => ReactNode };
const media = (folder: string, file: string, alt: string, caption?: string): Visual => ({src: `/assets/projects/${folder}/${file}.webp`, alt, caption});
const air = (file: string, alt: string, caption?: string) => media("air-fryer", `air-fryer-${file}`, alt, caption);
const fan = (file: string, alt: string, caption?: string) => media("table-fan", `table-fan-${file}`, alt, caption);
const tea = (file: string, alt: string, caption?: string) => media("qinglan-tea", `qinglan-${file}`, alt, caption);
const gel = (file: string, alt: string, caption?: string) => media("glacier-cleanser", `glacier-${file}`, alt, caption);
const serum = (file: string, alt: string, caption?: string) => media("serum", `serum-${file}`, alt, caption);

const cases: Record<string, Case> = {
  air: {
    name: "空气炸锅", label: "智能厨电 / 商品视觉企划", title: "先有食欲，\n再有下厨的欲望。",
    intro: "金黄酥壳、刚出锅的热气与一桌分享的食物，让一台厨房电器拥有具体的生活吸引力。",
    task: "让消费者从“想吃”继续了解“怎么做”，将食物结果与易操作、易清洁的体验连接起来。",
    approach: "用暖色食物建立点击入口，用自然厨房光线呈现操作与餐桌，再以结构细节支持商品理解。",
    opening: air("hero", "快炸锁嫩空气炸锅与金黄炸鸡商业主图"),
    chapters: [
      {title: "酥脆，是第一眼的语言。", description: "近景表现外壳纹理，俯拍铺开一餐的丰富度。两种尺度分别服务食欲吸引与家庭分享。", rows: [[air("crispy", "外脆里嫩食物结果主图", "食欲特写 / 酥壳与切面"), air("table", "速享美味餐桌俯拍主图", "餐桌全景 / 一餐的丰盛感")]]},
      {title: "不止一顿炸物，也是一种下厨方式。", description: "深色厨房中的效率感与明亮空间中的轻食选择，形成不同消费动机。产品始终保持同一识别。", rows: [[air("smart-cook", "智控美味厨房商业画面"), air("light-crisp", "轻脂酥脆明亮厨房商业画面")]]},
      {title: "从旋钮，到打开炸篮。", description: "控制近景解释交互，抽拉动作解释使用；让商品细节和真实操作接续出现。", kind: "details", rows: [[air("control", "旋控美学旋钮细节商业图", "控制细节"), air("operation", "轻松开炸打开炸篮操作图", "使用动作")]]},
      {title: "回到厨房，完成一餐的闭环。", description: "产品、出餐与清洁分别承担不同信息。生活影像独立成组，保留食物、手势和台面的真实关系。", kind: "scenes", rows: [[air("reference", "厨房台面上的空气炸锅与食材", "备餐 / 食物与机身的尺度关系")], [air("lifestyle", "女性在厨房中取用空气炸锅食物", "分享 / 从出锅到餐桌"), air("cleaning", "水槽中清洗可拆卸炸篮", "清洁 / 回答使用后的顾虑")]]},
      {title: "一台产品，贯穿所有画面。", description: "正面、侧面与顶面展示旋钮、炸篮和把手的结构关系，为整套商品内容建立稳定识别。", kind: "details", rows: [[air("views", "空气炸锅正面侧面顶面视图")]]},
    ],
    channels: [["商品主图", "以食物质感与醒目标题建立第一眼吸引。"], ["详情承接", "由功能和操作推进到清洁，解释完整使用体验。"], ["生活传播", "以厨房与餐桌延展内容，不重复堆叠商品图。"]],
    conclusion: "从食欲出发，把一次点击带入完整的厨房体验。",
  },
  fan: {
    name: "空气循环扇", label: "智能家居 / 自主命题", title: "让看不见的风，\n有可感知的体感。",
    intro: "风不是一条抽象光线，而是房间里的流动、翻动的书页，以及睡前安静的一刻。",
    task: "把循环送风、空间覆盖与夜间低扰转化为可观察的生活利益，建立区别于普通风扇的商品认知。",
    approach: "以空间解释循环，以轻动的织物解释体感，以晨晚光线区分使用场合。",
    opening: fan("room-circulation", "清风穿过房间空气循环扇商业主视觉"),
    chapters: [
      {title: "让风在屋里走，而不只吹向一个人。", description: "远距画面展示风与空间的关系；家庭场景将功能落回阅读、陪伴与居家活动。", rows: [[fan("circulation-distance", "十二米远距循环送风功能图", "空间覆盖 / 将参数变成空间印象")], [fan("family", "母亲陪伴孩子阅读的循环扇家居场景", "居家体感 / 风进入日常活动")]]},
      {title: "桌面上的分寸，指尖上的简单。", description: "俯拍说明桌面占用，手部近景说明按键操作。画面由整体尺度转向具体交互。", kind: "details", rows: [[fan("m02", "桌面清风风扇俯拍与物品布局", "桌面尺度"), fan("m01", "一键清风手指操作底座按键", "按键操作")], [fan("m03", "轻盈织物随循环风摆动", "织物 / 以轻动表现风"), fan("m06", "书页与空气流动轨迹商业画面", "书页 / 让体感有观察对象")]]},
      {title: "入夜以后，画面也安静下来。", description: "降低环境亮度与信息密度，让低扰运行的概念主张与睡眠场景相互支持。", rows: [[fan("sleep-specs", "夜间低扰运行及定时功能商业图"), fan("night-detail", "夜间循环扇状态灯与机身细节")]]},
      {title: "同一台风扇，陪伴不同时间。", description: "晨间、日间、傍晚与夜间以连续光线形成系列，而不是换一处背景重复同一张主图。", kind: "scenes", rows: [[fan("dayparts", "空气循环扇晨间日间傍晚夜间四时段画面")]]},
      {title: "结构清晰，系列才有统一识别。", description: "保留网罩、俯仰支架与底座的完整关系，让功能表达建立在清晰的产品形态上。", kind: "details", rows: [[fan("views", "空气循环扇三视图与结构展示")]]},
    ],
    channels: [["功能首图", "空间循环建立差异，规格信息形成阅读重点。"], ["场景内容", "家庭、桌面与夜间对应不同使用动机。"], ["商品详情", "结构与操作补齐消费者需要观察的细节。"]],
    conclusion: "以空间、时间与生活动作，把硬件功能转化为体验。",
    disclosure: "自主命题概念产品；画面中的送风距离、风量与噪声数据为概念规格，不作为实测性能或认证。",
  },
  jasmine: {
    name: "青岚茉莉绿茶", label: "新消费饮品 / 自主品牌企划", title: "零糖之外，\n还有一口真茶香。",
    intro: "清透茶汤、茉莉花香与竹青包装共同建立新品识别，让无糖饮品从成分选择走向风味选择。",
    task: "把“无糖”从基础信息转化为可记忆的新品主张，并让花香、口感和饮用时刻成为进一步了解的理由。",
    approach: "主图建立零糖真茶香心智，原叶与茶汤解释风味，轻食、运动和通勤拓展消费场合。",
    opening: tea("commerce-core", "零糖也有真茶香茉莉绿茶品牌主图"),
    chapters: [
      {title: "清爽不靠甜，花香有记忆。", description: "零糖利益与茉莉风味分开表达：一张解除甜腻顾虑，一张建立轻盈茶感。", rows: [[tea("commerce-zero-sugar", "清爽不靠甜零糖利益主图"), tea("commerce-flavor", "花香轻茶感净风味主图")]]},
      {title: "从原叶，到冰过的一口。", description: "原叶说明风味来源，冰桶与摇匀动作唤起即饮欲望。让品牌来源与饮用体验各有视觉重点。", rows: [[tea("square-original-leaf", "原叶见真章茶园品牌视觉"), tea("square-ice-bucket", "冰桶中的茉莉绿茶清凉主图")], [tea("square-shake-awake", "摇醒茶香饮用动作商业图")]]},
      {title: "一瓶茶，进入不同生活节奏。", description: "花园轻饮、随手带走与风中茶香采用不同构图，分别承接休闲、出行与情绪传播。", rows: [[tea("square-light-sip-garden", "花园轻饮茉莉茶商业图", "休闲 / 轻饮时刻"), tea("square-grab-and-go", "随手带走茉莉茶商业图", "出行 / 即饮选择"), tea("square-wind-aroma", "风中茉莉茶香商业图", "情绪 / 花香记忆")]]},
      {title: "回到茶汤、包装与自然光。", description: "无文案产品影像独立呈现。近距离开盖、透明茶汤和植物材质，建立饮品可感知的清新质地。", kind: "scenes", rows: [[tea("scene-studio-reference", "茉莉绿茶完整瓶身与标签", "包装识别"), tea("open-cap", "手部拧开茉莉绿茶瓶盖", "饮用动作"), tea("scene-botanical-flatlay", "茉莉绿茶与植物原料平铺", "植物与色彩")], [tea("scene-water-stone", "水面石台上的茉莉绿茶产品")]]},
      {title: "从茶园晨光，走入城市的一天。", description: "茶园建立自然来源，晨间与运动提供轻盈体验，轻食、阅读和通勤让产品进入不同日常。", kind: "scenes", rows: [[tea("scene-tea-garden-sunrise", "晨光茶园中的茉莉绿茶")], [tea("scene-morning-window", "晨间窗边的茉莉茶饮", "晨间"), tea("scene-light-fitness", "轻运动后的茉莉茶饮", "运动"), tea("scene-urban-commute", "城市通勤中的茉莉茶饮", "通勤")], [tea("scene-light-lunch", "轻食餐桌上的茉莉茶饮", "佐餐"), tea("scene-reading-afternoon", "午后阅读中的茉莉茶饮", "独处")]]},
    ],
    channels: [["新品认知", "用零糖真茶香形成鲜明的商品主张。"], ["饮用欲望", "冰感、开盖和茶汤把抽象风味转为具体体验。"], ["场景传播", "六种生活时刻连接不同兴趣与消费入口。"]],
    conclusion: "由一瓶的风味识别，建立能够延展为一系的品牌表达。",
  },
  glacier: {
    name: "GLACIER 洁面啫喱", label: "个人护理 / 自主命题", title: "清洁有力度，\n肤感要轻盈。",
    intro: "透明瓶身与流动啫喱构成清透识别。围绕混合偏油肌的晨晚需求，把清洁对象、使用步骤与洗后感受逐层展开。",
    task: "让消费者看懂适用肤质与早晚清洁场合，并从质地与动作中建立使用想象。",
    approach: "冷色水感建立清爽主张；质地近景、人物与步骤图依次解释为什么需要、如何使用和洗后体验。",
    opening: gel("commerce-positioning", "GLACIER 洁面啫喱产品定位商业主图"),
    chapters: [
      {title: "早晨的油光，晚间的防晒与淡妆。", description: "两种清洁场合采用独立的视觉证据，让早晚需求先于配方术语被理解。", rows: [[gel("commerce-oil-control", "晨间控油清洁概念商业图", "晨洁需求"), gel("commerce-makeup", "晚间防晒淡妆清洁概念商业图", "晚洁需求")]]},
      {title: "看见质地，也看懂取用。", description: "啫喱近景保留透明度与流动感，泵头画面呈现手部、出口与取用量的关系。", kind: "details", rows: [[gel("commerce-gel", "透明啫喱质地商业图"), gel("commerce-pump", "泵头按压取用洁面啫喱商业图")]]},
      {title: "从清洁对象，到洗后的脸。", description: "毛孔观察、洁面步骤与洗后擦干连续展开，让详情从功效主张推进到具体使用。", rows: [[gel("commerce-pores", "毛孔与清洁需求商业图", "清洁对象"), gel("commerce-routine", "洁面使用步骤商业图", "使用方法"), gel("commerce-after-wash", "洗后擦干与肤感商业图", "洗后感受")]]},
      {title: "晨晚有顺序，信息有依据。", description: "晨晚路径组织使用建议，验证模块展示功效信息的层级与阅读方式。概念信息与实际检测结论明确区分。", rows: [[gel("commerce-day-night", "晨晚洁面路径商业图"), gel("commerce-proof", "洁面功效概念验证信息排版")]]},
      {title: "透明包装，统一清透感。", description: "瓶身、标签与泵头以完整视图收束，保持同一产品在场景与商业主图中的辨识度。", kind: "details", rows: [[gel("views", "GLACIER 洁面产品正面侧面与泵头视图")]]},
    ],
    channels: [["首图吸引", "清透视觉与肤质需求建立商品定位。"], ["详情说服", "晨晚对象、质地与动作形成连续解释。"], ["使用承接", "步骤、肤感与信息模块支持进一步了解。"]],
    conclusion: "十张商业画面，让清洁主张落到可理解的日常体验。",
    disclosure: "自主命题概念产品。配方浓度、8H 与测试结果用于商业信息设计演示，不代表实际上市功效或认证。",
  },
  serum: {
    name: "LUMINOSE 精华液", label: "护肤精华 / 自主命题", title: "一滴的质地，\n一天的护理想象。",
    intro: "琥珀玻璃、金色液滴与柔和肤光，形成温润的精华识别。围绕都市缺水暗沉需求，让成分、触感与护理动作相互支持。",
    task: "让消费者在亮采主张之外，看清精华的质地、上脸方式与晨晚使用位置。",
    approach: "人物建立需求代入，液滴微距呈现触感，再用按压动作与晨晚搭配解释护理路径。",
    opening: serum("commerce-positioning", "一滴轻润透亮有光精华定位主图"),
    chapters: [
      {title: "先回应倦容，再解释成分。", description: "人物表达消费者能够代入的状态，成分画面将护理主张转化为有层次的信息。", rows: [[serum("commerce-audience", "都市肌肤倦容需求人物商业图", "人群需求"), serum("commerce-hydration", "玻尿酸与维C概念成分商业图", "成分主张")]]},
      {title: "轻润，不只是一句形容。", description: "液滴与铺展的近景表现质地，人物按压动作说明上脸方式。暖光与皮肤纹理共同保留真实触感。", kind: "details", rows: [[serum("commerce-texture", "精华液滴与轻润质地商业图"), serum("commerce-application", "女性按压涂抹精华的护理动作")]]},
      {title: "晨间与夜间，都有明确的位置。", description: "晨晚搭配说明护理场合，配方与用法完成信息收束，让产品从单张广告进入完整的使用计划。", rows: [[serum("commerce-day-night", "精华晨晚护理搭配商业图"), serum("commerce-formula", "精华配方与使用说明商业图")]]},
      {title: "以温润包装，延续同一气质。", description: "琥珀瓶身、滴管与标签保持一致，在成分、人物和生活光线之间建立稳定识别。", kind: "details", rows: [[serum("views", "LUMINOSE 精华液正面侧面包装视图")]]},
    ],
    channels: [["商品定位", "温润液滴与亮采主张建立视觉记忆。"], ["护理理解", "人群、成分与质地解释选择理由。"], ["使用指导", "上脸动作与晨晚搭配完善详情阅读。"]],
    conclusion: "让精华的价值，从一滴液体延伸到完整护理时刻。",
    disclosure: "自主命题概念产品。配方与功效信息为设计演示，实际发布应依据最终配方及检测资料。",
  },
};

const dimensions = sizes as Record<string, number[]>;
function CaseVisual({ visual, renderImage }: Props & {visual: Visual}) {
  const [width, height] = dimensions[visual.src] || [1, 1];
  return <figure className="editorial-visual">
    <div className="editorial-media" style={{aspectRatio: `${width} / ${height}`}}>{renderImage(visual.src, visual.alt)}</div>
    {visual.caption && <figcaption>{visual.caption}</figcaption>}
  </figure>;
}

export function ProductEditorialCase({kind, renderImage}: Props & {kind: string}) {
  const item = cases[kind];
  return <article className={`editorial-case editorial-${kind}`} aria-label={`${item.name}商业视觉案例`}>
    <section className="editorial-opening" aria-labelledby={`${kind}-positioning`}>
      <CaseVisual visual={item.opening} renderImage={renderImage} />
      <div className="editorial-brief">
        <span className="editorial-kicker">{item.label}</span><h3 id={`${kind}-positioning`}>{item.title}</h3><p className="editorial-lead">{item.intro}</p>
        <dl><div><dt>商业课题</dt><dd>{item.task}</dd></div><div><dt>视觉策略</dt><dd>{item.approach}</dd></div></dl>
      </div>
    </section>
    {item.chapters.map((chapter, index) => <section className={`editorial-chapter is-${chapter.kind || "campaign"}`} key={chapter.title} aria-labelledby={`${kind}-chapter-${index}`}>
      <header className="editorial-heading"><h3 id={`${kind}-chapter-${index}`}>{chapter.title}</h3><p>{chapter.description}</p></header>
      <div className="editorial-rows">{chapter.rows.map((row) => <div className={`editorial-row has-${row.length}`} key={row[0].src} style={{"--media-columns": row.map(v => {const d = dimensions[v.src] || [1,1]; return `${d[0]/d[1]}fr`;}).join(" ")} as CSSProperties}>{row.map(visual => <CaseVisual key={visual.src} visual={visual} renderImage={renderImage} />)}</div>)}</div>
    </section>)}
    <section className="editorial-delivery" aria-label="商业内容分工"><div className="editorial-channel-grid">{item.channels.map(([title, description]) => <div key={title}><h4>{title}</h4><p>{description}</p></div>)}</div><p className="editorial-conclusion">{item.conclusion}</p>{item.disclosure && <small className="editorial-disclosure">{item.disclosure}</small>}</section>
  </article>;
}

export function PublishingEditorialCase({renderImage}: Props) {
  const [expanded, setExpanded] = useState(false);
  return <article className="editorial-case editorial-publishing" aria-label="安徒生童话立体剧场书商业设计案例">
    <section className="editorial-opening">
      <CaseVisual visual={{src: "/assets/works/commerce-andersen-thumb.jpg", alt: "安徒生童话立体剧场书礼盒与内页商业首屏"}} renderImage={renderImage} />
      <div className="editorial-brief"><span className="editorial-kicker">文化出版 / 图书电商详情</span><h3>翻开一本书，<br />走进一座小剧场。</h3><p className="editorial-lead">立体展开的童话场景是产品最直接的吸引力。让孩子的阅读兴趣与家长的选购判断，在同一条详情中相遇。</p><dl><div><dt>商业课题</dt><dd>将立体结构、故事内容与礼盒价值讲清楚，让图书从封面展示走向阅读体验。</dd></div><div><dt>视觉策略</dt><dd>以展开内页制造第一眼吸引，用故事分场、亲子阅读与装帧细节逐步完善购买信息。</dd></div></dl></div>
    </section>
    <section className="editorial-chapter">
      <header className="editorial-heading"><h3>一条详情，两种阅读视角。</h3><p>孩子看见故事的场景，家长看见阅读方式与产品细节。内容由吸引走向了解，再进入礼赠和选购信息。</p></header>
      <div className="publishing-reading-map"><article><span>故事吸引</span><h4>立体场景与经典童话</h4><p>展开结构与角色插画把阅读内容变成可观察的世界。</p></article><article><span>阅读体验</span><h4>注音、互动与亲子共读</h4><p>内页细节和人物场景说明书怎样被翻阅、理解和分享。</p></article><article><span>选购承接</span><h4>礼盒、装帧与图书信息</h4><p>用实拍与规格完成商品说明，保留详情的完整阅读链路。</p></article></div>
    </section>
    <section className="editorial-chapter publishing-full-case">
      <header className="editorial-heading"><h3>完整详情，按原稿阅读。</h3><p>保留原始纵向编排与文字尺度。展开后可连续浏览故事、互动、礼赠与实拍模块。</p></header>
      <button className="editorial-expand" aria-expanded={expanded} aria-controls="publishing-original" onClick={() => setExpanded(!expanded)}>{expanded ? "收起完整详情" : "展开完整详情"}<span>原稿 790 × 17835</span></button>
      <div id="publishing-original" hidden={!expanded}>{expanded && <img className="publishing-original-image" src="/assets/works/commerce-andersen-long.jpg" width="790" height="17835" alt="安徒生童话立体剧场书完整电商详情，包括故事、阅读、礼盒、装帧与图书信息" loading="lazy" />}</div>
    </section>
    <section className="editorial-delivery"><p className="editorial-conclusion">让阅读兴趣先发生，再让商品信息完整承接。</p></section>
  </article>;
}
