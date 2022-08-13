import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

import modules from '../../utils/modules';
export { modules };

const { combine, splat, timestamp, printf } = format;
morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: message => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: message => logger.error(message.trim()) },
});

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  const { module = 'http' } = metadata;
  let msg = `${timestamp} [${level} - ${module}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(format.colorize(), splat(), timestamp(), customFormat),
  defaultMeta: { service: 'default' },
  transports: [new transports.Console()],
});

export default logger;
