import React, { useState } from 'react';

import {
  Row, Col,
  Button,
  Form, FormGroup, Input,
} from 'reactstrap';

const SearchFrom = (props) => {
  const [searchText, setSearchText] = useState('');
  const onChange = (event) => {
    setSearchText(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(searchText);
  };
  return (
    <Row>
      <Form className="mb-3 w-100" inline onSubmit={onSubmit}>
        <Col sm={10} xs="12">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              className="w-100"
              id="search"
              name="search"
              type="text"
              required
              onChange={onChange}
              placeholder="Write your search..."
            />
          </FormGroup>
        </Col>
        <Col sm={2} xs="12">
          <Button type="submit" block>Search</Button>
        </Col>
      </Form>
    </Row>
  );
}

export default SearchFrom;
