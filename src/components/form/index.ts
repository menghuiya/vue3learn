import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import MForm from './Form';

MForm.install = (app: App) => {
  app.component(MForm.name, MForm);
};

export default MForm as SFCWithInstall<typeof MForm>;
