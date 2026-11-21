import { _decorator, Component, Node } from 'cc'
import Levels, { ILevel } from 'db://assets/Levels'
import DataManageer from 'db://assets/Runtime/DataManager'
import { createUINode } from '../../Utils'
import { TILE_HEIGHT, TILE_WIDTH, TileMapManager } from '../Tile/TileMapManager'
const { ccclass, property } = _decorator

@ccclass('BattleManager')
export class BattleManager extends Component {
  level: ILevel
  stage: Node
  start() {
    this.generateStage()
    this.initLevel()
  }

  initLevel() {
    const level = Levels[`level${1}`]
    if (level) {
      this.level = level

      DataManageer.Instance.mapInfo = this.level.mapInfo
      DataManageer.Instance.mapRowCount = this.level.mapInfo.length || 0
      DataManageer.Instance.mapColumCount = this.level.mapInfo[0].length || 0

      this.generateTileMap()
    }
  }

  update(deltaTime: number) {}

  generateStage() {
    this.stage = createUINode()
    this.stage.setParent(this.node)
  }

  generateTileMap() {
    const tileMap = createUINode()
    tileMap.setParent(this.stage)
    const tileMapManager = tileMap.addComponent(TileMapManager)
    tileMapManager.init()

    this.adaptPos()
  }

  adaptPos() {
    const { mapRowCount, mapColumCount } = DataManageer.Instance

    const disX = (TILE_WIDTH * mapRowCount) / 2
    const disY = (TILE_HEIGHT * mapColumCount) / 2 + 80

    this.stage.setPosition(-disX, disY)
  }
}
