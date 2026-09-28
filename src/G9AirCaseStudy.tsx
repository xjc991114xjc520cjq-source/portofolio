import type { ReactNode } from "react";

const base = "/assets/projects/g9-air";

type Props = {
  renderImage: (src: string, alt: string) => ReactNode;
};

const colorways = [
  { name: "黑色款", code: "01 / GRAPHITE", image: "master-black", alt: "黑色 G9 Air 大师版定妆侧视图，显示侧面双键、拇指键与紫色灯带", tone: "black" },
  { name: "白色款", code: "02 / FROST", image: "master-white", alt: "白色 G9 Air 大师版定妆侧视图，显示相同的按键结构与浅色机身", tone: "white" },
  { name: "青色款", code: "03 / CYAN", image: "master-cyan", alt: "青色 G9 Air 大师版定妆侧视图，显示相同的按键结构与青色灯带", tone: "cyan" },
] as const;

const commerce = [
  { name: "黑色款", image: "commerce-black", alt: "黑色 G9 Air 大师版多键操控商品视觉提案" },
  { name: "白色款", image: "commerce-white", alt: "白色 G9 Air 大师版多键操控商品视觉提案" },
  { name: "青色款", image: "commerce-cyan", alt: "青色 G9 Air 大师版多键操控商品视觉提案" },
] as const;

function SectionHeader({ id, number, eyebrow, title, description }: { id: string; number: string; eyebrow: string; title: string; description: string }) {
  return (
    <header className="g9-section-head">
      <span className="g9-section-index">{number} <i /> {eyebrow}</span>
      <div>
        <h3 id={id}>{title}</h3>
        <p>{description}</p>
      </div>
    </header>
  );
}

