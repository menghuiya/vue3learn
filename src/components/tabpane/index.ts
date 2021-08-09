import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import MTabPane from '../tabs/TabPane';

MTabPane.install = (app: App) => {
  app.component(MTabPane.name, MTabPane);
};

export default MTabPane as SFCWithInstall<typeof MTabPane>;
