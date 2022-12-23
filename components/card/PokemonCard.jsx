import React from "react";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"
import TypeBadge from "../badge/TypeBadge";
const PokemonCard = ({ name, habilidades, types, pokeImg, click, classes}) => {
  
  if(!pokeImg){
    console.log("poke img", name, pokeImg)
  }

  return (
    <div>
      <div className="mt-10 mb-10 flex justify-center items-center">
        <div className=" p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
          {pokeImg ? <img
            className="w-64 object-cover rounded-t-md"
            src={pokeImg}
            alt={name} 
          /> : <img
          className="w-64 object-cover rounded-t-md"
          src={"../../assets/whos_that.png"}
          alt={name} 
        />}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-700 capitalize">{name}</h1>
            <div className="flex gap-2">
             {types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name} >{type.type.name}</TypeBadge>
              ))
            }
            </div>
             <div className="flex gap-2">
             {habilidades.map((habilidad) => (
              <span key={habilidad.ability.name} className="text-sm mt-2 text-gray-700">{habilidad.ability.name}</span>
              ))
            }
            </div>
            <div className="mt-3 space-x-4 flex p-1">
              <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                <span onClick={click} className={classes}><AiOutlinePlus/></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
