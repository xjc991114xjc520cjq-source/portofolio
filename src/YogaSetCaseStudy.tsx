import { useState, type CSSProperties, type ReactNode } from "react";
import { ArchiveToggle } from "./CaseExtensions";

type Props = { renderImage: (src: string, alt: string) => ReactNode };
type Visual = { src: string; alt: string; width: number; height: number };

const visuals = {
  focus: { src: "/assets/projects/yoga-set/yoga-commerce-focus.webp", alt: "不对称自成焦点瑜伽套装核心电商主视觉", width: 2200, height: 2200 },
  asymmetry: { src: "/assets/projects/yoga-set/yoga-commerce-asymmetry.webp", alt: "米灰撞色与不对称剪裁瑜伽套装电商主图", width: 2200, height: 2200 },
  commerceTop: { src: "/assets/projects/yoga-set/yoga-commerce-top-detail.webp", alt: "瑜伽上衣立体包覆与单侧抽绳细节电商图", width: 2200, height: 2200 },
  commerceBack: { src: "/assets/projects/yoga-set/yoga-commerce-back.webp", alt: "瑜伽上衣交叉露背与可调系带电商图", width: 2200, height: 2200 },
  commerceWaist: { src: "/assets/projects/yoga-set/yoga-commerce-waist.webp", alt: "瑜伽裤斜叠腰头与弧形拼接细节电商图", width: 2200, height: 2200 },
  drawstring: { src: "/assets/projects/yoga-set/yoga-commerce-drawstring.webp", alt: "瑜伽上衣单侧抽绳调节电商图", width: 2200, height: 2200 },
  frontBack: { src: "/assets/projects/yoga-set/yoga-commerce-front-back.webp", alt: "瑜伽套装不对称正面与交叉露背双面展示", width: 2200, height: 2200 },
  stretch: { src: "/assets/projects/yoga-set/yoga-commerce-stretch.webp", alt: "侧角伸展动作中的瑜伽套装线条表现", width: 2200, height: 2200 },
  pilates: { src: "/assets/projects/yoga-set/yoga-commerce-pilates.webp", alt: "普拉提器械训练中的瑜伽套装商业画面", width: 2200, height: 2200 },
  everyday: { src: "/assets/projects/yoga-set/yoga-commerce-everyday.webp", alt: "瑜伽套装从训练场走进日常的城市商业画面", width: 2200, height: 2200 },
  after: { src: "/assets/projects/yoga-set/yoga-commerce-after.webp", alt: "训练后叠穿针织外套的瑜伽套装生活方式画面", width: 2200, height: 2200 },
  lakesideCommerce: { src: "/assets/projects/yoga-set/yoga-commerce-lakeside.webp", alt: "晨雾湖畔舒展动作瑜伽套装电商视觉", width: 2200, height: 2200 },
  campaignWide: { src: "/assets/projects/yoga-set/yoga-commerce-campaign-wide.webp", alt: "让设计跟着身体流动瑜伽套装横向广告视觉", width: 2200, height: 1238 },
  masterFront: { src: "/assets/projects/yoga-set/yoga-master-front.webp", alt: "米色上衣与墨岩灰瑜伽裤正面产品母版", width: 1761, height: 2200 },
  masterBack: { src: "/assets/projects/yoga-set/yoga-master-back.webp", alt: "交叉露背与系带结构瑜伽套装背面母版", width: 1761, height: 2200 },
  pilatesEditorial: { src: "/assets/projects/yoga-set/yoga-pilates-editorial.webp", alt: "普拉提器械上的瑜伽套装自然坐姿", width: 1761, height: 2200 },
  parkWide: { src: "/assets/projects/yoga-set/yoga-park-stretch-wide.webp", alt: "城市湖畔公园侧弓步伸展中的米灰瑜伽套装", width: 2200, height: 1238 },
  studioBack: { src: "/assets/projects/yoga-set/yoga-studio-back.webp", alt: "瑜伽教室中的套装背面与侧后方结构", width: 1761, height: 2200 },
  homeStretch: { src: "/assets/projects/yoga-set/yoga-home-stretch.webp", alt: "居家地垫坐姿侧伸展中的瑜伽套装", width: 1761, height: 2200 },
  lakesideBalance: { src: "/assets/projects/yoga-set/yoga-lakeside-balance.webp", alt: "湖畔树式平衡动作中的瑜伽套装", width: 1761, height: 2200 },
  topDetail: { src: "/assets/projects/yoga-set/yoga-top-detail.webp", alt: "瑜伽上衣不对称肩带与侧边抽绳近景", width: 2200, height: 2200 },
  gymWide: { src: "/assets/projects/yoga-set/yoga-gym-stretch-wide.webp", alt: "现代训练空间中的侧向伸展与完整套装", width: 2200, height: 1238 },
  architecture: { src: "/assets/projects/yoga-set/yoga-architecture-look.webp", alt: "现代建筑光影中的米灰撞色瑜伽套装全身造型", width: 1650, height: 2200 },
  waistDetail: { src: "/assets/projects/yoga-set/yoga-waist-detail.webp", alt: "瑜伽裤斜向腰线与米灰拼接近景", width: 2200, height: 2200 },
  citySteps: { src: "/assets/projects/yoga-set/yoga-city-steps.webp", alt: "城市台阶场景中的瑜伽套装运动叠穿", width: 1761, height: 2200 },
  indoorLunge: { src: "/assets/projects/yoga-set/yoga-indoor-lunge.webp", alt: "室内训练空间中的跪姿弓步与套装侧面", width: 1761, height: 2200 },
  cafePortrait: { src: "/assets/projects/yoga-set/yoga-cafe-portrait.webp", alt: "咖啡空间休息场景中的瑜伽套装叠穿", width: 1761, height: 2200 },
  cafeWide: { src: "/assets/projects/yoga-set/yoga-cafe-wide.webp", alt: "训练后进入咖啡空间的瑜伽套装横向生活方式画面", width: 2200, height: 1228 },
} satisfies Record<string, Visual>;

