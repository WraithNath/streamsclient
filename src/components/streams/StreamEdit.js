import React from 'react';
import {connect} from "react-redux";

import StreamForm from "./StreamForm";

import {fetchStream, editStream} from "../../actions";

class StreamEdit extends React.Component {
    render = () => {
        if (!this.props.stream)
            return <div>loading...</div>;

        return (
            <div>
                <h3>Edit Stream</h3>
                <StreamForm initialValues={this.props.stream} onSubmit={this.onSubmit}/>
            </div>
        );
    };

    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    };

    onSubmit = formProps => {
        this.props.editStream(this.props.match.params.id, {
            title: formProps.title,
            description : formProps.description
        });
    };
}

const mapStateToProps = (state, props) => {
    return {
        stream: state.streams[props.match.params.id]
    };
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);