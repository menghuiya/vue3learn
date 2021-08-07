<template>
  <div class="demo-box">
    <h3>tree demo</h3>
    <m-tree :source="list"></m-tree>
  </div>
</template>
<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue';
import { TreeNodeOptions } from '../types';

function resursion(path = '0', level = 2): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 5; i++) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      expanded: false,
      children: [],
      hasChildren: true,
      disable: i % 2 === 0,
    };

    if (level > 0) {
      treeNode.children = resursion(nodeKey, level - 1);
    } else {
      treeNode.hasChildren = false;
    }
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

    return {
      list,
    };
  },
});
</script>

<style lang="scss"></style>
