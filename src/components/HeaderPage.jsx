import React from 'react';
import {
  Button,
} from 'reactstrap';

export default (props) => (
  <div className="clearfix">
    <h1 className="float-left">{props.headerText}</h1>
    {
      props.onButtonClickNew &&
      <Button
        className="float-right"
        color="primary"
        type="button"
        onClick={props.onButtonClickNew}>{props.buttonTextNew}</Button>
    }
    {
      props.onButtonClickEdit &&
      <Button
        className="float-right mr-2"
        color="info"
        type="button"
        onClick={props.onButtonClickEdit}>{props.buttonTextEdit}</Button> 
    }
  </div>
);