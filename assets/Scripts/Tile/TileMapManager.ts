import { _decorator, Component, error, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from "cc";
import Levels from "../../Levels";
import { TileManager } from "./TileManager";
import { createUINode } from "../../Utils";

const { ccclass, property } = _decorator;

export const TILE_WIDTH = 55;
export const TILE_HEIGHT = 55;

@ccclass("TileMapManager")
export class TileMapManager extends Component {
  async init() {
    try {
      const { mapInfo } = Levels[`level${1}`];

      const spriteFrames = await this.loadRes();

      for (let i = 0; i < mapInfo.length; i++) {
        const row = mapInfo[i];
        for (let j = 0; j < row.length; j++) {
          const item = row[j];
          if (item === null || item.type === null) continue;

          const newNode = createUINode();

          const imgSrc = `tile (${item.src})`;
          const spriteFrame = spriteFrames.find((v) => v.name === imgSrc) || spriteFrames[0];

          const tileManager = newNode.addComponent(TileManager);
          tileManager.init(spriteFrame, i, j);

          newNode.setParent(this.node);
        }
      }
    } catch (err) {
      console.log("初始化失败", err);
    }
  }

  loadRes(): Promise<SpriteFrame[]> {
    return new Promise((resolve, reject) => {
      resources.loadDir("texture/tile/tile", SpriteFrame, function (err, assets) {
        if (err) {
          reject(err);
          return;
        }
        resolve(assets);
      });
    });
  }
}
