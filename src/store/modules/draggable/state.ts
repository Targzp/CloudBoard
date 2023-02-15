import { getStorageData } from '@/utils'

export interface State {
  draggableItems: {
    [prop: string]: {
      data: any,
      x: number,
      y: number
    }
  },
  topDragItemId: string
}

// draggableItems 状态
const state: State = {
  draggableItems: getStorageData('local', 'cloudBoard', 'draggable', 'draggableItems') || {},
  topDragItemId: getStorageData('local', 'cloudBoard', 'draggable', 'topDragItemId') || ''
}

export default state
