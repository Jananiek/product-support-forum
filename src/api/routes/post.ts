import { Router, Request, Response } from 'express';
import logger, { modules } from '../../loaders/logger/index';
import { PostService } from '../../modules/post/services/index';
import { verifyJWT } from '../../middleware/verifyJWT';
const route = Router();
const postService = new PostService();
import { ErrorResponse, ErrorResponseHandler, SuccessResponse } from '../../utils/responseHandler';
import { PostInputDto } from '../../modules/post/dto/CreatePostInputDto';
import { plainToInstance } from 'class-transformer';

export default (app: Router): void => {
  app.use('/posts', route);

  route.get('/', async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const posts = await postService.getAll(query);
      return SuccessResponse(res, posts, null, 200);
    } catch (e) {
      logger.error('Get all posts', {
        module: modules.post,
        service: 'posts',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
  route.get('/:id', async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const posts = await postService.getAll(query);
      return SuccessResponse(res, posts, null, 200);
    } catch (e) {
      logger.error('Get all posts', {
        module: modules.post,
        service: 'posts',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
  route.post('/', async (req: Request, res: Response) => {
    try {
      const postDto: PostInputDto = plainToInstance(PostInputDto, req.body, {
        enableImplicitConversion: false,
        groups: ['single'],
      });
      const userId = 2; //TODO: add userId to post object from auth token
      const post = await postService.createOrUpdatePost(postDto,userId);
      return SuccessResponse(res, post, null, 200);
    } catch (e) {
      logger.error('Create post', {
        module: modules.post,
        service: 'posts',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
  route.put('/', async (req: Request, res: Response) => {
    const {
      body: { title },
    } = req;
    const userId = 2; 
    if (!title) {
      return ErrorResponse(res, { message: 'Missing post title' });
    }
    try {
      const postDto: PostInputDto = plainToInstance(PostInputDto, req.body, {
        enableImplicitConversion: false,
        groups: ['single'],
      });
      const posts = await postService.createOrUpdatePost(postDto,userId);
      return SuccessResponse(res, posts, null, 200);
    } catch (e) {
      logger.error('Update post', {
        module: modules.post,
        service: 'posts',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
  route.delete('/:id', async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    if (!id) {
      return ErrorResponse(res, { message: 'Bad Request, Invalid Query Params Please refer documentation.' });
    }
    try {
      const result = await postService.deletePost(Number(id));
      return SuccessResponse(res, result, null, 200);
    } catch (e) {
      logger.error('Delete post', {
        module: modules.post,
        service: 'posts',
        data: e.message,
      });
      return ErrorResponseHandler(res, { message: e.message, name: e.name });
    }
  });
};
