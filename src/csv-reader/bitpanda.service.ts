import { Injectable } from '@nestjs/common';
import { ApiReaderService } from 'src/api-reader/api-reader.service';
import { iBitpanda } from '../interfaces/interfaces';
const csv = require('csv-parser');
const fs = require('fs');

@Injectable()
export class BitpandaService {
  private results: iBitpanda[] = [];
  private sumDeposit = 0;
  private sumBuy = 0;
  private buyAsset = [];

  private csvFolder = 'csv';

  constructor(private apiReaderService: ApiReaderService) {}

  public async readCSV(
    crypto: string = '',
    transaction_type: 'deposit' | 'buy' | 'sell' | 'withdrawal' = 'buy',
  ) {
    this.results = [];

    return new Promise(async (res, rej) => {
      const ticker = await this.apiReaderService.getCurrentCryptoPrice();
      fs.readdir(this.csvFolder, (err, files) => {
        let s = 0;

        files.forEach((file) => {
          fs.createReadStream(this.csvFolder + '/' + file)
            .pipe(csv())
            .on('data', async (data) => {
              if (
                !this.results.some(
                  (result) => result.transaction_id === data['Transaction ID'],
                )
              ) {
                if (data['Asset'] === crypto) {
                  s =
                    s +
                    parseFloat(data['Amount Asset']) *
                      parseFloat(ticker.data[crypto]['EUR']);

                  this.results.push({
                    transaction_id: data['Transaction ID'],
                    timestamp: data['Timestamp'],
                    transaction_type: data['Transaction Type'],
                    in_out: data['In/Out'],
                    amount_fiat: data['Amount Fiat'],
                    fiat: data['Fiat'],
                    amouns_asset: data['Amount Asset'],
                    asset: data['Asset'],
                    asset_market_price: data['Asset market price'],
                    asset_market_price_currency:
                      data['Asset market price currency'],
                    asset_class: data['Asset class'],
                    product_id: data['Product ID'],
                    fee: data['Fee'],
                    fee_asset: data['Fee asset'],
                    spread: data['Spread'],
                    summ: s,
                  });
                }

                if (!this.buyAsset.includes(data['Asset'])) {
                  this.buyAsset.push(data['Asset']);
                }
              }
            })
            .on('end', async () => {
              this.sumBuy = 0;
              const ticker =
                await this.apiReaderService.getCurrentCryptoPrice();

              res({
                currentCryptoPrice: ticker.data[crypto.toUpperCase()],
                results: this.results,
                sum: this.sumBuy,
                buyAsset: this.buyAsset,
                sumAmounsAsset: this.computeAssetsSum(crypto),
              });
            });
        });
      });
    });
  }

  private computeAssetsSum(crypto: string): number {
    let x = 0;
    this.results.forEach((asset: iBitpanda) => {
      let assetNum = 0;
      if (crypto === asset.asset) {
        if (asset.amouns_asset === '-') {
          assetNum = 0;
        } else {
          assetNum = parseFloat(asset.amouns_asset);
        }

        if (asset.in_out === 'outgoing') {
          x = x + assetNum;
        }

        if (asset.in_out === 'incoming') {
          x = x - assetNum;
        }
      }
    });

    return x;
  }

  private select(
    data: iBitpanda[],
    transaction_type: 'overview' | 'deposit' | 'buy' | 'sell' | 'withdrawal',
  ) {
    if (transaction_type === 'overview') {
      return data.filter((crypto: iBitpanda) => {
        if (crypto.transaction_type === 'buy') {
          this.sumBuy = this.sumBuy + parseFloat(crypto.amount_fiat);
        }

        if (crypto.transaction_type === 'sell') {
          this.sumBuy = this.sumBuy - parseFloat(crypto.amount_fiat);
        }
        return crypto;
      });
    }
  }
}
