import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {
  public getTypeOrmConfig(entities: any): TypeOrmModuleOptions {
    const { ENVIRONMENT, USE_SSL, SSL_AUTHORIZE, DB_SYNC } = process.env;
    const {
      [`${ENVIRONMENT}_DB_USERNAME`]: username,
      [`${ENVIRONMENT}_DB_PASSWORD`]: password,
      [`${ENVIRONMENT}_DB_HOST`]: host,
      [`${ENVIRONMENT}_DB_NAME`]: database,
      [`${ENVIRONMENT}_DB_PORT`]: port,
    } = process.env;

    return {
      host,
      username,
      password,
      database,
      entities,
      port: +port,
      type: 'mysql',
      synchronize: DB_SYNC === 'true' ? true : false,
      extra:
        USE_SSL === 'true' && ENVIRONMENT !== 'DEVELOPMENT'
          ? {
              ssl: {
                rejectUnauthorized: SSL_AUTHORIZE === 'true' ? true : false,
              },
            }
          : {},
    };
  }
}

const configService = new ConfigService();

export { configService };
