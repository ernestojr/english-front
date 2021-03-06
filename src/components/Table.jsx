import React, { Fragment } from 'react';
import {
  Table,
  Progress,
} from 'reactstrap';
import map from 'lodash/map';
import Pagination from "react-js-pagination";

function getContent({ accessor }, data) {
  if (typeof accessor === 'function') {
    return accessor(data);
  }
  return data[accessor];
}

export default (props) => {
  const {
    page,
    count,
    limit,
    onChangePage,
    headers = [],
    data = [],
    isLoading = false,
  } = props;
  const showPagination = !!page && !!limit && !!count && (data.length > 0);
  const colNumb = headers.length;
  return (
    <Fragment>
      <Table striped bordered responsive>
        <thead>
          <tr>
            {
              map(headers, (hdr) => <th key={`${Date.now()}-${hdr.key || hdr.accessor}`}>{hdr.title}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            isLoading &&
            <tr>
              <td className="text-center" colSpan={colNumb}>
                <p>Loading...</p>
                <Progress animated value="100" />
              </td>
            </tr>
          }
          {
            !isLoading && !data.length &&
            <tr>
              <td className="text-center" colSpan={colNumb}>Nothing yet</td>
            </tr>
          }
          {
            !isLoading &&
            map(data, (item, index) => (
              <tr key={`${Date.now()}-${index}`}>
                {
                  map(headers, hdr => (
                    <td key={`${Date.now()}-${hdr.key || hdr.accessor}-${index}`}>{getContent(hdr, item)}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
      {
        showPagination &&
        <Pagination
          activePage={parseInt(page, 10)}
          itemsCountPerPage={parseInt(limit, 10)}
          totalItemsCount={parseInt(count, 10)}
          pageRangeDisplayed={5}
          onChange={onChangePage}
          itemClass="page-item"
          linkClass="page-link" />
      }
    </Fragment>
  );
};
  