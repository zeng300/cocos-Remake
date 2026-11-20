import { SpriteFrame, resources } from 'cc'
import Singleton from 'db://assets/Base/Singleton'

export default class ResourceManager extends Singleton {
  static get Instance() {
    return super.GetInstance<ResourceManager>()
  }

  // 'texture/tile/tile'
  loadDir(path: string, type: typeof SpriteFrame = SpriteFrame): Promise<SpriteFrame[]> {
    return new Promise((resolve, reject) => {
      resources.loadDir(path, type, function (err, assets) {
        if (err) {
          reject(err)
          return
        }
        resolve(assets)
      })
    })
  }
}
