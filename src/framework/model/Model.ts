import { Events } from './Events';

interface EventsHandler {
  register: (event: string, callback: () => void) => void;
  trigger: (event: string) => void;
}

interface BackendHandler<T> {
  fetch: (id: number) => Promise<T>;
  save: (data: T) => Promise<T>;
}

interface DataHandler<T> {
  get: <K extends keyof T>(key: K) => T[K];
  set: (update: Partial<T>) => void;
  data: T;
}

export class Model<T extends { id?: number }> {
  constructor(
    private eventsHandler: EventsHandler,
    private backendHandler: BackendHandler<T>,
    private datahandler: DataHandler<T>
  ) {}

  get on() {
    return this.eventsHandler.register;
  }

  get data() {
    return this.datahandler.data;
  }

  get get() {
    return this.datahandler.get;
  }

  set = (update: T): void => {
    this.datahandler.set(update);
    this.eventsHandler.trigger(Events.change);
  };

  fetch = (): Promise<void> => {
    const id: number = this.datahandler.get('id');
    if (id == null) {
      throw new Error('No ID defined to fetch the user');
    }
    return this.backendHandler
      .fetch(id)
      .then((props: T) => this.set(props))
      .catch(() => this.eventsHandler.trigger(Events.error));
  };

  save = (): Promise<void> => {
    return this.backendHandler
      .save(this.datahandler.data)
      .then((props: T) => this.set(props))
      .then(() => this.eventsHandler.trigger(Events.save))
      .catch(() => this.eventsHandler.trigger(Events.error));
  };
}
