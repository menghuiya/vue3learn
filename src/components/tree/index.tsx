import { defineComponent, PropType, watch, ref } from 'vue';
import { cloneDeep } from 'lodash';

import { TreeNodeOptions, RequiredTreeNodeOption, nodeKey } from './types';
import MNode from './node';
import './index.scss';
/**
 * 拉平tree结构的数据,平铺
 * @param source TreeNodeOptions[]
 * @returns RequiredTreeNodeOption[]
 */
function flatTree(source: TreeNodeOptions[]): RequiredTreeNodeOption[] {
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
}

export default defineComponent({
  name: 'MTree',
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      default: () => [],
    },
    lazyLoad: {
      type: Function as PropType<(node: RequiredTreeNodeOption, callback: (children: TreeNodeOptions[]) => void) => void>,
    },
  },
  setup(props, { emit }) {
    //推导优先 其次泛型
    const loadding = ref(false);
    const selectKey = ref<nodeKey>('');
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
            console.log('懒加载');
            node.loadding = true; //控制图标
            loadding.value = true; //防止重复点击
            props.lazyLoad(node, (children) => {
              console.log('新的children', children);
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
      console.log('handleSelectChange', node);
    };
    return () => {
      return (
        <div class="ant-tree-wrap">
          <div class="ant-tree">
            {flatList.value.map((node, index) => {
              return <MNode node={node} key={node.nodeKey} onToggleExpand={handleToggleExpand} onSelectChange={handleSelectChange} />;
            })}
          </div>
        </div>
      );
    };
  },
});