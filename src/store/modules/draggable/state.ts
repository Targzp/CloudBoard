import { getStorageData } from '@/utils'

export interface State {
  draggableItems: {
    [prop: string]: {
      data: any,
      x: number,
      y: number,
      zIndex: number,
      width: number,
      height: number
    }
  },
  topZIndex: number
}

// draggableItems 状态
const state: State = {
  draggableItems: getStorageData('local', 'cloudBoard', 'draggable', 'draggableItems') || {},
  topZIndex: getStorageData('local', 'cloudBoard', 'draggable', 'topZIndex') || 0
}

export default state
