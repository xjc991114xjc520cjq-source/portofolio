import type { CSSProperties, ReactNode } from "react";

type Props = { renderImage: (src: string, alt: string) => ReactNode };

const assets = {
  hero: ["speaker-commerce-hero", "橙色电商主视觉：把音乐带出去", 2048, 2048],
  product: ["speaker-product-master", "户外音箱三分之四视角，展示金属提梁、网罩与灯带", 2560, 1911],
  material: ["speaker-material-macro", "金属提梁、包覆握柄与滚花旋钮的材质特写", 2560, 1911],
  carry: ["speaker-hiking-carry", "穿着专业户外服装、背登山包的男性手提音箱", 2062, 2560],
  camp: ["speaker-car-camp", "两男两女在自驾营地整理装备，音箱放置在车尾", 2560, 1705],
  outdoor: ["speaker-commerce-outdoor", "山野照样尽兴：营地使用场景与 IP68 户外防护表达", 2048, 2048],
  impact: ["speaker-commerce-impact", "1.5米抗跌落主题电商图，展示产品外框与角部细节", 2048, 2048],
  control: ["speaker-commerce-control", "一旋进入状态：营地中女性操作音箱顶部旋钮", 1792, 2390],
  fitness: ["speaker-commerce-fitness", "放松也有节奏：运动穿搭女性在露台享受音乐", 1792, 2390],
  friends: ["speaker-commerce-friends", "好友到齐好歌开场：两男两女在庭院聚会", 2048, 2048],
  night: ["speaker-commerce-night", "夜色正好听：年轻男女在夜间营地享受音乐", 2048, 2048],
  everyday: ["speaker-commerce-everyday", "音乐随处入场：露台、运动与营地的多场景电商编排", 1792, 2390],
} as const;

