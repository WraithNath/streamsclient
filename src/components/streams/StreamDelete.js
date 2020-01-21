import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import Modal from '../Modal';

import {fetchStream, deleteStream} from "../../actions";

import history from '../../history';

class StreamDelete extends React.Component {
    render = () => {
        const actions = (
            <React.Fragment>
                <button className="ui button negative" onClick={()=>this.props.deleteStream(this.props.match.params.id)}>Delete</button>
                <Link className="ui button" to={"/"}>Cancel</Link>
            </React.Fragment>
        );

        return (
            <Modal title={`Delete Stream '${this.props.stream && this.props.stream.title}'`} content={"Are you sure you want to delete this stream?"} actions={actions}
                   onDismiss={() => history.push('/')}>
                <div>StreamDelete</div>
            </Modal>
        );
    };

    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    };
}

const mapStateToProps = (state, props) => {
    return {
        stream: state.streams[props.match.params.id]
    };
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);