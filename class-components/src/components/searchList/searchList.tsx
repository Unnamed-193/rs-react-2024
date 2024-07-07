import { Component } from 'react';

interface SearchResult {
  title: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

class SearchList extends Component<SearchResultsProps> {
  render() {
    return (
      <div>
        {this.props.results.map((result, index) => (
          <div key={index}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchList;
