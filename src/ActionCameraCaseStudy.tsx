import type { CSSProperties, ReactNode } from "react";

type Props = { renderImage: (src: string, alt: string) => ReactNode };

const root = "/assets/projects/kova-action-camera";

const assets = {
  productFront: ["kova-product-front.jpg", "KOVA 运动相机正面产品基准图", 1921, 2400],
  productDual: ["kova-product-dual.jpg", "KOVA 运动相机前后双屏产品视图", 2400, 1921],
  productExploded: ["kova-product-exploded.jpg", "KOVA 运动相机镜头与机身结构分解图", 2400, 1599],
  buttons: ["kova-commerce-buttons.jpg", "KOVA 运动相机顶部三键操作说明商业图", 2400, 2400],
  review: ["kova-commerce-review.jpg", "登山者在雪山现场回看 KOVA 运动相机画面", 2400, 2400],
  cycling: ["kova-scene-cycling.jpg", "山地骑行者胸前佩戴 KOVA 运动相机", 1921, 2400],
  surf: ["kova-scene-surf.jpg", "冲浪者使用 KOVA 运动相机记录浪尖动作", 1921, 2400],
  ski: ["kova-scene-ski.jpg", "滑雪者胸前佩戴 KOVA 运动相机穿过雪地", 2400, 1599],
  kayak: ["kova-scene-kayak.jpg", "KOVA 运动相机固定在皮划艇前端记录湖面行程", 2400, 1599],
  action: ["kova-commerce-action.jpg", "迎浪不迎合 KOVA 运动相机行动主视觉", 2400, 2400],
  lens: ["kova-commerce-lens.jpg", "KOVA 运动相机光学镜组商业视觉", 2400, 2400],
  night: ["kova-scene-night.jpg", "摩托骑行者在雨夜使用 KOVA 运动相机", 2400, 2400],
} as const;

const films = [
  {
    title: "产品识别",
    note: "从正面机身移至背屏，让前屏、镜头与后屏在同一段产品叙事中建立关系。",
    src: "kova-motion-product.mp4",
    poster: "kova-motion-product-poster.jpg",
    label: "KOVA 运动相机正面机身过渡至背屏的产品短片",
  },
  {
    title: "现场回看",
    note: "把拍摄、触控与回看连成一个动作，证明前后双屏不是静态卖点。",
    src: "kova-motion-review.mp4",
    poster: "kova-motion-review-poster.jpg",
    label: "登山者在雪山现场回看 KOVA 运动相机画面的短片",
  },
  {
    title: "水上记录",
    note: "镜头从前方记录位切入划行者，让产品安装关系与行动视角同时成立。",
    src: "kova-motion-kayak.mp4",
    poster: "kova-motion-kayak-poster.jpg",
    label: "KOVA 运动相机固定在皮划艇前端记录湖面行动的短片",
  },
] as const;

