import { ErrorList, RuleItem } from 'async-validator';
declare const FormItemKey = "formItemKey";
declare const FormKey = "formKey";
declare type validateFunc = (callback: (valid: boolean) => void) => Promise<boolean | ErrorList>;
interface FormContext {
    model: Record<string, any>;
    rules: AntFormRules;
    validate: validateFunc;
    addItem(item: Partial<FormItemContext>): void;
    removeItem(id: string): void;
}
interface FormItemContext {
    id: string;
    prop: string;
    validate: (value: string) => Promise<boolean | ErrorList>;
    handlerControlChange(value: string): void;
    handlerControlBlur(value: string): void;
}
declare type trigger = 'change' | 'blur';
interface AntRuleItem extends RuleItem {
    trigger?: trigger;
}
interface AntFormRules {
    [key: string]: AntRuleItem | AntRuleItem[];
}
export { FormItemKey, FormKey, FormContext, FormItemContext, validateFunc, AntRuleItem, trigger, AntFormRules };
