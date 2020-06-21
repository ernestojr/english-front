import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Table from '../../components/Table';
import HeaderPage from '../../components/HeaderPage';
import Base from '../../layouts/Base';
import NumberDialog from './NumberDialog';

import {
  showDialog,
} from '../../redux/actions';

import NUMBERS from '../../constants/numbers.json';

const Numbers = () => {
  const [isOpen, showModalFrom] = useState(false);
  const onButtonClick = () => {
    showModalFrom(true);
  }
  const headers = [
    {
      title: 'Number',
      accessor: 'number',
    },
    {
      title: 'Cardinal',
      accessor: 'cardinal',
    },
    {
      title: 'Orndinal',
      accessor: 'ordinal',
    },
  ];
  const breadcrumbs = [
    {
      text: 'Numbers',
    },
  ];
  return (
		<Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText="Numbers"
              buttonTextNew="Practice"
              onButtonClickNew={onButtonClick}
            />
            <Table
              headers={headers}
              data={NUMBERS}
            />
            <NumberDialog
              isOpen={isOpen}
              toggle={() => showModalFrom(false)}
            />
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

const mapDispatchToProps = {
  showDialog,
};

export default connect(undefined, mapDispatchToProps)(Numbers);
