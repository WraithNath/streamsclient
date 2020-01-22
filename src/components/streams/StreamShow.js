import React from 'react';

import {connect} from 'react-redux';

import {fetchStream} from "../../actions";

class StreamShow extends React.Component {
    render = () => {

        if(!this.props.stream)
            return <div>Loading...</div>;

        return (
            <div className={"ui content"}>
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
            </div>
        );
    }

    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    } ;
}

const mapStateToProps = (state,props) => {
    return {
      stream: state.streams[props.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);