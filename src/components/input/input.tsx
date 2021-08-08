import { defineComponent, inject } from 'vue';
import { FormItemContext, FormItemKey } from '../form/types';
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
        return ['text', 'number', 'tel', 'textarea', 'time', 'password', 'submit'].includes(value);
      },
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const formItemCtx = inject<FormItemContext>(FormItemKey);
    const onInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      if (value !== props.modelValue) {
        emit('update:modelValue', value);
        formItemCtx?.handlerControlChange(value);
      }
    };
    const onBlur = () => {
      formItemCtx?.handlerControlBlur(props.modelValue);
    };
    return () => {
      return (
        <div class="ant-field-wrap">
          <input
            type={props.type}
            class="ant-field"
            placeholder={attrs.placeholder as string}
            onInput={onInput}
            onBlur={onBlur}
            value={props.modelValue}
          />
        </div>
      );
    };
  },
});
