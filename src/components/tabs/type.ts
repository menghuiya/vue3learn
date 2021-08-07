import { Slot } from 'vue';

const TabsKey = 'TabsKey';

interface TabPaneContenx {
  name: string;
  titleSLot?: Slot;
  changeShow(visible: boolean): void;
}

interface TabContex {
  addPane(item: TabPaneContenx): void;
  removePane(name: string): void;
}

export { TabsKey, TabPaneContenx, TabContex };
