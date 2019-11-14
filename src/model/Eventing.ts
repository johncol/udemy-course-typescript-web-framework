export type Callback = () => void;

type CallbacksMap = { [event: string]: Callback[] };

export class Eventing {
  private callbacks: CallbacksMap = {};

  register = (event: string, callback: Callback): void => {
    this[event] = this.callbacksFor(event).concat(callback);
  };

  trigger = (event: string): void => {
    this.callbacksFor(event).forEach(callback => callback());
  };

  private callbacksFor = (event: string): Callback[] => {
    return this.callbacks[event] || [];
  };
}
