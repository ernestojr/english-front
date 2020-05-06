import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
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
import Base from '../layouts/Base';

import {
  addModule,
  getModules,
  deleteModuleById,
} from '../redux/actions';

const Module = (props) => {
  const [text, setText] = useState('');
  const history = useHistory();

  useEffect(() => {
    props.getModules();
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
		<Base>
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
            <Table columns={columns} data={data} />
          </Col>
        </Row>
      </Container>
    </Base>
  );
}


const mapStateToProps = ({ modules }) => ({
  ...modules,
});

const mapDispatchToProps = {
  addModule,
  getModules,
  deleteModuleById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
