import { Attitudes } from '../types';
import { Character, randomIntFromInterval } from './character';

// export class Soldier extends Character {
//   constructor(_name: string, _mood: Attitudes, private _fightingSkill: number) {
//     super(_name, _mood);
//   }

//   calculateDamage() {
//     const adjustedDamage = this.attackValue * (this._fightingSkill / 10);

//     return randomIntFromInterval(adjustedDamage - 2, adjustedDamage + 2);
//   }
// }
