import { Component } from 'react';
import { Person } from '../../services/api';
import SearchItem from '../searchItem/searchItem';
import style from './searchList.module.css';
import Loader from '../UI/loader/loader';

interface SearchListProps {
  results: Person[];
  loading: boolean;
  errorMes: string;
  error: boolean;
}

class SearchList extends Component<SearchListProps> {
  render() {
    const { results, loading, error, errorMes } = this.props;
    if (loading) {
      return <Loader />;
    }

    if (error) {
      throw Error(errorMes);
    }

    return (
      <>
        {error && <p>{errorMes}</p>}
        <ul className={style.list}>
          {results.map((person) => (
            <SearchItem key={person.name} person={person} />
          ))}
        </ul>
      </>
    );
  }
}

export default SearchList;
