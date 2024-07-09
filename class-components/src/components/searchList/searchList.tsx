import { Component } from 'react';
import SearchItem from '../SearchItem/SearchItem';
import style from './searchList.module.css';
import Loader from '../UI/Loader/Loader.tsx';
import { SearchListProps } from './SearchList.ts';

class SearchList extends Component<SearchListProps> {
  render() {
    const { results, loading, error, errorMessage, searchQuery } = this.props;
    if (loading) {
      return <Loader />;
    }

    if (error) {
      throw Error(errorMessage);
    }

    return (
      <>
        {error && <p>{errorMessage}</p>}
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
