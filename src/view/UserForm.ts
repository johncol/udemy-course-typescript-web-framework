import { View, EventsMap } from './../framework/view/View';
import { UserProps, User } from './../model/User';

export class UserForm extends View<User, UserProps> {
  template = (): string => {
    return `
      <form class="user-form" autocomplete="off">
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
          <input name="name" class="user-form__input" placeholder="Name.." />
          <button type="button" data-role="update-name">Update</button>
        </div>
        <div class="user-form__row">
          <button type="button" data-role="random-age">Random Age</button>
        </div>
      </form>
    `;
  };

  eventsMap = (): EventsMap => {
    return {
      'click:button[data-role="update-name"]': this.onSaveButtonClick,
      'click:button[data-role="random-age"]': this.onSetRandomAgeButtonClick,
    };
  };

  private onSaveButtonClick = (): void => {
    const input: Element | null = this.parent.querySelector('input[name="name"]');
    if (!input) {
      throw new Error('input[name="name"] not found');
    }

    const name: string = (input as HTMLInputElement).value;
    if (name && name.trim().length > 0) {
      this.model.set({ name: name.trim() });
    }
  };

  private onSetRandomAgeButtonClick = (): void => {
    this.model.setRandomAge();
  };
}
