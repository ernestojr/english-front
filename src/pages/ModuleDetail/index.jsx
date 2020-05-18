import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';

import Table from '../../components/Table';
import HeaderPage from '../../components/HeaderPage';
import DialogForm from '../../components/DialogForm';
import Base from '../../layouts/Base';
import PhaseForm from './PhaseForm';

import {
  addPhase,
  getPhases,
  getModuleById,
  deletePhaseById,
  showDialog,
} from '../../redux/actions';

const PHASE_DEFAULT = { name: '', description: '' };

const ModuleDetail = (props) => {
  const [phase, setPhase] = useState(PHASE_DEFAULT);
  const [isOpen, showModalFrom] = useState(false);
  const history = useHistory();
  const { moduleId } = useParams();
  useEffect(() => {
    props.getModuleById(moduleId);
    props.getPhases({ moduleId });
  }, []);
  const onChange = key => event => {
    setPhase({ ...phase, [key]: event.target.value  });
  }
  const onButtonClick = () => {
    showModalFrom(true);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    await props.addPhase({ ...phase, moduleId });
    setPhase(PHASE_DEFAULT);
    showModalFrom(false);
    props.getPhases({ moduleId });
  };
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
        <Button className="mr-2" outline color="primary" size="sm" onClick={showPhaseDetail(item)}>Practices</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deletePhase(item)}>Delete</Button>
      </Fragment>
    );
  }
  const onChangePage = page => {
    props.getPhases({ moduleId, page });
  }
  const headers = useMemo(
    () => [
      {
        title: 'Name',
        accessor: 'name',
      },
      {
        title: 'Created At',
        key: 'createdAt',
        accessor: (item) => moment(item.createdAt).format('DD/MM/YYYY'),
      },
      {
        title: 'Updated At',
        key: 'updatedAt',
        accessor: (item) => moment(item.updatedAt).format('DD/MM/YYYY'),
      },
      {
        title: 'Actions',
        key: 'actions',
        accessor: (item) => getActions(item),
      },
    ],
    [],
  );
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
  const data = useMemo(() => props.phases, [props.phases]);
  return (
    <Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText={`Modules ${moduleName}`}
              buttonText="New Phase"
              onButtonClickButton={onButtonClick} />
            <Table
              headers={headers}
              data={data}
              onChangePage={onChangePage}
              {...pick(props, ['page', 'count', 'limit'])} />
            <DialogForm
              isOpen={isOpen}
              title="New Phase"
              toggle={() => showModalFrom(false)}
              onSubmit={onSubmit}>
              <PhaseForm value={phase} onChange={onChange}/>
            </DialogForm>
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
