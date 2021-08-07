import { computed, defineComponent, PropType } from 'vue';
import './index.scss';
import { TreeNodeOptions, RequiredTreeNodeOption } from './types';

type CustomEventFuncType<T> = PropType<(arg: T) => void>;

export default defineComponent({
  name: 'MNode',
  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOption>,
      required: true,
    },
    onToggleExpand: Function as CustomEventFuncType<RequiredTreeNodeOption>,
    onSelectChange: Function as CustomEventFuncType<RequiredTreeNodeOption>,
  },
  emits: ['toggle-expand', 'select-change', 'check-change'],
  setup(props, { emit }) {
    const handleExpand = () => {
      if (props.node.disable) {
        return;
      }
      emit('toggle-expand', props.node);
    };
    const handleSelect = (event: Event) => {
      event.stopPropagation();
      if (props.node.disable) {
        return;
      }
      emit('select-change', props.node);
    };

    const textCls = computed(() => {
      let result = 'node-title';
      if (props.node.disable) {
        result += ' disabled';
      }
      if (props.node.selected) {
        result += ' selected';
      }
      return result;
    });

    // node-arrow 有保持缩进的
    const renderArrow = (): JSX.Element => {
      return (
        <div class={['node-arrow', props.node.expanded ? 'expanded' : '']}>
          {props.node.hasChildren ? (
            props.node.loadding ? (
              <i class="iconfont iconloading ico-loading" />
            ) : (
              <i class="iconfont iconExpand" />
            )
          ) : null}
        </div>
      );
    };
    return () => {
      return (
        <div class="ant-tree-node" style={{ paddingLeft: props.node.level * 18 + 'px' }} onClick={handleExpand}>
          {renderArrow()}
          <div class="node-content node-text" onClick={handleSelect}>
            <span class={textCls.value}>{props.node.name}</span>
          </div>
        </div>
      );
    };
  },
});
