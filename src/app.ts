import chalk from 'chalk';
import promptSync from 'prompt-sync';

import { Character } from './characters/character';
import { Merchant } from './characters/merchant';
import { shortConversation } from './conversation/shortConversation';
import { Factory } from './production/factory';
import { Region } from './region';
import { groupFight } from './characters/fight';
import { generateCharacter } from './characterGeneration/generateWorkers';
import { World } from './world';
import { randomIntFromInterval } from './utils/math';

const prompt = promptSync({ sigint: true });

const simulateHaggle = () => {
  const bob = new Merchant('Bob', 'angry');
  const alice = new Character('Alice', 'happy');

  bob.meetCharacter(alice.name);

  for (let currentSentence = 0; currentSentence < 10; currentSentence++) {
    console.log(
      bob.getHaggled(alice.name),
      ' -----> ',
      bob.getOpinionOfCharacter(alice.name)
    );
  }
};

const incrementTime = (rounds: number) => {
  // array of regions represents the world
  const vale = new Region('The Vale');
  const moors = new Region('The Moors');

  const halfMoonMill = new Factory('lumber mill', 'Half Moon Mill');
  const silverbloodMine = new Factory('mine', 'Silverblood Mine');

  const westEdgeMill = new Factory('lumber mill', 'West Edge Mill');
  const deeprockMine = new Factory('mine', 'Deeprock Mine');

  const factories: Factory[] = [
    halfMoonMill,
    silverbloodMine,
    westEdgeMill,
    deeprockMine,
  ];
  factories.map((factory) => {
    factory.generateWorkers(randomIntFromInterval(20, 40));
  });

  vale.addFactories([halfMoonMill, silverbloodMine]);
  moors.addFactories([westEdgeMill, deeprockMine]);

  const world = new World([vale, moors]);

  console.log(world.getAllRegionProduction());
  // map through world and call each regions increment time operations
};

(function main() {
  const bob = new Merchant('Bob', 'angry');
  const alice = new Character('Alice', 'happy', 10);
  const meadow = new Character('Meadow', 'sad');

  const tim = new Character('Tim', 'angry', 10);
  const alex = new Character('Alex', 'happy', 10);

  // shortConversation('weather', bob, alice);

  // const lumberMill = new Factory('lumber mill', 'Half Moon Mill');
  // const ironMine = new Factory('mine', 'Silverblood Mine');

  // lumberMill.generateWorkers(31);
  // ironMine.generateWorkers(20);

  // const vale = new Region('Vale');

  // vale.addFactory(lumberMill);
  // vale.addFactory(ironMine);

  // vale.getRegionalProduction();

  // const attackers = [bob, alice];
  // const defenders = [tim, alex];

  // TODO below sometimes does infinite loop

  // lumberMill.logWorkers();
  // ironMine.logWorkers();

  // lumberMill.getAttacked(attackers);

  // lumberMill.logWorkers();

  incrementTime(1);

  // groupFight(attackers, defenders);
})();
