import { Module } from '@nestjs/common';
import { ApiReaderController } from './api-reader.controller';
import { ApiReaderService } from './api-reader.service';

@Module({
  controllers: [ApiReaderController],
  providers: [ApiReaderService],
})
export class ApiReaderModule {}