export function OutdoorSpeakerCaseStudy({ renderImage }: Props) {
  const visual = (key: keyof typeof assets, label?: string, caption?: string) => {
    const [name, alt, width, height] = assets[key];
    return (
      <figure className="speaker-figure">
        <div className="speaker-media" style={{ "--speaker-ratio": `${width} / ${height}` } as CSSProperties}>
          {renderImage(`/assets/projects/outdoor-speaker/${name}.webp`, alt)}
        </div>
        {label && <figcaption><strong>{label}</strong>{caption && <span>{caption}</span>}</figcaption>}
      </figure>
    );
  };

  return (
    <div className="speaker-case">
      <section className="speaker-opening" aria-labelledby="speaker-positioning">
        {visual("hero")}
        <div className="speaker-opening-copy">
          <span className="speaker-kicker">户外音箱 / 自主命题</span>
          <h3 id="speaker-positioning">一件装备，<br />两种出发方式。</h3>
          <p className="speaker-lead">有计划的远行，和临时起意的好时光。让音乐进入生活，不必先成为户外玩家。</p>
          <div className="speaker-path">
            <span>01</span><div><h4>装备型购买 · 因可靠而选择</h4><p>面向露营、自驾与户外爱好者。以防护能力、结构细节和真实携带场景，回答“能不能放心带出去”。</p></div>
          </div>
          <div className="speaker-path">
            <span>02</span><div><h4>体验型购买 · 因向往而心动</h4><p>面向轻运动、周末休闲与社交人群。通过穿搭、关系与日常空间，让消费者看见“我也想这样度过一天”。</p></div>
          </div>
          <p className="speaker-opening-note">定位策略 / 产品视觉 / 场景策划 / 电商设计</p>
        </div>
      </section>

      <section className="speaker-chapter" aria-labelledby="speaker-design">
        <div className="speaker-heading"><h3 id="speaker-design">先记住产品，<br />再走进场景。</h3><p>石墨色机身与金属提梁构成轮廓记忆。橙色控制键点明操作入口，暖色灯带将装备感延伸为陪伴感。</p></div>
        <div className="speaker-pair speaker-product-pair">
          {visual("product", "轮廓识别", "横向机身 · 一体视觉框架 · 前置网罩")}
          {visual("material", "触感与操作", "包覆握柄 · 滚花旋钮 · 金属边缘")}
        </div>
      </section>

      <section className="speaker-carry" aria-labelledby="speaker-carry">
        {visual("carry", "出发时，是随行装备。")}
        <div className="speaker-carry-right">
          <div className="speaker-heading"><h3 id="speaker-carry">从车尾到营地，<br />把好心情一起带上。</h3><p>以自驾出游与营地短途携行为主要使用语境。专业户外穿搭保留可信度，不同风格的同行者，让产品自然进入共同的生活。</p></div>
          {visual("camp", "抵达后，是相聚的一部分。", "自驾、搭营、休息，在同一段周末里自然衔接。")}
        </div>
      </section>

      <section className="speaker-chapter speaker-capability" aria-labelledby="speaker-capability">
        <div className="speaker-heading"><h3 id="speaker-capability">敢带出去，<br />才会经常使用。</h3><p>将防护卖点转译为具体的户外情境。大标题先建立利益认知，产品近景与结构细节接着解释安心感从何而来。</p></div>
        <div className="speaker-pair">
          {visual("outdoor", "应对户外环境", "用营地场景承接 IP68 防护卖点。")}
          {visual("impact", "应对意外磕碰", "用角部特写承接 1.5 米抗跌落卖点。")}
        </div>
      </section>

      <section className="speaker-chapter" aria-labelledby="speaker-feeling">
        <div className="speaker-heading"><h3 id="speaker-feeling">把操作变简单，<br />把感受放大。</h3><p>一张图讲清楚如何使用，另一张图让人看见使用之后。旋钮、手势与目光形成明确关系，运动穿搭将场景从露营延伸到日常放松。</p></div>
        <div className="speaker-pair speaker-portrait-pair">
          {visual("control", "进入状态", "触手可及的操作，成为体验的起点。")}
          {visual("fitness", "留在状态里", "轻运动之后，给自己一段有音乐的空闲。")}
        </div>
      </section>

      <section className="speaker-chapter speaker-social" aria-labelledby="speaker-social">
        <div className="speaker-heading"><h3 id="speaker-social">有人的地方，<br />就有值得留下的时刻。</h3><p>白天的庭院相聚，与入夜后的双人营地。以不同人物、穿搭和亲密距离组织画面，让音乐成为关系中的自然陪伴。</p></div>
        <div className="speaker-pair">
          {visual("friends", "白天 · 好友到齐", "多人物互动拓展社交使用想象。")}
          {visual("night", "入夜 · 慢下来听", "冷暖光线与双人关系营造停留感。")}
        </div>
      </section>

      <section className="speaker-closing" aria-labelledby="speaker-channels">
        {visual("everyday")}
        <div className="speaker-closing-copy">
          <span className="speaker-kicker">从产品认知到生活代入</span>
          <h3 id="speaker-channels">让每一个触点，<br />都有购买的理由。</h3>
          <ol className="speaker-channel-list">
            <li><span>商品入口</span><div><h4>一眼识别，一句话心动</h4><p>以橙色主视觉、清晰产品轮廓与大标题抓住注意力，建立“把音乐带出去”的核心记忆。</p></div></li>
            <li><span>详情承接</span><div><h4>看懂功能，想象使用</h4><p>按防护、携带、操作、体验逐层展开，兼顾装备型购买的判断依据与体验型购买的情绪动机。</p></div></li>
            <li><span>内容传播</span><div><h4>同一产品，多种生活</h4><p>将露营、轻运动、庭院社交与夜间陪伴拆成独立创意，适配不同兴趣入口。</p></div></li>
          </ol>
          <div className="speaker-delivery" aria-label="项目交付规模"><div><b>13</b><span>精选视觉</span></div><div><b>8</b><span>电商创意</span></div><div><b>3</b><span>横 / 方 / 竖画幅</span></div></div>
          <p className="speaker-endnote">以统一产品识别贯穿功能与情绪，形成可面向多种消费场景延展的商业视觉系统。</p>
        </div>
      </section>
    </div>
  );
}
