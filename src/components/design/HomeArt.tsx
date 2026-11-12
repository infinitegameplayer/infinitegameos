import { Board, Chip, Dim, Ink, Light, LitGlowDef, NebGrad, SkyAperture, Via, arc } from './board-parts'

// Decorative pieces the homepage places between its sections. Each is
// aria-hidden with data-art, so the twin drops it and the line-under-text
// instrument can hide it.

/**
 * The orientation orbit for phones and narrow screens: three arcs, the sky
 * through the 6 px one. From 1280 the circuit draws the orbit instead.
 */
export function PhoneOrbit() {
  return (
    <div className="orb2-phone" data-art="" aria-hidden="true">
      <Board w={390} h={180}>
        <defs>
          <SkyAperture id="o2p-sky" x={100} y={-30} w={600} h={338} />
          <NebGrad id="o2p-v" x1={0} y1={0} x2={0} y2={180} />
          <LitGlowDef id="o2p-glow" />
        </defs>
        <Light d={arc(470, 250, 350, 215, 270)} g="o2p-v" w={1.5} o={0.5} />
        <path d={arc(470, 250, 290, 215, 270)} stroke="url(#o2p-sky)" strokeWidth={6} fill="none" />
        <Light d={arc(470, 250, 230, 215, 270)} g="o2p-v" w={3} o={0.6} />
        <Ink d="M0 150H60L84 126H132" />
        <Via x={132} y={126} />
      </Board>
    </div>
  )
}

/**
 * A junction rule: a short chamfered lead with a via, and a hairline that runs
 * out to the column edge. Shown below 1280 only; the circuit takes over there.
 */
export function JunctionRule({ flip = false }: { flip?: boolean }) {
  return (
    <div className={flip ? 'jr flip' : 'jr'} data-art="" aria-hidden="true">
      <Board w={74} h={24}>
        <Ink d="M8 23H30L42 11H74" />
        <Via x={4} y={23} />
      </Board>
      <i data-art="" aria-hidden="true" />
    </div>
  )
}

/** The chip beside the install block, with its lit lead and a dimension line. Desktop only. */
export function ChipArt() {
  return (
    <div className="chipwrap" data-c="chip" data-art="" aria-hidden="true">
      <Board w={216} h={150} vb="-12 0 216 150" style={{ position: 'absolute', left: -12, top: 0, overflow: 'visible' }}>
        <defs>
          <LitGlowDef id="chip-glow" />
        </defs>
        <Chip x={12} y={12} />
        <Via x={0} y={72} glow="chip-glow" />
        <Dim x1={12} x2={180} y={140} />
      </Board>
    </div>
  )
}
