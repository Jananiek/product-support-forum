import { Entity, Column, CreateDateColumn, UpdateDateColumn,PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
@Unique('user_uk', ['userName'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, post => post.user, {
    cascade: true,
  })
  posts!: Post[];

  // @OneToMany(() => Comment, comment => comment, {
  //   cascade: true,
  // })
  // comment!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
