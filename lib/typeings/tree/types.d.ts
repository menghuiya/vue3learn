declare type nodeKey = string | number;
/**
 * 用户传入的source必须要要有nodeKey,name
 */
interface TreeNodeOptions {
    nodeKey: nodeKey;
    name: string;
    level?: number;
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
declare type RequiredTreeNodeOption = Required<TreeNodeOptions>;
declare type rednerFunc = (node: RequiredTreeNodeOption) => JSX.Element;
export { nodeKey, TreeNodeOptions, RequiredTreeNodeOption, rednerFunc, TreeInstance, TreeNodeInstance };
