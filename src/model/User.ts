import { Eventing, Callback } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  private eventing: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync('http://localhost:3000/users');
  private attributes: Attributes<UserProps>;

  constructor(data: UserProps) {
    this.attributes = new Attributes(data);
  }

  get = <K extends keyof UserProps>(prop: K): UserProps[K] => {
    return this.attributes.get(prop);
  };

  set = (props: UserProps): void => {
    this.attributes.set(props);
  };

  on = (event: string, callback: Callback): void => {
    this.eventing.register(event, callback);
  };

  trigger = (event: string): void => {
    this.eventing.trigger(event);
  };

  fetch = (): Promise<UserProps> => {
    const id: number = this.attributes.get('id');
    return this.sync.fetch(id).then(this.saveAndReturn);
  };

  save = (): Promise<UserProps> => {
    return this.sync.save(this.attributes.data).then(this.saveAndReturn);
  };

  private saveAndReturn = (props: UserProps): UserProps => {
    this.set(props);
    return props;
  };
}
