import { ChangeEvent, Component } from 'react';
import style from './searchForm.module.css';

interface SearchProps {
  onSearch: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

class SearchForm extends Component<SearchProps> {
  render() {
    const { onSearch, onChange, searchQuery } = this.props;

    return (
      <div className={style.searchBox}>
        <input className={style.input} type='text' value={searchQuery} onChange={onChange} />
        <button className={style.button} onClick={onSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
