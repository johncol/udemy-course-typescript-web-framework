import { Eventing } from './../framework/model/Eventing';
import { Attributes } from './../framework/model/Attributes';
import { Model } from './../framework/model/Model';
import { Collection } from './../framework/model/Collection';
import { ApiSync } from './ApiSync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const usersUrl: string = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static build = (data: UserProps): User => {
    const eventing: Eventing = new Eventing();
    const sync: ApiSync<UserProps> = new ApiSync<UserProps>(usersUrl);
    const attributes: Attributes<UserProps> = new Attributes(data);
    return new User(eventing, sync, attributes);
  };

  static collection = (): Collection<User, UserProps> => {
    return new Collection<User, UserProps>(User.build, usersUrl);
  };
}
