import React from "react";
import TypeBadge from "../badge/TypeBadge";

const ListRow = ({ pokemon }) => {
  console.log("list row", pokemon);
  return (
    <div>
      <li>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full"
              src={pokemon.sprites.front_default}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {pokemon.name}
            </p>
            <div className="flex gap-3">
              {pokemon.types.map((type) => (
                <TypeBadge type={type.type.name} key={type} />
              ))}
            </div>
          </div>
          <div>
            <p>
              {pokemon.stats[0].stat.name}: {pokemon.stats[0].base_stat}{" "}
              <br></br> {pokemon.stats[1].stat.name}:{" "}
              {pokemon.stats[1].base_stat}
            </p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ListRow;
