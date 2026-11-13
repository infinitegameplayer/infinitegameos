import { Board, Chip, Dim, Ink, Light, LitGlowDef, NebGrad, Pad, Via, arc } from './board-parts'

// The hero's boards. Decorative only: every SVG is aria-hidden with data-art,
// so the twin drops them and the line-under-text instrument can hide them.
//
// From 1280 px wide: two flanks (400 by 900), left and right, under the clear
// zone mask so no trace reaches the words, and a fade over the last 20 percent
// of the hero. Below 1280: the phone boards (390 by 150), one top and one
// bottom, centred. The CSS in circuit.css shows one set at a time.
//
// Lit vias are gold (--lit): two on the desktop set, two on the phone set, so
// no screen shows more than three. Each carries its glow as a radial gradient.

export default function HeroBoard() {
  return (
    <>
      <div className="board board-desk" data-art="" aria-hidden="true">
        <Board cls="l" w={400} h={900}>
          <defs>
            <NebGrad id="hb-gl" x1={0} y1={0} x2={400} y2={0} t0={0} t1={0.5} />
            <LitGlowDef id="hb-glow-l" />
          </defs>
          <path className="ink6" d={arc(560, 720, 480, 255, 185)} opacity=".7" />
          <Light d={arc(560, 720, 560, 255, 185)} g="hb-gl" w={3} o={0.6} />
          <Light d={arc(560, 720, 640, 255, 185)} g="hb-gl" w={1.5} o={0.5} />
          <Ink d="M0 144H120L144 168V216" />
          <Via x={144} y={216} />
          <Ink d="M0 312H168L192 336H240" />
          <Via x={240} y={336} />
          <Light d="M0 408H96L120 432V504L144 528H216" g="hb-gl" w={1.5} o={0.75} />
          <Via x={216} y={528} />
          <Pad x={0} y={408} />
          <Ink d="M0 600H72L96 624H168" />
          <Via x={168} y={624} />
          <Light d="M0 768H120L144 744H216V672" g="hb-gl" w={1.5} o={0.75} />
          <Via x={216} y={672} glow="hb-glow-l" />
          <Ink d="M0 840H72L96 816H144" />
          <Via x={144} y={816} />
          <Pad x={0} y={768} />
        </Board>
        <Board cls="r" w={400} h={900}>
          <defs>
            <NebGrad id="hb-gr" x1={0} y1={0} x2={400} y2={0} t0={0.5} t1={1} />
            <LitGlowDef id="hb-glow-r" />
          </defs>
          <Light d="M400 264H264L240 288V384L216 408H168" g="hb-gr" w={1.5} o={0.75} />
          <Via x={168} y={408} />
          <Ink d="M400 144H312L288 168H216" />
          <Via x={216} y={168} />
          <Ink d="M400 336H360L336 360V456L312 480H264" />
          <Via x={264} y={480} />
          <Pad x={400} y={336} />
          <Light d="M400 504H312L288 528H216" g="hb-gr" w={1.5} o={0.7} />
          <Via x={216} y={528} />
          <Ink d="M400 600H232M400 608H224M400 616H216M400 624H208M400 632H200" />
          <Via x={232} y={600} />
          <Via x={200} y={632} />
          <Chip x={192} y={648} />
          <Ink d="M180 708H172" />
          <Via x={168} y={708} glow="hb-glow-r" />
          <Via x={360} y={696} />
          <Dim x1={192} x2={360} y={792} />
          <Ink d="M400 840H280L256 816H232" />
          <Via x={232} y={816} />
        </Board>
      </div>
      <div className="board board-phone" data-art="" aria-hidden="true">
        <Board cls="t" w={390} h={150}>
          <defs>
            <NebGrad id="hb-gt" x1={0} y1={0} x2={390} y2={0} />
            <LitGlowDef id="hb-glow-t" />
          </defs>
          <Light d="M-10 136A600 600 0 0 1 400 136" g="hb-gt" w={1.5} o={0.6} />
          <Ink d="M-10 73A660 660 0 0 1 400 73" />
          <Ink d="M0 96H48L72 120H120" />
          <Via x={120} y={120} />
          <Ink d="M390 108H330L306 132H264" />
          <Via x={264} y={132} glow="hb-glow-t" />
        </Board>
        <Board cls="u" w={390} h={150}>
          <defs>
            <NebGrad id="hb-gu" x1={0} y1={0} x2={390} y2={0} />
            <LitGlowDef id="hb-glow-u" />
          </defs>
          <Ink d="M0 48H48L72 72H144" />
          <Via x={144} y={72} />
          <Light d="M390 96H312L288 120H228" g="hb-gu" w={1.5} o={0.7} />
          <Via x={228} y={120} glow="hb-glow-u" />
          <Ink d="M0 126H96" />
          <Pad x={0} y={126} />
        </Board>
      </div>
    </>
  )
}
