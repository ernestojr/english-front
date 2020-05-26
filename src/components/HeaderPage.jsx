import React from 'react';
import {
  Row, Col,
  Button,
} from 'reactstrap';

export default (props) => (
  <Row className="mb-3">
    <Col md="8">
      <h1 className="float-left">{props.headerText}</h1>
    </Col>
    <Col md="2" xs="6">
      {
        props.onButtonClickEdit &&
        <Button
          color="info"
          type="button"
          onClick={props.onButtonClickEdit}
          block>{props.buttonTextEdit}</Button> 
      }
    </Col>
    <Col md="2" xs="6">
      {
        props.onButtonClickNew &&
        <Button
          color="primary"
          type="button"
          onClick={props.onButtonClickNew}
          block>{props.buttonTextNew}</Button>
      }
    </Col>
  </Row>
);