import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const onSubmit = ({lines, text, type}, { setNewLine, cleanForm }) => (e) => {
  e.preventDefault();
  const l = [...lines];
  l.push({ text, type });
  setNewLine(l);
  cleanForm();
}

const cleanForm = ({ setText, setType }) => () => {
  setText('');
  setType('simple');
};

function App() {
  const [lines, setNewLine] = useState([]);
  const [text, setText] = useState('');
  const [type, setType] = useState('simple');
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Englis Practice</h1>
          <Form onSubmit={onSubmit({lines, text, type}, { setNewLine, cleanForm: cleanForm({ setText, setType }) })} inline>
            <FormGroup>
              <Input
                className="mr-2"
                type="text"
                name="text"
                id="text"
                placeholder="Text"
                value={text}
                required
                onChange={e => setText(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="mr-2"
                type="select"
                name="type"
                id="type"
                placeholder="Type"
                value={type}
                required
                onChange={e => setType(e.target.value)}
              >
                <option value="simple">Simple</option>
                <option value="request">Request</option>
                <option value="response">Response</option>
              </Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Lines list</h1>
          <ListGroup>
            {
              lines.map(item => <ListGroupItem key={uuidv4()}>{`${item.text} (${item.type})`}</ListGroupItem>)
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
