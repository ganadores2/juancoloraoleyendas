export interface Store<T> {
  getSnapshot(): T
  getServerSnapshot(): T
  subscribe(listener: () => void): () => void
  update(mutator: (current: T) => T): void
  reset(): void
}

/** Store persistido en localStorage, compatible con useSyncExternalStore. */
export function createLocalStore<T extends object>(key: string, initial: T): Store<T> {
  let cache: T | null = null
  const listeners = new Set<() => void>()

  const read = (): T => {
    if (cache) return cache
    try {
      const raw = window.localStorage.getItem(key)
      cache = raw ? { ...initial, ...JSON.parse(raw) } : initial
    } catch {
      cache = initial
    }
    return cache as T
  }

  const write = (next: T) => {
    cache = next
    try {
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // Navegación privada o almacenamiento lleno: el progreso vive solo en memoria.
    }
    listeners.forEach((listener) => listener())
  }

  return {
    getSnapshot: read,
    getServerSnapshot: () => initial,
    subscribe(listener) {
      listeners.add(listener)
      const onStorage = (event: StorageEvent) => {
        if (event.key === key) {
          cache = null
          listener()
        }
      }
      window.addEventListener('storage', onStorage)
      return () => {
        listeners.delete(listener)
        window.removeEventListener('storage', onStorage)
      }
    },
    update(mutator) {
      write(mutator(read()))
    },
    reset() {
      write(initial)
    },
  }
}
