<template>
  <div
    ref="el"
    class="NoteContainer"
    @mouseenter="handleShowTip"
    @mouseleave="handleShowTip"
  >
    <div class="NoteContainer__Header" ref="headerEl">
      <span class="NoteContainer__Header__Title">
        <slot name="header"></slot>
      </span>
      <el-icon
        class="NoteContainer__Header__Close pointer"
        @click="emit('deleteItem')"
      ><Close /></el-icon>
    </div>
    
    <div class="NoteContainer__Content">
      <slot name="content"></slot>
    </div>

    <div
      class="NoteContainer__BottomBar"
      v-if="slots.tip || slots.tool"
    >
      <div class="NoteContainer__BottomBar__Content" v-show="showTip">
        <slot name="tool"></slot>
        <span class="tip">
          <slot name="tip"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  inject,
  watch,
  onMounted,
  useSlots
} from 'vue'
import { useDraggable } from '@/hooks'
import { 
  useEventListener,
  useResizeObserver
} from '@vueuse/core'
import { emitterKey } from './DraggableBoard.vue'

const slots = useSlots()  // 当前组件插槽

const props = withDefaults(defineProps<{
  initialX?: number,  // 初始 x 坐标
  initialY?: number,  // 初始 y 坐标
  initialZIndex?: number, // 初始层叠量
  initialWidth?: number,  // 初始宽
  initialHeight?: number, // 初始高
  dragId: string  // 拖拽项 id
}>(), {
  initialX: 500,
  initialY: 200,
  initialZIndex: 0,
  initialWidth: 300,
  initialHeight: 300
})
const emit = defineEmits<{
  (e: 'changPosition', x: number, y: number, dragId: string): void
  (e: 'changeRect', width: number, height: number, dragId: string): void
  (e: 'deleteItem'): void
}>()

const emitter = inject(emitterKey)

const showTip = ref(false)  // 是否显示提示区域
/**
 * 处理 tip 区域显示
 */
const handleShowTip = () => {
  showTip.value = !showTip.value
}

const el = ref<HTMLElement | null>(null)  // 拖拽容器
const headerEl = ref<HTMLElement | null>(null)  // 可拖拽区域
const { left, top } = useDraggable(headerEl, el, { x: props.initialX, y: props.initialY })  // 开启可拖拽功能

// 监听拖拽时的偏移量
watch([left, top], ([newLeft, newTop]) => {
  if (newLeft && newTop) {
    emit('changPosition', parseInt(newLeft), parseInt(newTop), props.dragId)
  }
})

// 当点击拖拽容器时将拖拽项保持在拖拽区域最前
const handlePutTop = (e: PointerEvent) => {
  if (e) {
    emitter?.emit('clickToTop', { e: el.value as HTMLElement, dragId: props.dragId })
  }
}
useEventListener(el, 'pointerdown', handlePutTop)

// 当拖拽项宽高变化时记录宽高量
useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  emit('changeRect', width, height, props.dragId)
})

onMounted(() => {
  if (props.initialZIndex && el.value) {
    el.value.style.zIndex = `${props.initialZIndex}`
  }
  if (props.initialWidth && props.initialHeight && el.value) {
    el.value.style.width = `${props.initialWidth}px`
    el.value.style.height = `${props.initialHeight}px`
  }
})
</script>

<style lang="scss" scope>
@import '@/styles/theme/variables.scss';
.NoteContainer {
  position: fixed;
  background-color: $white;
  min-width: 220px;
  min-height: 220px;
  padding: 8px;
  resize: both;
  overflow: auto;
  box-shadow: 0px 0px 1px 1px $shadowColor;
  border-radius: 5px;
  transition: box-shadow 0.15s ease;
  display: flex;
  flex-flow: column nowrap;

  &__Header {
    display: flex;
    flex: 1 1 auto;
    padding-bottom: 5px;
    padding-left: 8px;
    padding-right: 8px;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    box-sizing: border-box;
    top: 8px;
    left: 0px;
    right: 0px;
    border-bottom: 1px solid #e9e9e98c;

    &__Title {
      font-weight: bold;
      font-size: 15px;
    }

    &__Close {
      font-size: 14px;
      color: $shallowGray;
    }
  }

  &__Content {
    padding-top: 30px;
    width: 100%;
    height: 98%;
    overflow: hidden;
    box-sizing: border-box;
  }

  &__BottomBar {
    height: 18px;
    padding-top: 4px;

    &__Content {
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: $shallowGray;
      position: relative;

      .tool {
        position: absolute;
        left: 0px;
      }

      .tip {
        position: absolute;
        right: 0px;
      }
    }
  }

  &:hover {
    box-shadow: 0px 2px 5px 2px $shadowColor;
  }

  &::-webkit-resizer {
    background-color: transparent;
  }
}
</style>
