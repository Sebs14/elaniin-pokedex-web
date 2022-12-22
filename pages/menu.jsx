import React, { useEffect, useState, useContext } from "react";
import UserNavbar from "../components/userNavbar/UserNavbar";
import Regions from "../components/regions/Regions";
import { useRouter } from "next/router";
import { UserAuth } from "../context/UserContext";
import fetchPokemon from "../services/fetchPokemon";
import PokemonCard from "../components/card/PokemonCard";
import NextButton from "../components/nextButton/nextButton";
import fetchRegion from "../services/fetchRegion";
import SaveButton from './../components/saveButton/SaveButton';


const menu = () => {
  const router = useRouter();
  const [pokemonCount, setPokemonCount] = useState(0);
  const [fetched, setFetched] = useState([]);
  const { user, logOut } = UserAuth();
  const [region, setRegion] = useState("https://pokeapi.co/api/v2/region/1/");
  const [offset, setOffset] = useState(0);
  const [ids, setIds] = useState([]);
  const [team, setTeam] = useState({
    name:"",
    description:"",
    pokemones: {},
    region:"",
    type:""
  })

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
      <form>
        <div className="flex flex-row items-center justify-center gap-10 my-5  ">
         <div>
           <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-start text-[#07074D]"
          >
            Team name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Team name"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
         </div>
         <div>
           <label
           htmlFor="type"
            className="mb-3 block text-base font-medium text-start text-[#07074D]"
          >
            Type:
          </label>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Attack"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
         </div>
         <div>
           <label
           htmlFor="description"
            className="mb-3 block text-base font-medium text-start text-[#07074D]"
          >
            Description:
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          </div>
          </div>  
          <div className="flex justify-center font-bold font-sourceSans text-xl">
            <SaveButton text="Save Team" />
          </div>
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
        
      </form>
      <div className="flex justify-between">
        {offset > 0 ? <NextButton text="next" click={prevClick} /> : <NextButton text="previous" />}
        {offset < pokemonCount - 10 ? <NextButton text="next" click={nextClick} /> : <NextButton text="next"/>}
      </div>
    </div>
  );
};

export default menu;
