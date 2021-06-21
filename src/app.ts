import chalk from 'chalk';
import promptSync from 'prompt-sync';

import { Character } from './character';
import { Merchant } from './merchant';
import {
  angryResponsesToHappy,
  conversations,
  happyResponsesToAngry,
} from './data';

import { Attitudes, ConversationTopics } from './types';
import { logDialogue } from './conversation/utils';

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

const shortConversation = (
  topic: ConversationTopics,
  initiator: Character,
  receiver: Character
) => {
  const { start, middle, middleEnd, end } = conversations[topic];

  const selectRandomSentence = (conversationArray: string[]) =>
    conversationArray[Math.floor(Math.random() * conversationArray.length)];

  const getConversationSegment = (num: number, mood: Attitudes): string[] => {
    if (num === 1) return start[mood];
    if (num < 4) return middle[mood];
    if (num === 4) return middleEnd[mood];
    return end[mood];
  };

  for (let currentSentence = 1; currentSentence <= 5; currentSentence++) {
    let speaker: Character;
    let listener: Character;

    if (currentSentence % 2 === 0) {
      speaker = receiver;
      listener = initiator;
    } else {
      speaker = initiator;
      listener = receiver;
    }

    const segment = getConversationSegment(currentSentence, speaker.mood);

    const constructSentenceWithRebuttal = (
      myMood: Attitudes,
      otherPersonMood: Attitudes
    ) => {
      if (currentSentence === 1 || currentSentence === 5)
        return selectRandomSentence(segment);

      let responses: any = [];

      if (myMood === 'happy' && otherPersonMood === 'angry') {
        responses = happyResponsesToAngry;
      }

      if (myMood === 'angry' && otherPersonMood === 'happy') {
        responses = angryResponsesToHappy;
      }

      const rebuttal = responses[Math.floor(Math.random() * responses.length)];
      return `${rebuttal || ''} ${selectRandomSentence(segment)}`;
    };

    logDialogue(
      speaker,
      constructSentenceWithRebuttal(speaker.mood, listener.mood)
    );
  }
};

(function main() {
  const bob = new Merchant('Bob', 'angry');
  const alice = new Character('Alice', 'happy');

  shortConversation('weather', bob, alice);

  // console.log(angryResponsesToHappy)
})();
