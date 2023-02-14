import mutationTypes from './mutationTypes'
import { State } from './state'

const {
  CHANGE_POSITION
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
    console.log('payload: ', payload);
    state.draggableItems[payload.dragId] = {
      ...state.draggableItems[payload.dragId],
      x: payload.x,
      y: payload.y
    }
  }
}

export default mutations
