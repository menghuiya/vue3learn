<template>
  <div class="demo-box">
    <m-tabs v-model="currentTabName">
      <m-tab-pane name="tabOne">
        <template #title="name">
          <b style="color:blue">custom -{{ name }}</b>
        </template>
        content1
      </m-tab-pane>
      <m-tab-pane name="tabTow">content2</m-tab-pane>
      <m-tab-pane name="tabThird">
        <template #title="name">
          <b style="color:red">custom -{{ name }}</b>
        </template>
        content3
      </m-tab-pane>
    </m-tabs>
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: '',
  setup(props, { emit }) {
    const currentTabName = ref('tabThird');

    return { currentTabName };
  },
});
</script>

<style lang="scss"></style>
