<template>
  <div class="demo-box">
    <h3>tree demo</h3>
    <button @click="getSlectdNode">获取选中节点</button> | <button @click="getCheckedNode">获取勾选节点</button> |
    <button @click="getHalfCheckedNodes">获取半勾选节点</button>
    <m-tree ref="mTree" :source="list" :lazyLoad="lazyLoad" :showCheckbox="true">
      <template #icon="loadding">
        <i v-if="loadding" class="iconfont iconcustom-icon ico-loading"></i>
        <i v-else class="iconfont iconzhankai"></i>
      </template>
    </m-tree>
  </div>
</template>
<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue';
import { TreeInstance, TreeNodeOptions } from './types';

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
          // disable: i % 2 === 0,
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
    const mTree = ref<TreeInstance>();
    const getSlectdNode = () => {
      const node = mTree.value!.getSelectedNode();
      console.log(node);
    };
    const getCheckedNode = () => {
      const node = mTree.value!.getCheckedNode();
      console.log(node);
    };
    const getHalfCheckedNodes = () => {
      const node = mTree.value!.getHalfCheckedNodes();
      console.log('getHalfCheckedNodes', node);
    };
    return {
      list,
      lazyLoad,
      renderNode,
      mTree,
      getSlectdNode,
      getCheckedNode,
      getHalfCheckedNodes,
    };
  },
});
</script>

<style lang="scss"></style>
