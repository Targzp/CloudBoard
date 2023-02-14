<template>
  <div>
    <SideBar />
    <DraggableBoard
      :width="100"
      :height="100"
    >
      <DraggableItem
        v-for="item in dragBlocks"
        :key="item.id"
        :dragId="item.id"
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
  Ref
} from 'vue'
import { useStore } from 'vuex'
import draggableItemsMutationTypes from '@/store/modules/draggableItems/mutationTypes'
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
  }
])

const handleStorePosition = (x: number, y: number, dragId: string) => {
  store.commit(`draggableItems/${draggableItemsMutationTypes.CHANGE_POSITION}`, {
    dragId,
    x,
    y
  })
}
</script>

<style lang="scss" scope>
</style>
