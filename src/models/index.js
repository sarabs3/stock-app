// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserTrades, Scrips } = initSchema(schema);

export {
  UserTrades,
  Scrips
};