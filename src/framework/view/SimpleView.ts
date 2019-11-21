import { Model, MayHaveId } from './../model/Model';
import { View, EventsMap, RegionsMap } from './View';

export abstract class SimpleView<T extends Model<U>, U extends MayHaveId> extends View<T, U> {
  eventsMap = (): EventsMap => {
    return {};
  };

  regionsMap = (): RegionsMap => {
    return {};
  };

  renderRegions = (): void => {};
}
