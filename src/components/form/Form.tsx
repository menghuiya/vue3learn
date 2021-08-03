import { useExpose } from '@/uses';
import { ErrorList } from 'async-validator';
import { defineComponent, getCurrentInstance, PropType, provide } from 'vue';
import { AntFormRules, FormContext, FormItemContext, FormKey, validateFunc } from './types';

export default defineComponent({
  name: 'MForm',
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object as PropType<AntFormRules>,
  },
  emits: ['validate'],
  setup(props, { emit, slots }) {
    const formItems: FormItemContext[] = [];
    const addItem = (item: FormItemContext) => {
      formItems.push(item);
      console.log(formItems);
    };
    const removeItem = (id: string) => {
      if (formItems.length) {
        const index = formItems.findIndex((item) => item.id === id);
        if (index > -1) {
          formItems.splice(index, 1);
        }
      }
    };

    provide<Partial<FormContext>>(FormKey, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem,
    });
    const validate = (callback?: (valid: boolean) => void): Promise<boolean | ErrorList> => {
      return Promise.all(formItems.filter((item) => item.prop).map((item) => item.validate(props.model[item.prop])))
        .then(() => {
          if (callback) {
            callback(true);
          }
          console.log('验证成功');
          // emit('validate', true);
          return Promise.resolve(true);
        })
        .catch((errors) => {
          if (callback) {
            callback(false);
          }
          console.log('失败', errors);
          // emit('validate', errors);
          return Promise.reject(errors);
        });
    };
    useExpose<{ validate: validateFunc }>({
      validate,
    });

    const onSubmit = (event: Event) => {
      event.preventDefault();
      validate();
    };

    return () => {
      return (
        <form class="ant-form" onSubmit={onSubmit}>
          {slots.default!()}
        </form>
      );
    };
  },
});
