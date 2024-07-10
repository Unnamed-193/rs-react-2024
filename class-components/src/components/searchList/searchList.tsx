import { Component } from 'react';
import SearchItem from '../searchItem/searchItem.tsx';
import style from './searchList.module.css';
import Loader from '../UI/loader/loader.tsx';
import { SearchListProps } from './searchList.ts';

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
