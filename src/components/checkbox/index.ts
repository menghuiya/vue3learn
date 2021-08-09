import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import MCheckbox from './checkbox';

MCheckbox.install = (app: App) => {
  app.component(MCheckbox.name, MCheckbox);
};

export default MCheckbox as SFCWithInstall<typeof MCheckbox>;
