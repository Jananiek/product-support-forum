import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Comment } from '../entities/Comment';

define(Comment, () => {
  const comment = new Comment();
  comment.comment = faker.lorem.sentences()
  return comment;
});
