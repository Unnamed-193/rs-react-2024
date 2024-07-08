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
  searchQuery: string;
}

class SearchList extends Component<SearchListProps> {
  render() {
    const { results, loading, error, errorMes, searchQuery } = this.props;
    if (loading) {
      return <Loader />;
    }

    if (error) {
      throw Error(errorMes);
    }

    return (
      <>
        {error && <p>{errorMes}</p>}
        {searchQuery ? (
          <>
            {results.filter((person) =>
              person.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
            ).length > 0 ? (
              <ul className={style.list}>
                {results.map((person) => (
                  <SearchItem key={person.name} person={person} />
                ))}
              </ul>
            ) : (
              <p>No results found for the search query</p>
            )}
          </>
        ) : (
          <ul className={style.list}>
            {results.map((person) => (
              <SearchItem key={person.name} person={person} />
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default SearchList;
