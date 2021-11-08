import { Controller, Get, Req } from '@nestjs/common';
import { ApiReaderService } from './api-reader.service';

@Controller('bitpanda-api-reader')
export class ApiReaderController {
  constructor(private apiReaderService: ApiReaderService) {}

  @Get('trades')
  public getTrades() {
    return this.apiReaderService.getTrades();
  }

  @Get('/wallets')
  public getWallets() {
    return this.apiReaderService.getWallets();
  }

  @Get('/wallets/transactions/')
  public async getWalletTtransactions() {
    const data: any = await this.apiReaderService.getWalletTtransactions();
    return this.apiReaderService.transformWalletTransactions(data.data);
  }

  @Get('/assets/transactions/commodity')
  public getAssetTransactions() {
    return this.apiReaderService.getAssetTransactions();
  }
}
