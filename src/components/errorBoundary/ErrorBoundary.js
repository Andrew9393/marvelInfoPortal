import { Component } from "react";
import errorMassage from '../errorMassage/ErrorMassage';

class ErrorBoundary extends Component {
    state = {
            error: false
    }


    componentDidCatch(err, info) {
        console.log(err,info);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <errorMassage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;