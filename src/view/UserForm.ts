import { User } from './../model/User';

type EventsMap = { [key: string]: () => void };

export class UserForm {
  constructor(private parent: Element, private model: User) {}

  render = (): void => {
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = this.template();
    this.bindEvents(template.content);
    this.parent.append(template.content);
  };

  private template = (): string => {
    return `
      <div class="user-form">
        <h1>User Form</h1>
        <div class="user-form__row">
          <div>
            <span class="user-form__attr">Name: </span>
            <span class="user-form__value">${this.model.get('name')}</span><br />
            <span class="user-form__attr">Age: </span>
            <span class="user-form__value">${this.model.get('age')}</span>
          </div>
        </div>
        <div class="user-form__row">
          <input class="user-form__input" placeholder="Name.." />
          <button data-role="save">Save</button>
        </div>
        <div class="user-form__row">
          <button data-role="random-age">Random Age</button>
        </div>
      </div>
    `;
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

  private eventsMap = (): EventsMap => {
    return {
      'click:button[data-role="save"]': this.onSaveButtonClick,
      'click:button[data-role="random-age"]': this.onSetRandomAgeButtonClick,
    };
  };

  private onSaveButtonClick = (): void => {
    console.log('Button Clicked!');
  };

  private onSetRandomAgeButtonClick = (): void => {
    console.log('Random Age Button Clicked!');
  };
}
