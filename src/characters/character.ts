import { Attitudes, OpinionChange, Opinions, Response } from '../types';
import { responses } from '../data';
import { Item } from '../item';

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
  defenseValue = 10;
  attackValue = 5;
  private _health = 50;
  private armor = clothes;
  private _inventory: Item[] = [];

  constructor(private _name: string, private _mood: Attitudes) {}

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

  decreaseHealth(hp: number) {
    this._health = this._health - hp;
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
}
