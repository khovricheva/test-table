import './App.css';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [state, setstate] = useState(initialState)
  // const [state, setstate] = useState(initialState)
  // const [state, setstate] = useState(initialState)

  const fetchData = async () => {
    const response = await fetch(
      ` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    );
    const data = await response.json();
    setIsLoading(false);
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <div className='container'>
      {isLoading ? <Loader /> : <Table data={data} />}
    </div>
  );
}

export default App;
