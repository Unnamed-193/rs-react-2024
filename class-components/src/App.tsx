import { Component, ReactNode } from 'react';
import './App.css';
import SearchForm from './components/searchForm/SearchForm.tsx';
import SearchList from './components/searchList/SearchList.tsx';
import { getData, searchPerson } from './services/api';
import { AppState } from './appTypes.ts';

class App extends Component<object, AppState> {
  state: AppState = {
    searchQuery: '',
    loading: true,
    results: [],
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const querySearch = localStorage.getItem('searchQuery');
    if (querySearch) {
      this.setState({ searchQuery: querySearch });
      this.getFetchData(querySearch);
    } else {
      this.getFetchData('');
    }
  }

  getFetchData = async (querySearch: string) => {
    try {
      if (querySearch) {
        const person = await searchPerson(querySearch);
        this.setState({ results: person, loading: false });
      } else {
        const data = await getData();
        this.setState({ results: data.results, loading: false });
      }
    } catch (error) {
      console.error('Error fetching data');
      this.setState({ loading: false });
    }
  };

  handleSearch = () => {
    if (this.state.searchQuery.trim() !== '') {
      this.setState({ loading: true });
      localStorage.setItem('searchQuery', this.state.searchQuery);
      this.getFetchData(this.state.searchQuery);
    } else {
      localStorage.removeItem('searchQuery');
      this.getFetchData('');
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  getError = () => {
    this.setState({ error: true, errorMessage: 'Opps! This is test error, just refresh page :)' });
  };

  render(): ReactNode {
    const { results, loading, searchQuery, errorMessage, error } = this.state;

    return (
      <div className='container'>
        <h1 className='title'>Star Wars characters</h1>

        <SearchForm
          searchQuery={searchQuery}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          onErrorTest={this.getError}
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
  }
}

export default App;
