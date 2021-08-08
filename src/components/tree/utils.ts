import { RequiredTreeNodeOption } from './types';

// 向下递归更新节点的勾选状态
function updateDownWards(checked: boolean, node: RequiredTreeNodeOption) {
  const update = (children: RequiredTreeNodeOption[]) => {
    if (children.length) {
      children.forEach((item) => {
        item.checked = checked;
        if (item.children.length) {
          update(item.children as RequiredTreeNodeOption[]);
        }
      });
    }
  };
  update(node.children as RequiredTreeNodeOption[]);
}
// 向下递归更新节点的勾选状态
function updatePpWards(node: RequiredTreeNodeOption, flatList: RequiredTreeNodeOption[]) {
  const update = (currentNode: RequiredTreeNodeOption) => {
    if (currentNode.parentKey) {
      //子节点
      const parentNode = flatList.find((item) => item.nodeKey === currentNode.parentKey);
      if (parentNode) {
        //parentNode 当前的checked状态 是否子节点是全部勾选了的
        const parentChecked = !parentNode.children.some((child) => !child.checked);
        if (parentChecked !== parentNode.checked) {
          parentNode.checked = parentChecked;
          update(parentNode);
        }
      }
    }
  };
  update(node);
}

export { updateDownWards, updatePpWards };
