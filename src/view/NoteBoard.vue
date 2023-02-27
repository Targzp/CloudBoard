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
        @deleteItem="handleDeleteDragItem(item.id)"
      >
        <template #header>
          <input
            class="nb-input fontBold"
            :value="item.title"
            @input="handleItemChange($event, 'title', item.id)"
          />
        </template>
        <template #content>
          <div
            :contentEditable="true"
            class="text-div"
            @input="handleItemChange($event, 'content', item.id)"
          >{{ item.content }}</div>
        </template>
        <template #tool>
          <el-icon
            class="pointer ClipboardIcon"
            @click="copy(item.content)"
          >
            <CopyDocument />
          </el-icon>
          <UploadFileButton />
        </template>
        <template #tip>
          创建于{{ item.createAt }}
        </template>
      </DraggableItem>
    </DraggableBoard>
  </div>
</template>

<script lang="ts">
import { generateRandom } from '@/utils'

export interface DragItem {
  id: string,
  title: string,
  content: string,
  createAt: string
}

export const getNewDragItem = (): DragItem => {
  return {
    id: generateRandom(),
    title: '',
    content: '',
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<script lang="ts" setup>
import {
  computed,
  watch
} from 'vue'
import { useStore } from 'vuex'
import {
  useClipboard
} from '@vueuse/core'
import { ElMessage } from 'element-plus'
import draggableItemsMutationTypes from '@/store/modules/draggable/mutationTypes'
import DraggableBoard from '@/components/DraggableBoard.vue'
import DraggableItem from '@/components/DraggableItem.vue'
import UploadFileButton from '@/components/UploadFileButton.vue'
import dayjs from 'dayjs'

const store = useStore()

const { copy, copied } = useClipboard()
watch(copied, (newVal) => {
  if (newVal) {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }
})

const dragBlocks = computed(() => store.getters['draggable/dragBlocks'])

const draggableItems = computed(() => store.state.draggable.draggableItems)
const topZIndex = computed(() => store.state.draggable.topZIndex)

/**
 * 删除便签拖拽项
 * @param dragId 拖拽项 Id
 */
const handleDeleteDragItem = (dragId: string) => {
  store.commit(`draggable/${draggableItemsMutationTypes.DELETE_ITEM}`, dragId)
}

const handleItemChange = (e: Event, type: 'title' | 'content', dragId: string) => {
  if (type === 'title') {
    const value = (e.target as HTMLInputElement).value
    store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_ITEM_TITLE}`, {
      dragId,
      title: value
    })
  } else if (type === 'content') {
    const value = (e.target as HTMLInputElement).innerText
    store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_ITEM_CONTENT}`, {
      dragId,
      content: value
    })
  } 
}


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
.NoteBoard {
  .ClipboardIcon {
    font-size: 14px;
  }
}
</style>
