import { HtmlTemplate } from './../framework/view/View';
import { UserProps, User } from './../model/User';
import { SimpleView } from '../framework/view/SimpleView';

export class UserInfo extends SimpleView<User, UserProps> {
  template = (): HtmlTemplate => {
    return `
      <div>
        <h1>User</h1>
        <div class="user-form__row">
          <div>
            <span class="user-form__attr">Name: </span>
            <span class="user-form__value">${this.model.get('name')}</span><br />
            <span class="user-form__attr">Age: </span>
            <span class="user-form__value">${this.model.get('age')}</span>
          </div>
        </div>
      </div>
    `;
  };
}
