import { Eventing, Callback } from './Eventing';
import { Sync } from './Sync';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  private eventing: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync('http://localhost:3000/users');

  constructor(private data: UserProps) {}

  get = (prop: string): string | number => {
    return this.data[prop];
  };

  set = (props: UserProps): void => {
    Object.assign(this.data, props);
  };

  on = (event: string, callback: Callback): void => {
    this.eventing.register(event, callback);
  };

  trigger = (event: string): void => {
    this.eventing.trigger(event);
  };

  fetch = (): Promise<UserProps> => {
    return this.sync.fetch(this.data.id).then(this.saveAndReturn);
  };

  save = (): Promise<UserProps> => {
    return this.sync.save(this.data).then(this.saveAndReturn);
  };

  private saveAndReturn = (props: UserProps): UserProps => {
    this.set(props);
    return props;
  };
}
