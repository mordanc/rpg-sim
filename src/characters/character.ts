import { Attitudes, OpinionChange, Opinions, Response } from '../types';
import { responses } from '../data';
import { Item } from '../item';
import { CharacterStatus } from '../production/types';

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const convertOpinionValue = (opinionValue: number): Opinions => {
  if (opinionValue >= 30) {
    return 'happy';
  }

  if (opinionValue < 30 && opinionValue > -30) {
    return 'neutral';
  }

  return 'angry';
};

const clothes = new Item(10, 5);

export class Character {
  private _opinionsOfCharacters: { [key: string]: number } = {};
  defenseValue = 2;
  // represents the maximum damage a character's weapon can do
  attackValue = 7;
  // the range of damage a weapon can do, i.e. a weapon with 7 attack value and 2 range will do 7 +- 2 damage
  damageRange = 2;
  private _health = 50;
  private armor = clothes;
  private _inventory: Item[] = [];
  private _status: CharacterStatus = 'conscious';

  constructor(
    private _name: string,
    private _mood: Attitudes,
    // represents how much of their weapon's max damage the character can access, on a scale from 1-10
    private _fightingSkill: number = 5
  ) {}

  get name() {
    return this._name;
  }

  set mood(mood: Attitudes) {
    this._mood = mood;
  }

  get mood(): Attitudes {
    return this._mood;
  }

  get health() {
    return this._health;
  }

  get status() {
    return this._status;
  }

  private decreaseHealth(hp: number) {
    this._health = this._health - hp;

    if (this.health < 0) {
      const saveRoll = Math.floor(Math.random() * 10);
      if (saveRoll <= 3) {
        this._status = 'unconscious';
      } else {
        this._status = 'dead';
      }
    }
  }

  equipArmor(item: Item) {
    this.armor = item;
  }

  removeArmor() {
    this._inventory.push(this.armor);

    this.armor = clothes;
  }

  resetOpinionOfCharacter(characterName: string) {
    this._opinionsOfCharacters[characterName] = 0;
  }

  meetCharacter(characterName: string) {
    const opinionValue = this._opinionsOfCharacters[characterName];

    if (!opinionValue) {
      this.resetOpinionOfCharacter(characterName);
    }
  }

  getOpinionOfCharacter(characterName: string): Opinions {
    this.meetCharacter(characterName);

    const opinionValue = this._opinionsOfCharacters[characterName];
    return convertOpinionValue(opinionValue);
  }

  lowerOpinionOfCharacter(characterName: string, amount: OpinionChange) {
    this._opinionsOfCharacters[characterName] -= amount;
  }

  raiseOpinionOfCharacter(characterName: string, amount: OpinionChange) {
    this._opinionsOfCharacters[characterName] += amount;
  }

  greetCharacter(characterName: string) {
    const opinionOfCharacter = this.getOpinionOfCharacter(characterName);

    return responses[opinionOfCharacter]['greeting'];
  }

  getHit(damage: number) {
    const weightedDamage =
      damage - this.defenseValue > 0 ? damage - this.defenseValue : 0;

    this.decreaseHealth(weightedDamage);

    return weightedDamage;
  }

  calculateDamage() {
    const dmg = randomIntFromInterval(
      this.attackValue - this.damageRange,
      this.attackValue + this.damageRange
    );

    return Math.floor(dmg * (this._fightingSkill / 10));
  }
}
