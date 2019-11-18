import { User } from './model/User';
import { Events } from './model/Events';

const displayUser = (user: User): void => {
  const div: Element = document.createElement('div');
  div.innerHTML = `
    <h1>User:</h1>
    <pre><code>${JSON.stringify(user.data, null, 2)}</code></pre>
  `;
  document.body.appendChild(div);
};

const collection = User.collection();

collection.fetch().on(Events.fetch, () => {
  collection.data.forEach(displayUser);
});
