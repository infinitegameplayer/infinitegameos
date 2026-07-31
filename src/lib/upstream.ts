// upstream.ts
// Single source of truth for what version of the Sovereign Ecosystem template
// this site is describing.
//
// The version lives in public/igos-index.json, which is bumped as part of every
// template release. Any page that states the version reads it from here rather
// than hardcoding it, so the public page cannot fall behind the repo it
// describes. That drift is not hypothetical: the page claimed "at v2.4.0" while
// the repo shipped v3.6.0, four majors later, because the claim was prose that
// nobody was obliged to update.
//
// A fact restated by hand in a second place is a fact that will eventually
// disagree with itself. This is the ecosystem's own first principle, applied to
// its own website: state once, point elsewhere.

import igosIndex from '../../public/igos-index.json'

export const upstreamVersion: string = igosIndex.upstream_version
export const upstreamRepo: string = igosIndex.upstream_repo
export const upstreamUpdatedAt: string = igosIndex.updated_at

// Skills that ship inside the template AND install from this site as standalone
// plugins. The site cannot compute this set on its own, because it cannot see
// what the template bundles, so the release records it and the page reads it.
// The page previously stated the number in prose and was two behind.
export const dualDistributionSkills: string[] =
  igosIndex.template_dual_distribution ?? []
export const dualDistributionCount: number = dualDistributionSkills.length
