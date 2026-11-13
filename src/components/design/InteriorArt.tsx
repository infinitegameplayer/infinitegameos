import InteriorBand from './InteriorBand'
import InteriorCircuit from './InteriorCircuit'

// One mount per interior page: the header band and the circuit. Place it as the
// first child of an `<article className="iart">`. Tokens-only pages mount none.
export default function InteriorArt({ lean }: { lean: 'cosmic' | 'agentic' }) {
  return (
    <>
      <InteriorBand lean={lean} />
      <InteriorCircuit lean={lean} />
    </>
  )
}
