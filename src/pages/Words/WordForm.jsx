import React, { Fragment } from 'react';
import get from 'lodash/get';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export default (props) => {
  return (
    <Fragment>
      <FormGroup>
        <Label for="word-value">English</Label>
        <Input
          type="text"
          name="word-value"
          id="word-value"
          placeholder="Word in english"
          value={props.value.value}
          required
          onChange={props.onChange('value')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="word-metadata-spanish">Spanish</Label>
        <Input
          type="text"
          name="word-metadata-spanish"
          id="word-metadata-spanish"
          placeholder="Word in spanish"
          value={get(props.value, 'metadata.spanish')}
          required
          onChange={props.onChange('metadata.spanish')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="word-metadata-present">Present</Label>
        <Input
          type="text"
          name="word-metadata-present"
          id="word-metadata-present"
          placeholder="Word in present"
          value={get(props.value, 'metadata.present')}
          required
          onChange={props.onChange('metadata.present')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="word-metadata-past">Past (Optional)</Label>
        <Input
          type="text"
          name="word-metadata-past"
          id="word-metadata-past"
          placeholder="Word in past"
          value={get(props.value, 'metadata.past')}
          onChange={props.onChange('metadata.past')}
        />
      </FormGroup>
    </Fragment>
  );
};
