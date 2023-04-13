import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const mysql = require('mysql2');

async function bootstrap() {
  const { ENVIRONMENT, USE_SSL, SSL_AUTHORIZE, DB_SYNC } = process.env;
  // console.log(
  //   '🚀 ~ file: config.service.ts:7 ~ ConfigService ~ getTypeOrmConfig ~ ENVIRONMENT:',
  //   process.env,
  // );
  const {
    [`${ENVIRONMENT}_DB_USERNAME`]: username,
    [`${ENVIRONMENT}_DB_PASSWORD`]: password,
    [`${ENVIRONMENT}_DB_HOST`]: host,
    // [`${ENVIRONMENT}_DB_NAME`]: database,
    [`${ENVIRONMENT}_DB_PORT`]: port,
  } = process.env;

  var connection = mysql.createConnection({
    host: 'buzzbite-staging-db-do-user-8387225-0.b.db.ondigitalocean.com',
    user: 'doadmin',
    port: 25060,
    password: 'AVNS_y63vsWXBNCBiJV62l9a',
    // database : 'fys'
  });

  connection.connect((err) => {
    if (!err) console.log('Database connected');
    else
      console.log(
        'Database connection failed!  : ' + JSON.stringify(err, undefined, 2),
      );
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
