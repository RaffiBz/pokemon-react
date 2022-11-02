import React from "react";
import { Pokemon } from "../models/pokemon.model";

type PokemonInfoProps = {
  data: Pokemon;
};

const PokemonInfo: React.FC<PokemonInfoProps> = ({ data }) => {
  return (
    <>
      {data.id && (
        <div className="font-medium text-center">
          <span className="text-xl font-bold">{data.name}</span>
          <img
            className="mx-auto mt-2 max-h-32"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div className="flex m-auto gap-2 justify-center items-center my-3">
            {data.abilities.map((poke) => (
              <div className="bg-[#b74545] text-white p-2 text-xs rounded-lg">
                <span>{poke.ability.name}</span>
              </div>
            ))}
          </div>
          <span>Weight: {data.weight}</span>
          <div className="flex items-center justify-center gap-2">
            <span>Types:</span>
            {data.types.map((type) => (
              <span>{type.type.name}</span>
            ))}
          </div>
          <div className="block">
            {data.stats.map((poke) => (
              <span className="block">
                {poke.stat.name}:{poke.base_stat}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonInfo;
