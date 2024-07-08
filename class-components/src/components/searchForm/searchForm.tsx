import React, { Component } from 'react';
import style from './searchForm.module.css';

class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = () => {
    localStorage.setItem('searchQuery', this.state.searchQuery);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <div className={style.searchBox}>
        <input
          className={style.input}
          type='text'
          value={this.state.searchQuery}
          onChange={this.handleChange}
        />
        <button className={style.button} onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
