import { Character } from '../characters/character';
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

export const generateWorkers = (listOfLaborSkills: number[]) => {
  const genderRoll = Math.floor(Math.random() * 10);
  const isMale = genderRoll <= 90;
  const nameList = isMale ? maleFirstNmes : femaleFirstNames;

  return listOfLaborSkills.map((skillLevel) => {
    const randomNameIndex = Math.floor(Math.random() * nameList.length);
    const name = nameList[randomNameIndex];

    const randomMoodIndex = Math.floor(Math.random() * moods.length);
    const mood = moods[randomMoodIndex];

    return new Worker(name, mood, skillLevel);
  });
};
