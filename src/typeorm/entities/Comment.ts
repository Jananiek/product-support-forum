import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Unique, Index, ViewColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  @Column()
  comment: string;

  @Column()
  @Index()
  postId: number;

  @Column()
  @Index()
  userId: number;

  @ManyToOne(() => Post, post => post.comments, {
    cascade: true,
  })
  post: Post;

  @ManyToOne(() => User, user => user)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
