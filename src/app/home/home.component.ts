import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import Pokemon from '../model/pokemon';
import { map } from 'rxjs/operators';
import { PokemonUrl } from '../model/pokemonApi';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemonList: Pokemon[] = new Array<Pokemon>();
  pokemon1: string;
  pokemon2: string;

  title = 'Pokemon Arena';

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList()
      .pipe(
        map((list: PokemonUrl[]) => {
          for(const element of list) {
            this.pokemonList.push(this.pokemonService.getPokemonByUrl(element));
          }
        })
      ).subscribe();
  }

  selectPokemon1(event) {
    this.pokemon1 = event.target.value;
  }

  selectPokemon2(event) {
    this.pokemon2 = event.target.value;
  }

  fight(event) {
    this.router.navigate([`./battle/${this.pokemon1}/${this.pokemon2}`]);
  }

}
