import React from 'react';
import flv from 'flv.js';

import {connect} from 'react-redux';

import {fetchStream} from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    render = () => {

        if (!this.props.stream)
            return <div>Loading...</div>;

        return (
            <div className={"ui content"}>
                <video ref={this.videoRef} style={{width: '100%'}} controls/>
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
            </div>
        );
    }

    componentDidMount = () => {
        const {id} = this.props.match.params;

        this.props.fetchStream(id);

        this.buildPlayer();
    };

    componentDidUpdate = () => {
        this.buildPlayer();
    };

    componentWillUnmount = () => {
        if(this.player) {
            this.player.destroy();
        }
    };

    buildPlayer = () => {
        if (this.player || !this.props.stream)
            return;

        const {id} = this.props.match.params;

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    };
}

const mapStateToProps = (state, props) => {
    return {
        stream: state.streams[props.match.params.id]
    };
};

export default connect(mapStateToProps, {fetchStream})(StreamShow);