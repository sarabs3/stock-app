import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class UserTrades {
  readonly id: string;
  readonly createdDate?: string;
  readonly Scrips?: Scrips;
  readonly quantity?: number;
  readonly price?: number;
  readonly totalAmount?: number;
  readonly target?: number;
  readonly expectedProfit?: number;
  readonly tradeDate?: string;
  readonly userId?: string;
  constructor(init: ModelInit<UserTrades>);
  static copyOf(source: UserTrades, mutator: (draft: MutableModel<UserTrades>) => MutableModel<UserTrades> | void): UserTrades;
}

export declare class Scrips {
  readonly id: string;
  readonly symbol?: string;
  readonly name?: string;
  readonly sector?: string;
  constructor(init: ModelInit<Scrips>);
  static copyOf(source: Scrips, mutator: (draft: MutableModel<Scrips>) => MutableModel<Scrips> | void): Scrips;
}