const archive = [
  visuals.asymmetry,
  visuals.drawstring,
  visuals.frontBack,
  visuals.pilatesEditorial,
  visuals.lakesideBalance,
  visuals.indoorLunge,
  visuals.cafePortrait,
];

export function YogaSetCaseStudy({ renderImage }: Props) {
  const [showMore, setShowMore] = useState(false);
  const visual = (item: Visual, caption?: string, className = "") => (
    <figure className={`yoga-figure${className ? ` ${className}` : ""}`} key={item.src}>
      <div className="yoga-media" style={{ "--yoga-ratio": `${item.width} / ${item.height}` } as CSSProperties}>
        {renderImage(item.src, item.alt)}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );

  return (
    <article className="yoga-case" aria-label="瑜伽套装时尚商业视觉案例">
      <section className="yoga-opening" aria-labelledby="yoga-positioning-title">
        {visual(visuals.focus)}
        <div className="yoga-opening-copy">
          <span className="yoga-kicker">FUNCTIONAL FASHION / 自主命题</span>
          <h3 id="yoga-positioning-title">让功能服饰，<br />先拥有设计记忆。</h3>
          <p className="yoga-lead">以米色与墨岩灰的斜向撞色建立第一眼识别，让不对称肩带、单侧抽绳和交叉露背，在训练与日常之间保持同一套视觉语言。</p>
          <dl className="yoga-brief">
            <div><dt>商业课题</dt><dd>跳出基础瑜伽套装的同质化外观，同时让消费者清楚看见正背结构、腰线和穿着场景。</dd></div>
            <div><dt>创意策略</dt><dd>先锁定版型母版，再用伸展动作检验识别连续性，最后把训练穿着延展至城市生活。</dd></div>
            <div><dt>设计职责</dt><dd>产品视觉定义、版型与配色控制、动作与场景策划、电商套图及渠道编排。</dd></div>
          </dl>
        </div>
      </section>

      <section className="yoga-chapter yoga-form" aria-labelledby="yoga-form-title">
        <header className="yoga-heading">
          <span className="yoga-kicker">01 / FORM LANGUAGE</span>
          <h3 id="yoga-form-title">先把一套衣服，<br />变成可复述的设计语言。</h3>
          <p>正面用不对称肩带与弧形撞色制造重心，背面以交叉露背和可调系带完成转身后的识别。斜向结构从上衣延续到裤装，避免上下装各说各话。</p>
        </header>
        <div className="yoga-master-pair">
          {visual(visuals.masterFront, "FRONT / 不对称肩带、侧腰抽绳与斜叠腰头")}
          {visual(visuals.masterBack, "BACK / 交叉露背、系带收束与背部留白")}
        </div>
        <div className="yoga-design-notes">
          <article><span>01</span><h4>不对称上衣</h4><p>宽窄肩带错落，让胸前保持完整，不依赖多余拉链与中央拼缝。</p></article>
          <article><span>02</span><h4>可调节侧腰</h4><p>抽绳收束成为功能动作，也是贯穿主视觉的造型节点。</p></article>
          <article><span>03</span><h4>弧形撞色腰线</h4><p>米色覆片沿身体斜向展开，把上下装连接成一条连续轨迹。</p></article>
        </div>
      </section>

      <section className="yoga-chapter yoga-details" aria-labelledby="yoga-detail-title">
        <header className="yoga-heading">
          <span className="yoga-kicker">02 / PRODUCT EVIDENCE</span>
          <h3 id="yoga-detail-title">消费者需要的，<br />不只是“看起来显瘦”。</h3>
          <p>通过近景、侧后方与图文成片，分别解释包覆、抽绳、腰头和露背；把设计差异拆成能够被理解的购买理由。</p>
        </header>
        <div className="yoga-detail-grid">
          {visual(visuals.commerceTop, "上衣 / 立体包覆与单侧收束", "is-featured")}
          {visual(visuals.commerceWaist, "裤装 / 斜叠腰头与弧形拼接")}
          {visual(visuals.commerceBack, "背部 / 交叉露背与可调系带")}
          {visual(visuals.topDetail, "结构近景 / 不对称肩带与侧腰节点")}
          {visual(visuals.waistDetail, "材质近景 / 米灰拼接与自然贴合")}
          {visual(visuals.studioBack, "转身观察 / 背部结构保持完整")}
        </div>
      </section>

      <section className="yoga-motion" aria-labelledby="yoga-motion-title">
        <header className="yoga-heading">
          <span className="yoga-kicker">03 / IN MOTION</span>
          <h3 id="yoga-motion-title">设计，要跟得上身体。</h3>
          <p>把站姿母版放进侧伸展、普拉提、坐姿拉伸与大幅度横向动作。每个机位都保留肩带、抽绳与腰线三组识别锚点，让动态画面仍然属于同一件产品。</p>
        </header>
        <div className="yoga-motion-lead">
          {visual(visuals.stretch, "侧角伸展 / 斜向动作与版型线条同向")}
          {visual(visuals.pilates, "普拉提 / 器械关系补充专业训练语境")}
        </div>
        <div className="yoga-motion-wide">
          {visual(visuals.gymWide, "横向传播 / 大动作下仍保持完整套装识别")}
          <blockquote><span>BODY IN MOTION</span><strong>动作改变，<br />设计识别不变。</strong><p>从静态产品确认，到动作中的结构连续，再到可直接进入渠道的标题成片。</p></blockquote>
          {visual(visuals.homeStretch, "居家训练 / 坐姿与侧弯补充柔和节奏")}
        </div>
      </section>

      <section className="yoga-chapter yoga-life" aria-labelledby="yoga-life-title">
        <header className="yoga-heading">
          <span className="yoga-kicker">04 / BEYOND THE STUDIO</span>
          <h3 id="yoga-life-title">练完之后，<br />依然可以自然出场。</h3>
          <p>训练场证明专业语境，建筑、湖畔与咖啡空间扩展生活方式入口。轻外套、运动鞋和自然坐姿，让套装不只服务一小时课程，也进入一整天的穿着想象。</p>
        </header>
        <div className="yoga-life-grid">
          {visual(visuals.everyday, "CITY / 轻外套与运动包连接城市通勤")}
          {visual(visuals.after, "AFTER CLASS / 坐姿与针织叠穿建立松弛感")}
          {visual(visuals.lakesideCommerce, "MORNING / 湖畔舒展强化身体与环境的节奏")}
        </div>
        <div className="yoga-campaign-band">
          {visual(visuals.parkWide)}
          <div><span>CAMPAIGN LINE</span><h4>让设计，<br />跟着身体流动。</h4><p>以建筑弧线承接服装弧线，让人物、标题与空间共同完成构图。</p></div>
        </div>
      </section>

      <section className="yoga-chapter yoga-system" aria-labelledby="yoga-system-title">
        <header className="yoga-heading">
          <span className="yoga-kicker">05 / CHANNEL SYSTEM</span>
          <h3 id="yoga-system-title">同一套识别，<br />进入不同销售触点。</h3>
          <p>首图负责让消费者停下，详情图解释结构，动作图建立穿着想象，横幅承担站外传播。内容不是重复换背景，而是共同完成从注意到理解的路径。</p>
        </header>
        <div className="yoga-channel-map">
          <article><span>01 / ATTRACT</span><h4>商品首图</h4><p>完整轮廓、大标题与米灰撞色，在信息流中快速建立辨识度。</p></article>
          <article><span>02 / EXPLAIN</span><h4>详情承接</h4><p>正背、上衣、腰线和抽绳分开说明，让设计差异可被比较。</p></article>
          <article><span>03 / IMAGINE</span><h4>场景转化</h4><p>训练、户外与日常叠穿，扩展消费者对使用时段的想象。</p></article>
          <article><span>04 / SPREAD</span><h4>传播延展</h4><p>方图与横幅共享弧线、配色与标题节奏，维持统一商业身份。</p></article>
        </div>
        <div className="yoga-editorial-strip">
          {visual(visuals.citySteps, "城市台阶 / 动态叠穿与通勤运动入口")}
          {visual(visuals.architecture, "建筑光影 / 完整轮廓与高级感")}
          {visual(visuals.cafeWide, "训练之后 / 进入日常休息场景")}
        </div>
      </section>

      <section className="yoga-extensions" aria-labelledby="yoga-extension-title">
        <header className="yoga-heading">
          <span className="yoga-kicker">EXTENDED EDITS</span>
          <h3 id="yoga-extension-title">主线之外，<br />保留更多可调用画面。</h3>
          <p>补充双面展示、抽绳细节、器械训练、湖畔平衡与咖啡场景，便于后续按渠道比例与内容主题继续组合。</p>
        </header>
        <ArchiveToggle assets={archive} expanded={showMore} id="yoga-more-gallery" onClick={() => setShowMore(!showMore)} />
        <div id="yoga-more-gallery" hidden={!showMore}>
          {showMore ? <div className="yoga-archive-grid">{archive.map((item) => visual(item))}</div> : null}
        </div>
        <footer className="yoga-conclusion">
          <p>从版型母版到渠道成片，统一控制产品结构、身体动作、场景语境与标题构图。</p>
          <strong>让设计被记住，也让穿着被想象。</strong>
        </footer>
      </section>
    </article>
  );
}
