import { State } from './state'
import { objectToArray } from '@/utils'

const getters = {
  dragBlocks (state: State) {
    return objectToArray(state.draggableItems, 'data')
  }
}

export default getters