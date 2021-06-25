import { generateWorkers } from '../characterGeneration/generateWorkers';
import { Character } from '../characters/character';
import { groupFight } from '../characters/fight';
import { logGreen } from '../utils/logging';
import { askYesOrNo } from '../utils/prompts';
import { Worker } from '../worker';
import {
  FactoryType,
  BaseGood,
  GoodsOutput,
  ProductionTier,
  RefineryType,
  IntermediateGood,
} from './types';

export interface IBaseProduction {
  productionTier: ProductionTier;
  goodType: BaseGood | IntermediateGood;
  //   getOutputFromFactoryType: (factoryType: FactoryType) => BaseGood;
}

const getOutputFromFactoryType = (
  factoryType: FactoryType | RefineryType
): BaseGood | IntermediateGood => {
  if (factoryType === 'lumber mill') return 'lumber';
  if (factoryType === 'mine') return 'iron ore';

  if (factoryType === 'blacksmith') return 'equipment';
  if (factoryType === 'carpenter') return 'furniture';
  if (factoryType === 'kitchen') return 'meals';

  return 'food';
};

// class will let children share behavior, interface will ensure consistency
export class BaseProduction {
  private _goodType: BaseGood | IntermediateGood;

  constructor(
    public name: string,
    public workerList: Worker[] = [],
    private _type: FactoryType | RefineryType,
    // private _goodType: BaseGood | IntermediateGood,
    private _productionTier: ProductionTier
  ) {
    this._goodType = getOutputFromFactoryType(_type);
  }

  get type() {
    return this._type;
  }

  get goodType() {
    return this._goodType;
  }

  get productionTier() {
    return this._productionTier;
  }

  addWorker(worker: Worker) {
    this.workerList = this.workerList ? [...this.workerList, worker] : [worker];
  }

  // returns weighted production, after any negative effects
  calculateProduction() {
    const grossProduction = this.workerList?.reduce((output, worker) => {
      if (worker.status !== 'conscious') {
        return output;
      }

      return output + worker.output;
    }, 0);

    // grab from region object (tbd)
    const environmentConditionsMultiplier = 0.8;

    const weightedProduction = Math.floor(
      grossProduction * environmentConditionsMultiplier
    );

    return weightedProduction;
  }

  getAttacked(attackers: Character[]) {
    const [_, workers] = groupFight(attackers, this.workerList);

    this.workerList = workers;
  }

  /**
   * populate factory with random workers with given labor levels
   * @param listOfLaborSkills size determines number of workers
   */
  generateWorkers(totalLabor: number) {
    this.workerList = generateWorkers(totalLabor);
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
      `${this.name} produces ${this.calculateProduction()} ${this.goodType} \n`
    );

    const seeWorkers = askYesOrNo('Would you like to see the workers here?');

    if (seeWorkers) {
      this.logWorkers();
    }

    logGreen('End of factory production log');
  }
}
