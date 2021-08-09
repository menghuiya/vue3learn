import { SFCWithInstall } from '../utils/types';
declare const _default: SFCWithInstall<import("vue").DefineComponent<{
    source: {
        type: import("vue").PropType<import("./types").TreeNodeOptions[]>;
        default: () => never[];
    };
    render: import("vue").PropType<import("./types").rednerFunc>;
    lazyLoad: {
        type: import("vue").PropType<(node: Required<import("./types").TreeNodeOptions>, callback: (children: import("./types").TreeNodeOptions[]) => void) => void>;
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
    source: import("./types").TreeNodeOptions[];
    showCheckbox: boolean;
    checkStricty: boolean;
} & {
    render?: import("./types").rednerFunc | undefined;
    lazyLoad?: ((node: Required<import("./types").TreeNodeOptions>, callback: (children: import("./types").TreeNodeOptions[]) => void) => void) | undefined;
}>, {
    source: import("./types").TreeNodeOptions[];
    showCheckbox: boolean;
    checkStricty: boolean;
}>>;
export default _default;
