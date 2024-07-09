import { Person } from '../../services/api';

export interface SearchListProps {
  results: Person[];
  loading: boolean;
  errorMessage: string;
  error: boolean;
  searchQuery: string;
}
