import { Eventing, Callback } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { Events } from './Events';

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

  get on() {
    return this.eventing.register;
  }

  get data() {
    return this.attributes.data;
  }

  get get() {
    return this.attributes.get;
  }

  set = (update: UserProps): void => {
    this.attributes.set(update);
    this.eventing.trigger(Events.change);
  };

  fetch = (): Promise<UserProps> => {
    const id: number = this.attributes.get('id');
    if (id == null) {
      throw new Error('No ID defined to fetch the user');
    }
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
