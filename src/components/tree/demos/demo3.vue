<template>
  <div class="demo-box">
    <h3>tree demo</h3>
    <m-tree :source="list" :lazyLoad="lazyLoad" :render="renderNode" :showCheckbox="true">
      <template #icon="loadding">
        <i v-if="loadding" class="iconfont iconcustom-icon ico-loading"></i>
        <i v-else class="iconfont iconzhankai"></i>
      </template>
    </m-tree>
  </div>
</template>
<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue';
import { TreeNodeOptions } from '../types';

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
          selected: false,
          disable: i % 2 === 0,
        };
        result.push(treeNode);
      }
      setTimeout(() => {
        callback(result);
      }, 1000);
    };
    const renderNode = (node: TreeNodeOptions) => {
      return (
        <div style="padding:0 4px;">
          <b style="color:#f60;">{node.name}</b>
        </div>
      );
    };
    return {
      list,
      lazyLoad,
      renderNode,
    };
  },
});
</script>

<style lang="scss"></style>
