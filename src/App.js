import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import TableSearch from './TableSearch/TableSearch';
import './App.css';

function App() {
  const [isModeSelected, setIsModeSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sortDir, setSortDir] = useState('');
  const [sortField, setSortField] = useState('');
  const [rowData, setRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [search, setSearch] = useState('');

  const pageSize = 50;

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

  const pageChangeHandler = ({ selected }) => {
    setCurrentPage(selected);
  };

  const searchHandler = (search) => {
    setSearch(search);
    setCurrentPage(0);
  };

  const getFilteredData = () => {
    if (!search) return data;
    return data.filter((item) => {
      return (
        item['firstName'].toLowerCase().includes(search.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
        item['email'].toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const filteredData = getFilteredData();
  const pageCount = Math.ceil(filteredData.length / pageSize);

  useEffect(() => {
    if (data.length) {
      setDisplayData(_.chunk(filteredData, pageSize)[currentPage]);
    }
  }, [data, currentPage, search]);

  return (
    <>
      {isModeSelected ? (
        <div className='container'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <TableSearch onSearch={searchHandler} />
              <Table
                data={displayData}
                onSort={onSort}
                sortDir={sortDir}
                sortField={sortField}
                onRowSelect={onRowSelect}
              />
              {data.length > pageSize ? (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  breakLinkClassName={'page-link'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={pageChangeHandler}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  nextClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName={'page-link'}
                  forcePage={currentPage}
                />
              ) : null}
            </>
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
