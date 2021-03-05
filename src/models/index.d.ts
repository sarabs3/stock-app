import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TradeActions {
  BUY = "BUY",
  SELL = "SELL"
}



export declare class Trades {
  readonly id: string;
  readonly scripName?: string;
  readonly quantity?: number;
  readonly price?: number;
  readonly amount?: number;
  readonly buyDate?: string;
  readonly sellDate?: string;
  readonly profit?: number;
  readonly action?: TradeActions | keyof typeof TradeActions;
  constructor(init: ModelInit<Trades>);
  static copyOf(source: Trades, mutator: (draft: MutableModel<Trades>) => MutableModel<Trades> | void): Trades;
}