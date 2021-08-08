import { PropType } from 'vue';
import { rednerFunc } from './types';
declare const _default: import("vue").DefineComponent<{
    node: {
        type: PropType<Required<import("./types").TreeNodeOptions>>;
        required: true;
    };
    render: {
        type: PropType<rednerFunc>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    node?: unknown;
    render?: unknown;
} & {
    node: Required<import("./types").TreeNodeOptions>;
    render: rednerFunc;
} & {}>, {}>;
export default _default;
