import {Component} from 'react';


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_view: props.startOn
        }
    }

    to = (viewFunction) => {
        this.setState({current_view: viewFunction})
    };

    render() {
        return (
            this.state.current_view(this)
        )
    }
}