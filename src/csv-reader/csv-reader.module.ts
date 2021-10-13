import { Module } from '@nestjs/common';
import { BitpandaController } from './bitpanda.controller';
import { BitpandaService } from './bitpanda.service';

@Module({
    controllers: [BitpandaController],
    providers: [BitpandaService]
})
export class CsvReaderModule {}
