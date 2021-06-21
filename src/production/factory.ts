import { Worker } from '../worker';

export type Factories = 'lumber mill' | 'mine' | 'farm';
export type GoodTypes = 'base' | 'intermediate' | 'finished';

export class Factory {
  public tier = 1;
  public goodType = 'base';

  constructor(
    public type: Factories,
    public name: string,
    public workerList: Worker[] = []
  ) {}

  addWorker(worker: Worker) {
    this.workerList = this.workerList ? [...this.workerList, worker] : [worker];
  }

  calculateProduction() {
    const grossProduction = this.workerList?.reduce(
      (output, worker) => output + worker.output,
      0
    );

    // grab from region object (tbd)
    const environmentConditionsMultiplier = 0.8;

    const weightedProduction =
      grossProduction * environmentConditionsMultiplier;

    return weightedProduction;
  }
}
