import { readStorage, writeStorage } from "@/lib/storage"

/** Minimal localStorage-backed external store, read via React's useSyncExternalStore. */
export function createStore<T>(key: string, initial: T) {
  let cache = readStorage<T>(key, initial)
  let listeners: Array<() => void> = []

  function get() {
    return cache
  }

  function set(next: T) {
    cache = next
    writeStorage(key, next)
    listeners.forEach((listener) => listener())
  }

  function subscribe(listener: () => void) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  return { get, set, subscribe }
}
