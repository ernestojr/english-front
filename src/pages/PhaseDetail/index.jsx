import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';
import includes from 'lodash/includes';
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
import PracticeForm from './PracticeForm';
import PhaseForm from '../ModuleDetail/PhaseForm';
import { TYPES_PRACTICE } from '../../constants/ui';

import {
  addPractice,
  getPractices,
  getModuleById,
  getPhaseById,
  updatePhaseById,
  updatePracticeById,
  deletePracticeById,
  cleanStorePractice,
  showDialog,
} from '../../redux/actions';

const PRACTICE_DEFAULT = { content: '', type: 'simple' };
const PHASE_DEFAULT = { name: '', description: '' };

const PhaseDetail = (props) => {
  const [phase, setPhase] = useState(PHASE_DEFAULT);
  const [practice, setPractice] = useState(PRACTICE_DEFAULT);
  const [isOpen, showForm] = useState(false);
  const [isOpenModal, showModalFrom] = useState(false);
  const { moduleId, phaseId } = useParams();
  const {
    getModuleById,
    getPhaseById,
    getPractices,
    cleanStorePractice,
  } = props;
  useEffect(() => {
    getModuleById(moduleId);
    getPhaseById(phaseId);
    getPractices({ phaseId });
    return () => {
      cleanStorePractice();
    }
  }, [
    moduleId,
    phaseId,
    getModuleById,
    getPhaseById,
    getPractices,
    cleanStorePractice,
  ]);
  /* Phase envets */
  const onButtonClickEditPhase = () => {
    setPhase(props.phase);
    showModalFrom(true);
  }
  const onChangePhase = key => event => {
    setPhase({ ...phase, [key]: event.target.value });
  }
  const onSubmitPhase = async (e) => {
    e.preventDefault();
    await props.updatePhaseById(phase._id, {...pick(phase, ['name', 'description'])});
    showModalFrom(false);
    props.getPhaseById(phaseId);
  };
  /* Practice envets */
  const onButtonClickPractice = () => {
    showForm(true);
  }
  const onChangePractice = key => event => {
    const { value } = event.target;
    let fields = {};
    if (key === 'content' && includes(value, '?')) {
      fields = { type: 'question' };
    }
    setPractice({ ...practice, [key]: value, ...fields });
  }
  const onCancelClickPractice = () => {
    showForm(false);
    setPractice(PRACTICE_DEFAULT);
  }
  const onSubmitPractice = async (e) => {
    e.preventDefault();
    if (practice._id) {
      await props.updatePracticeById(practice._id, {...pick(practice, ['content', 'type'])});
    } else {
      await props.addPractice({ ...practice, phaseId });
    }
    showForm(false);
    setPractice(PRACTICE_DEFAULT);
    props.getPractices({ phaseId });
  }
  const onClickUpdatePractice = (item) => async () => {
    setPractice(item);
    showForm(true);
  };
  const onClickDeletePractice = (item) => async () => {
    const title = 'Confirmación';
    const content = (<p>{'Are you sure you want to delete the practice?'}</p>);
    const opts = {
      onAccepted: () => {
        props.deletePracticeById(item._id, () => {
          props.getPractices({ phaseId });
        });
      },
    };
    props.showDialog(title, content, opts);
  }
  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={onClickUpdatePractice(item)}>Update</Button>
        <Button outline color="danger" size="sm" onClick={onClickDeletePractice(item)}>Delete</Button>
      </Fragment>
    );
  }
  /* Table */
  const onChangePage = page => {
    props.getPractices({ phaseId, page });
  }
  const data = useMemo(() => props.practices, [props.practices]);
  const isLoading = get(props, 'getting', false);
  const headers = [
    {
      title: 'Text',
      accessor: 'content',
    },
    {
      title: 'Type',
      key: 'type',
      accessor: (item) => TYPES_PRACTICE[item.type],
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
  ];
  /* Various */
  const moduleName = get(props, 'module.name', '');
  const phaseName = get(props, 'phase.name', '');
  const phaseDescription = get(props, 'phase.description', '');
  const breadcrumbs = [
    {
      to: '/modules',
      text: 'Modules',
    },
    {
      to: `/modules/${moduleId}`,
      text: moduleName,
    },
    {
      text: phaseName,
    },
  ];
  return (
    <Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText={`Phase ${phaseName}`}
              buttonTextEdit="Edit Phase"
              onButtonClickEdit={onButtonClickEditPhase}
              buttonTextNew="New Practice"
              onButtonClickNew={onButtonClickPractice} />
            <p>{phaseDescription}</p>
            {
              isOpen &&
              <PracticeForm
                onSubmit={onSubmitPractice}
                value={practice}
                onChange={onChangePractice}
                onCancelClick={onCancelClickPractice}/>
            }
            <Table
              isLoading={isLoading}
              headers={headers}
              data={data}
              onChangePage={onChangePage}
              {...pick(props, ['page', 'count', 'limit'])} />
            <DialogForm
              isOpen={isOpenModal}
              title="Update Phase"
              toggle={() => showModalFrom(false)}
              onSubmit={onSubmitPhase}>
              <PhaseForm value={phase} onChange={onChangePhase}/>
            </DialogForm>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

const mapStateToProps = ({ modules, phases, practices }) => ({
  ...practices,
  module: modules.module,
  phase: phases.phase,
});

const mapDispatchToProps = {
  addPractice,
  getPractices,
  getModuleById,
  getPhaseById,
  updatePhaseById,
  updatePracticeById,
  deletePracticeById,
  cleanStorePractice,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseDetail);
