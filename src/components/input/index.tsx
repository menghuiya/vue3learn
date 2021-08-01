import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'MInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      validator: (value: string) => {
        return ['text', 'number', 'tel', 'textarea', 'time'].includes(value);
      },
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    // console.log('attrs', attrs);
    // console.log('attrs', typeof attrs.placeholder);
    return () => {
      const onInput = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        if (value !== props.modelValue) {
          emit('update:modelValue', value);
        }
      };
      return (
        <div class="ant-field-wrap">
          <input type={props.type} class="ant-field" placeholder={attrs.placeholder as string} onInput={onInput} value={props.modelValue} />
        </div>
      );
    };
  },
});
