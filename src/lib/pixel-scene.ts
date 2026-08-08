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

const WIDTH = 24
const HEIGHT = 14

/**
 * Procedurally generates a desert-at-dusk pixel landscape from a seed string,
 * used as quest cover art so the app never depends on external images.
 */
export function generatePixelScene(seed: string) {
  const rand = mulberry32(hashSeed(seed))
  const horizon = Math.floor(HEIGHT * (0.55 + rand() * 0.1))
  const sunX = Math.floor(WIDTH * (0.2 + rand() * 0.6))
  const sunY = Math.floor(horizon * (0.3 + rand() * 0.35))
  const sunR = 1.6 + rand() * 0.8

  const pyramidCount = 1 + Math.floor(rand() * 2)
  const pyramids = Array.from({ length: pyramidCount }, () => ({
    baseX: Math.floor(rand() * WIDTH),
    baseWidth: 5 + Math.floor(rand() * 6),
    height: 3 + Math.floor(rand() * 4),
  }))

  const grid: string[][] = []

  for (let y = 0; y < HEIGHT; y++) {
    const row: string[] = []
    for (let x = 0; x < WIDTH; x++) {
      const dist = Math.hypot(x - sunX, (y - sunY) * 1.3)
      let color: string

      if (dist < sunR) {
        color = "var(--gold)"
      } else if (y < horizon) {
        const dither = (x * 7 + y * 13) % 5 === 0
        color = dither ? "var(--lapis)" : "var(--lapis-dark)"
      } else {
        const dither = (x * 3 + y * 5) % 6 === 0
        color = dither ? "var(--gold-dark)" : "var(--sand-dark)"
      }
      row.push(color)
    }
    grid.push(row)
  }

  for (const p of pyramids) {
    for (let py = 0; py < p.height; py++) {
      const rowY = horizon - 1 - py
      if (rowY < 0) continue
      const rowWidth = Math.max(1, Math.round(p.baseWidth * (1 - py / p.height)))
      const startX = p.baseX - Math.floor(rowWidth / 2)
      for (let px = 0; px < rowWidth; px++) {
        const gx = startX + px
        if (gx < 0 || gx >= WIDTH) continue
        const shade = px < rowWidth / 2 ? "var(--basalt)" : "var(--ink)"
        grid[rowY][gx] = shade
      }
    }
  }

  return { grid, width: WIDTH, height: HEIGHT }
}
