import { getStorageData } from '@/utils'

export interface State {
  draggableItems: {
    [prop: string]: {
      data: any,
      x: number,
      y: number
    }
  }
}

// draggableItems 状态
const state: State = {
  draggableItems: getStorageData('local', 'cloudBoard', 'draggable', 'draggableItems') || {}
}

export default state
