import React from "react";

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    };

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

                this.auth.isSignedIn.listen(this.onAuthChanged);

                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                })
            });
        });
    };

    renderAuthButton = () => {
        if (this.state.isSignedIn === null)
            return <div>I dont know if signed in or not...</div>;
        else if (this.state.isSignedIn)
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

    onAuthChanged = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        })
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }
}

export default GoogleAuth;