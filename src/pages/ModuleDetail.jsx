import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
} from 'reactstrap';

import Table from '../components/Table';

import {
  addModule,
  getModules,
  getModuleById,
  updateModuleById,
  deleteModuleById,
} from '../redux/actions';

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
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

const ModuleDetail = (props) => {
  const [text, setText] = useState('');
  const history = useHistory();
  const { id } = useParams();
  console.log('props', props);
  
  useEffect(() => {
    props.getModuleById(id);
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addModule({ name: text });
    setText('');
    props.getModules();
  }

  const deleteModel = (item) => async () => {
    await props.deleteModuleById(item._id);
    props.getModules();
  }

  const showModelDetail = (item) => () => {
    history.push(`/modules/${item._id}`);
  }

  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={showModelDetail(item)}>Show</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deleteModel(item)}>Delete</Button>
      </Fragment>
    );
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
      {
        Header: 'Actions',
        id: 'actions',
        accessor: (item) => getActions(item),
      },
    ],
    [],
  );
  const data = useMemo(() => props.modules, [props.modules]);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Modules</h1>
          <Form className="mb-3" onSubmit={onSubmit} inline>
            <FormGroup>
              <Input
                className="mr-2"
                type="text"
                name="module-name"
                id="module-name"
                placeholder="Module name"
                value={text}
                required
                onChange={e => setText(e.target.value)}
              />
            </FormGroup>
            <Button color="success" type="submit">Save</Button>
          </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
