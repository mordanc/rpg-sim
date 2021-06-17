import { Attitudes, OpinionChange, Opinions, Response } from './types';
import { responses } from './data';

const convertOpinionValue = (opinionValue: number): Opinions => {
  if (opinionValue >= 30) {
    return 'happy';
  }

  if (opinionValue < 30 && opinionValue > -30) {
    return 'neutral';
  }

  return 'angry';
};

export class Character {
  private _name = '';
  private _opinionValues: { [key: string]: number } = {};
  private _mood: Attitudes = 'happy';

  constructor(name: string, mood: Attitudes) {
    this._name = name;
    this._mood = mood;
  }

  get name() {
    return this._name;
  }

  set mood(mood: Attitudes) {
    this._mood = mood;
  }

  get mood(): Attitudes {
    return this._mood;
  }

  resetOpinionOfCharacter(characterName: string) {
    this._opinionValues[characterName] = 0;
  }

  meetCharacter(characterName: string) {
    const opinionValue = this._opinionValues[characterName];

    if (!opinionValue) {
      this.resetOpinionOfCharacter(characterName);
    }
  }

  getOpinionOfCharacter(characterName: string): Opinions {
    this.meetCharacter(characterName);

    const opinionValue = this._opinionValues[characterName];
    return convertOpinionValue(opinionValue);
  }

  lowerOpinionOfCharacter(characterName: string, amount: OpinionChange) {
    this._opinionValues[characterName] -= amount;
  }

  raiseOpinionOfCharacter(characterName: string, amount: OpinionChange) {
    this._opinionValues[characterName] += amount;
  }

  greetCharacter(characterName: string) {
    const opinionOfCharacter = this.getOpinionOfCharacter(characterName);

    return responses[opinionOfCharacter]['greeting'];
  }
}
