import { User, UserProps } from './model/User';
import { Events } from './model/Events';
import { Collection } from './model/Collection';

const displayUser = (user: User): void => {
  const div: Element = document.createElement('div');
  div.innerHTML = `
    <h1>User:</h1>
    <pre><code>${JSON.stringify(user.data, null, 2)}</code></pre>
  `;
  document.body.appendChild(div);
};

const collection: Collection<User, UserProps> = User.collection();
collection.fetch();
collection.on(Events.fetch, () => {
  collection.data.forEach(displayUser);
});
