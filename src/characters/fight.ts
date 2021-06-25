import { logDamageTaken, logRed } from '../utils/logging';
import { Character } from './character';

export const fight = (attacker: Character, defender: Character) => {
  if (attacker.health <= 0 || defender.health <= 0) return;
  logRed(`----- Start fight: ${attacker.name} vs ${defender.name} ------`);
  let count = 1;

  while (attacker.health > 0 && defender.health > 0) {
    const attackerDamage = attacker.calculateDamage();
    const weightedAttackerDamage = defender.getHit(attackerDamage);

    if (defender.health <= 0) {
      logRed(`Attacker ${attacker.name} defeated defender ${defender.name}.`);
      return;
    }

    const defenderDamage = defender.calculateDamage();
    const weightedDefenderDamage = attacker.getHit(defenderDamage);

    if (attacker.health <= 0) {
      logRed(`Defender ${defender.name} defeated attacker ${attacker.name}`);
      return;
    }

    const attackerHealth = logDamageTaken(attacker, weightedDefenderDamage);
    const defenderHealth = logDamageTaken(defender, weightedAttackerDamage);

    logRound(count, attackerHealth, defenderHealth);
    count++;
  }
};

const logRound = (
  round: number,
  attackerHealth: string,
  defenderHealth: string
) => {
  console.log(`Round ${round}:`, attackerHealth, defenderHealth);
};

export const groupFight = (groupA: Character[], groupB: Character[]) => {
  const sizeA = groupA.length;
  const sizeB = groupB.length;

  const largestGroup = sizeA >= sizeB ? sizeA : sizeB;

  while (!isGroupDead(groupA) && !isGroupDead(groupB)) {
    for (let i = 0; i < largestGroup; i++) {
      if (groupA[i] && groupB[i]) {
        fight(groupA[i], groupB[i]);
      } else if (groupA[i] && !groupB[i]) {
        const randomIndex = Math.floor(Math.random() * groupB.length);
        fight(groupA[i], groupB[randomIndex]);
      } else if (!groupA[i] && groupB[i]) {
        const randomIndex = Math.floor(Math.random() * groupA.length);
        fight(groupB[i], groupA[randomIndex]);
      }
    }
  }

  if (isGroupDead(groupA)) {
    logRed(`Attackers were wiped out. ${numWoundedInGroup(groupA)} survived.`);
  } else if (isGroupDead(groupB)) {
    logRed(`Defenders were wiped out. ${numWoundedInGroup(groupB)} survived.`);
  }
};

const isGroupDead = (group: Character[]) =>
  group.every((character) => character.health <= 0);

const numWoundedInGroup = (group: Character[]) =>
  group.reduce((acc, character) => {
    if (character.status === 'unconscious') {
      return acc + 1;
    }
    return acc;
  }, 0);
