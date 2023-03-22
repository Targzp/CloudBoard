<template>
  <div class="SideBar">
    <div class="SideBar__Inner">
      <!-- 功能区 -->
      <div :class="['SideBar__Function', { 'SideBar__Function--hide': !show }]">
        <!-- 增加 -->
        <div
          class="SideBar__Function__Plus circle pointer"
          @click="handleAddItem"
        >
          <el-icon class="SideBar__Icon SideBar__Icon--white">
            <Plus />
          </el-icon>
        </div>
        <!-- 整理 -->
        <div
          class="SideBar__Function__Tidy circle pointer"
          @click="handleArrange"
        >
          <el-icon class="SideBar__Icon SideBar__Icon--blue">
            <Files />
          </el-icon>
        </div>
      </div>
    </div>
    <!-- 操作区 -->
    <div class="SideBar__Operate">
      <div
        class="SideBar__Operate__Close circle pointer"
        @click="handleShow"
      >
        <el-icon class="SideBar__Icon SideBar__Icon--blue" v-if="show">
          <Close />
        </el-icon>
        <el-icon class="SideBar__Icon SideBar__Icon--blue" v-if="!show">
          <ArrowUp />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref
} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import draggableItemsMutationTypes from '@/store/modules/draggable/mutationTypes'

const store = useStore()

const route = useRoute()

const show = ref(true)

/**
 * 处理是否展示功能区
 */
const handleShow = () => {
  show.value = !show.value
}

/**
 * 增加云板项目
 */
const handleAddItem = () => {
  const path = route.path
  if (path.includes('note-board')) {
    store.commit(`draggable/${draggableItemsMutationTypes.ADD_ITEM}`)
  }
}

/**
 * 整理便签拖拽项
 */
const handleArrange = () => {
  store.commit(`draggable/${draggableItemsMutationTypes.ARRANGE_ITEM}`)
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme/variables.scss';
.SideBar {
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 442px;

  &__Inner {
    height: 400px;
    overflow: hidden;
    padding: 10px 10px 0px 10px;
  }

  &__Function, &__Operate {
    width: 60px;
  }

  &__Function {
    height: 100%;
    transition: all 0.4s ease;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 29px 29px 0px 0px;
    box-shadow: 0px 0px 5px 1px $shadowColor;

    &__Plus {
      background-color: $primary;
      box-shadow: 0px 0px 8px 1px $shadowBlue;
    }

    &__Tidy {
      margin-top: 5px;
    }
  }

  &__Function--hide {
    transform: translateY(423px);
    opacity: 0;
  }

  &__Operate {
    position: absolute;
    z-index: 2;
    bottom: 10px;
    left: 10px;
    &__Close {
      background-color: $white;
      box-shadow: 0px 0px 8px 1px $shadowColor;
    }
  }

  &__Icon {
    font-size: 30px;

    &--white {
      color: $white;
    }

    &--blue {
      color: $primary;
    }
  }
}

.circle {
  width: 100%;
  height: 58px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.circle:active {
  transform: scale(0.9);
}
</style>
