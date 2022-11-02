import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import PokemonInfo from "../global/PokemonInfo";
import axios from "axios";
import { Pokemon } from "../models/pokemon.model";

const Main = () => {
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextUrl, setNextUrl] = useState<string | null>();
  const [prevUrl, setPrevUrl] = useState<string | null>();
  const [pokeDex, setPokeDex] = useState<Pokemon>({
    id: "",
    name: "",
    abilities: [],
    sprites: { front_default: "" },
    stats: [],
    types: [],
    weight: "",
    moves: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      let cancel: any;
      await axios
        .get(url, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          setLoading(false);
          setNextUrl(res.data.next);
          setPrevUrl(res.data.previous);
          getPokemon(res.data.results);
        });
      return () => cancel();
    };

    const getPokemon = async (res: { url: string }[]) => {
      res.map(async (item) => {
        let cancel: any;
        await axios
          .get(item.url, {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          })
          .then((result) => {
            setPokeData((state) => {
              state = [...state, result.data];
              state.sort((x, y) => (x.id > y.id ? 1 : -1));
              return state;
            });
          });
        return () => cancel();
      });
    };
    fetchAll();
  }, [url]);

  return (
    <div className="py-3 ">
      <span className="text-xl font-bold">Welcome to Pokemon World!</span>
      <div className="flex w-full p-8">
        <div className="block">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(data: Pokemon) =>
              setPokeDex({
                id: data.id,
                name: data.name,
                abilities: data.abilities,
                stats: data.stats,
                sprites: { front_default: data.sprites.front_default },
                types: data.types,
                weight: data.weight,
                moves: data.moves,
              })
            }
          />
          <div className="flex gap-2 mt-3">
            {prevUrl && (
              <button
                className="w-[150px] p-1 font-medium text-lg text-white bg-[#b74545] rounded-sm"
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                className="w-[150px] p-1 font-medium text-lg text-white bg-[#b74545] rounded-sm"
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="block fixed w-[30%] top-[100px] right-8 text-center">
          <PokemonInfo data={pokeDex} />
        </div>
      </div>
    </div>
  );
};
export default Main;
