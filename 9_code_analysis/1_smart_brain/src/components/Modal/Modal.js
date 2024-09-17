import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div'); // Create a new div element
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  // this.prop.children - what will show up in the portal/modal window. Can directly put the code into that place.
  // this.el - The element where the content will be rendered
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
