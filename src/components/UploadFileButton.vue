<template>
  <span class="UploadFileButton">
    <span @click="handleUpload">
      <slot name="button">
        <el-icon class="UploadFileButton__Icon pointer"><DocumentAdd /></el-icon>
      </slot>
    </span>
    <input
      ref="inputRef"
      type="file"
      class="UploadFileButton__Input"
      @change="handleGetFile"
    />
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputRef = ref()  // 文件输入框 ref 对象

/**
 * 进行文件上传
 */
const handleUpload = () => {
  inputRef.value.click()
}

/**
 * 处理所选文件
 * @param e 
 */
const handleGetFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  console.log('files: ', files);
}
</script>

<style lang="scss" scoped>
.UploadFileButton {
  &__Icon {
    font-size: 14px;
    margin-left: 5px;
  }

  &__Input {
    display: none;
  }
}
</style>
