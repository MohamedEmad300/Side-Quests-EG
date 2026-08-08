const ACCENT_VARS = [
  "--gold",
  "--lapis",
  "--turquoise",
  "--terracotta",
  "--scarab",
]

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

export interface PixelAvatarPattern {
  grid: boolean[][]
  colorVar: string
  size: number
}

/** Deterministically derives a symmetric identicon-style pixel pattern from a seed string. */
export function generatePixelAvatar(seed: string, size = 5): PixelAvatarPattern {
  const rand = mulberry32(hashSeed(seed))
  const half = Math.ceil(size / 2)
  const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < half; x++) {
      const on = rand() > 0.55
      grid[y][x] = on
      grid[y][size - 1 - x] = on
    }
  }

  const colorVar = ACCENT_VARS[Math.floor(rand() * ACCENT_VARS.length)]
  return { grid, colorVar, size }
}
