interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

type CallbacksMap = { [event: string]: Callback[] };

export class User {
  private callbacks: CallbacksMap = {};

  constructor(private data: UserProps) {}

  get = (prop: string): string | number => {
    return this.data[prop];
  };

  set = (props: UserProps): void => {
    Object.assign(this.data, props);
  };

  on = (event: string, callback: Callback): void => {
    this[event] = this.callbacksFor(event).concat(callback);
  };

  trigger = (event: string): void => {
    this.callbacksFor(event).forEach(callback => callback());
  };

  private callbacksFor = (event: string): Callback[] => {
    return this.callbacks[event] || [];
  };
}
