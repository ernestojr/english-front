import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import styled from 'styled-components'
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

import Table from './Table';

import {
  addModule,
  getModules,
  getModuleById,
  updateModuleById,
  deleteModuleById,
} from './redux/actions';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const App = (props) => {

  const [lines, setNewLine] = useState([]);
  const [text, setText] = useState('');
  const [type, setType] = useState('simple');

  useEffect(() => {
    props.getModules();
  }, []);

  const cleanForm = () => {
    setText('');
    setType('simple');
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    const l = [...lines];
    l.push({ text, type });
    setNewLine(l);
    cleanForm();
    props.addModule({ name: text });
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phases',
        id: 'phases',
        accessor: (item) => item.phases.length,
      },
      {
        Header: 'Created At',
        id: 'createdAt',
        accessor: (item) => moment(item.createdAt).format('DD/MM/YYYY'),
      },
      {
        Header: 'Updated At',
        id: 'updatedAt',
        accessor: (item) => moment(item.updatedAt).format('DD/MM/YYYY'),
      },
    ],
    [],
  );
  const data = useMemo(() => props.modules, [props.modules]);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Englis Practice</h1>
          <Form onSubmit={onSubmit} inline>
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
      <Row>
        <Col>
          <h1>Modules</h1>
          <Styles>
            <Table columns={columns} data={data} />
          </Styles>
        </Col>
      </Row>
    </Container>
  );
}


const mapStateToProps = ({ modules }) => ({
  ...modules,
});

const mapDispatchToProps = {
  addModule,
  getModules,
  getModuleById,
  updateModuleById,
  deleteModuleById,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
