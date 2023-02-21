import state from './state'
import mutations from './mutations'
import getters from './getters'

export default {
  draggable: {
    namespaced: true,
    state,
    getters,
    mutations
  }
}
