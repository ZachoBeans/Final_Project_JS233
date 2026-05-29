//My API for fetching Pokemon images. They are used for the images under each matching tile

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export async function fetchImage() {
    try {
        const response = await fetch(POKE_API_URL);

        if (!response.ok) {
            throw new Error(`Pokemon API returned ${response.status}`);
        }

        const data = await response.json();

        return data.results.map((pokemon, index) => ({
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));

    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        return null;
    }
}