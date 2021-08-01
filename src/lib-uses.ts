import { App } from 'vue';
import MInput from './components/input/index';
import FormItem from './components/form/FormItem';

const components = [MInput, FormItem];

export default function(app: App) {
  components.forEach((item) => app.component(item.name, item));
}
