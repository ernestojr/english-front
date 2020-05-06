import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  addPractice,
  getPractices,
  getPhaseById,
  deletePracticeById,
} from '../redux/actions';

const PRACTICE_DEFAULT = { content: '', type: 'question' };

const TYPE_OPTIONS = [
  { value: 'question', text: 'Question' },
  { value: 'answer', text: 'Answer' },
];
const PhaseDetail = (props) => {
  console.log('props', props);
  const [practice, setPractice] = useState(PRACTICE_DEFAULT);
  const { id: phaseId } = useParams();
  useEffect(() => {
    props.getPhaseById(phaseId);
    props.getPractices({ phaseId });
  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addPractice({ ...practice, phaseId });
    setPractice(PRACTICE_DEFAULT);
    props.getPractices({ phaseId });
  }

  const deletePractice = (item) => async () => {
    await props.deletePracticeById(item._id);
    props.getPractices({ phaseId });
  }

  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deletePractice(item)}>Delete</Button>
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
        Header: 'Text',
        accessor: 'content',
      },
      {
        Header: 'Type',
        accessor: 'type',
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
  const data = useMemo(() => props.practices, [props.practices]);
  const phaseName = get(props, 'phase.name');
  return (
    <Base>
      <Container>
        <Row>
          <Col>
            <h1>Phase {phaseName}</h1>
            <Form className="mb-3" onSubmit={onSubmit} inline>
              <FormGroup>
                <Input
                  className="mr-2"
                  type="content"
                  name="content"
                  id="content"
                  placeholder="Practice"
                  value={practice.content}
                  required
                  onChange={e => setPractice({ ...practice, content: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="mr-2"
                  type="select"
                  name="type"
                  id="type"
                  value={practice.type}
                  required
                  onChange={e => setPractice({ ...practice, type: e.target.value})}
                >
                  {
                    TYPE_OPTIONS.map(opt => <option value={opt.value}>{opt.text}</option>)
                  }
                </Input>
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

const mapStateToProps = ({ phases, practices }) => ({
  ...practices,
  phase: phases.phase,
});

const mapDispatchToProps = {
  addPractice,
  getPractices,
  getPhaseById,
  deletePracticeById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseDetail);
