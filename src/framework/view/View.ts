import { Model, MayHaveId } from './../model/Model';
import { Events } from './../model/Events';

export type EventsMap = { [key: string]: () => void };
export type HtmlTemplate = string;

export abstract class View<T extends Model<U>, U extends MayHaveId> {
  abstract template(): HtmlTemplate;
  abstract eventsMap(): EventsMap;

  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }

  render = (): void => {
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.parent.innerHTML = '';
    this.parent.append(template.content);
  };

  private bindModel = (): void => {
    this.model.on(Events.change, this.render);
  };

  private bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap: EventsMap = this.eventsMap();
    for (let key in eventsMap) {
      const [event, selector] = key.split(':');
      fragment.querySelectorAll(selector).forEach((element: Element) => {
        element.addEventListener(event, eventsMap[key]);
      });
    }
  };
}
