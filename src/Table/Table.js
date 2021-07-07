import React from 'react';
import './Table.css';

function Table({ data, onSort, sortDir, sortField, onRowSelect }) {
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th onClick={onSort.bind(null, 'id')}>
              ID {sortField === 'id' ? <small>{sortDir}</small> : null}
            </th>
            <th onClick={onSort.bind(null, 'firstName')}>
              First Name{' '}
              {sortField === 'firstName' ? <small>{sortDir}</small> : null}
            </th>
            <th onClick={onSort.bind(null, 'lastName')}>
              Last Name{' '}
              {sortField === 'lastName' ? <small>{sortDir}</small> : null}
            </th>
            <th onClick={onSort.bind(null, 'email')}>
              Email {sortField === 'email' ? <small>{sortDir}</small> : null}
            </th>
            <th onClick={onSort.bind(null, 'phone')}>
              Phone {sortField === 'phone' ? <small>{sortDir}</small> : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id + item.phone}
              onClick={onRowSelect.bind(null, item)}
            >
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
