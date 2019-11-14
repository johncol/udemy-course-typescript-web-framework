import { User } from './model/User';

console.log('hello world!');

const user: User = new User({ name: 'John', age: 30 });

user.save().then(() => {
  console.log('user saved: ', user);

  const createdUser: User = new User({ id: user.get('id') as number });
  createdUser.fetch().then(() => {
    console.log('user fetched: ', createdUser);
  });
});
