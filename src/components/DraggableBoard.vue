<template>
  <div
    :style="{
      width: width + '%',
      height: height + '%'
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { InjectionKey } from 'vue'
import { Emitter } from 'mitt'

type Events = {
  'clickToTop': {
    e: HTMLElement,
    dragId: string
  }
}

export const emitterKey: InjectionKey<Emitter<Events>> = Symbol('emitterKey')
export const initialTopDragKey = Symbol() as InjectionKey<string>
</script>

<script lang="ts" setup>
import { provide } from 'vue'
import mitt from 'mitt'

const props = defineProps<{
  width: number,  // 宽度百分比
  height: number  // 高度百分比
  initialTopDragItem: string
}>()
const emit = defineEmits<{
  (e: 'changeTopItem', dragId: string): void
}>()

const emitter = mitt<Events>()

let zIndex = 3  // 当前拖拽区域最大层叠量

emitter.on('clickToTop', ({ e, dragId }) => {
  e.style.zIndex = `${zIndex++}`  // 将当前所点击拖拽项的层叠量等于当前最大层叠量加一
  emit('changeTopItem', dragId)
})

provide(emitterKey, emitter)
provide(initialTopDragKey, props.initialTopDragItem)
</script>

<style scope>
</style>
