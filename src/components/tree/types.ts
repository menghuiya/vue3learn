type nodeKey = string | number; //唯一索引

/**
 * 用户传入的source必须要要有nodeKey,name
 */
interface TreeNodeOptions {
  nodeKey: nodeKey;
  name: string;
  level?: number; //控制缩进的
  loadding?: boolean;
  disable?: boolean;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  hasChildren?: boolean;
  children?: TreeNodeOptions[];
  parentKey?: nodeKey | null;
}

interface TreeInstance {
  getSelectedNode: () => RequiredTreeNodeOption | undefined;
  getCheckedNode: () => RequiredTreeNodeOption[];
  getHalfCheckedNodes: () => RequiredTreeNodeOption[];
}
interface TreeNodeInstance {
  node: RequiredTreeNodeOption;
  halfChecked: () => boolean;
}

//组件内部使用 使用vue 自带方法 让他全部属性都有
type RequiredTreeNodeOption = Required<TreeNodeOptions>;

type rednerFunc = (node: RequiredTreeNodeOption) => JSX.Element;

export { nodeKey, TreeNodeOptions, RequiredTreeNodeOption, rednerFunc, TreeInstance, TreeNodeInstance };
