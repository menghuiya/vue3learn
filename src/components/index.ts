import { App } from 'vue';
import MInput from './input/index';
import MForm from './form/index';
import MFormItem from './formItem/index';
import MTree from './tree/idnex';
import MTabPane from './tabpane/index';
import MCheckbox from './checkbox/index';
import MTabs from './tabs/index';

const components = [MInput, MFormItem, MForm, MTabs, MTabPane, MTree, MCheckbox];

export { MInput, MFormItem, MForm, MTabs, MTabPane, MTree, MCheckbox };

export default function(app: App) {
  components.forEach((item) => app.component(item.name, item));
}
