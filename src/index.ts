import { User } from './model/User';
import { Events } from './model/Events';

const user: User = User.build({ name: 'John', age: 30 });

user.on(Events.change, () => {
  const div: Element = document.createElement('div');
  div.classList.add('code');
  div.innerHTML = `<h1>User changed:</h1> <pre><code>${JSON.stringify(user.data, null, 2)}</code></pre>`;
  document.body.appendChild(div);
});

user.save().then(() => {
  user.set({ name: 'Spartacus' });
});
