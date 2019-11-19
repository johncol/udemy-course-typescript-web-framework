import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';
import { Events } from './Events';

export class Collection<T, U> {
  private eventing: Eventing = new Eventing();
  private _data: T[] = [];

  constructor(private builder: (props: U) => T, private url: string) {}

  get data(): T[] {
    return this._data;
  }

  on = this.eventing.register;

  fetch = (): void => {
    axios
      .get(this.url)
      .then((response: AxiosResponse<U[]>) => response.data)
      .then((props: U[]) => props.map(this.builder))
      .then((items: T[]) => {
        this._data = items;
        this.eventing.trigger(Events.fetch);
      });
  };
}
