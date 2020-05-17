import React, { Fragment } from 'react';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export default (props) => {
  return (
    <Fragment>
      <FormGroup>
        <Label for="phase-name">Name</Label>
        <Input
          type="text"
          name="phase-name"
          id="phase-name"
          placeholder="Phase name"
          value={props.value.name}
          required
          onChange={props.onChange('name')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phase-description">Description</Label>
        <Input
          type="textarea"
          name="phase-description"
          id="phase-description"
          placeholder="Phase description"
          value={props.value.description}
          required
          onChange={props.onChange('description')}
        />
      </FormGroup>
    </Fragment>
  );
};
