import React, { useState } from "react";
import { Pokemon } from "../models/pokemon.model";

type CardProps = {
  pokemon: Pokemon[];
  loading: Boolean;
  infoPokemon: (item: Pokemon) => void;
};

const Card: React.FC<CardProps> = ({ pokemon, loading, infoPokemon }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchHandler = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <label>Search: </label>
          <input
            className="border-2 border-blue-500 rounded-md"
            onChange={searchHandler}
          />
          <div className="grid grid-cols-2 gap-8 mt-3">
            {pokemon
              .filter((pokemon) =>
                searchValue === ""
                  ? pokemon
                  : pokemon.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
              .map((item) => (
                <div
                  className="flex bg-[#28a3d8] rounded-md shadow-lg px-4 items-center justify-between box-border"
                  key={item.id}
                  onClick={() => infoPokemon(item)}
                >
                  <span>{item.id}</span>
                  <img src={item.sprites.front_default} alt="" />
                  <span>{item.name}</span>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};
export default Card;
