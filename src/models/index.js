// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TradeActions = {
  "BUY": "BUY",
  "SELL": "SELL"
};

const { Trades } = initSchema(schema);

export {
  Trades,
  TradeActions
};