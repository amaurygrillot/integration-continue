import {Component, OnInit, Input, ViewChild} from '@angular/core';
import Pokemon from '../model/pokemon';
import {ProgressBarComponent} from 'angular-progress-bar';
const template = '' +
  '' +
  ''
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Input() back: boolean;
  color = '100';
  constructor() {

  }

  ngOnInit(): void {
  }

}
