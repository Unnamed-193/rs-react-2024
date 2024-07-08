import { Component, ReactNode } from 'react';
import './App.css';
import SearchForm from './components/searchForm/searchForm';
import SearchList from './components/searchList/searchList';
import { getData, searchPerson, Person } from './services/api';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

interface AppState {
  results: Person[];
  searchQuery: string;
  loading: boolean;
  error: boolean;
  errorMes: string;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchQuery: '',
    loading: true,
    results: [],
    error: false,
    errorMes: '',
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
      } else if (querySearch === '') {
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
    this.setState({ error: true, errorMes: 'Opps! This is test error, just refresh page :)' });
  };

  render(): ReactNode {
    const { results, loading, searchQuery, errorMes, error } = this.state;

    return (
      <ErrorBoundary>
        <div className='container'>
          <h1 className='title'>Star Wars characters</h1>

          <SearchForm
            searchQuery={searchQuery}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          />
          <button onClick={this.getError} style={{ marginBottom: 30 }}>
            Test error
          </button>
          <SearchList results={results} loading={loading} error={error} errorMes={errorMes} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
