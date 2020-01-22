import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {fetchStreams} from "../../actions";

class StreamList extends React.Component {
    render = () => {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderMaintain(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link className={"header"} to={`/streams/show/${stream.id}`}>
                            {stream.title}
                            <div className="description">{stream.description}</div>
                        </Link>
                    </div>
                </div>
            );
        });
    }

    renderMaintain = stream => {
        return this.props.currentUserId === stream.userId && (
            <div className="right floated content">
                <Link className={"ui button primary"} to={`/streams/edit/${stream.id}`}>Edit</Link>
                <Link className={"ui button negative"} to={`/streams/delete/${stream.id}`}>Delete</Link>
            </div>
        );
    };

    renderCreate = () => {
        return this.props.isSignedIn && (
            <div style={{textAlign: 'right'}}>
                <Link className={"ui button primary"} to={"/streams/new"}>
                    Create Stream
                </Link>
            </div>
        );
    };

    componentDidMount = () => {
        this.props.fetchStreams();
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);