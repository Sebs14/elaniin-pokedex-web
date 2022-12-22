import React, { useEffect, useState, useContext } from "react";
import UserNavbar from "../components/userNavbar/UserNavbar";
import Regions from "../components/regions/Regions";
import { useRouter } from "next/router";
import { UserAuth } from "../context/UserContext";
import fetchPokemon from "../services/fetchPokemon";
import PokemonCard from "../components/card/PokemonCard";
import PrevButton from "../components/prevButton/prevButton";
import NextButton from "../components/nextButton/nextButton";
import fetchRegion from "../services/fetchRegion";


const menu = () => {
  const router = useRouter();
  const [pokemonCount, setPokemonCount] = useState(0);
  const [fetched, setFetched] = useState([]);
  const { user, logOut } = UserAuth();
  const [region, setRegion] = useState("https://pokeapi.co/api/v2/region/1/");
  const [offset, setOffset] = useState(0);
  const [ids, setIds] = useState([]);

  //pages navigation on each region
  const nextClick = async () => {
    setOffset((prev) => prev + 10);
  };

  const prevClick = async () => {
    setOffset((prev) => prev - 10);
  };

  //gets pokemons from Region we selected
  const fetchPokemons = async () => {
    const {pokemon, total} = await fetchPokemon(region, offset);
    setFetched(pokemon);
    setPokemonCount(total);
    console.log("fetch pokemons", pokemon);
  };

  //get the region we are at the moment
  const handleRegion = async (e) => {
    setOffset(0)
    const regionURL = e.target.value;
    setRegion(regionURL);
    console.log(regionURL);
  };

  //signOut user from firebase
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegions = async () => {
    const response = await fetchRegion();
    setIds(response.results);
    console.log("response", response);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchPokemons();
    console.log("jeje", fetched);
  }, [offset, region]);

  if (!user){
    router.replace("/");
  }  

  return (
    <div>
      <UserNavbar
        colorPage="black"
        colorText="white"
        first_ref="/menu/#regions"
        second_ref="/teams"
        third_ref="/#login"
        first="Regions"
        second="teams"
        image={user?.photoURL}
        alt={user?.displayName}
        clickFour={handleSignOut}
      />
      <Regions />

      <div className="flex justify-center space-x-10 text-black mt-10">
        {ids.length > 0
          ? ids.map((ids) => {
              return (
                <button
                  key={ids.name}
                  value={ids.url}
                  onClick={handleRegion}
                  className=" hover:bg-red-600  hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white shadow-xl text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                >
                  {ids.name}
                </button>
              );
            })
          : "no veo resultados"}
      </div>

      <div id="pokemons" className="grid lg:grid-cols-5 grid-cols-3">
        {fetched.length > 0
          ? fetched.map((fetched) => (
              <PokemonCard
                key={fetched.id}
                pokeImg={fetched.sprites.front_default}
                id={fetched.id}
                name={fetched.name}
                types={fetched.types}
                habilidades={fetched.abilities}
              />
            ))
          : "no hay pokemones"}
      </div>
      <div className="flex justify-between">
        {offset > 0 ? <PrevButton click={prevClick} /> : <PrevButton />}
        {offset < pokemonCount - 10 ? <NextButton click={nextClick} /> : <NextButton/>}
      </div>
    </div>
  );
};

export default menu;
