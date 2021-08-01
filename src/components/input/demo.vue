<template>
  <div class="demo-box">
    <span>text: {{ text }}</span>
    <m-input placeholder="请输入值xxx" type="text" v-model="text"></m-input>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'inputDemo',
  components: {},
  setup(props, { emit }) {
    const text = ref('aaa');
    return {
      text,
    };
  },
});
</script>

<style lang="scss"></style>
