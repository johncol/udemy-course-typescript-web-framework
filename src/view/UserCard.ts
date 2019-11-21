import { HtmlTemplate, RegionsMap, ElementsMap } from './../framework/view/View';
import { EventlessView } from './../framework/view/EventlessView';
import { User, UserProps } from './../model/User';
import { UserInfo } from './UserInfo';
import { UserForm } from './UserForm';

export class UserCard extends EventlessView<User, UserProps> {
  template = (): HtmlTemplate => {
    return `
      <div class="user-card">
        <div data-role="user-info"></div>
        <div data-role="user-form"></div>
      </div>
    `;
  };

  regionsMap = (): RegionsMap => {
    return {
      userInfo: '[data-role="user-info"]',
      userForm: '[data-role="user-form"]',
    };
  };

  renderRegions = (fragment: DocumentFragment): void => {
    const elementsMap: ElementsMap = this.getElementsMap(fragment);
    new UserInfo(elementsMap['userInfo'], this.model).render();
    new UserForm(elementsMap['userForm'], this.model).render();
  };
}
