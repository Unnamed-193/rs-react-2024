import React, { Component } from 'react';

class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = () => {
    console.log(1);

    // Реализация поиска и работы с локальным хранилищем
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <div>
        <input type='text' value={this.state.searchQuery} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Поиск</button>
      </div>
    );
  }
}

export default SearchForm;
