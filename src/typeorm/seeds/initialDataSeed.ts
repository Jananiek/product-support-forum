import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { User } from '../entities/User';
import { Post } from '../entities/Post';
import { Comment } from '../entities/Comment';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = await factory(User)().createMany(10);

    const posts = await factory(Post)()
      .map(async post => {
        post.user = users[Math.floor(Math.random() * users.length)];
        return post;
      })
      .createMany(50);

    await factory(Comment)()
      .map(async comment => {
        comment.user = users[Math.floor(Math.random() * users.length)];
        comment.post = posts[Math.floor(Math.random() * posts.length)];
        return comment;
      })
      .createMany(100);
  }
}
