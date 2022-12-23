import React from "react";
import ListRow from "./ListRow";
import Link from "next/link"
import {GiTrashCan} from "react-icons/gi"

const List = ({team, onDelete}) => {
    
  return (
      <div className="bg-sky-100 shadow-xl rounded-lg mb-4 p-4 sm:p-6 h-[625px] md:w-[400px]">
          <div className="flex items-center justify-between font-syne mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">Team: {team.name}</h3>
            <Link href={"/edit"}>Edit Team</Link>
            <span onClick={onDelete} className="hover:text-red-600"><GiTrashCan size={25}/></span>
          </div>
          <div className="flex flex-col items-start text-base capitalize font-sourceSans w-[350px] font-semibold text-gray-900">
            <p>tipo: {team.type}</p>
            <p>{team.description}</p>
            <p>region: {team.region}</p>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-black/40">
              {team.pokemons.map((pokemon) => (
                <ListRow key={pokemon.name} pokemon={pokemon}/>
              ))}
             </ul>
          </div>
      </div>
  );
};

export default List;
