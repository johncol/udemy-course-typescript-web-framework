export class Attributes<T> {
  constructor(private _data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this._data[key];
  };

  set = (update: Partial<T>): void => {
    Object.assign(this._data, update);
  };

  get data(): T {
    return this._data;
  }
}
