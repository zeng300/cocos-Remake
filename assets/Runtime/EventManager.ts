import Singleton from 'db://assets/Base/Singleton'

interface Item {
  func: Function
  ctx?: unknown
}

export default class EventManager extends Singleton {
  static get Instance() {
    return super.GetInstance<EventManager>()
  }

  private evenDir: Map<string, Array<Item>> = new Map()

  on(evenName: string, func: Function, ctx?: unknown) {
    if (this.evenDir.has(evenName)) {
      this.evenDir.get(evenName).push({ func, ctx })
    } else {
      this.evenDir.set(evenName, [{ func, ctx }])
    }
  }

  off(evenName: string, func: Function) {
    if (this.evenDir.has(evenName)) {
      const arr = this.evenDir.get(evenName)
      const index = arr.findIndex((item) => item.func === func)
      if (index !== -1) {
        arr.splice(index, 1)
      }
    }
  }

  emit(evenName: string, ...params: unknown[]) {
    if (this.evenDir.has(evenName)) {
      this.evenDir.get(evenName).forEach(({ func, ctx }) => {
        ctx ? func.apply(ctx, params) : func(...params)
      })
    }
  }

  clear() {
    this.evenDir.clear()
  }
}
