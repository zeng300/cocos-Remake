import { _decorator, Component } from 'cc'
import DataManager from 'db://assets/Runtime/DataManager'
import ResourceManager from 'db://assets/Runtime/ResourceManager'
import { TileManager } from 'db://assets/Scripts/Tile/TileManager'
import { createUINode, randomByRange } from 'db://assets/Utils'

const { ccclass, property } = _decorator

export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    try {
      const spriteFrames = await ResourceManager.Instance.loadDir('texture/tile/tile')
      const { mapInfo } = DataManager.Instance

      for (let i = 0; i < mapInfo.length; i++) {
        const row = mapInfo[i]
        for (let j = 0; j < row.length; j++) {
          const item = row[j]
          if (item === null || item.type === null) continue

          let number = item.src
          if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
            number += randomByRange(0, 4)
          }
          const imgSrc = `tile (${number})`

          const newNode = createUINode()
          const spriteFrame = spriteFrames.find((v) => v.name === imgSrc) || spriteFrames[0]

          const tileManager = newNode.addComponent(TileManager)
          tileManager.init(spriteFrame, i, j)

          newNode.setParent(this.node)
        }
      }
    } catch (err) {
      console.log('初始化失败', err)
    }
  }
}
