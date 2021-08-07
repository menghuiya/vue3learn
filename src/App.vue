<template>
  <div class="app">
    <div class="app-container">
      <TreeDemo />
      <br />
      <!-- <m-input placeholder="请输入值sss"></m-input> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeDemo from './components/tree/demo.vue';
export default defineComponent({
  name: 'App',
  components: { TreeDemo },
});
</script>

<style lang="scss"></style>
