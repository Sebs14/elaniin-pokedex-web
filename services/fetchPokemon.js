const fetchPokemon = async ( urlFirst, offset) => {
  const limit = 10
  try {
    const response = await fetch(urlFirst).then(
      (data) => {
        return data.json();
      }
    );
    const {
      pokedexes: [a, b],
    } = response;
    const { url } = a;
    
    
    const responsePokedexes = await fetch(url).then((data) => data.json());

    const { pokemon_entries: pokemonEntries } = responsePokedexes;
    const pokemonName = pokemonEntries
      .slice(offset, limit + offset)
      .map(({ pokemon_species: { name } }) => name);

    const pokemon = await Promise.all(
      pokemonName.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((data) =>
          data.json()
        )
      )
    );

      

    console.log(pokemonEntries.length)
    return {pokemon, total: pokemonEntries.length}
    
  } catch (error) {
    console.log(error)
  }
};

export default fetchPokemon;
