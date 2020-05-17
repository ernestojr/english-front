import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

const TYPE_OPTIONS = [
  { value: 'simple', text: 'Simple' },
  { value: 'question', text: 'Question' },
  { value: 'answer', text: 'Answer' },
];

export default (props) => {
  return (
    <Form className="mb-3" onSubmit={props.onSubmit} inline>
      <FormGroup>
        <Input
          className="mr-2"
          type="text"
          name="practice-content"
          id="practice-content"
          placeholder="Write some..."
          value={props.value.content}
          required
          onChange={props.onChange('content')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          className="mr-2"
          type="select"
          name="practice-type"
          id="practice-type"
          value={props.value.type}
          required
          onChange={props.onChange('type')}
        >
          {
            TYPE_OPTIONS.map((opt, index) => <option key={Date.now() + index} value={opt.value}>{opt.text}</option>)
          }
        </Input>
      </FormGroup>
      <Button
        className="mr-2"
        color="secondary"
        onClick={props.onCancelClick}
        type="button">Cancel</Button>
      <Button
        color="success"
        type="submit">Save</Button>
    </Form>
  );
};
