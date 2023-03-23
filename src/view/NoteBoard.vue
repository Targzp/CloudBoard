<template>
  <div class="NoteBoard">
    <DraggableBoard
      :key="arrageCount"
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
            @input="handleItemChange($event, null, 'title', item.id)"
          />
        </template>
        <template #content>
          <div
            contenteditable
            class="text-div"
            @input="handleInput($event, null, 'content', item.id)"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"
            v-html="item.content"
          ></div>
        </template>
        <template #tool>
          <el-icon class="pointer ClipboardIcon" @click="copy(item.content)">
            <CopyDocument />
          </el-icon>
          <UploadFileButton
            accept="image/jpeg,image/png"
            :before-upload="(file) => beforeUpload(file, item.id)"
            @on-get-file="(file) => handleGetFile(file, item.id)"
          >
            <template #button>
              <el-icon><PictureFilled /></el-icon>
            </template>
          </UploadFileButton>
        </template>
        <template #tip> 创建于{{ item.createAt }} </template>
      </DraggableItem>
    </DraggableBoard>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import draggableItemsMutationTypes from '@/store/modules/draggable/mutationTypes';
import DraggableBoard from '@/components/DraggableBoard.vue';
import DraggableItem from '@/components/DraggableItem.vue';
import UploadFileButton from '@/components/UploadFileButton.vue';
import _ from 'lodash'

const store = useStore()

const arrageCount = computed(() => store.state.draggable.arrangeCount);

const topZIndex = computed(() => store.state.draggable.topZIndex);

const { copy, copied } = useClipboard();
watch(copied, (newVal) => {
  if (newVal) {
    ElMessage({
      message: '复制成功',
      type: 'success',
    });
  }
});

const dragBlocks = computed(() => store.getters['draggable/dragBlocks']);

const draggableItems = computed(() => store.state.draggable.draggableItems);

/**
 * 删除便签拖拽项
 * @param dragId 拖拽项 Id
 */
const handleDeleteDragItem = (dragId: string) => {
  store.commit(`draggable/${draggableItemsMutationTypes.DELETE_ITEM}`, dragId);
};

let flag = true
const handleCompositionStart = (e: Event) => {
  flag = false
}
const handleCompositionEnd = () => {
  flag = true
}
const handleInput = (
  e: Event | null,
  val: string | null,
  type: 'title' | 'content',
  dragId: string
) => {
  
  setTimeout(() => {
    if (flag) {
      handleItemChange(e, val, type, dragId)
    }
  }, 0)
}

const handleItemChange = (
  e: Event | null,
  val: string | null,
  type: 'title' | 'content',
  dragId: string
) => {
  if (type === 'title') {
    const value = val || (e && (e.target as HTMLInputElement).value);
    store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_ITEM_TITLE}`, {
      dragId,
      title: value,
    });
  } else if (type === 'content') {
    const value = val || (e && (e.target as HTMLInputElement).innerHTML);
    store.commit(
      `draggable/${draggableItemsMutationTypes.CHANGE_ITEM_CONTENT}`,
      {
        dragId,
        patch: !!val,
        content: value,
      }
    );

    nextTick(() => {
    if (e) {
        const target = e.target as HTMLInputElement
        target.focus()
        const range = window.getSelection(); // 创建range
        if (range) {
          range!.selectAllChildren(target); // range 选择target下所有子内容
          range!.collapseToEnd(); // 光标移至最后
        }
      }
    })
  }
};

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
      y,
    });
  };

  /**
   * 存储拖拽项层叠量
   * @param zIndexItem 层叠量对象
   */
  const handleStoreItemZIndex = (zIndexItem: {
    dragId: string;
    zIndex: number;
  }) => {
    store.commit(
      `draggable/${draggableItemsMutationTypes.CHANGE_ZINDEX}`,
      zIndexItem
    );
  };

  /**
   * 存储最顶端拖拽项层叠量
   * @param zIndex 层叠量
   */
  const handleStoreTopItemId = (zIndex: number) => {
    store.commit(
      `draggable/${draggableItemsMutationTypes.GTETOPZINDEX}`,
      zIndex
    );
  };

  /**
   * 存储拖拽想宽高值
   * @param width 拖拽项宽度
   * @param height 拖拽项高度
   */
  const handleStoreRect = (width: number, height: number, dragId: string) => {
    store.commit(`draggable/${draggableItemsMutationTypes.CHANGE_RECT}`, {
      dragId,
      width,
      height,
    });
  };

  return {
    handleStorePosition,
    handleStoreItemZIndex,
    handleStoreTopItemId,
    handleStoreRect,
  };
};
const {
  handleStorePosition,
  handleStoreItemZIndex,
  handleStoreTopItemId,
  handleStoreRect,
} = useStoreDraggableConfigs();


/**
 * 获取文件前的校验回调
 * @param file 文件对象
 */
const beforeUpload = (file: File, dragId: string) => {
  const domString = dragBlocks.value.find((item: any) => item.id === dragId).content
  const parser = new DOMParser()
  const fragment = parser.parseFromString(domString, 'text/html')
  const imgs = fragment.querySelectorAll('img')
  if (imgs.length === 2) {
    ElMessage({
      message: '仅支持插入2张图片',
      type: 'warning',
    });
    return false
  }
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    ElMessage({
      message: '仅支持png、jpeg格式的图片',
      type: 'warning',
    });
    return false
  }
  if (!(file.size / 1024 < 200)) {
    ElMessage({
      message: '图片大小不可大于200kb',
      type: 'warning',
    });
    return false
  }
  return true;
};

/**
 * 获取文件
 * @param file 文件对象
 */
const handleGetFile = (file: File, dragId: string) => {
  // 通过 FileReader 的 readAsDataURL 方法就可将通过 input 上传的图片文件转成 base64
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    let width = 0
    let height = 0
    if (['image/png', 'image/jpeg'].includes(file.type)) {
      const img = new Image()
      img.src = this.result as string
      img.onload = () => {
        width = Math.ceil(img.width / 1.5)
        height = Math.ceil(img.height / 1.5)

        const imgEleString = `
          <div>
            <img src="${this.result}" alt="" width="${width}px" height="${height}px">
          </div>
        `
        handleItemChange(null, imgEleString, 'content', dragId)
      }
    }
  }
}
</script>

<style lang="scss" scope>
.NoteBoard {
  .ClipboardIcon {
    font-size: 14px;
  }
}
</style>
