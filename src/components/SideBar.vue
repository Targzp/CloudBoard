<template>
  <div class="SideBar">
    <div class="SideBar__Inner">
      <!-- 功能区 -->
      <div :class="['SideBar__Function', { 'SideBar__Function--hide': !show }]">
        <!-- 增加 -->
        <div class="SideBar__Function__Plus circle pointer">
          <el-icon class="SideBar__Icon SideBar__Icon--white">
            <Plus />
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
import { ref } from 'vue'

const show = ref(true)

const handleShow = () => {
  show.value = !show.value
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
    justify-content: space-between;
    border-radius: 29px 29px 0px 0px;
    box-shadow: 0px 0px 5px 1px $shadowColor;

    &__Plus {
      background-color: $primary;
      box-shadow: 0px 0px 8px 1px $shadowBlue;
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
}
</style>
