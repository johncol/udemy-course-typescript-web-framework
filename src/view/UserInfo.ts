import { HtmlTemplate } from './../framework/view/View';
import { UserProps, User } from './../model/User';
import { SimpleView } from '../framework/view/SimpleView';

export class UserInfo extends SimpleView<User, UserProps> {
  template = (): HtmlTemplate => {
    return `
      <div>
        <h1>${this.model.get('name')}</h1>
        <div class="user-form__row">
          <div>
            <div>
              <span class="user-form__attr">Age: </span>
              <span class="user-form__value">${this.model.get('age')}</span>
            </div>
            <div>
              <span class="user-form__attr">Country: </span>
              <span class="user-form__value">${this.model.get('country')}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };
}
