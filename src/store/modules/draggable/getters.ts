import { State } from './state'
import { objectToArray } from '@/utils/objectToArray'

const getters = {
  dragBlocks (state: State) {
    return objectToArray(state.draggableItems, 'data')
  }
}

export default getters