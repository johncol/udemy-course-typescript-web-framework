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
      <div>
        <h1>User Form</h1>
        <div>
          <span>Name: </span><span>${this.model.get('name')}</span><br />
          <span>Age: </span><span>${this.model.get('age')}</span>
        </div>
        <input />
        <button>Save</button>
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
      'click:button': this.onButtonClick,
    };
  };

  private onButtonClick = (): void => {
    console.log('Button Clicked!');
  };
}
