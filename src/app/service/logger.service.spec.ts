import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import LogType from '../model/logtype';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a normal message', () => {
    service.addNormalLog('hello world !');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0].type).toBe(LogType.Normal);
    expect(service.logs[0].message).toBe('hello world !');
  });

  it('should add a pokemon1 message', () => {
    service.addPokemon1Log('hello world !');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0].type).toBe(LogType.Pokemon1);
    expect(service.logs[0].message).toBe('hello world !');
  });

  it('should add a pokemon2 message', () => {
    service.addPokemon2Log('hello world !');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0].type).toBe(LogType.Pokemon2);
    expect(service.logs[0].message).toBe('hello world !');
  });

  it('should add a dead message', () => {
    service.addDeadLog('hello world !');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0].type).toBe(LogType.Dead);
    expect(service.logs[0].message).toBe('hello world !');
  });

  it('should add a begin message', () => {
    service.addBeginLog('hello world !');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0].type).toBe(LogType.Begin);
    expect(service.logs[0].message).toBe('hello world !');
  });

  it('should add a damage message', () => {
    service.addDamageLog("pikachu", 30);
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0].type).toBe(LogType.Damage);
    expect(service.logs[0].message).toBe('');
    expect(service.logs[0].damage).toBe(30);
    expect(service.logs[0].defender).toBe("pikachu");
  });

  it('should clear the logs array', () => {
    service.addNormalLog('hello world');
    service.clear();
    expect(service.logs).toHaveLength(0);
  });
});
