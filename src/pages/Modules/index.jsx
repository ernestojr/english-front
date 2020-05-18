import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
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
import ModuleForm from './ModuleForm';

import {
  addModule,
  getModules,
  deleteModuleById,
  showDialog,
} from '../../redux/actions';

const MODULE_DEFAULT = { name: '', description: '' };

const Module = (props) => {
  const [module, setModule] = useState(MODULE_DEFAULT);
  const [isOpen, showModalFrom] = useState(false);
  const history = useHistory();
  useEffect(() => {
    props.getModules();
  }, []);
  const onChange = key => event => {
    setModule({ ...module, [key]: event.target.value  });
  }
  const onButtonClick = () => {
    showModalFrom(true);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    await props.addModule(module);
    setModule(MODULE_DEFAULT);
    showModalFrom(false);
    props.getModules();
  };
  const deleteModel = (item) => () => {
    const title = 'Confirmación';
    const content = (<p>{'Are you sure you want to delete the module?'}</p>);
    const opts = {
      onAccepted: () => {
        props.deleteModuleById(item._id, () => {
          props.getModules();
        });
      },
    };
    props.showDialog(title, content, opts);
  }
  const showModelDetail = (item) => () => {
    history.push(`/modules/${item._id}`);
  }
  const onChangePage = page => {
    props.getModules({ page });
  }
  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={showModelDetail(item)}>Phases</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deleteModel(item)}>Delete</Button>
      </Fragment>
    );
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
  const breadcrumbs = [
    {
      text: 'Modules',
    },
  ];
  const data = useMemo(() => props.modules, [props.modules]);
  return (
		<Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText="Modules"
              buttonText="New Module"
              onButtonClickButton={onButtonClick}
            />
            <Table
              headers={headers}
              data={data}
              onChangePage={onChangePage}
              {...pick(props, ['page', 'count', 'limit'])} />
            <DialogForm
              isOpen={isOpen}
              title="New Module"
              toggle={() => showModalFrom(false)}
              onSubmit={onSubmit}>
              <ModuleForm value={module} onChange={onChange}/>
            </DialogForm>
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
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Module);
