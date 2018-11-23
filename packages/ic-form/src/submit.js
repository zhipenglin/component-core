import React, {PureComponent} from 'react'
import withFormData from './withFormData'
import compose from 'ic-compose'

export default compose(withFormData, (WrappedComponent) => {
    return class Submit extends PureComponent {
        state = {
            isLoading: false
        };
        handlerClick = (e) => {
            const {onClick, api} = this.props;
            if (this.state.isLoading) {
                return;
            }
            onClick && onClick(e);
            this.setState({isLoading: true});
            api.submit().then(() => this.isUnmount === false && this.setState({isLoading: false}));
        };

        constructor(props) {
            super(props);
            this.isUnmount = false;
        }

        componentWillUnmount() {
            this.isUnmount = true;
        }

        render() {
            const {api, ...props} = this.props;
            return (
                <WrappedComponent {...props} data={api.data} isLoading={this.state.isLoading} isPass={api.isPass}
                                  onClick={this.handlerClick}/>
            );
        }
    }
});
