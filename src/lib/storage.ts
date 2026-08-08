const STORAGE_PREFIX = "sidequests:"

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
}
