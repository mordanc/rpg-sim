import { Region } from './region';

export class World {
  constructor(private _regions: Region[]) {}

  getAllRegionProduction() {
    let regionProduction: any = {};
    this._regions.map((region) => {
      const production = region.getRegionalProduction();

      regionProduction[region.name] = production;
    });
    return regionProduction;
  }
}
