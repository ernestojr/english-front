import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  Row, Col,
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
    <Row>
      <Form className="mb-3 w-100" onSubmit={props.onSubmit} inline>
        <Col md="8" xs="12">
          <FormGroup>
            <Input
              className="mr-2 w-100"
              type="text"
              name="practice-content"
              id="practice-content"
              placeholder="Write some..."
              value={props.value.content}
              required
              onChange={props.onChange('content')}
            />
          </FormGroup>
        </Col>
        <Col md="2" xs="12">
          <FormGroup>
            <Input
              className="mr-2 w-100"
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
        </Col>
        <Col md="2" xs="12">
          <Row>
            <Col md="6" xs="6">
              <Button
                className="mr-2"
                color="secondary"
                onClick={props.onCancelClick}
                type="button"
                block><FontAwesomeIcon icon={faTimes}/></Button>
            </Col>
            <Col md="6" xs="6">
              <Button
                color="success"
                type="submit"
                block><FontAwesomeIcon icon={faSave}/></Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </Row>
  );
};
