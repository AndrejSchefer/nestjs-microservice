import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultController } from './default.controller';
import { Default } from './default.entity';
import { DefaultService } from './default.service';

@Module({
  imports: [TypeOrmModule.forFeature([Default])],
  providers: [DefaultService],
  controllers: [DefaultController],
  exports: [DefaultService],
})
export class DefaultModule {}
