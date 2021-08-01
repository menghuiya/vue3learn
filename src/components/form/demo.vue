<template>
  <div class="demo-box">
    <m-form-item label="姓名:">
      <m-input placeholder="请输入姓名"></m-input>
    </m-form-item>
    <m-form-item label="姓名:">
      <template #label>
        <b>自定义lable</b>
      </template>
      <m-input placeholder="自定义lable"></m-input>
    </m-form-item>
  </div>
</template>
<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormDemo',
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style lang="scss"></style>
