import { EventsMap, HtmlTemplate } from './../framework/view/View';
import { UserProps, User } from './../model/User';
import { RegionlessView } from '../framework/view/RegionlessView';

export class UserForm extends RegionlessView<User, UserProps> {
  template = (): HtmlTemplate => {
    return `
      <form class="user-form" autocomplete="off">
        <div class="user-form__row">
          <input name="name" class="user-form__input" placeholder="Name" value="${this.model.get('name')}" />
        </div>
        <div class="user-form__row">
          <input name="country" class="user-form__input" placeholder="Country" value="${this.model.get('country')}" />
        </div>
        <div class="user-form__row user-form__row--right-aligned">
          <button type="button" data-role="update-fields">Update</button>
          <button type="button" data-role="random-age">Random Age</button>
        </div>
        <div class="user-form__row user-form__row--right-aligned">
          <button type="button" data-role="save">Save</button>
        </div>
      </form>
    `;
  };

  eventsMap = (): EventsMap => {
    return {
      'click:button[data-role="update-fields"]': this.onUpdateButtonClick,
      'click:button[data-role="random-age"]': this.onSetRandomAgeButtonClick,
      'click:button[data-role="save"]': this.onSaveButtonClick,
    };
  };

  private onUpdateButtonClick = (): void => {
    const name: string = this.getValueOf('name');
    const country: string = this.getValueOf('country');
    this.model.set({ name, country });
  };

  private onSetRandomAgeButtonClick = (): void => {
    this.model.setRandomAge();
  };

  private onSaveButtonClick = (): void => {
    this.model.save();
  };

  private getValueOf = (field: string): string => {
    const elementSelector: string = `input[name="${field}"]`;
    const inputElement: Element | null = this.parent.querySelector(elementSelector);
    if (!inputElement) {
      throw new Error(`${elementSelector} not found`);
    }
    return (inputElement as HTMLInputElement).value;
  };
}