export function ActionCameraCaseStudy({ renderImage }: Props) {
  const visual = (key: keyof typeof assets, title?: string, note?: string) => {
    const [name, alt, width, height] = assets[key];
    return (
      <figure className="kova-figure">
        <div className="kova-media" style={{ "--kova-ratio": `${width} / ${height}` } as CSSProperties}>
          {renderImage(`${root}/${name}`, alt)}
        </div>
        {title ? <figcaption><strong>{title}</strong>{note ? <span>{note}</span> : null}</figcaption> : null}
      </figure>
    );
  };

  return (
    <div className="kova-case">
      <section className="kova-opening" aria-labelledby="kova-positioning">
        <div className="kova-opening-copy">
          <span className="kova-kicker">KOVA / 自主命题消费科技</span>
          <h3 id="kova-positioning">不是旁观，<br />是在场。</h3>
          <p className="kova-lead">把运动相机从参数设备转化为行动伙伴。先建立可信产品，再让记录、回看与分享进入真实旅程。</p>
          <dl className="kova-brief">
            <div><dt>商业任务</dt><dd>让同一台产品同时覆盖商品认知、操作理解、场景向往与动态内容。</dd></div>
            <div><dt>内容策略</dt><dd>以产品一致性为底线，用不同运动关系证明产品如何被安装、握持与使用。</dd></div>
          </dl>
        </div>
        {visual("productDual", "前后双屏", "同一机身，两种取景关系。")}
      </section>

      <section className="kova-chapter" aria-labelledby="kova-product">
        <header className="kova-heading">
          <h3 id="kova-product">先锁定一台相机，<br />再拓展所有现场。</h3>
          <p>横向软方机身、左侧前屏、右侧圆形镜头、背部横屏与右侧舱盖构成稳定身份。场景可以变化，结构不能漂移。</p>
        </header>
        <div className="kova-product-grid">
          {visual("productFront", "正面基准", "深石墨微纹理机身与镜头比例形成第一识别。")}
          {visual("productExploded", "内部关系", "以结构分解画面解释镜头、机芯与屏幕的空间关系。")}
        </div>
      </section>

      <section className="kova-control" aria-labelledby="kova-control">
        {visual("buttons", "三键在手", "背面视图从右向左固定为快门键、功能键、纹理控制键。")}
        <div className="kova-control-copy">
          <h3 id="kova-control">让功能被看懂，<br />而不是被列出来。</h3>
          <p>顶部按键用近景建立操作秩序，背屏回看用手势与画面回应拍摄结果。两张图分别承担操作入口与体验闭环。</p>
          {visual("review", "拍完，当场回看", "触控动作、手套与背屏内容维持真实接触关系。")}
        </div>
      </section>

      <section className="kova-chapter" aria-labelledby="kova-scenes">
        <header className="kova-heading is-stacked">
          <h3 id="kova-scenes">不是换背景，<br />是改变人与产品的关系。</h3>
          <p>胸前固定、板面低机位、手持自拍与艇首安装分别对应不同记录需求，让每个场景都提供新的使用证据。</p>
        </header>
        <div className="kova-scene-grid">
          {visual("cycling", "骑行", "胸前视角保留双手操控与道路判断。")}
          {visual("surf", "冲浪", "低机位贴近浪面，让速度与水花进入画面。")}
          {visual("ski", "滑雪", "胸前安装服务连续移动中的第一视角记录。")}
          {visual("kayak", "皮划艇", "艇首固定把产品、路线与人物动作放在同一轴线上。")}
        </div>
      </section>

      <section className="kova-campaign" aria-labelledby="kova-campaign">
        <div className="kova-campaign-copy">
          <h3 id="kova-campaign">从产品证据，<br />走到购买冲动。</h3>
          <p>行动主视觉负责抓住注意，光学结构负责建立技术感，雨夜骑行负责扩展城市使用想象。三种语法不重复同一个卖点。</p>
        </div>
        <div className="kova-campaign-grid">
          {visual("action", "行动主张", "用浪面与机位关系把记录欲望推到第一视觉中心。")}
          {visual("lens", "光学语言", "镜组展开成为视觉焦点，不借助虚构参数制造可信度。")}
          {visual("night", "城市延展", "雨夜、车把与路面反光建立不同于山野的记录场景。")}
        </div>
      </section>

      <section className="kova-motion" aria-labelledby="kova-motion">
        <header className="kova-heading is-stacked">
          <h3 id="kova-motion">让静态承诺，<br />在动作里兑现。</h3>
          <p>三段短片分别完成产品展示、操作回看与场景记录，避免把动态内容降级为静态图片的简单推拉。</p>
        </header>
        <div className="kova-film-grid">
          {films.map((film) => (
            <figure className="kova-film" key={film.title}>
              <video controls playsInline preload="metadata" poster={`${root}/${film.poster}`} aria-label={film.label}>
                <source src={`${root}/${film.src}`} type="video/mp4" />
              </video>
              <figcaption><strong>{film.title}</strong><span>{film.note}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="kova-closing" aria-labelledby="kova-delivery">
        <div>
          <h3 id="kova-delivery">同一产品，覆盖从商品页到内容传播。</h3>
          <p>精选内容以产品、功能、场景、电商和动态五种职责形成交付系统。每张图片和每段短片都对应不同的消费者问题。</p>
        </div>
        <dl className="kova-results" aria-label="项目交付规模">
          <div><dt>13</dt><dd>核心静态视觉</dd></div>
          <div><dt>3</dt><dd>动态短片</dd></div>
          <div><dt>4</dt><dd>行动场景</dd></div>
          <div><dt>3</dt><dd>主流内容比例</dd></div>
        </dl>
      </section>
    </div>
  );
}
