import { defineComponent, PropType, watch, ref } from 'vue';
import { cloneDeep } from 'lodash';

import { TreeNodeOptions, RequiredTreeNodeOption, nodeKey, rednerFunc, TreeNodeInstance } from './types';
import MNode from './node';
import './index.scss';
import { updateDownWards, updatePpWards } from './utils';

export default defineComponent({
  name: 'MTree',
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      default: () => [],
    },
    render: Function as PropType<rednerFunc>,
    lazyLoad: {
      type: Function as PropType<(node: RequiredTreeNodeOption, callback: (children: TreeNodeOptions[]) => void) => void>,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    checkStricty: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select-change', 'check-change'],
  setup(props, { emit, slots, expose }) {
    //推导优先 其次泛型
    const loadding = ref(false);
    const selectKey = ref<nodeKey>('');
    /**
     * 拉平tree结构的数据,平铺
     * @param source TreeNodeOptions[]
     * @returns RequiredTreeNodeOption[]
     */
    const flatTree = (source: TreeNodeOptions[]): RequiredTreeNodeOption[] => {
      const result: RequiredTreeNodeOption[] = [];
      const recursion = (list: TreeNodeOptions[], level = 0, parent: RequiredTreeNodeOption | null = null): RequiredTreeNodeOption[] => {
        return list.map((item) => {
          const node: RequiredTreeNodeOption = {
            ...item,
            level,
            loadding: false,
            disable: item.disable || false,
            expanded: item.expanded || false,
            selected: item.selected || false,
            checked: item.checked || parent?.checked || false,
            hasChildren: item.hasChildren || false,
            parentKey: parent?.nodeKey || null,
            children: item.children || [],
          };
          if (node.selected) {
            selectKey.value = node.nodeKey;
          }

          result.push(node);
          if (item.expanded && node.children.length) {
            node.children = recursion(node.children, level + 1, node);
          }
          return node;
        });
      };
      if (source.length) {
        recursion(source);
      }

      return result;
    };
    const flatList = ref<RequiredTreeNodeOption[]>([]);
    watch(
      () => props.source,
      (newVal) => {
        flatList.value = flatTree(newVal);
      },
      { immediate: true }
    );

    const expandNode = (node: RequiredTreeNodeOption, children: TreeNodeOptions[] = []) => {
      /**
       * 安装lodash 插件
       * npm i lodash -s
       * npm i @types/lodash -d 类型
       */
      const trueChildren = children.length ? children : cloneDeep(node.children);
      node.children = trueChildren.map((item) => {
        return {
          ...item,
          level: item.level || node.level + 1,
          loadding: false,
          disable: item.disable || false,
          expanded: item.expanded || false,
          selected: item.selected || false,
          hasChildren: item.hasChildren || false,
          // false 也是合法值,不能用||,??可选链
          checked: item.checked ?? node.checked,
          parentKey: node?.nodeKey || null,
          children: item.children || [],
        };
      });
      const targetIndex = flatList.value.findIndex((item) => item.nodeKey === node.nodeKey);
      if (targetIndex > -1) {
        flatList.value.splice(targetIndex + 1, 0, ...(node.children as RequiredTreeNodeOption[]));
      }
    };
    /**
     * 收起下拉
     * @param node
     */
    const collapseNode = (node: RequiredTreeNodeOption) => {
      const delKeys: nodeKey[] = [];
      const recursion = (currentNode: RequiredTreeNodeOption) => {
        if (currentNode.children.length) {
          currentNode.children.forEach((item) => {
            delKeys.push(item.nodeKey);
            if (item.expanded) {
              //说明也是需要收起的
              item.expanded = false;
              recursion(item as RequiredTreeNodeOption);
            }
          });
        }
      };
      recursion(node);
      if (delKeys.length) {
        flatList.value = flatList.value.filter((item) => !delKeys.includes(item.nodeKey));
      }
    };

    const handleToggleExpand = (node: RequiredTreeNodeOption) => {
      if (loadding.value) {
        return;
      }
      node.expanded = !node.expanded;
      if (node.expanded) {
        //需要展开
        /**
         * 首次展开,children 可能是用户自带的children
         */
        if (node.children.length) {
          expandNode(node);
        } else {
          //懒加载
          if (props.lazyLoad && node.hasChildren) {
            node.loadding = true; //控制图标
            loadding.value = true; //防止重复点击
            props.lazyLoad(node, (children) => {
              if (children.length) {
                expandNode(node, children);
                node.loadding = false; //控制图标
                loadding.value = false;
              }
            });
          } else {
            node.expanded = !node.expanded;
          }
        }
      } else {
        //收齐
        collapseNode(node);
      }
    };

    const handleSelectChange = (node: RequiredTreeNodeOption) => {
      node.selected = !node.selected;
      let newSelectKey: nodeKey = '';
      if (selectKey.value !== node.nodeKey) {
        const preSelectedIndex = flatList.value.findIndex((item) => item.nodeKey === selectKey.value);
        if (preSelectedIndex > -1) {
          flatList.value[preSelectedIndex].selected = false;
        }
        newSelectKey = node.nodeKey;
      }
      selectKey.value = newSelectKey;
      emit('select-change', node);
    };

    const handleCheckChange = ([checked, node]: [boolean, RequiredTreeNodeOption]) => {
      node.checked = checked;
      if (!props.checkStricty) {
        //不严格勾选 父子联动
        updateDownWards(checked, node);
        updatePpWards(node, flatList.value);
      }
      emit('check-change', node);
    };

    const nodeRefs = ref<TreeNodeInstance[]>([]);
    const setNodeRef = (index: number, node: TreeNodeInstance | null = null) => {
      if (node) {
        nodeRefs.value[index] = node;
      }
    };
    expose({
      getSelectedNode: (): RequiredTreeNodeOption | undefined => {
        return flatList.value.find((item) => item.selected);
      },
      getCheckedNode: (): RequiredTreeNodeOption[] => {
        return flatList.value.filter((item) => item.checked);
      },
      getHalfCheckedNodes: (): RequiredTreeNodeOption[] => {
        return nodeRefs.value.filter((item) => item.halfChecked()).map((item) => item.node);
      },
    });

    return () => {
      return (
        <div class="ant-tree-wrap">
          <div class="ant-tree">
            {flatList.value.map((node, index) => {
              return (
                <MNode
                  node={node}
                  key={node.nodeKey}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ref={setNodeRef.bind(null, index)}
                  render={props.render}
                  iconSlot={slots.icon}
                  showCheckbox={props.showCheckbox}
                  checkStricty={props.checkStricty}
                  onToggleExpand={handleToggleExpand}
                  onSelectChange={handleSelectChange}
                  onCheckChange={handleCheckChange}
                />
              );
            })}
          </div>
        </div>
      );
    };
  },
});
