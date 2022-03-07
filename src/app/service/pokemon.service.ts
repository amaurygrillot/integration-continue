import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import Pokemon from '../model/pokemon';
import {Move, PokemonApi, PokemonUrl, Result} from '../model/pokemonApi';
import Attack from '../model/attack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private static API_URL: string = 'https://pokeapi.co/api/v2/';

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(): Observable<PokemonUrl[]> {
    return this.http.get<Result>(`${PokemonService.API_URL}pokemon?limit=151`)
      .pipe(map(result => {
        return result.results;
      }));
  }

  getPokemonByUrl(pokemonUrl: PokemonUrl): Pokemon {
    const pokemon = new Pokemon(pokemonUrl.name);
    this.http.get<PokemonApi>(pokemonUrl.url)
      .pipe(map((rawPokemon: PokemonApi) => this.mapPokemon(rawPokemon, pokemon))).subscribe();

    return pokemon;
  }

  getPokemonByName(name: string): Pokemon {
    const pokemon = new Pokemon(`${name}`);
    const request = `${PokemonService.API_URL}pokemon/${name}/`;
    this.http.get<PokemonApi>(request)
      .pipe(map((rawPokemon: PokemonApi) => this.mapPokemon(rawPokemon, pokemon))).subscribe();

    return pokemon;
  }

  private mapPokemon(rawPokemon: PokemonApi, pokemon: Pokemon) {
    pokemon.level = 50;
    pokemon.setSpeed(rawPokemon.stats.filter(stat => stat.stat.name === "speed")[0].base_stat);
    pokemon.setAttack(rawPokemon.stats.filter(stat => stat.stat.name === "attack")[0].base_stat);
    pokemon.setDefense(rawPokemon.stats.filter(stat => stat.stat.name === "defense")[0].base_stat);
    pokemon.setHealth(rawPokemon.stats.filter(stat => stat.stat.name === "hp")[0].base_stat);
    pokemon.imageBack = rawPokemon.sprites.versions?.['generation-v']?.['black-white'].animated.back_default;
    pokemon.imageFront = rawPokemon.sprites.versions?.['generation-v']?.['black-white'].animated.front_default;
    for (let i = 0; i < 4; i++) {
      console.log('index : ' + Math.floor(Math.random() * rawPokemon.moves.length));
      const move = rawPokemon.moves[Math.floor(Math.random() * rawPokemon.moves.length)].move;
      console.log("move : " + move.name + " url " + move.url);
      this.http.get<Move>(move.url)
        .pipe(map((move1: Move) => this.mapAttack(move1, pokemon))).subscribe();

    }
  }

  private mapAttack(move: Move, pokemon: Pokemon)
  {
      // @ts-ignore
      const name = move.names[3].name;
      const type = move.type.name;
      const power = move.power;
      const nature = move.meta.category.name;
      const accuracy = move.accuracy;
      pokemon.attacks.push(new Attack(name, power, accuracy, type, nature));
      console.log(JSON.stringify(pokemon.attacks));
  }
}
