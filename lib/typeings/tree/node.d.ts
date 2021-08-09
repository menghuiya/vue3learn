import { PropType, Slot } from 'vue';
import './index.scss';
import { TreeNodeOptions, rednerFunc } from './types';
declare const _default: import("vue").DefineComponent<{
    node: {
        type: PropType<Required<TreeNodeOptions>>;
        required: true;
    };
    showCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkStricty: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconSlot: PropType<Slot>;
    render: PropType<rednerFunc>;
    onToggleExpand: PropType<(arg: Required<TreeNodeOptions>) => void>;
    onSelectChange: PropType<(arg: Required<TreeNodeOptions>) => void>;
    onCheckChange: PropType<(arg: [boolean, Required<TreeNodeOptions>]) => void>;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("toggle-expand" | "select-change" | "check-change")[], "toggle-expand" | "select-change" | "check-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    node?: unknown;
    showCheckbox?: unknown;
    checkStricty?: unknown;
    iconSlot?: unknown;
    render?: unknown;
    onToggleExpand?: unknown;
    onSelectChange?: unknown;
    onCheckChange?: unknown;
} & {
    node: Required<TreeNodeOptions>;
    showCheckbox: boolean;
    checkStricty: boolean;
} & {
    render?: rednerFunc | undefined;
    iconSlot?: Slot | undefined;
    onToggleExpand?: ((arg: Required<TreeNodeOptions>) => void) | undefined;
    onSelectChange?: ((arg: Required<TreeNodeOptions>) => void) | undefined;
    onCheckChange?: ((arg: [boolean, Required<TreeNodeOptions>]) => void) | undefined;
}>, {
    showCheckbox: boolean;
    checkStricty: boolean;
}>;
export default _default;
