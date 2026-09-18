import type { CSSProperties, ReactNode } from "react";

type Props = { renderImage: (src: string, alt: string) => ReactNode };
type Visual = { src: string; alt: string; width: number; height: number };

const root = "/assets/projects/terrain-35";

const visuals = {
  studio: { src: `${root}/terrain-product-studio.jpg`, alt: "TERRAIN 35 深石墨黑技术背包棚拍产品正面", width: 1933, height: 2400 },
  overview: { src: `${root}/terrain-overview.jpg`, alt: "TERRAIN 35 双折卷口、快取前仓、侧袋与背负系统电商总览", width: 1921, height: 2400 },
  rolltop: { src: `${root}/terrain-rolltop.jpg`, alt: "TERRAIN 35 双折卷口与中央 G 型挂钩结构说明", width: 1799, height: 2400 },
  quickAccess: { src: `${root}/terrain-quick-access.jpg`, alt: "TERRAIN 35 盾形前仓与纵向拉链快速取物画面", width: 2400, height: 2400 },
  material: { src: `${root}/terrain-material.jpg`, alt: "TERRAIN 35 防撕裂尼龙与 TPU 耐磨区域材质说明", width: 1921, height: 2400 },
  backSystem: { src: `${root}/terrain-back-system.jpg`, alt: "TERRAIN 35 透气网布、分区泡棉与中央导流背负系统", width: 1799, height: 2400 },
  carryFit: { src: `${root}/terrain-carry-fit.jpg`, alt: "山径行走中调整胸带的 TERRAIN 35 真实背负场景", width: 1799, height: 2400 },
  city: { src: `${root}/terrain-city.jpg`, alt: "现代城市建筑空间中的 TERRAIN 35 通勤背负场景", width: 1610, height: 2400 },
  trail: { src: `${root}/terrain-trail.jpg`, alt: "森林步道中的 TERRAIN 35 周末徒步场景", width: 1921, height: 2400 },
  rain: { src: `${root}/terrain-rain.jpg`, alt: "雨雾山林中的 TERRAIN 35 徒步使用场景", width: 1921, height: 2400 },
  journey: { src: `${root}/terrain-campaign-journey.jpg`, alt: "去更大的世界从这一包开始 TERRAIN 35 户外传播主视觉", width: 2400, height: 2400 },
  route: { src: `${root}/terrain-campaign-route.jpg`, alt: "年轻不止一种路线 TERRAIN 35 城市与山野传播主视觉", width: 1921, height: 2400 },
  closing: { src: `${root}/terrain-closing.jpg`, alt: "年轻上山一包搞定 TERRAIN 35 电商核心主视觉", width: 2400, height: 2400 },
} satisfies Record<string, Visual>;

