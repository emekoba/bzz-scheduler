import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {
  public getTypeOrmConfig(entities: any): TypeOrmModuleOptions {
    const { ENVIRONMENT, USE_SSL, SSL_AUTHORIZE, DB_SYNC } = process.env;
    console.log(
      '🚀 ~ file: config.service.ts:7 ~ ConfigService ~ getTypeOrmConfig ~ ENVIRONMENT:',
      process.env,
    );
    const {
      [`${ENVIRONMENT}_DB_USERNAME`]: username,
      [`${ENVIRONMENT}_DB_PASSWORD`]: password,
      [`${ENVIRONMENT}_DB_HOST`]: host,
      // [`${ENVIRONMENT}_DB_NAME`]: database,
      [`${ENVIRONMENT}_DB_PORT`]: port,
    } = process.env;

    return {
      host,
      username,
      password,
      // database,
      entities,
      port: +port,
      type: 'mysql',
      synchronize: false,
      // DB_SYNC === 'true' ? true : false,
      extra: {
        ...(USE_SSL === 'true' && ENVIRONMENT !== 'DEVELOPMENT'
          ? {
              ssl: {
                rejectUnauthorized: SSL_AUTHORIZE === 'true' ? true : false,
              },
            }
          : {}),

        query_timeout: 10000,
        connectionTimeoutMillis: 10000,
      },
    };
  }
}

const configService = new ConfigService();

export { configService };
