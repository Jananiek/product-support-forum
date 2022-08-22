import { DeleteResult, EntityManager, getConnection, getManager, getRepository, InsertResult, UpdateResult } from 'typeorm';
import { IListResult } from '../../../interfaces/IListResult';
import { Comment } from '../../../typeorm/entities/Comment';
import { Post } from '../../../typeorm/entities/Post';
import { PostInputDto } from '../dto/postInputDto';
import { PostFilterDto } from '../dto/postFilterDto';

export class PostRepository {
  public async getOne(title: string): Promise<Post> {
    return await getRepository(Post).findOne({ where: { title } });
  }
  public async getOneById(id: number): Promise<Post> {
    return await getRepository(Post).findOne({ where: { id }, relations: ['comments','user'] });
  }
  public async getAll(filterOptions: PostFilterDto): Promise<any> {
    return await getRepository(Post).find({ where: { ...filterOptions } });
  }

  async getPostsWithPagination(filterOptions: PostFilterDto): Promise<IListResult<Post>> {
    const { page, pageSize, ...restOptions } = filterOptions;
    const [list, total] = await getManager()
      .getRepository(Post)
      .findAndCount({
        where: { ...restOptions },
        relations: ['comments'],
        order: { updatedAt: 'DESC' },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    return {
      list,
      total,
      page,
      pageSize,
    };
  }

  async createOne(post: PostInputDto): Promise<InsertResult> {
    try {
      return await getConnection().createQueryBuilder().insert().into(Post).values(post).returning('id').execute();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async updateOne(post: Post): Promise<UpdateResult> {
    try {
      return await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set(post)
        .where({ id: post.id })
        .returning('*')
        .execute();
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async upsertComments(comments: Comment[]): Promise<InsertResult> {
    try {
      const upsertCredit = await getConnection().getRepository(Comment).upsert(comments, ['id']);
      return upsertCredit;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async deleteOne(existingPost: Post): Promise<DeleteResult> {
    try {
      const result = await getManager().transaction(async (entityManager: EntityManager) => {
         if (existingPost?.comments && existingPost.comments.length > 0) {
           await entityManager
             .createQueryBuilder()
             .delete()
             .from(Comment)
             .where('postId = :postId', {
               postId: existingPost.id,
             })
             .execute();
         }
        const deleteResult = await entityManager
          .createQueryBuilder()
          .delete()
          .from(Post)
          .where('id = :id', {
            id:existingPost.id,
          })
          .execute();
       
        return deleteResult;
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
