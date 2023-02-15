import mutationTypes from './mutationTypes'
import { State } from './state'

const {
  CHANGE_POSITION,
  GTETOPITEMID
} = mutationTypes

interface CPOSITIONPAYLOAD {
  dragId: string,
  x: number,
  y: number
}

const mutations = {
  /**
   * 更改拖拽项偏移量
   * @param state 
   * @param payload 
   */
  [CHANGE_POSITION](state: State, payload: CPOSITIONPAYLOAD) {
    state.draggableItems[payload.dragId] = {
      ...state.draggableItems[payload.dragId],
      x: payload.x,
      y: payload.y
    }
  },
  /**
   * 更改当前顶端拖拽项 ID
   * @param state 
   * @param dragId 
   */
  [GTETOPITEMID](state: State, dragId: string) {
    state.topDragItemId = dragId
  }
}

export default mutations
