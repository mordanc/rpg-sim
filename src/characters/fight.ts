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

export const groupFight = <T extends Character, U extends Character>(
  attackers: T[],
  defenders: U[]
): [T[], U[]] => {
  const sizeA = attackers.length;
  const sizeB = defenders.length;

  const largestGroup = sizeA >= sizeB ? sizeA : sizeB;

  while (!isGroupDead(attackers) && !isGroupDead(defenders)) {
    for (let i = 0; i < largestGroup; i++) {
      if (attackers[i] && defenders[i]) {
        fight(attackers[i], defenders[i]);
      } else if (attackers[i] && !defenders[i]) {
        // TODO this could select a dead character
        const randomIndex = Math.floor(Math.random() * defenders.length);
        fight(attackers[i], defenders[randomIndex]);
      } else if (!attackers[i] && defenders[i]) {
        const randomIndex = Math.floor(Math.random() * attackers.length);
        fight(defenders[i], attackers[randomIndex]);
      }
    }
  }

  if (isGroupDead(attackers)) {
    logRed(
      `Attackers were wiped out. ${numWoundedInGroup(attackers)} survived.`
    );
  } else if (isGroupDead(defenders)) {
    logRed(
      `Defenders were wiped out. ${numWoundedInGroup(defenders)} survived.`
    );
  }

  return [attackers, defenders];
};

export const isGroupDead = (group: Character[]) =>
  group.every((character) => character.health <= 0);

export const numWoundedInGroup = (group: Character[]) =>
  group.reduce((acc, character) => {
    if (character.status === 'unconscious') {
      return acc + 1;
    }
    return acc;
  }, 0);
