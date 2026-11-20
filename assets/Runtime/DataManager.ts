import Singleton from 'db://assets/Base/Singleton'
import { ITile } from 'db://assets/Levels'

export default class DataManageer extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManageer>()
  }

  mapInfo: Array<Array<ITile>>
  mapRowCount: number
  mapColumCount: number
}
