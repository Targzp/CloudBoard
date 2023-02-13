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

let zIndex = 2

emitter.on('clickToTop', (e) => {
  e.style.zIndex = `${zIndex++}`
})

defineProps<{
  width: number,
  height: number
}>()

provide(emitterKey, emitter)
</script>

<style scope>
</style>
