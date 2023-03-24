import {
  reactive,
  toRefs,
  onMounted,
  Ref
} from 'vue'
import { getCss } from '@/utils'
import {
  useEventListener
} from '@vueuse/core'

interface DragOptions {
  x: number,
  y: number,
  onMove?: Function
}

export const useDraggable = (handleEl: Ref<HTMLElement | null>[], dragEl: Ref<HTMLElement | null>, dragOptions?: DragOptions) => {
  const dragConf = reactive({
    left: '0px',
    top: '0px',
    currentX: 0,
    currentY: 0,
    dragFlag: false
  })

  onMounted(() => {
    if (dragEl.value) {
      // 拖拽的元素必须设置 fixed 或者 absolute
      if (!['fixed', 'absolute'].includes(getCss(dragEl.value, 'position'))) {
        return
      }
      // 设定拖拽元素初始偏移量
      if (dragOptions && (dragOptions.x === 0 || dragOptions.x)) {
        dragConf.left = dragOptions.x + 'px'
      } else {
        dragConf.left = getCss(dragEl.value, 'left') || '0px'
      }
      dragEl.value.style.left = dragConf.left
      if (dragOptions && (dragOptions.y === 0 || dragOptions)) {
        dragConf.top = dragOptions.y + 'px'
      } else {
        dragConf.top = getCss(dragEl.value, 'top') || '0px'
      }
      dragEl.value.style.top = dragConf.top
    }
    
  })

  const start = (e: PointerEvent) => {
    dragConf.dragFlag = true
    dragConf.currentX = e.clientX
    dragConf.currentY = e.clientY
  }
  const move = (e: PointerEvent) => {
    if (dragConf.dragFlag) {
      const nowX = e.clientX
      const nowY = e.clientY
      const disX = nowX - dragConf.currentX
      const dixY = nowY - dragConf.currentY

      if (dragEl.value) {
        dragEl.value.style.left = parseInt(dragConf.left) + disX + 'px'
        dragEl.value.style.top = parseInt(dragConf.top) + dixY + 'px'
      }

      if (dragOptions && dragOptions.onMove) {
        dragOptions.onMove(parseInt(dragConf.left) + disX, parseInt(dragConf.top) + dixY)
      }

      if (e.preventDefault) {
        e.preventDefault()
      }

      return false
    }
  }
  const end = (e: PointerEvent) => {
    dragConf.dragFlag = false
    if (dragEl.value) {
      dragConf.left = getCss(dragEl.value, 'left')
      dragConf.top = getCss(dragEl.value, 'top')
    }
  }
  
  handleEl.forEach((el: Ref<HTMLElement | null>) => {
    useEventListener(el, 'pointerdown', start, false)
  })
  useEventListener(document, 'pointermove', move, false)
  useEventListener(document, 'pointerup', end, false)

  return {
    ...toRefs(dragConf)
  }
}
