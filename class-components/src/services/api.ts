import { API_PERSON, API_URL } from './apiUrl';

export interface Person {
  name: string;
  birth_year: string;
  gender: string;
}

export interface Persons {
  results: Person[];
  loading: boolean;
}

async function getAllData(url: string, allData: Persons): Promise<Persons> {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();

    allData.results = allData.results.concat(data.results);

    if (data.next) {
      return getAllData(data.next, allData);
    } else {
      return allData;
    }
  } catch (error) {
    console.error(error);
    return { results: [], loading: true };
  }
}

export async function getData(): Promise<Persons> {
  const allData: Persons = {
    results: [],
    loading: true,
  };

  try {
    return getAllData(API_URL, allData);
  } catch (error) {
    console.error(error);
    return { results: [], loading: true };
  }
}

export async function searchPerson(querySearch: string) {
  try {
    const response = await fetch(`${API_PERSON}${querySearch}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return { results: [], loading: true };
  }
}
