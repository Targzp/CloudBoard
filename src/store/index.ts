import { createStore } from 'vuex'
import draggableItems from './modules/draggableItems'

const store = createStore({
  modules: {
    ...draggableItems
  }
})

export default store
