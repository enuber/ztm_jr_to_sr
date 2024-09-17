import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class ProfileIcon extends React.Component {
  state = {
    dropdownOpen: false,
    direction: 'down',
  };

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    return (
      <div className="pa4 tc">
        <div className="d-flex p-5">
          <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            direction={this.state.direction}
          >
            <DropdownToggle data-toggle="dropdown" tag="span">
              <img
                src="http://tachyons.io/img/logo.jpg"
                className="br-100 ba h3 w3 dib"
                alt="avatar"
              />
            </DropdownToggle>
            <DropdownMenu
              end
              className="b--transparent shadow-5"
              style={{
                marginTop: '20px',
                backgroundColor: 'rgba(255, 255, 255, .5)',
              }}
            >
              <DropdownItem onClick={this.props.toggleModal}>
                View Profile
              </DropdownItem>
              <DropdownItem onClick={() => this.props.onRouteChange('signout')}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default ProfileIcon;
