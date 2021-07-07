import { useState, useEffect } from 'react';
import _ from 'lodash';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import './App.css';

function App() {
  const [isModeSelected, setIsModeSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sortDir, setSortDir] = useState('');
  const [sortField, setSortField] = useState('');
  const [rowData, setRowData] = useState(null);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setIsLoading(false);
    setData(data);
  };

  const onSort = (sortField) => {
    const copiedData = data.concat();
    const sortType = sortDir === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(copiedData, sortField, sortType);
    setData(orderedData);
    setSortDir(sortType);
    setSortField(sortField);
  };

  const onRowSelect = (item) => setRowData(item);

  const modeSelectHandler = (url) => {
    setIsModeSelected(true);
    setIsLoading(true);
    fetchData(url);
  };

  return (
    <>
      {isModeSelected ? (
        <div className='container'>
          {isLoading ? (
            <Loader />
          ) : (
            <Table
              data={data}
              onSort={onSort}
              sortDir={sortDir}
              sortField={sortField}
              onRowSelect={onRowSelect}
            />
          )}
          {rowData ? <DetailRowView person={rowData} /> : null}
        </div>
      ) : (
        <div className='container'>
          <ModeSelector onSelect={modeSelectHandler} />
        </div>
      )}
    </>
  );
}

export default App;
