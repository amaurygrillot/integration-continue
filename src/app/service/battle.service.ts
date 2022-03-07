import { Injectable } from '@angular/core';
import Pokemon from '../model/pokemon';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  interval: any;
  damages: number;
  i: number;
  isPaused: boolean;

  constructor(private loggerService: LoggerService, private router: Router) {
    this.i = 0;
    this.isPaused = false;
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  orderPokemonToAttack(pokemon1: Pokemon, pokemon2: Pokemon): Pokemon[] {
    if (pokemon1.speed > pokemon2.speed) {
      return [pokemon1, pokemon2];
    }
    else if (pokemon1.speed < pokemon2.speed) {
      return [pokemon2, pokemon1];
    }
    // Si jamais ils ont la même vitesse : random entre les deux
    else {
      const random = this.getRandomInt(2);
      return random === 0 ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
    }
  }

  simulateFight(pokemon1: Pokemon, pokemon2: Pokemon): Observable<Pokemon> {
    return new Observable(observer => {
      this.interval = setInterval( () => {
        if(this.isPaused)
        {
          clearInterval(this.interval);
          return;
        }
        this.i += 1;
        this.loggerService.addNormalLog('Tour n°' + this.i);
        const order = this.orderPokemonToAttack(pokemon1, pokemon2);
        this.loggerService.addNormalLog(`${order[0].name} commence`);

        this.loggerService.addPokemon1Log(order[0].attackTarget(order[0].attacks[Math.floor(Math.random() * order[0].attacks.length)], order[1]));

        this.damages = order[1].takeDamages(order[0].attacks[Math.floor(Math.random() * order[0].attacks.length)], order[0]);
        this.loggerService.addDamageLog(order[1].name, this.damages);

        if (order[1].currentHealth <= 0) {
          order[1].currentHealth = 0;
          this.loggerService.addDeadLog(`${order[1].name} est KO !`);
          order[1].imageBack = 'assets/img/cross.png';
          order[1].imageFront = 'assets/img/cross.png';
          this.loggerService.addNormalLog(`${order[0].name} gagne !`);
          observer.complete();
          clearInterval(this.interval);
          return;
        }

        this.loggerService.addPokemon2Log(order[1].attackTarget(order[1].attacks[Math.floor(Math.random() * order[1].attacks.length)], order[0]));

        this.damages = order[0].takeDamages(order[1].attacks[Math.floor(Math.random() * order[1].attacks.length)], order[1]);
        this.loggerService.addDamageLog(order[0].name, this.damages);

        if (order[0].currentHealth <= 0) {
          order[0].currentHealth = 0;
          this.loggerService.addDeadLog(`${order[0].name} est KO !`);
          order[0].imageFront = 'assets/img/cross.png';
          order[0].imageBack = 'assets/img/cross.png';
          this.loggerService.addNormalLog(`${order[1].name} gagne !`);
          observer.complete();
          clearInterval(this.interval);
          return;
        }
      }, 1000);
      return () => {
        observer.complete();
        clearInterval(this.interval);
    };});
  }

  goBack() {
    this.router.navigate(['../']);
  }
}
