export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
  created: string;
  edited: string;
  url: string;
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

async function getData(): Promise<Persons> {
  const allData: Persons = {
    results: [],
    loading: true,
  };

  try {
    return getAllData('https://swapi.dev/api/people/', allData);
  } catch (error) {
    console.error(error);
    return { results: [], loading: true };
  }
}

export default getData;
