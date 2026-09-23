import { useState, type CSSProperties, type ReactNode } from "react";
import { ArchiveToggle } from "./CaseExtensions";

type Props = { renderImage: (src: string, alt: string, loading?: "eager" | "lazy") => ReactNode };

const assets = [
  { id: "hero", src: "/assets/projects/milo-stroller/milo-hero.jpg", alt: "Milo 婴儿推车展开与折叠状态产品主视觉", width: 3712, height: 4608, ratio: 3712 / 4608 },
  { id: "open", src: "/assets/projects/milo-stroller/milo-open.jpg", alt: "Milo 婴儿推车展开状态三分之四产品图", width: 3712, height: 4608, ratio: 3712 / 4608 },
  { id: "rear", src: "/assets/projects/milo-stroller/milo-rear.jpg", alt: "Milo 婴儿推车背面与置物篮产品图", width: 3712, height: 4608, ratio: 3712 / 4608 },
  { id: "front", src: "/assets/projects/milo-stroller/milo-front-detail.jpg", alt: "Milo 婴儿推车顶篷座舱与前轮产品图", width: 3712, height: 4608, ratio: 3712 / 4608 },
  { id: "canopy", src: "/assets/projects/milo-stroller/milo-canopy.jpg", alt: "Milo 婴儿推车顶篷遮阳近景", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "basket", src: "/assets/projects/milo-stroller/milo-basket.jpg", alt: "Milo 婴儿推车置物篮与后轮细节", width: 4096, height: 4096, ratio: 1 },
  { id: "openPoster", src: "/assets/projects/milo-stroller/milo-open-poster.jpg", alt: "Milo 婴儿推车展开状态电商主视觉", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "family", src: "/assets/projects/milo-stroller/milo-family.jpg", alt: "年轻父母与儿童使用 Milo 婴儿推车的家庭场景", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "foldedHome", src: "/assets/projects/milo-stroller/milo-folded-home.jpg", alt: "Milo 婴儿推车折叠后放入家庭玄关", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "structure", src: "/assets/projects/milo-stroller/milo-structure.jpg", alt: "Milo 婴儿推车折叠结构与关节特写", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "threeViews", src: "/assets/projects/milo-stroller/milo-three-views.jpg", alt: "Milo 婴儿推车正面侧面背面三视图", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "harness", src: "/assets/projects/milo-stroller/milo-harness.jpg", alt: "儿童坐在 Milo 婴儿推车座舱内的安全带调整特写", width: 3688, height: 4608, ratio: 3688 / 4608 },
  { id: "foldSteps", src: "/assets/projects/milo-stroller/milo-fold-steps.jpg", alt: "Milo 婴儿推车单手折叠步骤图", width: 3688, height: 4608, ratio: 3688 / 4608 },
] as const;

const asset = (id: (typeof assets)[number]["id"]) => assets.find((item) => item.id === id)!;

