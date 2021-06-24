import chalk from 'chalk';

export const logGreen = (str: string | number, ...rest: any[]) => {
  console.log(chalk.green(str, rest));
};

export const logRed = (str: string | number, ...rest: any[]) => {
  console.log(chalk.red(str, rest));
};
