import { defineComponent, PropType } from 'vue';
import { rednerFunc, RequiredTreeNodeOption } from './types';

export default defineComponent({
  name: 'MRenderNode',
  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOption>,
      required: true,
    },
    render: {
      type: Function as PropType<rednerFunc>,
      required: true,
    },
  },
  setup(props, { emit }) {
    return () => props.render(props.node);
  },
});
