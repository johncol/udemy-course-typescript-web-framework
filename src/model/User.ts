import { Eventing, Callback } from './Eventing';

interface UserProps {
  name?: string;
  age?: number;
}

export class User {
  private eventing: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get = (prop: string): string | number => {
    return this.data[prop];
  };

  set = (props: UserProps): void => {
    Object.assign(this.data, props);
  };

  on = (event: string, callback: Callback): void => {
    this.eventing.on(event, callback);
  };

  trigger = (event: string): void => {
    this.eventing.trigger(event);
  };
}
