import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import get from 'lodash/get';
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
  addPhase,
  getPhases,
  getModuleById,
  deletePhaseById,
  showDialog,
} from '../redux/actions';

const ModuleDetail = (props) => {
  const [text, setText] = useState('');
  const history = useHistory();
  const { moduleId } = useParams();
  useEffect(() => {
    props.getModuleById(moduleId);
    props.getPhases({ moduleId });
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addPhase({ name: text, moduleId });
    setText('');
    props.getPhases({ moduleId });
  }

  const deletePhase = (item) => () => {
    const title = 'Confirmación';
    const content = (<p>{'Are you sure you want to delete the phase?'}</p>);
    const opts = {
      onAccepted: () => {
        props.deletePhaseById(item._id, () => {
          props.getPhases({ moduleId });
        });
      },
    };
    props.showDialog(title, content, opts);
  }

  const showPhaseDetail = (item) => () => {
    history.push(`/modules/${moduleId}/phases/${item._id}`);
  }

  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={showPhaseDetail(item)}>Show</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deletePhase(item)}>Delete</Button>
      </Fragment>
    );
  }
  const moduleName = get(props, 'module.name', moduleId);
  const breadcrumbs = [
    {
      to: '/modules',
      text: 'Modules',
    },
    {
      text: moduleName,
    },
  ];
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
  const data = useMemo(() => props.phases, [props.phases]);
  return (
    <Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <h1>Module {moduleName}</h1>
            <Form className="mb-3" onSubmit={onSubmit} inline>
              <FormGroup>
                <Input
                  className="mr-2"
                  type="text"
                  name="module-name"
                  id="module-name"
                  placeholder="Phase name"
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

const mapStateToProps = ({ modules, phases }) => ({
  ...phases,
  module: modules.module,
});

const mapDispatchToProps = {
  addPhase,
  getPhases,
  getModuleById,
  deletePhaseById,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
