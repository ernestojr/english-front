import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import pick from 'lodash/pick';
import get from 'lodash/get';
import split from 'lodash/split';
import startsWith from 'lodash/startsWith';
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
import WordForm from './WordForm';

import {
  addWord,
  getWords,
  updateWordById,
  deleteWordById,
  cleanStoreWord,
  showDialog,
} from '../../redux/actions';

const WORD_DEFAULT = {
  value: '',
  metadata: {
    spanish: '',
    present: '',
    past: '',
  },
};

const Word = (props) => {
  const [word, setWord] = useState(WORD_DEFAULT);
  const [isOpen, showModalFrom] = useState(false);
  const {
    words,
    getWords,
    cleanStoreWord,
  } = props;
  useEffect(() => {
    getWords();
    return () => {
      cleanStoreWord();
    }
  }, [
    getWords,
    cleanStoreWord,
  ]);
  const onChange = key => event => {
    if (startsWith(key, 'metadata.')) {
      const metadataKey = split(key, '.')[1];
      setWord({
        ...word,
        metadata: {
          ...word.metadata,
          [metadataKey]: event.target.value,
        },
      });
    } else {
      setWord({ ...word, [key]: event.target.value });
    }
  }
  const onButtonClick = () => {
    showModalFrom(true);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if (word._id) {
      await props.updateWordById(word._id, {...pick(word, ['value', 'metadata'])});
    } else {
      await props.addWord(word);
    }
    setWord(WORD_DEFAULT);
    showModalFrom(false);
    props.getWords();
  };
  const updateWord = (item) => () => {
    setWord(item);
    showModalFrom(true);
  };
  const deleteWord = (item) => () => {
    const title = 'Confirmación';
    const content = (<p>{'Are you sure you want to delete the word?'}</p>);
    const opts = {
      onAccepted: () => {
        props.deleteWordById(item._id, () => {
          props.getWords();
        });
      },
    };
    props.showDialog(title, content, opts);
  }
  const onChangePage = page => {
    props.getWords({ page });
  }
  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={updateWord(item)}>Update</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deleteWord(item)}>Delete</Button>
      </Fragment>
    );
  }
  const headers = useMemo(
    () => [
      {
        title: 'English',
        accessor: 'value',
      },
      {
        title: 'Spanish',
        key: 'spanish',
        accessor: (item) => get(item, 'metadata.spanish'),
      },
      {
        title: 'Present',
        key: 'present',
        accessor: (item) => get(item, 'metadata.present'),
      },
      {
        title: 'Past',
        key: 'past',
        accessor: (item) => get(item, 'metadata.past'),
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
      text: 'Words',
    },
  ];
  const data = useMemo(() => words, [words]);
  const isLoading = get(props, 'getting', false);
  return (
		<Base breadcrumbs={breadcrumbs}>
      <Container>
        <Row>
          <Col>
            <HeaderPage
              headerText="Words"
              buttonTextNew="New Word"
              onButtonClickNew={onButtonClick}
            />
            <Table
              headers={headers}
              isLoading={isLoading}
              data={data}
              onChangePage={onChangePage}
              {...pick(props, ['page', 'count', 'limit'])} />
            <DialogForm
              isOpen={isOpen}
              title="New Word"
              toggle={() => showModalFrom(false)}
              onSubmit={onSubmit}>
              <WordForm value={word} onChange={onChange}/>
            </DialogForm>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}


const mapStateToProps = ({ words }) => ({
  ...words,
});

const mapDispatchToProps = {
  addWord,
  getWords,
  updateWordById,
  deleteWordById,
  cleanStoreWord,
  showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Word);
