import { Character } from './character';
import { Item } from './item';
import { Attitudes, OpinionChange } from './types';

type HaggleResult = 'successful' | 'unsuccessful';
// responses should depend on relation to character and personality of merchant
const haggleResponses: { [key in HaggleResult]: string[] } = {
  successful: [
    'Alright but only this once',
    'Fine, I can lower the price a bit',
    'I suppose I can lower the price this time',
    'Fine but just this once',
  ],
  unsuccessful: [
    'Are you kidding me? Not a chance',
    `No way I'm letting this go at that price`,
    'Are you trying to put me out of business?',
  ],
};
export class Merchant extends Character {
  private _publicWares: Item[] = [];
  private _privateWares: Item[] = [];

  constructor(name: string, mood: Attitudes) {
    super(name, mood);
  }

  greet() {
    console.log(this.name);
  }

  updatePublicWares(wares: any[]) {
    this._publicWares = wares;
  }

  updatePrivateWares(wares: any[]) {
    this._privateWares = wares;
  }

  get publicWares() {
    return this._publicWares;
  }

  get privateWares() {
    return this._privateWares;
  }

  getHaggled(characterName: string) {
    const opinion = this.getOpinionOfCharacter(characterName);

    this.lowerOpinionOfCharacter(characterName, OpinionChange.LIGHT);

    let successChance = 0;

    if (opinion === 'happy') successChance = 80;
    if (opinion === 'neutral') successChance = 50;
    if (opinion === 'angry') successChance = 20;

    const roll = Math.floor(Math.random() * 100);
    const outcome: HaggleResult =
      roll <= successChance ? 'successful' : 'unsuccessful';

    const possibleResponses = haggleResponses[outcome];
    const num = Math.floor(Math.random() * possibleResponses.length);

    return possibleResponses[num];
  }
}
