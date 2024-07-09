import { ChangeEvent } from 'react';

export interface SearchFormProps {
  onSearch: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onErrorTest: () => void;
  searchQuery: string;
}
