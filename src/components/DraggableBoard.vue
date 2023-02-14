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
import { InjectionKey } from 'vue'
import { Emitter } from 'mitt'

type Events = {
  'clickToTop': HTMLElement
}

export const emitterKey: InjectionKey<Emitter<Events>> = Symbol('emitterKey')
</script>

<script lang="ts" setup>
import { provide } from 'vue'
import mitt from 'mitt'

const emitter = mitt<Events>()

let zIndex = 2  // 当前拖拽区域最大层叠量

emitter.on('clickToTop', (e) => {
  e.style.zIndex = `${zIndex++}`  // 将当前所点击拖拽项的层叠量等于当前最大层叠量加一
})

defineProps<{
  width: number,  // 宽度百分比
  height: number  // 高度百分比
}>()

provide(emitterKey, emitter)
</script>

<style scope>
</style>
