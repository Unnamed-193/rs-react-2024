import { Component } from 'react';
import getData, { Persons } from '../../services/api';
import SearchItem from '../searchItem/searchItem';
import style from './searchList.module.css';

class SearchList extends Component<object, Persons> {
  state: Persons = {
    results: [],
  };

  async componentDidMount() {
    const data: Persons = await getData();
    this.setState({ results: data.results });
  }

  render() {
    const { results } = this.state;

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
