import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/searchForm/searchForm.tsx';
import SearchList from './components/searchList/searchList.tsx';
import { getData, searchPerson } from './services/api';
import { AppState } from './appTypes.ts';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    searchQuery: '',
    loading: true,
    results: [],
    error: false,
    errorMessage: '',
  });

  useEffect(() => {
    const querySearch = localStorage.getItem('searchQuery');
    if (querySearch) {
      setState((prevState) => ({ ...prevState, searchQuery: querySearch }));
      getFetchData(querySearch);
    } else {
      getFetchData('');
    }
  }, []);

  const getFetchData = async (querySearch: string) => {
    try {
      if (querySearch) {
        const person = await searchPerson(querySearch);
        setState((prevState) => ({ ...prevState, results: person, loading: false }));
      } else {
        const data = await getData();
        setState((prevState) => ({ ...prevState, results: data.results, loading: false }));
      }
    } catch (error) {
      console.error('Error fetching data');
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleSearch = () => {
    if (state.searchQuery.trim() !== '') {
      setState((prevState) => ({ ...prevState, loading: true }));
      localStorage.setItem('searchQuery', state.searchQuery);
      getFetchData(state.searchQuery);
    } else {
      localStorage.removeItem('searchQuery');
      getFetchData('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, searchQuery: event.target.value }));
  };

  const getError = () => {
    setState((prevState) => ({
      ...prevState,
      error: true,
      errorMessage: 'Opps! This is test error, just refresh page :)',
    }));
  };

  const { results, loading, searchQuery, errorMessage, error } = state;

  return (
    <div className='container'>
      <h1 className='title'>Star Wars characters</h1>

      <SearchForm
        searchQuery={searchQuery}
        onChange={handleChange}
        onSearch={handleSearch}
        onErrorTest={getError}
      />
      <SearchList
        searchQuery={searchQuery}
        results={results}
        loading={loading}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default App;
