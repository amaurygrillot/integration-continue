import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import Pokemon from '../model/pokemon';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let view: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    view = fixture.nativeElement;
    component = fixture.componentInstance;
    component.pokemon = new Pokemon('Pikachu', 50, 142, 117, 90, 156, '../../assets/img/25.png', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pokemon element', () => {
    expect(view.textContent).toContain('Pikachu');
  });
});
