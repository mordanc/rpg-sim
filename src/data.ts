import { config } from './config';
import { Attitudes, ConversationList, OpinionChange, Response } from './types';

export const responses: Response = {
  happy: { greeting: 'Hi! How are you?', farewell: 'Farewell!' },
  angry: { greeting: 'Fuck you', farewell: 'Go fuck yourself' },
  neutral: { greeting: 'Hey there', farewell: 'Bye now' },
};

export const moods: Attitudes[] = ['happy', 'angry', 'sad'];

export const happyResponsesToAngry = [
  'Oh. Well,',
  'Oh...',
  'Ah, Ok.',
  'I see.',
  '*Clears throat*',
  `That's one way to look at it.`,
  `Interesting point of view.`,
  `Oh, um...`,
];

export const angryResponsesToHappy = [
  `Good for you.`,
  `Why are you so chipper?`,
  `You always like this?`,
  `I'm not in the mood.`,
  `Freak.`,
  `That's just wrong.`,
];

export const conversations: ConversationList = {
  weather: {
    start: {
      happy: [
        `This weather sure is great, huh?`,
        `Don't you just love it when it's ${config.weather} outside!`,
      ],
      sad: [
        `Don't you think this weather is terrible?`,
        `When will this weather let up?`,
        `Oh look it's ${config.weather} again`,
      ],
      angry: [
        `Fuck this weather`,
        `Oh great, it's ${config.weather} again`,
        `Great, another ${config.weather} day`,
      ],
    },
    middle: {
      happy: [
        'I love this weather.',
        'Reminds me of where I grew up.',
        'Makes me think of home.',
        'Really puts a smile on my face.',
        `Always makes me happy when it's ${config.weather}`,
        `I love it when it's ${config.weather} and ${config.temperature}`,
      ],
      sad: [
        'This climate is killing me.',
        'With any luck it will improve.',
        `If only it were a little less ${config.temperature}.`,
      ],
      angry: [
        `It annoys me how ${config.weather} it is.`,
        `I always hate when it's ${config.weather}.`,
        `This season is too ${config.weather} all the time.`,
        `Yeah, its ${config.weather} again. Just perfect.`,
        `Do you get off on ${config.weather} days or something?`,
        `It's too fucking ${config.temperature} and ${config.weather}`,
      ],
    },
    middleEnd: {
      happy: [
        'Well, I had better get going',
        'Sorry, I need to go',
        `Well, I'll be off then`,
        'Alright I have to go, speak with you later',
      ],
      sad: ['I need to go deal with something.'],
      angry: ['Whatever I gotta go'],
    },
    end: {
      happy: [
        'Well, goodbye',
        'Bye then',
        'See you later',
        'Farewell',
        'Have a good one',
        'I have to go',
      ],
      sad: [
        'Ok guess Ill go be alone',
        'Just me and myself then',
        'Hopefully Ill find something to do',
      ],
      angry: ['Hmph.', '*Grunt*', 'Fine, bye then.', `Whatever.`],
    },
  },
};
