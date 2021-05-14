import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Scrips {
  readonly id: string;
  readonly symbol?: string;
  readonly name?: string;
  readonly sector?: string;
  constructor(init: ModelInit<Scrips>);
  static copyOf(source: Scrips, mutator: (draft: MutableModel<Scrips>) => MutableModel<Scrips> | void): Scrips;
}