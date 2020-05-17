import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import {
  hideDialog,
  onUnmount,
} from '../redux/actions/CommonActions';

class Dialog extends React.Component {
  toggle = isPositive => {
    if (isPositive) {
      if (this.props.opts.onAccepted) {
        if (this.props.opts.validateBeforeAccept){
          if (this.props.opts.validateBeforeAccept()) {
            this.props.opts.onAccepted();
          } else {
            return;
          }
        } else {
          this.props.opts.onAccepted();
        }
      }
    } else {
      if (this.props.opts.onCanceled) {
        this.props.opts.onCanceled();
      }
    }
    this.props.hideDialog();
  }
  
  hideDialog = () => {
    this.props.hideDialog();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.show || false}
        toggle={() => this.toggle()}
        backdrop={this.props.backdrop}
        keyboard={this.props.keyboard}>
        <ModalHeader>{ this.props.title }</ModalHeader>
        <ModalBody>
          { typeof this.props.content === "function" ? this.props.content(this) : this.props.content }
        </ModalBody>
        <ModalFooter>
          <Button
            className="mr-2"
            color="secondary"
            onClick={() => this.toggle()}
            hidden={this.props.opts.canceledButton === false }>
            { this.props.opts.negativeText || 'Cancel' }
          </Button>
          <Button
            color="primary"
            onClick={() => this.toggle(true)}
            hidden={this.props.opts.acceptedButton === false }>
            { this.props.opts.positiveText || 'Accept' }
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return state.common;
}

const mapDispatchToProps = dispatch => ({
  hideDialog: () => {
    dispatch(hideDialog());
  },
  onUnmount: () => {
    dispatch(onUnmount());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
