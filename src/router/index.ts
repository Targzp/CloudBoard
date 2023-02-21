import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/view/Board.vue'),
    redirect: '/note-board',
    children: [
      {
        path: 'note-board',
        component: () => import('@/view/NoteBoard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
