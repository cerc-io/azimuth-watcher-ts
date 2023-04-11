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

  async _getOwner (blockHash: string, contractAddress: string): Promise<any> {
    const { _owner } = await this._client.query(
      gql(queries._owner),
      { blockHash, contractAddress }
    );

    return _owner;
  }

  async getOperators (blockHash: string, contractAddress: string, key0: string, key1: string): Promise<any> {
    const { operators } = await this._client.query(
      gql(queries.operators),
      { blockHash, contractAddress, key0, key1 }
    );

    return operators;
  }

  async getSponsoringIndexes (blockHash: string, contractAddress: string, key0: number, key1: number): Promise<any> {
    const { sponsoringIndexes } = await this._client.query(
      gql(queries.sponsoringIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return sponsoringIndexes;
  }

  async getEscapeRequestsIndexes (blockHash: string, contractAddress: string, key0: number, key1: number): Promise<any> {
    const { escapeRequestsIndexes } = await this._client.query(
      gql(queries.escapeRequestsIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return escapeRequestsIndexes;
  }

  async getPointOwnerIndexes (blockHash: string, contractAddress: string, key0: string, key1: number): Promise<any> {
    const { pointOwnerIndexes } = await this._client.query(
      gql(queries.pointOwnerIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return pointOwnerIndexes;
  }

  async getManagerForIndexes (blockHash: string, contractAddress: string, key0: string, key1: number): Promise<any> {
    const { managerForIndexes } = await this._client.query(
      gql(queries.managerForIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return managerForIndexes;
  }

  async getSpawningForIndexes (blockHash: string, contractAddress: string, key0: string, key1: number): Promise<any> {
    const { spawningForIndexes } = await this._client.query(
      gql(queries.spawningForIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return spawningForIndexes;
  }

  async getVotingForIndexes (blockHash: string, contractAddress: string, key0: string, key1: number): Promise<any> {
    const { votingForIndexes } = await this._client.query(
      gql(queries.votingForIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return votingForIndexes;
  }

  async getTransferringForIndexes (blockHash: string, contractAddress: string, key0: string, key1: number): Promise<any> {
    const { transferringForIndexes } = await this._client.query(
      gql(queries.transferringForIndexes),
      { blockHash, contractAddress, key0, key1 }
    );

    return transferringForIndexes;
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
