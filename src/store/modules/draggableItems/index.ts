import state from './state'
import mutations from './mutations'

export default {
  draggableItems: {
    namespaced: true,
    state,
    mutations
  }
}
