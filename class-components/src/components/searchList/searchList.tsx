import { Component } from 'react';
import getData, { Persons } from '../../services/api';

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
      <ul>
        {results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  }
}

export default SearchList;
