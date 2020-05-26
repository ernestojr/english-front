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
import ModuleForm from '../Modules/ModuleForm';

import {
  addPhase,
  getPhases,
  getModuleById,
  updateModuleById,
  deletePhaseById,
  cleanStorePhase,
  showDialog,
} from '../../redux/actions';

const STATE_DEFAULT = { name: '', description: '' };

const ModuleDetail = (props) => {
  const [phase, setPhase] = useState(STATE_DEFAULT);
  const [module, setModule] = useState(STATE_DEFAULT);
  const [isOpenPhaseDialog, showPhaseDialog] = useState(false);
  const [isOpenModuleDialog, showModuleDialog] = useState(false);
  const history = useHistory();
  const { moduleId } = useParams();
  const {
    getModuleById,
    getPhases,
    cleanStorePhase,
  } = props;
  useEffect(() => {
    getModuleById(moduleId);
    getPhases({ moduleId });
    return () => {
      cleanStorePhase();
    }
  }, [
    moduleId,
    getModuleById,
    getPhases,
    cleanStorePhase,
  ]);
  /* Module events */
  const onChangeMudule = key => event => {
    setModule({ ...module, [key]: event.target.value });
  }
  const onButtonClickEditModule = () => {
    setModule(props.module);
    showModuleDialog(true);
  }
  const onSubmitModule = async (event) => {
    event.preventDefault();
    await props.updateModuleById(module._id, {...pick(module, ['name', 'description'])});
    showModuleDialog(false);
    props.getModuleById(moduleId);
  }
  /* Phase events */
  const onChangePhase = key => event => {
    setPhase({ ...phase, [key]: event.target.value  });
  }
  const onButtonClickPhase = () => {
    showPhaseDialog(true);
  }
  const onSubmitPhase = async (event) => {
    event.preventDefault();
    await props.addPhase({ ...phase, moduleId });
    setPhase(STATE_DEFAULT);
    showPhaseDialog(false);
    props.getPhases({ moduleId });
  };
  const onClickDeletePhase = (item) => () => {
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
  const onClickShowPhaseDetail = (item) => () => {
    history.push(`/modules/${moduleId}/phases/${item._id}`);
  }
  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={onClickShowPhaseDetail(item)}>Practices</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={onClickDeletePhase(item)}>Delete</Button>
      </Fragment>
    );
  }
  /* Table */
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
        title: 'Description',
        accessor: 'description',
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
  const moduleName = get(props, 'module.name', '');
  const moduleDescription = get(props, 'module.description', '');
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
  const isLoading = get(props, 'getting', false);
  return (
    <Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText={`Modules ${moduleName}`}
              buttonTextEdit="Edit Module"
              onButtonClickEdit={onButtonClickEditModule}
              buttonTextNew="New Phase"
              onButtonClickNew={onButtonClickPhase} />
            <p>{moduleDescription}</p>
            <Table
              isLoading={isLoading}
              headers={headers}
              data={data}
              onChangePage={onChangePage}
              {...pick(props, ['page', 'count', 'limit'])} />
            <DialogForm
              isOpen={isOpenPhaseDialog}
              title="New Phase"
              toggle={() => showPhaseDialog(false)}
              onSubmit={onSubmitPhase}>
              <PhaseForm value={phase} onChange={onChangePhase}/>
            </DialogForm>
            <DialogForm
              isOpen={isOpenModuleDialog}
              title="Update Module"
              toggle={() => showModuleDialog(false)}
              onSubmit={onSubmitModule}>
              <ModuleForm value={module} onChange={onChangeMudule}/>
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
  updateModuleById,
  deletePhaseById,
  cleanStorePhase,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
