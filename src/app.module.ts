import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Default } from './default/default.entity';
import { User } from './interfaces/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationMiddleware } from './middleware/authorization.middleware';
import { DefaultModule } from './default/default.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Default, User],
      synchronize: true,
    }),
    DefaultModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude({
        path: '',
        method: RequestMethod.GET,
      })
      .forRoutes({
        path: 'bank/transfares',
        method: RequestMethod.GET,
      });
  }
}
