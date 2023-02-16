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
</script>

<script lang="ts" setup>
import { provide } from 'vue'
import mitt from 'mitt'

const props = withDefaults(defineProps<{
  width: number,  // 宽度百分比
  height: number  // 高度百分比
  initialTopZIndex: number, // 初始最大层叠量
}>(), {
  initialTopZIndex: 0
})
const emit = defineEmits<{
  (e: 'changeTopZIndex', zIndex: number): void
  (e: 'changeItemZIndex', zIndexItem: { dragId: string, zIndex: number }): void
}>()

const emitter = mitt<Events>()

let zIndex = props.initialTopZIndex  // 当前拖拽区域最大层叠量

emitter.on('clickToTop', ({ e, dragId }) => {
  e.style.zIndex = `${++zIndex}`  // 将当前所点击拖拽项的层叠量等于当前最大层叠量加一
  emit('changeTopZIndex', zIndex)
  emit('changeItemZIndex', { dragId, zIndex })
})

provide(emitterKey, emitter)
</script>

<style scope>
</style>
