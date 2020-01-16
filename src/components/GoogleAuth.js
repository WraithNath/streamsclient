import React from "react";
import {connect} from 'react-redux';

import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
    render = () => {
        return this.renderAuthButton();
    };

    componentDidMount = () => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '365977848915-qptq51eqlerl6nresu43ula775dsdrhq.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChanged(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChanged);
            });
        });
    };

    renderAuthButton = () => {
        if (this.props.isSignedIn === null)
            return <div>I dont know if signed in or not...</div>;
        else if (this.props.isSignedIn)
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        else
            return (
              <button className="ui primary google button" onClick={this.onSignInClick}>
                  <i className="google icon"/>
                  Sign In with Google
              </button>
            );
    };

    onAuthChanged = isSignedIn => {
        if(isSignedIn)
            this.props.signIn(this.auth.currentUser.get().getId());
        else
            this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);