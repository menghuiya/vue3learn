import { App } from 'vue';
import MInput from './components/input/index';
import FormItem from './components/form/FormItem';
import Form from './components/form/Form';

const components = [MInput, FormItem, Form];

export default function(app: App) {
  components.forEach((item) => app.component(item.name, item));
}
