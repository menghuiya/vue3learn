import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import MTree from './tree';

MTree.install = (app: App) => {
  app.component(MTree.name, MTree);
};

export default MTree as SFCWithInstall<typeof MTree>;
