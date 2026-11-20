import Singleton from 'db://assets/Base/Singleton'

export default class EvenManager extends Singleton {
  static get Instance() {
    return super.GetInstance<EvenManager>()
  }

  private evenDir: Map<string, Array<Function>> = new Map()
}
