<template>
  <span class="UploadFileButton">
    <span @click="handleUpload">
      <span class="UploadFileButton__Icon pointer">
        <slot name="button">
          <el-icon>
            <DocumentAdd />
          </el-icon>
        </slot>
      </span>
    </span>
    <input
      ref="inputRef"
      type="file"
      class="UploadFileButton__Input"
      :accept="accept"
      @change="handleGetFile"
    />
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  accept?: string; // 接受上传的文件类型
  beforeUpload: (file: File) => boolean; // 上传前的回调
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'onGetFile', file: File): void;
}>();

const inputRef = ref(); // 文件输入框 ref 对象

/**
 * 进行文件上传
 */
const handleUpload = () => {
  inputRef.value.click();
};

/**
 * 处理所选文件
 * @param e
 */
const handleGetFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    const valid = props.beforeUpload(files[0])
    if (valid) {
      emit('onGetFile', files[0]);
    }
  }

  inputRef.value.value = ''
};
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
