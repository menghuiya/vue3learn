import { computed, defineComponent, PropType, Slot } from 'vue';
import './index.scss';
import { TreeNodeOptions, RequiredTreeNodeOption, rednerFunc } from './types';
import MRenderNode from './render';
import MCheckbox from '../checkbox/index';

type CustomEventFuncType<T> = PropType<(arg: T) => void>;

export default defineComponent({
  name: 'MNode',

  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOption>,
      required: true,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    checkStricty: {
      type: Boolean,
      default: false,
    },
    iconSlot: Function as PropType<Slot>,
    render: Function as PropType<rednerFunc>,
    onToggleExpand: Function as CustomEventFuncType<RequiredTreeNodeOption>,
    onSelectChange: Function as CustomEventFuncType<RequiredTreeNodeOption>,
    onCheckChange: Function as CustomEventFuncType<[boolean, RequiredTreeNodeOption]>,
  },
  emits: ['toggle-expand', 'select-change', 'check-change'],
  setup(props, { emit }) {
    const halfChecked = computed(() => {
      let result = false;
      if (!props.checkStricty && props.node.hasChildren) {
        const { children } = props.node;
        const checkedChildren = children.filter((item) => item.checked);
        result = checkedChildren.length > 0 && checkedChildren.length < children.length;
      }
      return result;
    });

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
    const handleCheckChange = (checked: boolean) => {
      emit('check-change', [checked, props.node]);
    };

    // node-arrow 有保持缩进的
    const renderArrow = (): JSX.Element => {
      return (
        <div class={['node-arrow', props.node.expanded ? 'expanded' : '']}>
          {props.node.hasChildren ? (
            props.iconSlot ? (
              props.iconSlot(props.node.loadding)
            ) : props.node.loadding ? (
              <i class="iconfont iconloading ico-loading" />
            ) : (
              <i class="iconfont iconExpand" />
            )
          ) : null}
        </div>
      );
    };

    const normalContent = (): JSX.Element => {
      return props.render ? <MRenderNode render={props.render} node={props.node} /> : <span class={textCls.value}>{props.node.name}</span>;
    };
    const renderContent = (): JSX.Element => {
      if (props.showCheckbox) {
        return (
          <MCheckbox
            class="node-content node-checkbox"
            disabled={props.node.disable}
            modelValue={props.node.checked}
            halfChecked={halfChecked.value}
            onChange={handleCheckChange}
          >
            {normalContent()}
          </MCheckbox>
        );
      }
      return (
        <div class="node-content node-text" onClick={handleSelect}>
          {normalContent()}
        </div>
      );
    };
    return () => {
      return (
        <div class="ant-tree-node" style={{ paddingLeft: props.node.level * 18 + 'px' }} onClick={handleExpand}>
          {renderArrow()}
          {renderContent()}
        </div>
      );
    };
  },
});
