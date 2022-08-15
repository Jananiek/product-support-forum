import { ConnectionOptions } from 'typeorm';
import { Comment } from '../typeorm/entities/Comment';
import { Post } from '../typeorm/entities/Post';
import { User } from '../typeorm/entities/User';

const config = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User,Post,Comment],
  //entities: ['src/typeorm/entities/**.ts', 'src/typeorm/entities/**/**.ts'],
  // migrations: ['src/typeorm/migrations/*.ts'],
  seeds: ['src/typeorm/seeds/**/*{.ts,.js}'],
  factories: ['src/typeorm/factories/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/typeorm/entities',
    migrationsDir: 'src/typeorm/migrations',
    subscribersDir: 'src/typeorm/subscriber',
  },
};

export default config;
