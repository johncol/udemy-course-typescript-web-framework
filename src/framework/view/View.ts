import { Model, MayHaveId } from './../model/Model';
import { Events } from './../model/Events';

export type EventsMap = { [key: string]: () => void };
export type HtmlTemplate = string;
export type Selector = string;
export type RegionsMap = { [key: string]: Selector };
export type ElementsMap = { [key: string]: Element };

export abstract class View<T extends Model<U>, U extends MayHaveId> {
  abstract template(): HtmlTemplate;
  abstract eventsMap(): EventsMap;
  abstract regionsMap(): RegionsMap;
  abstract renderRegions(fragment: DocumentFragment): void;

  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }

  render = (): void => {
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.renderRegions(template.content);
    this.parent.innerHTML = '';
    this.parent.append(template.content);
  };

  protected getElementsMap = (fragment: DocumentFragment): ElementsMap => {
    const elements: ElementsMap = {};
    const regionsMap: RegionsMap = this.regionsMap();
    for (let region in regionsMap) {
      const element: Element | null = fragment.querySelector(regionsMap[region]);
      if (element) {
        elements[region] = element;
      }
    }
    return elements;
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
