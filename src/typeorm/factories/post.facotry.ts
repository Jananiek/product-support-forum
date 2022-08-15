import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Post } from '../entities/Post';

define(Post, () => {
  const post = new Post();
  post.title = faker.lorem.words();
  post.content = faker.lorem.paragraphs();
  return post;
});
