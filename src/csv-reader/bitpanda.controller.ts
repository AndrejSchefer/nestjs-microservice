import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { BitpandaService } from './bitpanda.service';

@Controller('bitpanda')
export class BitpandaController {
  constructor(private bitpandaService: BitpandaService) {}

  @Get()
  public async getCSV(
    @Req() request: Request,
    @Query('crypto') crypto,
    @Query('transaction_type') transaction_type,
  ) {
    return await this.bitpandaService.readCSV(crypto, transaction_type);
  }
}
