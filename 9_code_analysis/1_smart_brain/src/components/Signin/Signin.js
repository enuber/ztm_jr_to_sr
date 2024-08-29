import React from 'react';

class Signin extends React.Component {
  state = {
    signInEmail: '',
    signInPassword: '',
    error: false,
  };

  onEmailChange = (evt) => {
    this.setState({ signInEmail: evt.target.value });
  };

  onPasswordChange = (evt) => {
    this.setState({ signInPassword: evt.target.value });
  };

  //hooking up to the back end. we are sending the info to the correct route at /signin, have to give it the method type which in this case is 'post' then provide headers for content-type and finally the body of info. According to the route it is expecting the email and password so that is what we are sending. Finally, we are checking on the info and, if it is correct we show the home page. Should also be doing something if the login is unsuccesful beyond staying on the page.

  onSubmitSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        }),
      });

      if (response.status === 400) {
        throw new Error('Failed to sign in');
      }

      const user = await response.json();

      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
        this.setState({ error: false });
      }
    } catch (err) {
      this.setState({
        signInPassword: '',
        error: true,
      });
    }
  };

  // onSubmitSignIn = () => {
  //   fetch('http://localhost:3000/signin', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: this.state.signInEmail,
  //       password: this.state.signInPassword,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.status === 400) {
  //         throw new Error('Failed to signin');
  //       }

  //       return res.json();
  //     })
  //     .then((user) => {
  //       if (user.id) {
  //         this.props.loadUser(user);
  //         this.props.onRouteChange('home');
  //         this.setState({ error: false });
  //       }
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         signInPassword: '',
  //         error: true,
  //       });
  //     });
  // };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              {this.state.error ? (
                <p className="error">The email or password was incorrect.</p>
              ) : (
                ''
              )}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={this.state.signInEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.signInPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
