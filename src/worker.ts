import { Character } from './character';
import { Attitudes } from './types';

export class Worker extends Character {
  constructor(name: string, mood: Attitudes, private _output: number) {
    super(name, mood);
  }

  get output() {
    return this._output;
  }
}
