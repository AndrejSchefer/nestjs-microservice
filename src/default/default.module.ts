import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/interfaces/user.entity';
import { DefaultController } from './default.controller';
import { DefaultService } from './default.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DefaultService],
  controllers: [DefaultController],
  exports: [DefaultService],
})
export class DefaultModule {}
