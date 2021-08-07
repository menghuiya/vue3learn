import { defineComponent, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { TabContex, TabsKey } from './type';

export default defineComponent({
  name: 'MTabPane',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit, slots }) {
    const parent = inject<TabContex>(TabsKey);
    const show = ref(false);
    // 定义变更展示的方法
    const changeShow = (visible: boolean) => {
      show.value = visible;
    };

    // 挂载后调用 根据pane传入方法
    onMounted(() => {
      parent?.addPane({
        name: props.name,
        titleSLot: slots.title,
        changeShow,
      });
    });

    onBeforeUnmount(() => {
      parent?.removePane(props.name);
    });

    return () => {
      return (
        <div class="pane" v-show={show.value}>
          {slots.default!()}
        </div>
      );
    };
  },
});
