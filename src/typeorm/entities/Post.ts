import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
@Unique('post_uk', ['id', 'title'])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', width: 500 })
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Comment, comment => comment.post, {
    cascade: true,
  })
  comments!: Comment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
