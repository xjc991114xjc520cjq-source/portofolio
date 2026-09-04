import { useRef, useState, type ReactNode, type Ref } from "react";
import manifest from "./case-extensions.json";

type Asset = {src: string; alt: string; caption: string; group: string; width: number; height: number};
export function ArchiveToggle({assets, expanded, id, onClick, buttonRef}: {assets: {src: string; width: number; height: number}[]; expanded: boolean; id: string; onClick: () => void; buttonRef?: Ref<HTMLButtonElement>}) {
  const previews = assets.filter((_, i) => [0, Math.floor(assets.length / 2), assets.length - 1].includes(i)).slice(0, 3);
  return <button ref={buttonRef} className="editorial-expand archive-toggle" type="button" aria-expanded={expanded} aria-controls={id} onClick={onClick}>
    <span className="archive-teasers" aria-hidden="true" style={{gridTemplateColumns: previews.map(a => `${a.width / a.height}fr`).join(" ")}}>{previews.map(a => <img key={a.src} src={a.src} width={a.width} height={a.height} alt="" loading="lazy" />)}</span>
    <span className="archive-label"><span className="archive-eyebrow">延展作品 · {assets.length} 张</span><strong>{expanded ? "收起延展作品" : "展开延展作品"}</strong><span className="archive-hint">更多构图、场景与渠道表达</span></span>
    <span className="archive-symbol" aria-hidden="true">{expanded ? "−" : "+"}</span>
  </button>;
}
export function CaseExtensions({kind, renderImage}: {kind: string; renderImage: (src: string, alt: string) => ReactNode}) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const assets = (manifest as Record<string, Asset[]>)[kind];
  if (!assets?.length) return null;
  const groups = Array.from(new Set(assets.map(a => a.group)));
  const id = `case-extensions-${kind}`;
  const close = () => {
    setExpanded(false);
    requestAnimationFrame(() => { toggle.current?.focus({preventScroll:true}); toggle.current?.scrollIntoView({block:"start"}); });
  };
  return <section className="case-extensions" aria-labelledby={`${id}-title`}>
    <header className="editorial-heading"><h3 id={`${id}-title`}>同一产品，还有更多表达。</h3><p>延展主线之外的视觉作品，独立呈现不同场景、构图与渠道比例。</p></header>
    <ArchiveToggle buttonRef={toggle} assets={assets} expanded={expanded} id={id} onClick={() => setExpanded(!expanded)} />
    <div id={id} hidden={!expanded}>{expanded && groups.map(group => <section className="case-extension-group" key={group} aria-label={group}>
      <header><h4>{group}</h4><span>{assets.filter(a => a.group === group).length} 张</span></header>
      <div className="case-extension-grid">{assets.filter(a => a.group === group).map(a => <figure key={a.src}>
        <div className="extension-media" style={{aspectRatio: `${a.width} / ${a.height}`}}>{renderImage(a.src,a.alt)}</div><figcaption>{a.caption}</figcaption>
      </figure>)}</div>
    </section>)}{expanded && <button type="button" className="case-extension-close" onClick={close}>收起延展作品，返回本节</button>}</div>
  </section>;
}
