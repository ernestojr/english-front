import React from 'react';
import {
  Button,
} from 'reactstrap';

export default (props) => (
  <div className="clearfix">
    <h1 className="float-left">{props.headerText}</h1>
    <Button
      className="float-right"
      color="primary"
      type="button"
      onClick={props.onButtonClickButton}>{props.buttonText}</Button>
  </div>
);