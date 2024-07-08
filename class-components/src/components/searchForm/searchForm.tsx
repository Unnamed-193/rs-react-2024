import { ChangeEvent, Component } from 'react';
import style from './searchForm.module.css';

interface SearchFormProps {
  onSearch: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onErrorTest: () => void;
  searchQuery: string;
}

class SearchForm extends Component<SearchFormProps> {
  render() {
    const { onSearch, onChange, searchQuery, onErrorTest } = this.props;

    return (
      <form className={style.searchBox}>
        <input className={style.input} type='text' value={searchQuery} onChange={onChange} />
        <button className={style.button} onClick={onSearch}>
          Search
        </button>
        <button className={style.button} onClick={onErrorTest}>
          Test error
        </button>
      </form>
    );
  }
}

export default SearchForm;
