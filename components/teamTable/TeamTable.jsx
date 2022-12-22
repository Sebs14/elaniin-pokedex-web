import React, { useState, useEffect } from "react";
import List from "../list/List";
import Link from "next/link"
import { db } from "../../config/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import Lottie from "lottie-react";
import Squirtle from "../../assets/squirtle.json"

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
          : 
          <div className="flex flex-col h-[75vh] justify-center items-center">
            <Link href={"/menu"}>
              <Lottie animationData={Squirtle} className="mr-5 h-96"/>
            </Link>
            <h1 className="text-center font-bold text-3xl font-sourceSans">It seems that there is no team yet</h1>
            <p className=" font-bold font-sourceSans text-xl" >go create one now, just click me!</p>
          </div>
        }
      </div>
    </div>
  );
};

export default TeamTable;
