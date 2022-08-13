import { Router } from 'express';
import health from './routes/health';
import swaggerDoc from './routes/swaggerDoc';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  swaggerDoc(app);
  health(app);

  return app;
};
