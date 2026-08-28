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

export const WIDTH = 400
export const HEIGHT = 250

const SKY_PRESETS: [string, string][] = [
  ["var(--paper-soft)", "var(--ochre)"],
  ["var(--ochre)", "var(--terracotta)"],
  ["var(--teal)", "var(--paper-soft)"],
  ["var(--rose)", "var(--terracotta-dark)"],
]

export type Landmark = "pyramid" | "palm" | "felucca" | "obelisk"

export interface PostcardScene {
  sky: [string, string]
  horizon: number
  sun: { x: number; y: number; r: number }
  hillBack: { path: string; color: string }
  hillFront: { path: string; color: string }
  landmark: { type: Landmark; x: number; baseY: number; scale: number }
  birds: { x: number; y: number }[]
}

function hillPath(rand: () => number, baseY: number, amplitude: number): string {
  const segments = 4
  const step = WIDTH / segments
  let d = `M 0 ${HEIGHT} L 0 ${baseY.toFixed(1)}`
  let prevX = 0
  let prevY = baseY
  for (let i = 1; i <= segments; i++) {
    const x = i * step
    const y = baseY - amplitude * 0.5 + rand() * amplitude
    const cx = (prevX + x) / 2
    d += ` Q ${cx.toFixed(1)} ${prevY.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`
    prevX = x
    prevY = y
  }
  d += ` L ${WIDTH} ${HEIGHT} Z`
  return d
}

/** Deterministically generates a flat-illustrated "postcard" landscape from a seed string. */
export function generatePostcard(seed: string): PostcardScene {
  const rand = mulberry32(hashSeed(seed))

  const sky = SKY_PRESETS[Math.floor(rand() * SKY_PRESETS.length)]
  const horizon = HEIGHT * (0.58 + rand() * 0.08)

  const sun = {
    x: WIDTH * (0.15 + rand() * 0.7),
    y: horizon * (0.25 + rand() * 0.35),
    r: 16 + rand() * 12,
  }

  const hillBack = {
    path: hillPath(rand, horizon * 0.92, 22),
    color: rand() > 0.5 ? "var(--teal-dark)" : "var(--olive)",
  }
  const hillFront = {
    path: hillPath(rand, horizon * 1.04, 16),
    color: rand() > 0.5 ? "var(--olive-dark)" : "var(--terracotta-dark)",
  }

  const landmarks: Landmark[] = ["pyramid", "palm", "felucca", "obelisk"]
  const landmark = {
    type: landmarks[Math.floor(rand() * landmarks.length)],
    x: WIDTH * (0.2 + rand() * 0.6),
    baseY: horizon * 1.02,
    scale: 0.8 + rand() * 0.5,
  }

  const birdCount = 2 + Math.floor(rand() * 3)
  const birds = Array.from({ length: birdCount }, () => ({
    x: WIDTH * (0.1 + rand() * 0.8),
    y: horizon * (0.15 + rand() * 0.5),
  }))

  return { sky, horizon, sun, hillBack, hillFront, landmark, birds }
}
