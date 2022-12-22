import React from "react";

const ListRow = ({pokemon}) => {
  return (
    <div>
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full"
              src={pokemon.sprite}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {pokemon.name}
            </p>
            <div className="flex gap-3">
              {pokemon.types.map((type) => (
                <span key={type} className="text-sm text-gray-500 truncate ">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ListRow;