export function MiloStrollerCaseStudy({ renderImage }: Props) {
  const [view, setView] = useState<"product" | "detail" | "life">("product");
  const [showMore, setShowMore] = useState(false);
  const visual = (id: (typeof assets)[number]["id"], caption?: string, loading: "eager" | "lazy" = "lazy") => {
    const item = asset(id);
    return (
      <figure className="stroller-figure" key={id}>
        <div className="stroller-media" style={{ "--stroller-ratio": `${item.ratio}` } as CSSProperties}>
          {renderImage(item.src, item.alt, loading)}
        </div>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  };

  const viewGroups = {
    product: ["open", "rear", "threeViews"] as const,
    detail: ["canopy", "harness", "structure", "basket"] as const,
    life: ["family", "foldedHome", "foldSteps"] as const,
  };

  return (
    <article className="stroller-case" aria-label="Milo 婴儿推车商业视觉案例">
      <section className="stroller-opening" aria-labelledby="stroller-positioning">
        {visual("hero", undefined, "eager")}
        <div className="stroller-opening-copy">
          <span className="stroller-kicker">母婴出行 / 自主命题</span>
          <h3 id="stroller-positioning">轻装出发，<br />把日常推得更远。</h3>
          <p className="stroller-lead">从一眼看清产品，到真实看见父母与孩子如何使用。将轻便、折叠、座舱细节和城市出行，组织成一套可购买、可延展的婴儿推车商业表达。</p>
          <dl className="stroller-brief">
            <div><dt>商业课题</dt><dd>让婴儿推车同时回答“长什么样”“怎么折”“孩子坐得怎样”和“进入生活后是否顺手”。</dd></div>
            <div><dt>创意主张</dt><dd>以浅灰织物、银灰车架和橙色轮毂环建立识别，再用展开、收拢、细节与真人场景递进建立购买理由。</dd></div>
            <div><dt>设计职责</dt><dd>产品视觉定义、卖点拆解、旗舰店主副图、电商海报、人物使用场景与多比例内容编排。</dd></div>
          </dl>
        </div>
      </section>

      <section className="stroller-chapter" aria-labelledby="stroller-form">
        <header className="stroller-heading"><h3 id="stroller-form">先看清一辆车，再理解它的轻。</h3><p>用展开、背面和三视图建立产品档案，把座舱、顶篷、轮组、车架关节与置物篮全部放进同一套可复用视觉资产。</p></header>
        <div className="stroller-duo">{visual("open", "展开 / 浅灰织物与银灰车架建立第一眼识别")}{visual("rear", "背面 / 顶篷、靠背与置物篮关系")}</div>
        <div className="stroller-detail-band">
          {visual("threeViews")}
          <div><h4>结构清楚，<br />购买才有底气。</h4><p>不依赖空泛的轻便口号，而是用多角度产品图、折叠状态和真实轮组比例，把“看得见的产品证据”排在第一位。</p></div>
          {visual("openPoster")}
        </div>
      </section>

      <section className="stroller-chapter" aria-labelledby="stroller-detail">
        <header className="stroller-heading"><h3 id="stroller-detail">局部放大，卖点才不悬空。</h3><p>顶篷、座舱、肩带、折叠关节、置物篮和轮组分别使用近距离特写，不用远景把所有部件挤在同一张图里。</p></header>
        <div className="stroller-detail-grid">
          {visual("canopy", "顶篷 / 把阳光挡在外面")}
          {visual("harness", "座舱 / 坐稳之前，先照顾好细节")}
          {visual("structure", "关节 / 收起之后，空间还在")}
          {visual("basket", "置物篮与轮组 / 随手放，随手取")}
        </div>
      </section>

      <section className="stroller-life" aria-labelledby="stroller-life-title">
        <div className="stroller-life-lead"><span className="stroller-kicker">EVERYDAY USE</span><h3 id="stroller-life-title">不是摆在家里的产品，<br />而是一起出门的日常。</h3><p>年轻母亲、父亲和孩子共同进入画面，让推行、调整、收纳和坐入座舱成为可被想象的具体动作。人物服务于产品，不遮挡产品。</p></div>
        <div className="stroller-duo">{visual("family", "一家三口 / 一起出发，刚刚好")}{visual("foldedHome", "回到家 / 收起来，空间还在")}</div>
      </section>

      <section className="stroller-chapter stroller-editorial" aria-labelledby="stroller-system">
        <header className="stroller-heading"><h3 id="stroller-system">从主图到详情，建立完整电商链路。</h3><p>同一套产品识别被拆成主图、SKU、卖点、人物场景和折叠验证，不让一张图承担所有信息，也不让不同渠道失去同一产品。</p></header>
        <div className="stroller-filter" role="group" aria-label="婴儿推车视觉分类">
          <button type="button" aria-pressed={view === "product"} onClick={() => setView("product")}>产品识别<span>03</span></button>
          <button type="button" aria-pressed={view === "detail"} onClick={() => setView("detail")}>功能细节<span>04</span></button>
          <button type="button" aria-pressed={view === "life"} onClick={() => setView("life")}>真实使用<span>03</span></button>
        </div>
        <div className="stroller-lookbook-grid" aria-label={`${view} 视觉内容`}>
          {viewGroups[view].map((id) => visual(id))}
        </div>
      </section>

      <section className="stroller-extensions" aria-labelledby="stroller-extension-title">
        <header className="stroller-heading"><h3 id="stroller-extension-title">同一辆车，延展不同触点。</h3><p>主图负责吸引，三视图负责确认，局部特写负责解释，真人场景负责让年轻父母想象它进入自己的生活。</p></header>
        <ArchiveToggle assets={[asset("foldSteps"), asset("openPoster"), asset("family"), asset("foldedHome")]} expanded={showMore} id="stroller-more-gallery" onClick={() => setShowMore(!showMore)} />
        <div id="stroller-more-gallery" hidden={!showMore}>
          {showMore ? <div className="stroller-archive-grid">{["foldSteps", "openPoster", "family", "foldedHome"].map((id) => visual(id as (typeof assets)[number]["id"]))}</div> : null}
        </div>
        <footer className="stroller-conclusion"><p>由一辆婴儿推车的产品识别出发，连接结构证据、真人使用、城市生活与电商渠道编排。</p><strong>让轻便被看见，让出门有想象。</strong></footer>
      </section>
    </article>
  );
}
