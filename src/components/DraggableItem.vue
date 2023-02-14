<template>
  <div
    ref="el"
    class="NoteContainer"
  >
    <div class="NoteContainer__Header" ref="headerEl">
      <span class="NoteContainer__Header__Title">
        <slot name="header">
          便签标题
        </slot>
      </span>
      <el-icon class="NoteContainer__Header__Close pointer"><Close /></el-icon>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  inject,
  watch
} from 'vue'
import { useDraggable } from '@/hooks'
import { useEventListener } from '@vueuse/core'
import { emitterKey } from './DraggableBoard.vue'

const props = defineProps<{
  initialX?: number,  // 初始 x 坐标
  initialY?: number,  // 初始 y 坐标
  dragId: string  // 拖拽项 id
}>()
const emit = defineEmits<{
  (e: 'changPosition', x: number, y: number, dragId: string): void
}>()

const emitter = inject(emitterKey)

const el = ref<HTMLElement | null>(null)  // 拖拽容器
const headerEl = ref<HTMLElement | null>(null)  // 可拖拽区域
const { left, top } = useDraggable(headerEl, el, { x: props.initialX || 500, y: props.initialY || 200 })  // 开启可拖拽功能

// 监听拖拽时的偏移量
watch([left, top], ([newLeft, newTop]) => {
  if (newLeft && newTop) {
    emit('changPosition', parseInt(newLeft), parseInt(newTop), props.dragId)
  }
})

// 当点击拖拽容器时将拖拽项保持在拖拽区域最前
const handlePutTop = (e: PointerEvent) => {
  if (e) {
    emitter?.emit('clickToTop', el.value as HTMLElement)
  }
}
useEventListener(el, 'pointerdown', handlePutTop)
</script>

<style lang="scss" scope>
@import '@/styles/theme/variables.scss';
.NoteContainer {
  position: fixed;
  background-color: $white;
  width: 300px;
  height: 300px;
  min-width: 100px;
  min-height: 100px;
  padding: 8px;
  resize: both;
  overflow: auto;
  box-shadow: 0px 0px 1px 1px $shadowColor;
  border-radius: 5px;
  transition: box-shadow 0.15s ease;

  &__Header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__Title {
      font-weight: bold;
      font-size: 15px;
    }

    &__Close {
      font-size: 14px;
      color: $shallowGray;
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
