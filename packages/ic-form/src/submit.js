import React,{PureComponent} from 'react'
import FormContext from './Context'
export default (WrappedComponent) => {
    class Submit extends PureComponent{
        state={
            isLoading:false
        };
        handlerClick=(e)=>{
            const {onClick,api}=this.props;
            if(this.state.isLoading){
                return;
            }
            onClick&&onClick(e);
            this.setState({isLoading:true});
            api.submit().then(()=>this.setState({isLoading:false}));
        };
        render(){
            const {api,...props}=this.props;
            return (
                <WrappedComponent {...props} data={api.data} isLoading={this.state.isLoading} isPass={api.isPass} onClick={this.handlerClick}/>
            );
        }
    }

    return (props) => <FormContext.Consumer>
        {fieldProps => <Submit {...props} api={fieldProps}/>}
    </FormContext.Consumer>
};
