import { Model, MayHaveId } from './../model/Model';
import { View, EventsMap } from './View';

export abstract class EventlessView<T extends Model<U>, U extends MayHaveId> extends View<T, U> {
  eventsMap = (): EventsMap => {
    return {};
  };
}
