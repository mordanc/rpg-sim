import { Character } from './character';

export const fight = (attacker: Character, defender: Character) => {
  while (attacker.health > 0 && defender.health > 0) {
    defender.decreaseHealth(attacker.attackValue);

    if (defender.health <= 0) {
      console.log('Defender died');
      return;
    } else if (attacker.health <= 0) {
      console.log('Attacker died');
    }

    attacker.decreaseHealth(defender.attackValue);
    console.log(attacker.health, defender.health);
  }
};
