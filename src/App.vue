<template>
  <div class="app-container">
    <h2>app</h2>
    <span class="text"> </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style lang="scss">
.text {
  color: $error-color;
}
</style>
