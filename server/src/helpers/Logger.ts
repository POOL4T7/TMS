import winston from 'winston';

class Logger {
  private levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };
  private colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };
  public log: winston.Logger;
  constructor() {
    winston.addColors(this.colors);
    this.log = winston.createLogger({
      level: this.level(),
      levels: this.levels,
      transports: this.winstonTransports(),
    });
  }
  private level() {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
  }
  private winstonTransports() {
    return [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
          winston.format.printf((info) => {
            return `{ level: ${info.level}, message: ${info.message} } timestamps: [${info.timestamp}],`;
          })
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
          winston.format.json()
        ),
      }),
      new winston.transports.File({
        filename: 'logs/all.log',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
          winston.format.json()
        ),
      }),
    ];
  }
}
export default new Logger().log;