export function TerrainBackpackCaseStudy({ renderImage }: Props) {
  const visual = (item: Visual, title?: string, note?: string, className = "") => (
    <figure className={`terrain-figure${className ? ` ${className}` : ""}`} key={item.src}>
      <div className="terrain-media" style={{ "--terrain-ratio": `${item.width} / ${item.height}` } as CSSProperties}>
        {renderImage(item.src, item.alt)}
      </div>
      {title ? <figcaption><strong>{title}</strong>{note ? <span>{note}</span> : null}</figcaption> : null}
    </figure>
  );

  return (
    <article className="terrain-case" aria-label="TERRAIN 35 户外背包产品商业化案例">
      <section className="terrain-opening" aria-labelledby="terrain-positioning-title">
        {visual(visuals.studio)}
        <div className="terrain-opening-copy">
          <span className="terrain-kicker">OUTDOOR PRODUCT COMMERCE</span>
          <h3 id="terrain-positioning-title">一只背包，<br />先建立可识别的产品身份。</h3>
          <p className="terrain-lead">用高窄包体、双折卷口、盾形前仓与冷蓝包边锁定 TERRAIN 35，再让同一产品进入销售说明、真实背负与户外传播。</p>
          <dl className="terrain-brief">
            <div><dt>商业课题</dt><dd>在城市通勤与轻户外之间建立清楚定位，同时让消费者快速理解结构、收纳和背负价值。</dd></div>
            <div><dt>视觉策略</dt><dd>先固定产品比例与结构锚点，再按照吸引、解释、体验和传播分配画面职责。</dd></div>
            <div><dt>设计职责</dt><dd>产品视觉定义、结构一致性控制、电商套图、场景策划与渠道编排。</dd></div>
          </dl>
        </div>
      </section>

      <section className="terrain-overview" aria-labelledby="terrain-overview-title">
        <header className="terrain-heading">
          <h3 id="terrain-overview-title">先让消费者一眼看懂，<br />再进入每个购买理由。</h3>
          <p>总览画面把卷口、挂钩、前仓、侧袋、压缩带和背负系统放回同一只产品，避免详情页变成互不相干的局部堆叠。</p>
        </header>
        <div className="terrain-overview-grid">
          {visual(visuals.overview)}
          <dl className="terrain-anchor-list">
            <div><dt>产品轮廓</dt><dd>高而窄的 35L 包体保持日常携带的利落比例。</dd></div>
            <div><dt>收纳入口</dt><dd>双折卷口负责扩容，盾形前仓与纵向拉链负责快取。</dd></div>
            <div><dt>外挂关系</dt><dd>双侧水壶袋与横向压缩带服务水壶、登山杖和随行装备。</dd></div>
            <div><dt>背负支撑</dt><dd>分区泡棉、透气网布、胸带与腰带共同说明长时间使用体验。</dd></div>
          </dl>
        </div>
      </section>

      <section className="terrain-structure" aria-labelledby="terrain-structure-title">
        <header className="terrain-heading">
          <h3 id="terrain-structure-title">结构不是参数表，<br />而是连续的使用动作。</h3>
          <p>卷口回答如何装，前仓与拉链回答如何拿。两张画面分别承担容量组织和高频取物，不重复同一个卖点。</p>
        </header>
        <div className="terrain-pair">
          {visual(visuals.rolltop, "双折卷口", "中央织带与 G 型挂钩建立明确开合顺序。")}
          {visual(visuals.quickAccess, "快速取物", "盾形前仓与纵向拉链承接常用装备。")}
        </div>
      </section>

      <section className="terrain-proof" aria-labelledby="terrain-proof-title">
        <header className="terrain-heading">
          <h3 id="terrain-proof-title">材质负责耐用，<br />背负负责长期相信。</h3>
          <p>前侧用防撕裂纹理和 TPU 耐磨区建立质感，背面用网布、泡棉与导流关系解释贴背支撑。</p>
        </header>
        <div className="terrain-proof-grid">
          {visual(visuals.material, "材质证据", "把主面料、织带与底部耐磨区放大到可以比较。")}
          {visual(visuals.backSystem, "背负证据", "完整后视图说明肩带、胸带、腰带与通风结构。")}
        </div>
      </section>

      <section className="terrain-context" aria-labelledby="terrain-context-title">
        <header className="terrain-heading">
          <h3 id="terrain-context-title">从工作日到周末，<br />每个场景验证不同能力。</h3>
          <p>城市画面验证体量与穿搭，山径动作验证受力关系，林地与雨雾补充路线和天气变化，不用换一张背景重复同一句话。</p>
        </header>
        <div className="terrain-context-grid">
          {visual(visuals.carryFit, "真实背负", "调整胸带的动作让肩带与腰带关系成立。")}
          {visual(visuals.city, "城市通勤", "高窄轮廓进入建筑空间仍保持克制。")}
          {visual(visuals.trail, "周末山径", "步行状态说明背包与身体的尺度关系。")}
          {visual(visuals.rain, "天气变化", "雨雾环境提供使用氛围，不虚构防水等级。")}
        </div>
      </section>

      <section className="terrain-campaign" aria-labelledby="terrain-campaign-title">
        <header className="terrain-heading">
          <h3 id="terrain-campaign-title">同一产品身份，<br />进入两种传播语气。</h3>
          <p>一组画面强调走得更远，另一组连接城市与山野。标题、人物和环境变化，但卷口、前仓、拉链与包体比例保持稳定。</p>
        </header>
        <div className="terrain-campaign-grid">
          {visual(visuals.journey, "山野主张", "用产品大比例和远行场景建立户外向往。")}
          {visual(visuals.route, "城市到山野", "用更直接的标题表达多场景定位。")}
        </div>
      </section>

      <section className="terrain-closing" aria-labelledby="terrain-closing-title">
        <div className="terrain-closing-copy">
          <h3 id="terrain-closing-title">从产品确认，<br />走到可销售的内容系统。</h3>
          <p>母版负责稳定产品，结构图负责解释差异，人物场景负责建立使用想象，传播主视觉负责进入信息流与活动页面。</p>
          <dl className="terrain-results">
            <div><dt>13</dt><dd>张核心画面承担明确职责</dd></div>
            <div><dt>4</dt><dd>类商业内容职责</dd></div>
          </dl>
        </div>
        {visual(visuals.closing)}
      </section>
    </article>
  );
}
