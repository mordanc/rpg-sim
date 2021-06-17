export type Opinions = 'happy' | 'angry' | 'neutral';
export type ResponseTypes = 'greeting' | 'farewell';

export type Response = {
  [key in Opinions]: { [key in ResponseTypes]: string };
};

export enum OpinionChange {
  LIGHT = 5,
  MEDIUM = 10,
  HEAVY = 20,
}

export type ConversationSteps = 'start' | 'middle' | 'middleEnd' | 'end';
export type ConversationTopics = 'weather';
export type ConversationList = {
  [key in ConversationTopics]: {
    [key in ConversationSteps]: { [key in Attitudes]: string[] };
  };
};
export type Attitudes = 'happy' | 'sad' | 'angry';
