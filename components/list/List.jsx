import React from "react";
import ListRow from "./ListRow";

const List = ({team}) => {
    
  return (
    <div>
      <div className="bg-sky-100 shadow-xl rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between font-syne mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">Team: {team.name}</h3>
          </div>
          <div className="flex flex-col items-start text-base capitalize font-sourceSans font-semibold text-gray-900">
            <p>tipo: {team.type}</p>
            <p>{team.description}</p>
            <p>region: {team.region}</p>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-black">
              {team.pokemons.map((pokemon) => (
                <ListRow pokemon={pokemon}/>
              ))}
             </ul>
          </div>
        </div>
    </div>
  );
};

export default List;
