import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { User } from '../entities/User';

define(User, () => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.userName = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  return user;
});
