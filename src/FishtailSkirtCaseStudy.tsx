import { useState, type CSSProperties, type ReactNode } from "react";
import assets from "./fishtail-assets.json";
import { ArchiveToggle } from "./CaseExtensions";

type Props = { renderImage: (src: string, alt: string) => ReactNode };
const featured = [19, 32, 33, 21, 35, 12, 28, 7, 18, 6, 4, 34, 22, 15, 16, 9];
const scenes = [
  { label: "版型与细节", rows: [[36, 37], [39, 40], [38]] },
  { label: "城市与日常", rows: [[41, 42, 44], [45, 46, 47]] },
  { label: "约会与夜生活", rows: [[48, 49, 50], [51, 52]] },
];

export function FishtailSkirtCaseStudy({ renderImage }: Props) {
  const [scene, setScene] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const visual = (id: number, caption?: string) => {
    const a = assets.find((asset) => asset.id === id)!;
    return <figure className="skirt-figure" key={id}>
      <div className="skirt-media" style={{ "--skirt-ratio": `${a.width} / ${a.height}` } as CSSProperties}>
        {renderImage(a.src, a.alt)}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>;
  };

  return <article className="skirt-case" aria-label="鱼尾皮裙商业视觉案例">
    <section className="skirt-opening" aria-labelledby="skirt-positioning">
      {visual(19)}
      <div className="skirt-opening-copy">
        <span className="skirt-kicker">时装企划 / 自主命题</span>
        <h3 id="skirt-positioning">一条黑裙，<br />不止一种自己。</h3>
        <p className="skirt-lead">从腰间的交叠，到转身时的鱼尾。将版型识别、穿搭想象与生活场合，组织成一套有记忆点的电商表达。</p>
        <dl className="skirt-brief">
          <div><dt>商业课题</dt><dd>让黑色皮裙跳出基础款印象，同时回答“好看在哪里”和“买来怎么穿”。</dd></div>
          <div><dt>创意主张</dt><dd>以层次感建立第一眼识别，以多场景穿搭拓展一件单品的使用想象。</dd></div>
          <div><dt>设计职责</dt><dd>产品视觉定义、造型与场景策划、广告字体编排、电商套图与内容延展。</dd></div>
        </dl>
      </div>
    </section>

    <section className="skirt-chapter" aria-labelledby="skirt-form">
      <header className="skirt-heading"><h3 id="skirt-form">把层次，变成一眼能记住的识别。</h3><p>交叠腰线、斜向覆片与双层鱼尾构成视觉主线。标题笔画呼应裙片弧线，让文字参与构图，而不是盖在服装上。</p></header>
      <div className="skirt-duo">{visual(32, "腰线与覆片 / 让设计细节成为主角")}{visual(33, "正面与背面 / 连贯展示整体轮廓")}</div>
      <div className="skirt-detail-band">
        {visual(21)}
        <div><h4>轮廓有分寸，<br />触感有想象。</h4><p>以近景皮纹、包边和自然褶皱呈现柔软感，再用步幅中的裙摆变化，把静态版型转化为穿着体验。</p></div>
        {visual(35)}
      </div>
    </section>

    <section className="skirt-chapter" aria-labelledby="skirt-day">
      <header className="skirt-heading"><h3 id="skirt-day">有日常，也有自己的风格。</h3><p>通勤强调完整轮廓与利落搭配，换季用短外套、踝靴和城市雨景建立层次。同一条裙子，进入不同衣橱。</p></header>
      <div className="skirt-duo">{visual(12, "通勤 / 克制配色与挺括上装")}{visual(28, "换季 / 短外套与漆皮踝靴")}</div>
    </section>

    <section className="skirt-chapter skirt-attitude" aria-labelledby="skirt-pose">
      <header className="skirt-heading"><h3 id="skirt-pose">风格，不只有站姿。</h3><p>坐下、蹲身、侧躺、起舞。让服装跟随身体，而非让身体迁就展示；以不同上装、鞋履和发型，建立四种独立情绪。</p></header>
      <div className="skirt-pose-grid">
        {visual(7, "坐姿 / 紫色抹胸与银色尖头鞋")}
        {visual(18, "蹲姿 / 斜肩上衣与短踝靴")}
        {visual(6, "侧躺 / 银色垂领与柔软裙摆")}
        {visual(4, "群舞 / 宝蓝交叉上衣与漆皮靴")}
      </div>
    </section>

    <section className="skirt-night" aria-labelledby="skirt-night">
      <div className="skirt-night-lead"><span className="skirt-kicker">AFTER HOURS</span><h3 id="skirt-night">天色变了，<br />表达也可以变。</h3><p>金属光泽、丝缎、深色天鹅绒与灯光反射，让鱼尾裙从日常走入社交。舞池的释放与约会的松弛，形成不同的内容入口。</p></div>
      <div className="skirt-duo">{visual(34, "舞会 / 转身时的弧线与反光")}{visual(22, "约会 / 坐姿、垂领与闪光踝靴")}</div>
    </section>

    <section className="skirt-chapter" aria-labelledby="skirt-choice">
      <header className="skirt-heading"><h3 id="skirt-choice">从心动，走向具体的选择。</h3><p>在风格吸引之后，补上鞋履组合与正背观察。让消费者能够想象搭配，也能看清服装。</p></header>
      <div className="skirt-duo">{visual(15, "搭配选择 / 同一裙型，两种鞋履语气")}{visual(16, "选购观察 / 镜面中的正背轮廓")}</div>
      <div className="skirt-channel-strip" aria-label="商业内容分工">
        <div><h4>商品首图</h4><p>设计型大标题与完整轮廓，建立“层次”记忆。</p></div>
        <div><h4>详情承接</h4><p>腰线、皮纹、正背与姿态，逐步解释版型。</p></div>
        <div><h4>场景传播</h4><p>通勤、约会与夜生活，让穿搭成为兴趣入口。</p></div>
      </div>
      {visual(9)}
    </section>

    <section className="skirt-editorial" aria-labelledby="skirt-editorial">
      <header className="skirt-heading"><span className="skirt-kicker">LOOKBOOK</span><h3 id="skirt-editorial">回到穿着本身。</h3><p>独立呈现无文案场景影像，从正背版型到城市漫步、餐厅约会与夜间群舞。以人物动作和环境光线，观察同一裙型的不同状态。</p></header>
      <div className="skirt-filter" role="group" aria-label="穿搭影像分类">
        {scenes.map((group, i) => <button type="button" key={group.label} aria-pressed={scene === i} aria-controls="skirt-scene-gallery" onClick={() => setScene(i)}>{group.label}<span>{group.rows.flat().length}</span></button>)}
      </div>
      <div className="skirt-lookbook-grid" id="skirt-scene-gallery" aria-label={scenes[scene].label}>
        {scenes[scene].rows.map((row) => <div className="skirt-lookbook-row" key={row.join("-")} style={{ "--skirt-columns": row.map((id) => { const a = assets.find((asset) => asset.id === id)!; return `${a.width / a.height}fr`; }).join(" ") } as CSSProperties}>{row.map((id) => visual(id))}</div>)}
      </div>
    </section>

    <section className="skirt-extensions" aria-labelledby="skirt-extension-title">
      <header className="skirt-heading"><h3 id="skirt-extension-title">同一主题，延展不同触点。</h3><p>主图、竖版与横幅保持同一产品识别，按版型、搭配、场合组织系列内容。完整系列共 35 张电商视觉与 17 张产品及场景影像。</p></header>
      <ArchiveToggle assets={assets.filter(a => a.id <= 35 && !featured.includes(a.id))} expanded={showMore} id="skirt-more-gallery" onClick={() => setShowMore(!showMore)} />
      <div id="skirt-more-gallery" hidden={!showMore}>
        {showMore && <div className="skirt-archive-grid">{assets.filter((a) => a.id <= 35 && !featured.includes(a.id)).map((a) => visual(a.id))}</div>}
      </div>
      <footer className="skirt-conclusion"><p>由一件单品的设计识别出发，连接穿搭策划、人物表现、字体设计与渠道编排。</p><strong>让风格被看见，让购买有想象。</strong></footer>
    </section>
  </article>;
}
