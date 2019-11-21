import { User, UserProps } from './model/User';
import { Events } from './framework/model/Events';
import { Collection } from './framework/model/Collection';
import { UserCard } from './view/UserCard';

const container: Element | null = document.getElementById('app');
if (!container) {
  throw new Error('#app not found');
}

const collection: Collection<User, UserProps> = User.collection();
collection.on(Events.fetch, () => {
  collection.data.forEach((user: User) => {
    new UserCard(container, user).render();
  });
});

collection.fetch();
