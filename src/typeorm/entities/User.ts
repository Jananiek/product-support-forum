import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Post } from './Post';
export enum ROLES_TYPES {
  Admin = 2030,
  User = 2031,
}
@Entity()
@Unique('user_uk', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  userName: string;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  refreshToken: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: true,
  })
 // @Column()
  public roles?: Record<string, number>;

  @OneToMany(() => Post, post => post.user, {
    cascade: true,
  })
  posts!: Post[];

  // @OneToMany(() => Comment, comment => comment, {
  //   cascade: true,
  // })
  // comment!: Comment[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
