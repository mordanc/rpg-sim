import { logGreen, logRed } from '../utils/logging';
import { Character } from './character';
import chalk from 'chalk';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const fight = (attacker: Character, defender: Character) => {
  logRed(`----- Start round: ${attacker.name} vs ${defender.name} ------`);
  while (attacker.health > 0 && defender.health > 0) {
    const attackerDamage = randomIntFromInterval(
      attacker.attackValue - 2,
      attacker.attackValue + 2
    );
    defender.getHit(attackerDamage);

    if (defender.health <= 0) {
      logRed(`Attacker ${attacker.name} killed defender ${defender.name}.`);
      return;
    }

    const defenderDamage = randomIntFromInterval(
      defender.attackValue - 2,
      defender.attackValue + 2
    );
    attacker.getHit(defenderDamage);

    if (attacker.health <= 0) {
      logRed(`Defender ${defender.name} killed attacker ${attacker.name}`);
      return;
    }

    const logAttack = (character: Character, damage: number) => {
      const { name, health } = character;
      const formatHealth = health < 10;

      return `${name}: ${chalk.green(health)} ${
        formatHealth ? ' ' : ''
      }(${chalk.red(`-${damage}`)})`;
    };

    const a = logAttack(attacker, attackerDamage);
    const b = logAttack(defender, defenderDamage);

    console.log(a, b);
  }
};

export const groupFight = (groupA: Character[], groupB: Character[]) => {
  const sizeA = groupA.length;
  const sizeB = groupB.length;

  const largestGroup = sizeA >= sizeB ? sizeA : sizeB;

  while (isGroupAlive(groupA) && isGroupAlive(groupB))
    for (let i = 0; i < largestGroup; i++) {
      if (!!groupA[i] && !!groupB[i]) {
        fight(groupA[i], groupB[i]);
      } else if (!!groupA[i] && !groupB[i]) {
        const randomIndex = Math.floor(Math.random() * groupB.length);
        fight(groupA[i], groupB[randomIndex]);
      } else if (!groupA[i] && !!groupB[i]) {
        const randomIndex = Math.floor(Math.random() * groupA.length);
        fight(groupB[i], groupA[randomIndex]);
      }
    }

  if (!isGroupAlive(groupA)) {
    logRed('Attackers were wiped out.');
  } else if (!isGroupAlive(groupB)) {
    logRed('Defenders were wiped out.');
  }
};

const isGroupAlive = (group: Character[]) =>
  group.reduce((acc, char) => char.health + acc, 0) > 0;
