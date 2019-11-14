import { Eventing, Callback } from './Eventing';
import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
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
    this.eventing.register(event, callback);
  };

  trigger = (event: string): void => {
    this.eventing.trigger(event);
  };

  fetch = (): Promise<UserProps> => {
    return axios.get(`http://localhost:3000/users/${this.get('id')}`).then(this.savePropsAndReturn);
  };

  save = (): Promise<UserProps> => {
    const id: number = this.get('id') as number;
    const alreadyExists: boolean = !!id;

    if (alreadyExists) {
      return axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data).then(this.savePropsAndReturn);
    }

    return axios.post(`http://localhost:3000/users`, this.data).then(this.savePropsAndReturn);
  };

  private savePropsAndReturn = (response: AxiosResponse<UserProps>): UserProps => {
    const { data } = response;
    this.set(data);
    return data;
  };
}
