import { Model, MayHaveId } from './../model/Model';
import { View, RegionsMap } from './View';

export abstract class RegionlessView<T extends Model<U>, U extends MayHaveId> extends View<T, U> {
  regionsMap = (): RegionsMap => {
    return {};
  };

  renderRegions = (): void => {};
}
