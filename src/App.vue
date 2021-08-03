<template>
  <div class="app">
    <div class="app-container">
      <FormDemo />
      <br />
      <!-- <m-input placeholder="请输入值sss"></m-input> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormDemo from './components/form/demo.vue';
export default defineComponent({
  name: 'App',
  components: { FormDemo },
});
</script>

<style lang="scss"></style>
