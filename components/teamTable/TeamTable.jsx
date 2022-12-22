import React, { useState, useEffect } from "react";
import List from "../list/List";
import { db } from "../../config/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const TeamTable = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //read teams from firebase

  // useEffect(() => {
  //   const q = query(collection(db, "teams"));
  //   setIsLoading(true);
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const pokemonArr = [];
  //     querySnapshot.forEach((doc) => {
  //       pokemonArr.push({ ...doc.data(), id: doc.id });
  //     });
  //     setPokemons(pokemonArr);
  //     setIsLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  console.log("hola", pokemons);

  return (
    <div className="mt-[10vh] h-screen">
      <div className="grid mx-20 my-4">
        {isLoading
          ? "loading ..."
          : pokemons.length > 0
          ? pokemons.map((pokemon) => (
              <List key={pokemon.name} team={pokemon} />
            ))
          : "no hay teams maldito puto"}
      </div>
    </div>
  );
};

export default TeamTable;
