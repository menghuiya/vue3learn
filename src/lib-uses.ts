import { App } from 'vue';
import MInput from './components/input/index';
import FormItem from './components/form/FormItem';
import Form from './components/form/Form';
import Tabs from './components/tabs/index';
import TabPane from './components/tabs/TabPane';
import Tree from './components/tree/index';
import Checkbox from './components/checkbox/index';

const components = [MInput, FormItem, Form, Tabs, TabPane, Tree, Checkbox];

export default function(app: App) {
  components.forEach((item) => app.component(item.name, item));
}
