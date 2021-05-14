// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Scrips } = initSchema(schema);

export {
  Scrips
};