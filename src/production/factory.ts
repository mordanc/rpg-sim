import { generateWorkers } from '../characterGeneration/generateWorkers';
import { logGreen } from '../utils/logging';
import { askYesOrNo } from '../utils/prompts';
import { Worker } from '../worker';
import { FactoryType, Good, GoodsOutput, ProductionTier } from './types';

const getOutputFromFactoryType = (factoryType: FactoryType): Good => {
  if (factoryType === 'lumber mill') return 'lumber';
  if (factoryType === 'mine') return 'iron ore';
  return 'food';
};

export class Factory {
  public level = 1;
  public productionTier: ProductionTier = 'base';
  public goodType: Good;

  constructor(
    public type: FactoryType,
    public name: string,
    public workerList: Worker[] = []
  ) {
    this.goodType = getOutputFromFactoryType(type);
  }

  addWorker(worker: Worker) {
    this.workerList = this.workerList ? [...this.workerList, worker] : [worker];
  }

  // returns weighted production, after any negative effects
  calculateProduction() {
    const grossProduction = this.workerList?.reduce(
      (output, worker) => output + worker.output,
      0
    );

    // grab from region object (tbd)
    const environmentConditionsMultiplier = 0.8;

    const weightedProduction = Math.floor(
      grossProduction * environmentConditionsMultiplier
    );

    return weightedProduction;
  }

  /**
   * populate factory with random workers with given labor levels
   * @param listOfLaborSkills size determines number of workers
   */
  generateWorkers(listOfLaborSkills: number[]) {
    this.workerList = generateWorkers(listOfLaborSkills);
  }

  logWorkers() {
    let logString = '';

    logGreen(
      `List of workers at ${this.name} ${this.type} and their output:\n`
    );

    this.workerList.map((worker) => {
      logString += `${worker.name}: ${worker.output}\n`;
    });
    console.log(logString);
  }

  logProduction() {
    logGreen(
      `${this.name} produces ${this.calculateProduction()} ${this.goodType}\n`
    );

    const seeWorkers = askYesOrNo('Would you like to see the workers here?');

    if (seeWorkers) {
      this.logWorkers();
    }

    logGreen('End of factory production log');
  }
}
