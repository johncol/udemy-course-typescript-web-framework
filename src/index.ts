import { User } from './model/User';
import { Events } from './model/Events';

const user: User = new User({ name: 'John', age: 30 });

user.on(Events.change, () => console.log('user changed to:', JSON.stringify(user.data)));

user.save().then(() => {
  user.set({ name: 'Spartacus' });
});
