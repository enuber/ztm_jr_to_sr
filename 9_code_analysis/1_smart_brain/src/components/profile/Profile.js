import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  state = {
    name: this.props.user.name,
    age: this.props.user.age,
    pet: this.props.user.pet,
  };

  onFormChange = (evt) => {
    switch (evt.target.name) {
      case 'user-name':
        this.setState({ name: evt.target.value });
        break;
      case 'user-age':
        this.setState({ age: evt.target.value });
        break;
      case 'user-pet':
        this.setState({ pet: evt.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch(console.log('problem with updating'));
  };

  render() {
    const { user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member Since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <div className="mt3">
              <input
                onChange={this.onFormChange}
                className="pa2 ba w-100"
                placeholder={user.name}
                type="text"
                name="user-name"
                id="name"
              />
            </div>
            <label className="mt2 fw6" htmlFor="age">
              Name:
            </label>
            <div className="mt3">
              <input
                onChange={this.onFormChange}
                className="pa2 ba w-100"
                placeholder={user.age}
                type="text"
                name="age"
                id="age"
              />
            </div>
            <label className="mt2 fw6" htmlFor="pet">
              Pet:
            </label>
            <div className="mt3">
              <input
                onChange={this.onFormChange}
                className="pa2 ba w-100"
                placeholder={user.pet}
                type="text"
                name="pet"
                id="pet"
              />
            </div>
            <div
              className="mt4"
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={this.props.toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={this.props.toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
