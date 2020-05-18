import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import Base from '../../layouts/Base';
import PracticeForm from './PracticeForm';

import {
  addPractice,
  getPractices,
  getModuleById,
  getPhaseById,
  deletePracticeById,
  showDialog,
} from '../../redux/actions';

const PRACTICE_DEFAULT = { content: '', type: 'simple' };

const PhaseDetail = (props) => {
  const [practice, setPractice] = useState(PRACTICE_DEFAULT);
  const [isOpen, showForm] = useState(false);
  const { moduleId, phaseId } = useParams();
  useEffect(() => {
    props.getModuleById(moduleId);
    props.getPhaseById(phaseId);
    props.getPractices({ phaseId });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addPractice({ ...practice, phaseId });
    showForm(false);
    setPractice(PRACTICE_DEFAULT);
    props.getPractices({ phaseId });
  }
  const deletePractice = (item) => async () => {
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
        <Button className="mr-2" outline color="danger" size="sm" onClick={deletePractice(item)}>Delete</Button>
      </Fragment>
    );
  }
  const onButtonClick = () => {
    showForm(true);
  }
  const onChange = key => event => {
    setPractice({ ...practice, [key]: event.target.value });
  }
  const onCancelClick = () => {
    showForm(false);
    setPractice(PRACTICE_DEFAULT);
  }
  const onChangePage = page => {
    props.getPractices({ phaseId, page });
  }
  const headers = useMemo(
    () => [
      {
        title: 'Text',
        accessor: 'content',
      },
      {
        title: 'Type',
        accessor: 'type',
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
  const phaseName = get(props, 'phase.name', phaseId);
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
  const data = useMemo(() => props.practices, [props.practices]);
  return (
    <Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText={`Phase ${phaseName}`}
              buttonText="New Practice"
              onButtonClickButton={onButtonClick} />
            {
              isOpen &&
              <PracticeForm
                onSubmit={onSubmit}
                value={practice}
                onChange={onChange}
                onCancelClick={onCancelClick}/>
            }
            <Table
              headers={headers}
              data={data}
              onChangePage={onChangePage}
              {...pick(props, ['page', 'count', 'limit'])} />
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
  deletePracticeById,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseDetail);
