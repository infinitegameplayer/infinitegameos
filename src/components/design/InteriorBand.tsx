import { Board, Dim, Ink, Light, LitGlowDef, NebGrad, Pad, SkyAperture, Via, Xh, arc } from './board-parts'

// The header band of an interior page. It ends: the band masks out toward the
// page background, so it is never the page background. Cosmic carries the sky
// aperture and an inner lit arc (the outer thin arc is dropped, ruling 41);
// agentic carries a chip outline, a bus, crosshairs and a lattice sheet.
//
// Decorative only: every SVG is aria-hidden with data-art and ph-no-capture.
// The desktop SVG shows from 768 px, the phone SVG below. Lit vias are gold
// (--lit) and there is one per variant, so no screen shows more than three.

const CX = 640
const CY = 160

function Cosmic() {
  return (
    <>
      <Board cls="dk" w={560} h={320}>
        <defs>
          <SkyAperture id="ib-sky" x={-60} y={-65} w={800} h={450} />
          <NebGrad id="ib-cg" x1={0} y1={0} x2={560} y2={0} t0={0.1} t1={1} />
          <LitGlowDef id="ib-glow" />
        </defs>
        <path d={arc(CX, CY, 290, 210, 150)} stroke="url(#ib-sky)" strokeWidth={6} fill="none" />
        <Light d={arc(CX, CY, 220, 210, 150)} g="ib-cg" w={3} o={0.6} />
        <Light d="M560 40H504L480 64H444" g="ib-cg" w={1.5} o={0.75} />
        <Via x={444} y={64} />
        <Light d="M560 112H528L504 136" g="ib-cg" w={1.5} o={0.7} />
        <Pad x={560} y={112} />
        <Light d="M560 232H496L472 208V184" g="ib-cg" w={1.5} o={0.75} />
        <Via x={472} y={184} glow="ib-glow" />
        <Light d="M560 280H464L440 256H404" g="ib-cg" w={1.5} o={0.7} />
        <Via x={404} y={256} />
        <Light d="M560 184H536" g="ib-cg" w={1.5} o={0.6} />
        <Ink d="M560 88H536L512 112" />
        <Ink d="M560 256H520L496 280" />
        <Ink d="M560 8H480L456 32" />
        <Via x={456} y={32} />
      </Board>
      <Board cls="ph" w={390} h={130}>
        <defs>
          <NebGrad id="ib-cgp" x1={0} y1={0} x2={390} y2={0} t0={0.1} t1={1} />
          <LitGlowDef id="ib-glowp" />
        </defs>
        <Light d="M-10 110A600 600 0 0 1 400 110" g="ib-cgp" w={3} o={0.55} />
        <Light d="M-10 90A640 640 0 0 1 400 90" g="ib-cgp" w={1.5} o={0.5} />
        <Ink d="M390 80H340L316 104H280" />
        <Via x={280} y={104} glow="ib-glowp" />
        <Ink d="M0 70H48L72 94H110" />
        <Via x={110} y={94} />
      </Board>
    </>
  )
}

function Agentic() {
  return (
    <>
      <div className="sheetq" />
      <div className="sheetp" />
      <Board cls="dk" w={576} h={280}>
        <defs>
          <NebGrad id="ib-ag" x1={0} y1={0} x2={576} y2={0} t0={0.1} t1={1} />
          <LitGlowDef id="ib-aglow" />
        </defs>
        <Xh x={384} y={192} />
        <Xh x={192} y={192} />
        <rect className="ink4" x={64} y={72} width={168} height={120} rx={6} />
        <rect className="ink" x={104} y={104} width={88} height={56} rx={2} />
        {[0, 1, 2].map((i) => (
          <Ink key={i} d={`M64 ${108 + i * 24}h-12M232 ${108 + i * 24}h12`} />
        ))}
        <Via x={40} y={132} glow="ib-aglow" />
        <Ink d="M576 232H264M576 240H256M576 248H248M576 256H240M576 264H232" />
        <Via x={264} y={232} />
        <Via x={232} y={264} />
        <Light d="M576 120H468L444 144H336" g="ib-ag" w={1.5} o={0.75} />
        <Via x={336} y={144} />
        <Light d="M576 40H504L480 64H420" g="ib-ag" w={1.5} o={0.7} />
        <Via x={420} y={64} />
        <Ink d="M576 168H528L504 192H456" />
        <Via x={456} y={192} />
        <Ink d="M576 16H432" />
      </Board>
      <Board cls="ph" w={390} h={130}>
        <defs>
          <NebGrad id="ib-agp" x1={0} y1={0} x2={390} y2={0} t0={0.1} t1={1} />
          <LitGlowDef id="ib-aglowp" />
        </defs>
        <Ink d="M390 100H210M390 108H202M390 116H194" />
        <Via x={210} y={100} />
        <Via x={194} y={116} glow="ib-aglowp" />
        <Light d="M0 84H60L84 108H132" g="ib-agp" w={1.5} o={0.7} />
        <Via x={132} y={108} />
        <Dim x1={24} x2={128} y={70} />
      </Board>
    </>
  )
}

export default function InteriorBand({ lean }: { lean: 'cosmic' | 'agentic' }) {
  return (
    <div className={lean === 'agentic' ? 'iband ag' : 'iband'} data-art="" aria-hidden="true">
      {lean === 'agentic' ? (
        <div className="clip">
          <Agentic />
        </div>
      ) : (
        <div className="clip">
          <Cosmic />
        </div>
      )}
    </div>
  )
}
