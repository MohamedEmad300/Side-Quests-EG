const ACCENT_VARS = ["--terracotta", "--ochre", "--olive", "--teal", "--rose"]

function hashSeed(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function midpoint([ax, ay]: [number, number], [bx, by]: [number, number]): [number, number] {
  return [(ax + bx) / 2, (ay + by) / 2]
}

export interface DoodleAvatarPattern {
  path: string
  colorVar: string
  size: number
  initial: string
}

/**
 * Deterministically derives a hand-drawn-looking "blob sticker" avatar from a seed string --
 * a wobbly organic circle (via smoothed points around a jittered radius) instead of a pixel grid.
 */
export function generateDoodleAvatar(seed: string, size = 100): DoodleAvatarPattern {
  const rand = mulberry32(hashSeed(seed))
  const cx = size / 2
  const cy = size / 2
  const baseR = size * 0.42
  const points = 8
  const jitter = 0.22

  const pts: [number, number][] = []
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2
    const r = baseR * (1 - jitter / 2 + rand() * jitter)
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r])
  }

  const start = midpoint(pts[points - 1], pts[0])
  let path = `M ${start[0].toFixed(1)} ${start[1].toFixed(1)}`
  for (let i = 0; i < points; i++) {
    const p = pts[i]
    const next = pts[(i + 1) % points]
    const m = midpoint(p, next)
    path += ` Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`
  }
  path += " Z"

  const colorVar = ACCENT_VARS[Math.floor(rand() * ACCENT_VARS.length)]
  const initial = seed.trim().charAt(0).toUpperCase() || "?"

  return { path, colorVar, size, initial }
}
