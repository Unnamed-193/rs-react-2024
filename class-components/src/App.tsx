import { Component, ReactNode } from 'react';
import './App.css';
import SearchForm from './components/searchForm/searchForm';
// import SearchList from './components/searchList/searchList';
import getData from './services/api';

class App extends Component {
  render(): ReactNode {
    getData();
    return (
      <>
        <SearchForm />
        {/* <SearchList /> */}
      </>
    );
  }
}

export default App;
