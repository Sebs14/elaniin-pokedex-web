 const fetchRegion = async () => {
    try {
         const response = await fetch(`https://pokeapi.co/api/v2/region/`).then(
      (data) => {
        return data.json();
      }
    );
    return response
    } catch (error) {
        
    }
}
export default fetchRegion