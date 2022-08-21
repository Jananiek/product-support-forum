import { PostRepository } from '../repositories';
import * as bcrypt from 'bcrypt';
import { CustomError } from '../../../utils/errorHandle/customErrors';
import { PostFilterDto } from '../dto/postFilterDto';
import { removeNullOrUndefinedValues } from '../../../utils/helpers';
import { IPagination } from '../../../interfaces/IPagination';
import { IResponseListResult } from '../../../interfaces/IResponseListResult';
import { Post } from '../../../typeorm/entities/Post';
import { PostInputDto } from '../dto/CreatePostInputDto';
import { DeleteResult } from 'typeorm';
import { UserRepository } from '../../users/repositories';
const jwt = require('jsonwebtoken');
require('dotenv').config();
//import dotenv from 'dotenv';
//dotenv.config()

export class PostService {
  protected postRepo: PostRepository;
  protected userRepo: UserRepository;
  constructor() {
    this.postRepo = new PostRepository();
    this.userRepo = new UserRepository();
  }
  public getPostFilterOptions(data: Record<string, any>): PostFilterDto {
    const filterOptions: PostFilterDto = {
      page: data.page ? Number(data.page) : 1,
      pageSize: data.pageSize ? Number(data.pageSize) : 10,
      title: data.title ? String(data.title) : undefined,
      isApproved: data.isApproved ? data.isApproved : true,
    };
    return filterOptions;
  }
  public async getAll(query: Record<string, unknown>): Promise<IResponseListResult<Post>> {
    try {
      const filterOptions = this.getPostFilterOptions(query);
      const filteredOptions = removeNullOrUndefinedValues(filterOptions);
      const { page, pageSize, list, total } = await this.postRepo.getPostsWithPagination(filteredOptions);
      const paginationInfo: IPagination = {
        pages: Math.ceil(total / pageSize),
        pageSize,
        items: total,
        currentPage: page,
      };
      return {
        items: list,
        pagination: paginationInfo,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
  public async createOrUpdatePost(post: PostInputDto, userId: number): Promise<Post> {
    const existingPost = await this.postRepo.getOne(post.title);
    const user = await this.userRepo.getOneById(userId);
    const { comments = [], ...rest } = post;
    if (!existingPost) {
      await this.postRepo.createOne({ ...rest, user });
    } else {
      const updatedPost = { ...existingPost, ...rest, id: existingPost.id, updatedAt: new Date(), user };
      await this.postRepo.updateOne(updatedPost);
    }
    //If comments are available insert comments to DB
    if (comments.length > 0) {
      this.postRepo.upsertComments(comments);
    }
    return this.postRepo.getOne(post.title);
  }

  public async deletePost(id: number): Promise<DeleteResult> {
    const existingPost = await this.postRepo.getOneById(id);

    if (!existingPost) {
      throw new CustomError('Post does not exists');
    } else {
      return await this.postRepo.deleteOne(existingPost);
    }
  }
}
