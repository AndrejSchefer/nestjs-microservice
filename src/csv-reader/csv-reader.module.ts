import { Module } from '@nestjs/common';
import { ApiReaderService } from 'src/api-reader/api-reader.service';
import { BitpandaController } from './bitpanda.controller';
import { BitpandaService } from './bitpanda.service';

@Module({
  controllers: [BitpandaController],
  providers: [BitpandaService, ApiReaderService],
})
export class CsvReaderModule {}
