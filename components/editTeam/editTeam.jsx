import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserAuth } from "../../context/UserContext";
import fetchPokemon from "../../services/fetchPokemon";
import PokemonCard from "../card/PokemonCard";
import NextButton from "../nextButton/nextButton";
import fetchRegion from "../../services/fetchRegion";
import SaveButton from "../saveButton/SaveButton";
import { push, ref, set } from "firebase/database";
import { db } from "../../config/firebase";
import List from "./list/List";

const menu = ({ teamEdit, onEdit }) => {
  const dbRef = ref(db, "teams")
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [pokemonCount, setPokemonCount] = useState(0);
  const [fetched, setFetched] = useState([]);
  const [region, setRegion] = useState("https://pokeapi.co/api/v2/region/1/");
  const [offset, setOffset] = useState(0);
  const [ids, setIds] = useState([]);
  const [team, setTeam] = useState({
    name: "",
    description: "",
    pokemons: [],
    region: "kanto",
    type: "",
    owner: undefined,
  });

  const handleDeletePokemon = (index) => {
    console.log(index);
    const result = teamEdit.pokemons;
    result.splice(index, 1);
    onEdit((prev) => ({
      ...prev,
      pokemons: result,
    }));
    console.log(result);
  };


  console.log(teamEdit)
  const handleSubmit = async () => {
    console.log({ user });

    const refTeamById = ref(db, `teams/${teamEdit.id}` ) 

    set(refTeamById, teamEdit)
  };

  const handleAddPokemon = (fetched) => {
    onEdit((prev) => ({
      ...prev,
      pokemons: [...prev.pokemons, fetched],
    }));
  };

  //pages navigation on each region
  const nextClick = async () => {
    setOffset((prev) => prev + 10);
  };

  const prevClick = async () => {
    setOffset((prev) => prev - 10);
  };

  //gets pokemons from Region we selected
  const fetchPokemons = async () => {
    const { pokemon, total } = await fetchPokemon(region, offset);
    setFetched(pokemon);
    setPokemonCount(total);
  };

  //get the region we are at the moment
  const handleRegion = async (id) => {
    setOffset(0);
    const regionURL = id.url;
    setRegion(regionURL);
    setTeam((prev) => ({
      ...prev,
      region: id.name,
    }));
  };

  const fetchRegions = async () => {
    const response = await fetchRegion();
    setIds(response.results);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [offset, region]);

  return (
    <div id="edit">
      <form className="h-screen">
        <div className="flex  justify-center items-center space-x-10">
          <div className="flex flex-col  items-center justify-center gap-10 my-5 ">
            <div>
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-start text-[#07074D]"
              >
                Team name:
              </label>
              <input
                onChange={(e) =>
                  setTeam((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                type="text"
                name="name"
                id="name"
                value={teamEdit.name}
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
                onChange={(e) =>
                  setTeam((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                type="text"
                name="type"
                id="type"
                value={teamEdit.type}
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
                onChange={(e) =>
                  setTeam((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                type="text"
                name="description"
                id="description"
                value={teamEdit.description}
                placeholder="Description"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <List team={teamEdit} onDelete={handleDeletePokemon} />
          <div className="flex justify-center font-bold font-sourceSans text-xl">
            <SaveButton
              classes={`relative ${
                teamEdit.pokemons.length < 3
                  ? "opacity-20 cursor-not-allowed"
                  : "cursor-pointer"
              } inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group`}
              click={handleSubmit}
              text="Save Team"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-10 text-black mt-10">
          {ids.length > 0 ? (
            <div className="lg:flex gap-10  grid grid-cols-3">
              {ids.map((ids) => {
                return (
                  <p
                    key={ids.name}
                    value={ids.url}
                    onClick={() => handleRegion(ids)}
                    className=" hover:bg-red-600  hover:text-white hover:-translate-y-1 text-center transition-all duration-500 bg-white shadow-xl text-indigo-800 mt-4 px-4 py-2 rounded-lg font-bold mb-2"
                  >
                    {ids.name}
                  </p>
                );
              })}
            </div>
          ) : (
            "no veo resultados"
          )}
        </div>
        <div id="pokemons" className="grid lg:grid-cols-5 grid-cols-3">
          {fetched.length > 0
            ? fetched.map((fetched) => (
                <PokemonCard
                  click={() => handleAddPokemon(fetched)}
                  classes={`h-6 w-6 bg-green-400 rounded-full flex items-center justify-center ${
                    teamEdit.pokemons.length === 6
                      ? "opacity-20 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
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
        <div className="flex justify-between pb-10">
          {offset > 0 ? (
            <NextButton text="next" click={prevClick} />
          ) : (
            <NextButton text="previous" />
          )}
          {offset < pokemonCount - 10 ? (
            <NextButton text="next" click={nextClick} />
          ) : (
            <NextButton text="next" />
          )}
        </div>
      </form>
    </div>
  );
};

export default menu;
