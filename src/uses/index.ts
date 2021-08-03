import { getCurrentInstance } from 'vue';

function useExpose<T>(extra: T) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, extra);
  }
}

export { useExpose };
