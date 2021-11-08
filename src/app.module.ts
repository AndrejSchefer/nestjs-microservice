import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CsvReaderModule } from './csv-reader/csv-reader.module';
import { ApiReaderModule } from './api-reader/api-reader.module';

@Module({
  imports: [CsvReaderModule, ApiReaderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
