import chalk from 'chalk';
import { Character } from '../characters/character';

export const logGreen = (str: string | number, ...rest: any[]) => {
  console.log(chalk.green(str, rest));
};

export const logRed = (str: string | number, ...rest: any[]) => {
  console.log(chalk.red(str, rest));
};

export const logDamageTaken = (character: Character, damage: number) => {
  const { name, health } = character;
  const formatHealth = health < 10;

  return `${name}: ${chalk.green(health)} ${
    formatHealth ? ' ' : ''
  }(${chalk.red(`-${damage}`)})`;
};
