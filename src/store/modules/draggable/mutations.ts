import mutationTypes from './mutationTypes'
import { generateRandom } from '@/utils'
import { State } from './state'
import dayjs from 'dayjs'
import _ from 'lodash'

const {
  CHANGE_POSITION,
  CHANGE_ZINDEX,
  GTETOPZINDEX,
  CHANGE_RECT,
  ADD_ITEM,
  DELETE_ITEM,
  CHANGE_ITEM_TITLE,
  CHANGE_ITEM_CONTENT,
  ARRANGE_ITEM
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

interface CITEMTITLEPAYLOAD {
  dragId: string,
  title: string
}

interface CITEMCONTENTPAYLOAD {
  dragId: string,
  patch: boolean,
  content: string
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
  /**
   * 增加拖拽项
   * @param state 
   * @param payload 
   */
  [ADD_ITEM](state: State) {
    const id = generateRandom()
    state.draggableItems[id] = {
      data: {
        id,
        title: '',
        content: '',
        createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
      zIndex: state.topZIndex + 1,
    }
  },
  /**
   * 删除拖拽项
   * @param state 
   * @param payload 
   */
  [DELETE_ITEM](state: State, payload: string) {
    delete state.draggableItems[payload]
  },
  /**
   * 修改拖拽项标题
   * @param state 
   * @param payload 
   */
  [CHANGE_ITEM_TITLE](state: State, payload: CITEMTITLEPAYLOAD) {
    state.draggableItems[payload.dragId].data.title = payload.title
  },
  /**
   * 修改拖拽项内容
   * @param state 
   * @param payload 
   */
  [CHANGE_ITEM_CONTENT](state: State, payload: CITEMCONTENTPAYLOAD) {
    if (!payload.patch) {
      state.draggableItems[payload.dragId].data.content = payload.content
    } else {
      state.draggableItems[payload.dragId].data.content += payload.content
    }
  },
  /**
   * 整理拖拽项内容
   * @param state 
   */
  [ARRANGE_ITEM](state: State) {
    const arrangeBoxWidth = document.documentElement.clientWidth - 10
    if (state.draggableItems) {
      const keys = Object.keys(state.draggableItems)
      let row = 1 // 行数
      let column = 1 // 列数
      keys.forEach((key, index) => {
        state.draggableItems[key].width = 220
        state.draggableItems[key].height = 220
        if (index === 0) {
          state.draggableItems[key].x = 115
        } else {
          let x = 115 + (column * 220) + (column * 30)  // 最左侧边距 + 前面所有拖拽项宽度总和 + 前面所有拖拽项间隔总和
          if (x + 220 <= arrangeBoxWidth) {
            state.draggableItems[key].x = x
            column++
          } else {
            state.draggableItems[key].x = 115
            column = 1
            row++
          }
        }
        if (row === 1) {
          state.draggableItems[key].y = 16
        } else {
          let y = 16 + ((row - 1) * 220) + ((row - 1) * 30) // 最顶端边距 + 上面所有拖拽项高度总和 + 上面所有拖拽项间隔总和
          state.draggableItems[key].y = y
        }
      })

      state.arrangeCount += 1
    }
  }
}

export default mutations
