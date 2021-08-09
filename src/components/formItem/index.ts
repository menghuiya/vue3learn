import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import MFormItem from '../form/FormItem';

MFormItem.install = (app: App) => {
  app.component(MFormItem.name, MFormItem);
};

export default MFormItem as SFCWithInstall<typeof MFormItem>;
