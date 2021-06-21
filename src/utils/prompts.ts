import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

export const askYesOrNo = (str: string) => {
  const response = prompt(`${str}(y/n):    `);

  return response === 'y';
};
