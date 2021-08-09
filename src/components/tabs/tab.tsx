import { defineComponent, onMounted, provide, ref, watch } from 'vue';
import './index.scss';
import { TabContex, TabPaneContenx, TabsKey } from './type';

export default defineComponent({
  name: 'MTabs',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const panels = ref<TabPaneContenx[]>([]);
    const currentTabName = ref(props.modelValue);
    const addPane = (panle: TabPaneContenx) => {
      panels.value.push(panle);
    };
    const removePane = (name: string) => {
      if (panels.value.length) {
        const index = panels.value.findIndex((item) => item.name === name);
        if (index > -1) {
          panels.value.splice(index, 1);
        }
      }
    };

    // 提供依赖 包含两种方法 对tab的 增加和删除
    provide<TabContex>(TabsKey, {
      addPane,
      removePane,
    });

    // 更新当前的tab 让其只显示等于currentTabName的内容
    const updatePaneVisible = () => {
      if (panels.value.length) {
        panels.value.forEach((item) => {
          item.changeShow(item.name === currentTabName.value);
        });
      }
    };
    onMounted(() => {
      // 如果没有currentTabName 则当先pane的第一个就是值 如果有则更新
      if (!currentTabName.value && panels.value.length) {
        emit('update:modelValue', panels.value[0].name);
      }
      updatePaneVisible();
    });

    watch(
      () => props.modelValue,
      (newVlue) => {
        currentTabName.value = newVlue;
        updatePaneVisible();
      }
    );
    const tabClick = (name: string) => {
      if (name !== currentTabName.value) {
        emit('update:modelValue', name);
      }
    };

    // 返回panle的 dom 内容  渲染页面
    const renderNavs = () => {
      return panels.value.map((item) => {
        const extraClass = item.name === currentTabName.value ? 'active' : '';
        return (
          <div class={['ant-tab-pane', extraClass]} onClick={tabClick.bind(null, item.name)}>
            {item.titleSLot ? item.titleSLot(item.name) : item.name}
          </div>
        );
      });
    };

    return () => {
      return (
        <div class="ant-tabs">
          <div class="navs">{renderNavs()}</div>
          {slots.default!()}
        </div>
      );
    };
  },
});
