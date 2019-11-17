import { Events } from './Events';

interface Attributes<T> {
  get: <K extends keyof T>(key: K) => T[K];
  set: (update: Partial<T>) => void;
  data: T;
}

interface Sync<T> {
  fetch: (id: number) => Promise<T>;
  save: (data: T) => Promise<T>;
}

type Callback = () => void;

interface Eventing {
  register: (event: string, callback: Callback) => void;
  trigger: (event: string) => void;
}

export class Model<T extends { id?: number }> {
  constructor(private eventing: Eventing, private sync: Sync<T>, private attributes: Attributes<T>) {}

  get on() {
    return this.eventing.register;
  }

  get data() {
    return this.attributes.data;
  }

  get get() {
    return this.attributes.get;
  }

  set = (update: T): void => {
    this.attributes.set(update);
    this.eventing.trigger(Events.change);
  };

  fetch = (): Promise<void> => {
    const id: number = this.attributes.get('id');
    if (id == null) {
      throw new Error('No ID defined to fetch the user');
    }
    return this.sync
      .fetch(id)
      .then((props: T) => this.set(props))
      .catch(() => this.eventing.trigger(Events.error));
  };

  save = (): Promise<void> => {
    return this.sync
      .save(this.attributes.data)
      .then((props: T) => this.set(props))
      .then(() => this.eventing.trigger(Events.save))
      .catch(() => this.eventing.trigger(Events.error));
  };
}
