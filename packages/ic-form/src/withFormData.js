import React from 'react'
import Context from './Context'
export default function withFormData(WrappedComponent) {
    return (props) => <Context.Consumer>
        {fieldProps => <WrappedComponent {...props} api={fieldProps}/>}
    </Context.Consumer>
};
