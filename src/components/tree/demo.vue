<template>
  <div class="demo-box">
    <h3>tree demo</h3>
    <m-tree :source="list" :lazyLoad="lazyLoad"></m-tree>
  </div>
</template>
<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue';
import { TreeNodeOptions } from './types';

function resursion(path = '0'): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 2; i++) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      // children: [],
      hasChildren: true,
    };
    list.push(treeNode);
  }
  return list;
}
export default defineComponent({
  name: '',
  setup(props, { emit }) {
    const list = ref<TreeNodeOptions[]>([]);
    onMounted(() => {
      list.value = resursion();
    });
    const lazyLoad = (node: TreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => {
      const result: TreeNodeOptions[] = [];
      for (let i = 0; i < 3; i++) {
        const nodeKey = `${node.nodeKey}-${i}`;
        const treeNode: TreeNodeOptions = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true,
          selected: nodeKey === '0-0-1',
          disable: i % 2 === 0,
        };
        result.push(treeNode);
      }
      setTimeout(() => {
        callback(result);
      }, 1000);
    };

    return {
      list,
      lazyLoad,
    };
  },
});
</script>

<style lang="scss"></style>
