import { Component } from 'react';
import getData, { Persons } from '../../services/api';
import SearchItem from '../searchItem/searchItem';
import style from './searchList.module.css';
import Loader from '../UI/loader/loader';

class SearchList extends Component<object, Persons> {
  state: Persons = {
    results: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const data: Persons = await getData();
      this.setState({ results: data.results, loading: false });
    } catch (error) {
      console.error('Error fetching data');
      this.setState({ loading: false });
    }
  }

  render() {
    const { results, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    return (
      <ul className={style.list}>
        {results.map((person) => (
          <SearchItem key={person.name} person={person} />
        ))}
      </ul>
    );
  }
}

export default SearchList;
