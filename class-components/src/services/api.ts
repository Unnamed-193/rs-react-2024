interface Person {
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

interface Results {
  results: Person[];
}

async function getData() {
  try {
    const response = await fetch('https://swapi.dev/api/people/', {
      method: 'GET',
    });

    const data = await response.json();

    const person: Results = data.results;

    return person;
  } catch (error) {
    console.error(error);
  }
}

export default getData;
