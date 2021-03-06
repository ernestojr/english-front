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
        <Label for="module-name">Name</Label>
        <Input
          type="text"
          name="module-name"
          id="module-name"
          placeholder="Module name"
          value={props.value.name}
          required
          onChange={props.onChange('name')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="module-description">Description</Label>
        <Input
          type="textarea"
          name="module-description"
          id="module-description"
          placeholder="Module description"
          value={props.value.description}
          required
          onChange={props.onChange('description')}
        />
      </FormGroup>
    </Fragment>
  );
};
