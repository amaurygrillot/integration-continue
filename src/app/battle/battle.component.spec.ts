import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BattleComponent } from './battle.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from '../app.component';
import Pokemon from '../model/pokemon';
import Attack from '../model/attack';
import { BattleService } from '../service/battle.service';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { LoggerService } from '../service/logger.service';
import { Subscription } from 'rxjs';
import { PokemonService } from '../service/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let view: any;
  let battleService: BattleService;
  let pokemonService: PokemonService;
  let http: HttpClientTestingModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BattleComponent,
        PokemonComponent,
        AppComponent
      ],
      providers: [
        BattleService,
        LoggerService,
        PokemonService
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    view = fixture.nativeElement;
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpClientTestingModule);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pause be disabled', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(view.querySelector('#pause').disabled).toBe(true);
  });

  it('should pause be enabled', () => {
    component = fixture.componentInstance;
    view.querySelector('#fight').click();
    fixture.detectChanges();
    expect(view.querySelector('#pause').disabled).toBe(false);
  });

  // it('should pikachu be the winner enabled', () => {
  //   component = fixture.componentInstance;
  //   const frankSinatra: Attack = new Attack('FrankSinatra', 50, 100, 'Pulverisation', 'Physic');
  //   const linkToThePast: Attack = new Attack('LinkToThePast', 50, 100, 'Pulverisation', 'Physic');
  //   const attacks: Array<Attack> = [frankSinatra, linkToThePast];
  //   component.pokemon1 = new Pokemon('Pikachu', 50, 142, 117, 90, 156, '../../assets/img/25.png', attacks);
  //   component.pokemon2 = new Pokemon('Aligatorus', 50, 1, 117, 90, 156, '../../assets/img/129.png', attacks);
  //   let subscriber: Subscription;
  //   subscriber = component.battleService.simulateFight(this.pokemon1, this.pokemon2).subscribe();
  //   // component.battleService.simulateFight(component.pokemon1, component.pokemon2);
  //   fixture.detectChanges();
  //   expect(component.pokemon2.currentHealth).toBe(0);
  // });

  /*
  it('should print nouveau tour', () => {
    view.querySelector('#fight').click();
    fixture.detectChanges();
    expect(view.textContent).toContain('tour');
  });
  */
});
