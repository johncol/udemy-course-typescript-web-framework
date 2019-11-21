import { EventsMap, HtmlTemplate } from './../framework/view/View';
import { UserProps, User } from './../model/User';
import { RegionlessView } from '../framework/view/RegionlessView';

export class UserForm extends RegionlessView<User, UserProps> {
  template = (): HtmlTemplate => {
    return `
      <form class="user-form" autocomplete="off">
        <div class="user-form__row">
          <input name="name" class="user-form__input" placeholder="Name.." />
          <button type="button" data-role="update-name">Update</button>
        </div>
        <div class="user-form__row user-form__row--right-aligned">
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
      'click:button[data-role="update-name"]': this.onUpdateNameButtonClick,
      'click:button[data-role="random-age"]': this.onSetRandomAgeButtonClick,
      'click:button[data-role="save"]': this.onSaveButtonClick,
    };
  };

  private onUpdateNameButtonClick = (): void => {
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

  private onSaveButtonClick = (): void => {
    this.model.save();
  };
}
