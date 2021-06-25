import { Character, randomIntFromInterval } from '../characters/character';
import { moods } from '../data';
import { Worker } from '../worker';
import { femaleFirstNames, maleFirstNmes } from './names';

export const generateCharacter = () => {
  const genderRoll = Math.floor(Math.random() * 10);
  const isMale = genderRoll <= 50;
  const nameList = isMale ? maleFirstNmes : femaleFirstNames;

  const randomNameIndex = Math.floor(Math.random() * nameList.length);
  const name = nameList[randomNameIndex];

  const randomMoodIndex = Math.floor(Math.random() * moods.length);
  const mood = moods[randomMoodIndex];

  const fightingSkillLevel = Math.floor(Math.random() * 10);

  return new Character(name, mood, fightingSkillLevel);
};

export const generateWorkers = (totalSkillLevel: number) => {
  let total = 0;
  const workers = [];

  while (total < totalSkillLevel) {
    let skill = 0;

    const leftover = totalSkillLevel - total;
    if (leftover === 0) {
      return workers;
    }
    if (leftover <= 10) {
      total += leftover;
      workers.push(generateWorker(leftover));
    } else {
      skill = randomIntFromInterval(4, 8);
      total += skill;

      workers.push(generateWorker(skill));
    }
  }

  return workers;
};

const generateWorker = (skillLevel: number) => {
  const genderRoll = Math.floor(Math.random() * 10);
  const isMale = genderRoll <= 90;
  const nameList = isMale ? maleFirstNmes : femaleFirstNames;

  const randomNameIndex = Math.floor(Math.random() * nameList.length);
  const name = nameList[randomNameIndex];

  const randomMoodIndex = Math.floor(Math.random() * moods.length);
  const mood = moods[randomMoodIndex];

  return new Worker(name, mood, skillLevel);
};
