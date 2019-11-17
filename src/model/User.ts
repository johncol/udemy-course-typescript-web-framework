import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static build(data: UserProps): User {
    const eventing: Eventing = new Eventing();
    const sync: ApiSync<UserProps> = new ApiSync<UserProps>('http://localhost:3000/users');
    const attributes: Attributes<UserProps> = new Attributes(data);
    return new User(eventing, sync, attributes);
  }
}
