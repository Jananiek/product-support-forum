import { Router } from 'express';
import health from './routes/health';
import post from './routes/post';
import swaggerDoc from './routes/swaggerDoc';
import user from './routes/user';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  swaggerDoc(app);
  health(app);
  user(app);
  post(app)

  return app;
};
