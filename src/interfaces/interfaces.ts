export type Transaction_type =
  | 'overview'
  | 'deposit'
  | 'buy'
  | 'sell'
  | 'withdrawal'
  | 'wallet_transaction'
  | 'trade';

export interface iBitpanda {
  transaction_id: string;
  timestamp: string;
  transaction_type: Transaction_type;
  in_out: string;
  amount_fiat: string;
  fiat: string;
  amouns_asset: string;
  asset: string;
  asset_market_price: string;
  asset_market_price_currency: string;
  asset_class: string;
  product_id: string;
  fee: string;
  fee_asset: string;
  spread: string;
  summ?: number;
}

export interface iWalletTransactions {
  type: Transaction_type;
  attributes: iAttributes;
  id: string;
}

export interface iAttributes {
  amount: string;
  recipient: string;
  time: { date_iso8601: string; unix: string };
  confirmations: number;
  in_or_out: 'incoming' | 'outcoming';
  type: 'buy';
  status: string;
  amount_eur: string;
  amount_eur_incl_fee: string;
  wallet_id: string;
  confirmation_by: string;
  confirmed: boolean;
  cryptocoin_id: string;
  cryptocoin_symbol: string;
  trade_id: string;
  trades: iTrade;
  last_changed: { date_iso8601: string; unix: string };
  fee: string;
  current_fiat_id: string;
  current_fiat_amount: string;
  is_savings: boolean;
  is_metal_storage_fee: boolean;
  tags: [];
  public_status: string;
  is_bfc: boolean;
  is_card: boolean;
}

export interface iTrade {
  type: string;
  attributes: {
    status: string;
    type: string;
    cryptocoin_id: string;
    fiat_id: string;
    amount_fiat: string;
    amount_cryptocoin: string;
    fiat_to_eur_rate: string;
    wallet_id: string;
    fiat_wallet_id: string;
    time: { date_iso8601: string; unix: string };
    price: string;
    is_swap: boolean;
    is_savings: boolean;
    tags: [];
    bfc_used: boolean;
    is_card: boolean;
  };
}
