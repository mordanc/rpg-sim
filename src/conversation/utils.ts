import chalk from 'chalk';
import { Character } from '../character';

export const logDialogue = (speaker: Character, sentence: string) => {
  const color = speaker.name === 'Bob' ? chalk.blue : chalk.yellow;

  console.log(color(speaker.name, ':', sentence));
};
