import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import QueryString from 'query-string';
import moment from 'moment';
import pick from 'lodash/pick';
import get from 'lodash/get';
import split from 'lodash/split';
import last from 'lodash/last';
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
import SearchForm from '../../components/SearchForm';
import Base from '../../layouts/Base';
import WordForm from './WordForm';
import WordPracticeForm from './WordPracticeForm';

import {
  addWord,
  getWords,
  updateWordById,
  deleteWordById,
  cleanStoreWord,
  showDialog,
  wordPractice,
} from '../../redux/actions';

const WORD_DEFAULT = {
  value: '',
  metadata: {
    spanish: '',
    present: '',
    past: '',
  },
};

const filters = [
  'search',
  'page',
  'limit',
];

const Word = (props) => {
  const [word, setWord] = useState(WORD_DEFAULT);
  const [wordInPractice, setWordInPractice] = useState({
    english: '',
    spanish: '',
    response: '',
    isInvalid: false,
  });
  const [isOpen, showModalFrom] = useState(false);
  const [isOpenPractice, showPracticeModalFrom] = useState(false);
  const history = useHistory();
  const {
    addWord,
    cleanStoreWord,
    deleteWordById,
    getWords,
    showDialog,
    updateWordById,
    words,
    practicing,
    wordsInPractice,
    wordPractice,
  } = props;
  console.log('practicing', practicing);
  console.log('wordsInPractice', wordsInPractice);
  console.log('wordInPractice', wordInPractice);
  const currentQuery = QueryString.parse(history.location.search);
  
  useEffect(() => {
    const query = QueryString.parse(history.location.search);
    getWords(pick(query, filters));
    return () => {
      cleanStoreWord();
    }
  }, [
    getWords,
    history,
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
      await updateWordById(word._id, {...pick(word, ['value', 'metadata'])});
    } else {
      await addWord(word);
    }
    setWord(WORD_DEFAULT);
    showModalFrom(false);
    getWords();
  };
  const onSubmitSearch = async (search) => {
    console.log('search', search);
    const query = { ...currentQuery, search };
    const path = `${history.location.pathname}?${QueryString.stringify(query)}`;
    getWords(query);
    console.log('path', path);
    history.push(path);
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
        deleteWordById(item._id, () => {
          getWords(currentQuery);
        });
      },
    };
    showDialog(title, content, opts);
  }
  const onChangePage = page => {
    getWords({ ...currentQuery, page });
  };
  const getActions = (item) => {
    return (
      <Fragment>
        <Button className="mr-2" outline color="primary" size="sm" onClick={updateWord(item)}>Update</Button>
        <Button className="mr-2" outline color="danger" size="sm" onClick={deleteWord(item)}>Delete</Button>
      </Fragment>
    );
  };
  const onButtonClickPractice = () => {
    wordPractice(1, (data) => {
      if (data.length) {
        const w = last(data);
        // const isSpanish = Math.random() < 0.5;
        setWordInPractice({
          english: w.value,
          spanish: w.metadata.spanish,
          response: '',
          isInvalid: false,
        });
      }
      showPracticeModalFrom(true);
    });
  }
  const onSubmitPractice = (event) => {
    event.preventDefault();
    const { english: targe, response } = wordInPractice;
    if (response.length < targe.length ||
      !targe.toLowerCase().includes(response.toLowerCase())) {
      setWordInPractice({...wordInPractice, isInvalid: true });
    }
  }
  const onChangeWordInPractice = (event) => {
    setWordInPractice({
      ...wordInPractice,
      response: event.target.value,
      isInvalid: false,
    });
  }

  const onUpdateWord = () => {
    onButtonClickPractice();
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
            <SearchForm
              onSubmit={onSubmitSearch}
            />
            <Row>
              <Col>
                <Button
                  className="mb-3"
                  color="success"
                  type="button"
                  onClick={onButtonClickPractice}
                  block>Practice</Button>
              </Col>
            </Row>
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
            <DialogForm
              isOpen={isOpenPractice}
              title="New Practice"
              cancelButtonCaption="Close"
              acceptButtonCaption="Evaluate"
              toggle={() => showPracticeModalFrom(false)}
              onSubmit={onSubmitPractice}>
                <WordPracticeForm
                  value={wordInPractice}
                  onUpdateWord={onUpdateWord}
                  onChange={onChangeWordInPractice} />
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
  wordPractice,
};

export default connect(mapStateToProps, mapDispatchToProps)(Word);
