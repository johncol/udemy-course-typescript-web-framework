import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { Model } from './Model';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  constructor(data: UserProps) {
    const eventing: Eventing = new Eventing();
    const sync: Sync<UserProps> = new Sync<UserProps>('http://localhost:3000/users');
    const attributes: Attributes<UserProps> = new Attributes(data);
    super(eventing, sync, attributes);
  }
}
