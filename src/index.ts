import { User } from './model/User';
import { Events } from './model/Events';

const displayUserState = (user: User): void => {
  const div: Element = document.createElement('div');
  div.innerHTML = `
    <h1>User changed:</h1>
    <pre><code>${JSON.stringify(user.data, null, 2)}</code></pre>
  `;
  document.body.appendChild(div);
};

const user: User = User.build({ name: 'John', age: 30 });

user.on(Events.change, () => displayUserState(user));

user.save().then(() => user.set({ name: 'Spartacus' }));
