import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import draggable from './modules/draggable'

const store = createStore({
  modules: {
    ...draggable
  },
  plugins: [createPersistedState({
    key: 'cloudBoard'
  })]
})

export default store
