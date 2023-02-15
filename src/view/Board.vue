<template>
  <div>
    <SideBar />
    <DraggableBoard
      :width="100"
      :height="100"
      :initialTopDragItem="topDragItemId"
      @changeTopItem="handleStoreTopItemId"
    >
      <DraggableItem
        v-for="item in dragBlocks"
        :key="item.id"
        :dragId="item.id"
        :initialX="draggableItems[item.id]?.x"
        :initialY="draggableItems[item.id]?.y"
        @changPosition="handleStorePosition"
      >
        <template #header>
          {{ item.title }}
        </template>
      </DraggableItem>
    </DraggableBoard>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  Ref,
  computed
} from 'vue'
import { useStore } from 'vuex'
import draggableItemsMutationTypes from '@/store/modules/draggable/mutationTypes'
import SideBar from '@/components/SideBar.vue'
import DraggableBoard from '@/components/DraggableBoard.vue'
import DraggableItem from '@/components/DraggableItem.vue'
import dayjs from 'dayjs'

const store = useStore()

interface dragItem {
  id: string,
  title: string,
  content: string,
  createAt: string
}

const dragBlocks: Ref<dragItem[]> = ref([
  {
    id: 'nt100001',
    title: '便签1',
    content: '内容2',
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 'nt100002',
    title: '便签2',
    content: '内容2',
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    id: 'nt100003',
    title: '便签3',
    content: '内容3',
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
])

const draggableItems = computed(() => store.state.draggable.draggableItems)
const topDragItemId = computed(() => store.state.draggable.topDragItemId)

/**
 * 存储拖拽项偏移量
 * @param x 左偏移量
 * @param y 上偏移量
 * @param dragId 拖拽项 ID
 */
const handleStorePosition = (x: number, y: number, dragId: string) => {
  store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_POSITION}`, {
    dragId,
    x,
    y
  })
}

/**
 * 存储最顶端拖拽项 ID
 * @param dragId 拖拽项 ID
 */
const handleStoreTopItemId = (dragId: string) => {
  store.commit(`draggable/${draggableItemsMutationTypes.GTETOPITEMID}`, dragId)
}
</script>

<style lang="scss" scope>
</style>
