import chalk from 'chalk';
import promptSync from 'prompt-sync';

import { Character } from './characters/character';
import { Merchant } from './characters/merchant';
import {
  angryResponsesToHappy,
  conversations,
  happyResponsesToAngry,
} from './data';

import { Attitudes, ConversationTopics } from './types';
import { logDialogue } from './conversation/utils';
import { shortConversation } from './conversation/shortConversation';
import { Factory } from './production/factory';

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

(function main() {
  const bob = new Merchant('Bob', 'angry');
  const alice = new Character('Alice', 'happy');

  shortConversation('weather', bob, alice);

  const lumberMill = new Factory('lumber mill', 'Half Moon Mill');

  lumberMill.generateWorkers([8, 7, 9, 8, 6, 7, 5]);

  console.log(lumberMill.calculateProduction());
  lumberMill.logProduction();
  // console.log(angryResponsesToHappy)
})();
