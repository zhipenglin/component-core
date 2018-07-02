/**
 * @name: ic-form ;
 * @author: admin ;
 * @description: 用于表单校验的组件 ;
 * */

import _Form from './Form'
import _field from './field'
import _submit from './submit'
import _presetRules from './util/RULES'

_Form.field = _field;
_Form.submit = _submit;

export default _Form;

export const field = _field;

export const submit = _submit;

export const presetRules=_presetRules;


