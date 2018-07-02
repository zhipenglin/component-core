import React from 'react'
import enzyme,{shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Form from '../src/Form'
import field from '../src/field'

enzyme.configure({ adapter: new Adapter() });

const Input=field(()=>{
    return <input type="text"/>
});

describe('form.js',()=>{
    it('普通表单，校验通过',()=>{
        const component=shallow(<Form>
            <Input name="field-0"/>
        </Form>);


    });
});
