import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { iBitpanda, iWalletTransactions } from 'src/interfaces/interfaces';
import { isWeakMap } from 'util/types';

@Injectable()
export class ApiReaderService {
  private apiKey =
    'e77f90610fa46b69030a5447520d1feb9d254e701ba716bfe2b2b10bc41b3171a761af58a51d4c1cdb97dbfadb8a3ae20d37b59cb5c25481d2b8cf81e3785dce';
  private url = 'https://api.bitpanda.com/v1/';
  private ticker = 'https://api.bitpanda.com/v1/ticker';

  constructor() {}

  public async getTrades() {
    const trades = await axios.get(this.url + 'trades', {
      headers: {
        'X-API-KEY': this.apiKey,
      },
    });

    return trades.data;
  }

  public async getWallets() {
    const wallets = await axios.get(this.url + '/wallets/', {
      headers: {
        'X-API-KEY': this.apiKey,
      },
    });

    return wallets.data;
  }

  public async getWalletTtransactions() {
    const trades = await axios.get(this.url + '/wallets/transactions/', {
      headers: {
        'X-API-KEY': this.apiKey,
      },
    });

    return trades.data;
  }

  public async getAssetTransactions() {
    const assetTransactions = await axios.get(
      this.url + '/assets/transactions/commodity/?page=1&page_size=25',
      {
        headers: {
          'X-API-KEY': this.apiKey,
        },
      },
    );

    return assetTransactions.data;
  }

  public transformWalletTransactions(data: iWalletTransactions[]) {
    const tranformData: iBitpanda[] = [];
    data.forEach((walletTransactions: iWalletTransactions) => {
      console.log(walletTransactions.attributes.trades);

      tranformData.push({
        transaction_id: walletTransactions.id,
        timestamp: walletTransactions.attributes.time.date_iso8601,
        transaction_type: walletTransactions.type,
        in_out: walletTransactions.attributes.in_or_out,
        amount_fiat: walletTransactions.attributes.amount_eur,
        fiat: this.getFiat(
          '1',
          //walletTransactions.attributes.trades.attributes.fiat_id,
        ),
        amouns_asset: walletTransactions.attributes.amount,
        asset: walletTransactions.attributes.cryptocoin_symbol,
        asset_market_price: '',
        asset_market_price_currency: '',
        asset_class: '',
        product_id: walletTransactions.attributes.cryptocoin_id,
        fee: '',
        fee_asset: '',
        spread: '',
      });
    });

    return data;
  }

  private getFiat(id: string) {
    const fiats = [];
    fiats[1] = 'EUR';

    return fiats[id];
  }

  public async getCurrentCryptoPrice() {
    return await axios.get(this.ticker);
  }
}
