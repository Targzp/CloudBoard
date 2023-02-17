<template>
  <div class="NoteBoard">
    <DraggableBoard
      :width="100"
      :height="100"
      :initialTopZIndex="topZIndex"
      @changeTopZIndex="handleStoreTopItemId"
      @changeItemZIndex="handleStoreItemZIndex"
    >
      <DraggableItem
        v-for="item in dragBlocks"
        :key="item.id"
        :dragId="item.id"
        :initialX="draggableItems[item.id]?.x"
        :initialY="draggableItems[item.id]?.y"
        :initialWidth="draggableItems[item.id]?.width"
        :initialHeight="draggableItems[item.id]?.height"
        :initialZIndex="draggableItems[item.id]?.zIndex"
        @changPosition="handleStorePosition"
        @changeRect="handleStoreRect"
      >
        <template #header>
          <input
            class="nb-input fontBold"
            v-model="item.title"
          />
        </template>
        <template #content>
          <textarea
            class="nb-textarea"
            v-model="item.content"
          />
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
const topZIndex = computed(() => store.state.draggable.topZIndex)

/**
 * 存储拖拽项各类配置的 hook
 */
const useStoreDraggableConfigs = () => {
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
   * 存储拖拽项层叠量
   * @param zIndexItem 层叠量对象
   */
  const handleStoreItemZIndex = (zIndexItem: { dragId: string, zIndex: number }) => {
    store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_ZINDEX}`, zIndexItem)
  }

  /**
   * 存储最顶端拖拽项层叠量
   * @param zIndex 层叠量
   */
  const handleStoreTopItemId = (zIndex: number) => {
    store.commit(`draggable/${draggableItemsMutationTypes.GTETOPZINDEX}`, zIndex)
  }

  /**
  * 存储拖拽想宽高值
  * @param width 拖拽项宽度
  * @param height 拖拽项高度
  */
  const handleStoreRect = (width: number, height: number, dragId: string) => {
    store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_RECT}`, {
      dragId,
      width,
      height
    })
  }

  return {
    handleStorePosition,
    handleStoreItemZIndex,
    handleStoreTopItemId,
    handleStoreRect
  }
}
const {
  handleStorePosition,
  handleStoreItemZIndex,
  handleStoreTopItemId,
  handleStoreRect
} = useStoreDraggableConfigs()
</script>

<style lang="scss" scope>
</style>
