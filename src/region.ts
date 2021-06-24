import { Factory } from './production/factory';
import { FactoryType, ProductionTier } from './production/types';

export type FactoryList = {
  [key in ProductionTier]: Factory[];
};

export class Region {
  private _factories: FactoryList;

  constructor(private _name: string, private _climate: string) {
    this._factories = { base: [], intermediate: [], finished: [] };
  }

  get name() {
    return this._name;
  }

  get climate() {
    return this._climate;
  }

  addFactory(factory: Factory) {
    const tier = factory.productionTier;
    this._factories[tier] = [...this._factories[tier], factory];
  }

  getRegionalProduction() {
    const production: any = {};

    Object.keys(this._factories).map((factoryType) => {
      //@ts-ignore
      this._factories[factoryType].map((factory) => {
        if (production[factory.goodType]) {
          production[factory.goodType] += factory.calculateProduction();
        } else {
          production[factory.goodType] = factory.calculateProduction();
        }
      });
    });

    console.log(production);
  }
}