export function G9AirCaseStudy({ renderImage }: Props) {
  const media = (name: string, alt: string) => renderImage(`${base}/${name}.webp`, alt);

  return (
    <div className="g9-case">
      <section className="g9-opening g9-wrap" aria-labelledby="g9-opening-title">
        <div className="g9-opening-kicker"><span>01 — CASE POSITION</span><span>自主提案 · 2026</span></div>
        <div className="g9-opening-grid">
          <h3 id="g9-opening-title">先让人认出<br />是同一只鼠标。</h3>
          <div className="g9-opening-copy">
            <p>这是一份面向 ATK 面试的自主商业视觉提案。我将一只多键鼠标从定妆照延展到商品首屏、功能说明和不同媒介的场景画面。</p>
            <p>我先确定按键位置、侧裙纹理与灯带走向，再让黑、白、青三配色分别拥有合适的背景和光线。每张图都要能和定妆照对得上。</p>
          </div>
        </div>
        <div className="g9-case-route" aria-label="案例内容结构">
          <span>01 <b>产品定妆</b></span>
          <span>02 <b>商品首屏</b></span>
          <span>03 <b>按键说明</b></span>
          <span>04 <b>场景延展</b></span>
        </div>
      </section>

      <section className="g9-product" aria-labelledby="g9-product-title">
        <div className="g9-wrap">
          <SectionHeader id="g9-product-title" number="02" eyebrow="PRODUCT LOCK" title="一套结构，三种颜色" description="先锁住外观，再谈配色。侧键数量、轮廓转折、握持区纹理和灯带位置，在三个版本中保持一致。" />
        </div>
        <div className="g9-color-grid g9-wrap">
          {colorways.map((item) => (
            <figure className={`g9-color g9-color--${item.tone}`} key={item.name}>
              {media(item.image, item.alt)}
              <figcaption><span>{item.code}</span><strong>{item.name}</strong></figcaption>
            </figure>
          ))}
        </div>
        <p className="g9-aside g9-wrap"><span>外观约束</span>滚轮与中置双键、顶部辅助键、侧面双键和独立拇指键必须保持原有位置；视觉变化交给材质、光线和环境。</p>
      </section>

      <section className="g9-commerce g9-wrap" aria-labelledby="g9-commerce-title">
        <SectionHeader id="g9-commerce-title" number="03" eyebrow="COMMERCE" title="商品图先回答：它特别在哪" description="把多键操控作为首屏的主要购买理由。黑色款负责建立质感，白色与青色款沿用同一信息层级，分别调整冷暖、反射和环境色。" />
        <div className="g9-commerce-grid">
          {commerce.map((item, index) => (
            <figure className="g9-commerce-frame" key={item.name}>
              {media(item.image, item.alt)}
              <figcaption><span>0{index + 1}</span><strong>{item.name}</strong></figcaption>
            </figure>
          ))}
        </div>
        <p className="g9-artifact-note">画面中的价格与代言元素用于演示电商版式，并非本项目的真实售价、授权权益或正式投放信息。</p>
      </section>

      <section className="g9-controls" aria-labelledby="g9-controls-title">
        <div className="g9-wrap">
          <SectionHeader id="g9-controls-title" number="04" eyebrow="FEATURE EXPLANATION" title="把按键关系讲准确" description="先用完整侧视图说明拇指可触达区域，再用俯视与侧视同框交代滚轮、中置键和侧键的位置。读图顺序跟着真实操作走。" />
          <div className="g9-control-layout">
            <figure className="g9-control-lead">
              {media("feature-side-black", "黑色 G9 Air 大师版侧面商品说明图，标注 G6、G7 和 G8 按键位置")}
              <figcaption><span>01 / 侧面</span><strong>先看拇指区</strong><p>侧面双键与独立拇指键分开标注，不让引导线互相抢视线。</p></figcaption>
            </figure>
            <figure className="g9-control-follow">
              {media("feature-mapping-black", "黑色 G9 Air 大师版俯视与侧视组合说明图，标注滚轮、中置双键和侧面按键")}
              <figcaption><span>02 / 双视角</span><strong>再看整机分区</strong><p>滚轮、中置双键、顶部辅助键和拇指区各自对到真实位置。</p></figcaption>
            </figure>
          </div>
          <p className="g9-artifact-note">筛选时剔除了按键重复、位置偏移及内部结构无法核对的爆炸图。这里展示的是通过外观对照的画面。</p>
        </div>
      </section>

      <section className="g9-scenes" aria-labelledby="g9-scenes-title">
        <div className="g9-wrap">
          <SectionHeader id="g9-scenes-title" number="05" eyebrow="CHANNEL EXTENSION" title="配色走进不同环境" description="冰雪托起白色外壳的体积，海浪衬出青色灯带，火山岩给黑色款留出轮廓。横版承担场景传播，竖版保留俯视辨识度。" />
          <div className="g9-scene-wide">
            <figure>{media("scene-glacier", "白色 G9 Air 大师版鼠标放置于冰川前的冰面，横版场景") }<figcaption>FROST <span>冰山 / 16:9</span></figcaption></figure>
            <figure>{media("hero-ocean", "青色 G9 Air 大师版鼠标放置于海边岩石，横版场景") }<figcaption>CYAN <span>海洋 / 16:9</span></figcaption></figure>
            <figure>{media("scene-volcano", "黑色 G9 Air 大师版鼠标放置于火山岩石，横版场景") }<figcaption>GRAPHITE <span>火山 / 16:9</span></figcaption></figure>
          </div>
          <div className="g9-scene-portrait-intro"><span>VERTICAL EDITS / 9:16</span><p>竖版统一使用朝上的俯视视角，让轮廓和中置区在窄屏里依然清楚。</p></div>
          <div className="g9-scene-portrait">
            <figure>{media("scene-blizzard", "白色 G9 Air 大师版鼠标在暴雪中的竖版俯视场景") }<figcaption>01 / 暴雪</figcaption></figure>
            <figure>{media("scene-coast", "青色 G9 Air 大师版鼠标在海岸岩石上的竖版俯视场景") }<figcaption>02 / 海岸</figcaption></figure>
            <figure>{media("cover-volcano", "黑色 G9 Air 大师版鼠标在火山岩上的竖版俯视场景") }<figcaption>03 / 火山</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="g9-close g9-wrap" aria-labelledby="g9-close-title">
        <span>DESIGN DECISION / 结案判断</span>
        <h3 id="g9-close-title">不同渠道可以换镜头，<br />产品本身不能换。</h3>
        <p>这个案例展示的是视觉提案与筛选方法，不代表 ATK 官方项目。芯片、回报率、电池容量和续航等数值只存在于概念素材中，未在此作为已验证的产品规格或性能结论。</p>
      </section>
    </div>
  );
}
