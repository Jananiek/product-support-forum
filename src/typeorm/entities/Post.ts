import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
@Unique('post_uk', ['title'])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({default:false})
  isApproved: boolean;

  @Column({ type: 'text', width: 500 })
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
