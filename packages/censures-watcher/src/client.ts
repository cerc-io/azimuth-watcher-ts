//
// Copyright 2021 Vulcanize, Inc.
//

import { gql } from '@apollo/client/core';
import { GraphQLClient, GraphQLConfig } from '@cerc-io/ipld-eth-client';

import { queries, mutations, subscriptions } from './gql';

export class Client {
  _config: GraphQLConfig;
  _client: GraphQLClient;

  constructor (config: GraphQLConfig) {
    this._config = config;

    this._client = new GraphQLClient(config);
  }

  async getGetCensuringCount (blockHash: string, contractAddress: string, _whose: number): Promise<any> {
    const { getCensuringCount } = await this._client.query(
      gql(queries.getCensuringCount),
      { blockHash, contractAddress, _whose }
    );

    return getCensuringCount;
  }

  async getGetCensuring (blockHash: string, contractAddress: string, _whose: number): Promise<any> {
    const { getCensuring } = await this._client.query(
      gql(queries.getCensuring),
      { blockHash, contractAddress, _whose }
    );

    return getCensuring;
  }

  async getGetCensuredByCount (blockHash: string, contractAddress: string, _who: number): Promise<any> {
    const { getCensuredByCount } = await this._client.query(
      gql(queries.getCensuredByCount),
      { blockHash, contractAddress, _who }
    );

    return getCensuredByCount;
  }

  async getGetCensuredBy (blockHash: string, contractAddress: string, _who: number): Promise<any> {
    const { getCensuredBy } = await this._client.query(
      gql(queries.getCensuredBy),
      { blockHash, contractAddress, _who }
    );

    return getCensuredBy;
  }

  async getEvents (blockHash: string, contractAddress: string, name: string): Promise<any> {
    const { events } = await this._client.query(
      gql(queries.events),
      { blockHash, contractAddress, name }
    );

    return events;
  }

  async getEventsInRange (fromBlockNumber: number, toBlockNumber: number): Promise<any> {
    const { eventsInRange } = await this._client.query(
      gql(queries.eventsInRange),
      { fromBlockNumber, toBlockNumber }
    );

    return eventsInRange;
  }

  async watchContract (contractAddress: string, startingBlock?: number): Promise<any> {
    const { watchContract } = await this._client.mutate(
      gql(mutations.watchContract),
      { contractAddress, startingBlock }
    );

    return watchContract;
  }

  async watchEvents (onNext: (value: any) => void): Promise<ZenObservable.Subscription> {
    return this._client.subscribe(
      gql(subscriptions.onEvent),
      ({ data }) => {
        onNext(data.onEvent);
      }
    );
  }
}
