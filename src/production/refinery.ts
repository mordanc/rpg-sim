import { BaseProduction, IBaseProduction } from './baseProduction';
import { Worker } from '../worker';
import { IntermediateGood, RefineryType } from './types';

// Factory that takes in raw resources and produces intermediate goods
export class Refinery extends BaseProduction implements IBaseProduction {
  constructor(type: RefineryType, name: string, workerList: Worker[]) {
    super(name, workerList, type, 'intermediate');
  }
}
