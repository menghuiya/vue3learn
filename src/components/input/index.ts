import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import MInput from './input';

MInput.install = (app: App) => {
  app.component(MInput.name, MInput);
};

export default MInput as SFCWithInstall<typeof MInput>;
