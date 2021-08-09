import { PropType } from 'vue';
import { TreeNodeOptions, RequiredTreeNodeOption, rednerFunc } from './types';
import './index.scss';
declare const _default: import("vue").DefineComponent<{
    source: {
        type: PropType<TreeNodeOptions[]>;
        default: () => never[];
    };
    render: PropType<rednerFunc>;
    lazyLoad: {
        type: PropType<(node: RequiredTreeNodeOption, callback: (children: TreeNodeOptions[]) => void) => void>;
    };
    showCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkStricty: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select-change" | "check-change")[], "select-change" | "check-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    source?: unknown;
    render?: unknown;
    lazyLoad?: unknown;
    showCheckbox?: unknown;
    checkStricty?: unknown;
} & {
    source: TreeNodeOptions[];
    showCheckbox: boolean;
    checkStricty: boolean;
} & {
    render?: rednerFunc | undefined;
    lazyLoad?: ((node: RequiredTreeNodeOption, callback: (children: TreeNodeOptions[]) => void) => void) | undefined;
}>, {
    source: TreeNodeOptions[];
    showCheckbox: boolean;
    checkStricty: boolean;
}>;
export default _default;
