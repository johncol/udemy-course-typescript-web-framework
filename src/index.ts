import { User, UserProps } from './model/User';
import { Events } from './framework/model/Events';
import { Collection } from './framework/model/Collection';
import { UserForm } from './view/UserForm';

const container: Element = document.getElementById('user-form');

const displayUser = (user: User): void => {
  new UserForm(container, user).render();
};

const collection: Collection<User, UserProps> = User.collection();
collection.fetch();
collection.on(Events.fetch, () => {
  collection.data.forEach(displayUser);
});
