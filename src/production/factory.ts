import { Worker } from '../worker';
import { BaseProduction, IBaseProduction } from './baseProduction';
import { FactoryType } from './types';

export class Factory extends BaseProduction implements IBaseProduction {
  constructor(type: FactoryType, name: string, workerList: Worker[] = []) {
    super(name, workerList, type, 'base');
  }
}
