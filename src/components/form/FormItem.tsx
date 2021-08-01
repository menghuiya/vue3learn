import { defineComponent, ref } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'MFormItem',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit, slots }) {
    return () => {
      const errMsg = ref('');
      const renderLabel = () => {
        return slots.label ? slots.label() : <label class="item-label">{props.label}</label>;
      };
      return (
        <div class="ant-form-item">
          {renderLabel()}
          <div class="item-content">
            <div class="item-control-wrap">{slots.default!()}</div>
            <p class="item-error" v-show={errMsg.value}>
              {errMsg.value}
            </p>
          </div>
        </div>
      );
    };
  },
});
