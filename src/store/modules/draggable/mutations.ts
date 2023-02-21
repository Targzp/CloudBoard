import mutationTypes from './mutationTypes'
import { State } from './state'
import { DragItem } from '@/view/NoteBoard.vue'

const {
  CHANGE_POSITION,
  CHANGE_ZINDEX,
  GTETOPZINDEX,
  CHANGE_RECT,
  ADD_ITEM
} = mutationTypes

interface CPOSITIONPAYLOAD {
  dragId: string,
  x: number,
  y: number
}

interface CZINDEXPAYLOAD {
  dragId: string,
  zIndex: number
}

interface CRECTPAYLOAD {
  dragId: string,
  width: number,
  height: number
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
   * 更改拖拽项层叠量
   * @param state 
   * @param payload 
   */
  [CHANGE_ZINDEX](state: State, payload: CZINDEXPAYLOAD) {
    state.draggableItems[payload.dragId] = {
      ...state.draggableItems[payload.dragId],
      zIndex: payload.zIndex
    }
  },
  /**
   * 更改当前顶端拖拽项层叠量
   * @param state 
   * @param dragId 
   */
  [GTETOPZINDEX](state: State, zIndex: number) {
    state.topZIndex = zIndex
  },
  /**
   * 更改拖拽项宽高
   * @param state 
   * @param payload 
   */
  [CHANGE_RECT](state: State, payload: CRECTPAYLOAD) {
    state.draggableItems[payload.dragId] = {
      ...state.draggableItems[payload.dragId],
      width: payload.width,
      height: payload.height
    }
  },
  [ADD_ITEM](state: State, payload: DragItem) {
    state.draggableItems[payload.id] = {
      data: payload
    }
  }
}

export default mutations
