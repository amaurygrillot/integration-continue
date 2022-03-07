import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import Attack from '../model/attack';
import Pokemon from '../model/pokemon';

describe('BattleService', () => {
  let service: BattleService;
  let salameche: Pokemon;
  let pikachu: Pokemon;
  let carapuce: Pokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    let attack = [new Attack("Charge", 50, 100, "Normal", "Physic"), new Attack("Griffe", 40, 100, "Normal", "Physic")];
    salameche = new Pokemon("Salameche", 50, 146, 114, 104, 128,'', '', attack);
    pikachu = new Pokemon("Pikachu", 50, 142, 117, 90, 156, '', '', attack);
    carapuce = new Pokemon("Carapuce", 50, 151, 110, 128, 104, '','', attack);

    service = TestBed.inject(BattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('Tests firstPokemonToAttack', () => {   
      test('should pick pikachu', () => {       
          expect(service.orderPokemonToAttack(pikachu, carapuce)).toEqual([pikachu, carapuce]);
      });

      test('should pick salameche', () => {
          expect(service.orderPokemonToAttack(carapuce, salameche)).toEqual([salameche, carapuce]);
      });

      test('should pick pikachu', () => {
          expect(service.orderPokemonToAttack(pikachu, salameche)).toEqual([pikachu, salameche]);
      });
  });
});
