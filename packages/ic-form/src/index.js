/**
 * @name: ic-form ;
 * @author: admin ;
 * @description: 用于表单校验的组件 ;
 * */

import _Form from './Form'
import _field from './field'
import _submit from './submit'
import _RULES,{presetRules as _presetRules} from './util/RULES'
import _withFormData from './withFormData'

_Form.field = _field;
_Form.submit = _submit;

export default _Form;

export const withFormData=_withFormData;

export const field = _field;

export const submit = _submit;

export const presetRules=_presetRules;
export const RULES=_RULES;


