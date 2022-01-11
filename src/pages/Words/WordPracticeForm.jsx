import React, { Fragment, useState } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  Row,
  Col,
  Button,
} from 'reactstrap';

export default (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <Fragment>
      <h2 id="number" className="text-center">{props.value.spanish}</h2>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="number"
        toggle={() => setPopoverOpen(!popoverOpen)}>
        <PopoverHeader>Help</PopoverHeader>
        <PopoverBody>{props.value.english}</PopoverBody>
      </Popover>
      <FormGroup>
        <Label for="word-value">Response</Label>
        <Input
          type="text"
          name="word-value"
          id="word-value"
          placeholder=""
          value={props.value.response}
          required
          onChange={props.onChange}
          invalid={props.value.isInvalid}
          valid={!props.value.isInvalid}
        />
      </FormGroup>
      <Row>
        <Col>
        <Button
          className="mb-3"
          color="success"
          type="button"
          onClick={props.onUpdateWord}
          block>Get a new word</Button>
        </Col>
      </Row>
    </Fragment>
  );
};
