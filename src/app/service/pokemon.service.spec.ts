import {TestBed, async, tick, fakeAsync, flush} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import Pokemon from '../model/pokemon';
import { PokemonApi, PokemonUrl } from '../model/pokemonApi';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pikachu', fakeAsync(() => {
    const http = TestBed.get(HttpTestingController);
    const mockedPokemon = { name: 'Pikachu'};
    let pikachu: Pokemon;
    pikachu = service.getPokemonByName('pikachu');
    expect(pikachu.name).toBe('pol');
    http.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu/');
    flush();
  }));

  it('should return magicarpe', fakeAsync(() => {
    const http = TestBed.get(HttpTestingController);
    const mockedPokemon = { name: 'Magikarp'};
    let magicarpe: Pokemon;
    magicarpe = service.getPokemonByName('magikarp');
    expect(magicarpe.name).toBe("magikarp");
    tick();
    http.expectOne('https://pokeapi.co/api/v2/pokemon/magikarp/');
    flush();
  }));

});
