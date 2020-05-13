import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export default (props) => {
  console.log('props', props);
  return (
    <Form>
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
      <FormGroup>
        <Label for="module-description">Description</Label>
        <Input
          type="textarea"
          name="module-description"
          id="module-description"
          placeholder="Module name"
          value={props.value.description}
          required
          onChange={props.onChange('description')}
        />
      </FormGroup>
    </Form>
  );
};
