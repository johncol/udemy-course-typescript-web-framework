import { User, UserProps } from './model/User';
import { Events } from './framework/model/Events';
import { Collection } from './framework/model/Collection';
import { UserForm } from './view/UserForm';

const container: Element | null = document.getElementById('user-form');
if (!container) {
  throw new Error('#user-form not found');
}

const collection: Collection<User, UserProps> = User.collection();
collection.fetch();
collection.on(Events.fetch, () => {
  collection.data.forEach((user: User) => {
    new UserForm(container, user).render();
  });
});
