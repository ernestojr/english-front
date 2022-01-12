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
        <PopoverBody>{`${props.value.targetInPresent} - ${props.value.targetInPast}`}</PopoverBody>
      </Popover>
      <FormGroup>
        <Label for="word-in-present">Response in present</Label>
        <Input
          type="text"
          name="word-in-present"
          id="word-in-present"
          placeholder="Present"
          value={props.value.responseInPresent}
          required
          onChange={props.onChange('present')}
          invalid={props.value.statusInPresent === 'invalid'}
          valid={props.value.statusInPresent === 'valid'}
          {...props.focusProps}
        />
      </FormGroup>
      <FormGroup>
        <Label for="word-in-past">Response in past</Label>
        <Input
          type="text"
          name="word-in-past"
          id="word-in-past"
          placeholder="Past"
          value={props.value.responseInPast}
          required
          onChange={props.onChange('past')}
          invalid={props.value.statusInPast === 'invalid'}
          valid={props.value.statusInPast === 'valid'}
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
