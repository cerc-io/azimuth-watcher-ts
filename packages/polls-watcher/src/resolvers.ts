//
// Copyright 2021 Vulcanize, Inc.
//

import assert from 'assert';
import debug from 'debug';
import { GraphQLResolveInfo } from 'graphql';
import { ExpressContext } from 'apollo-server-express';
import winston from 'winston';

import {
  ValueResult,
  gqlTotalQueryCount,
  gqlQueryCount,
  gqlQueryDuration,
  getResultState,
  IndexerInterface,
  GraphQLBigInt,
  GraphQLBigDecimal,
  EventWatcher,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setGQLCacheHints
} from '@cerc-io/util';

import { Indexer } from './indexer';

const log = debug('vulcanize:resolver');

const executeAndRecordMetrics = async (
  indexer: Indexer,
  gqlLogger: winston.Logger,
  opName: string,
  expressContext: ExpressContext,
  operation: () => Promise<any>
) => {
  gqlTotalQueryCount.inc(1);
  gqlQueryCount.labels(opName).inc(1);
  const endTimer = gqlQueryDuration.labels(opName).startTimer();

  try {
    const [result, syncStatus] = await Promise.all([
      operation(),
      indexer.getSyncStatus()
    ]);

    gqlLogger.info({
      opName,
      query: expressContext.req.body.query,
      variables: expressContext.req.body.variables,
      latestIndexedBlockNumber: syncStatus?.latestIndexedBlockNumber,
      urlPath: expressContext.req.path,
      apiKey: expressContext.req.header('x-api-key'),
      origin: expressContext.req.headers.origin
    });
    return result;
  } catch (error) {
    gqlLogger.error({
      opName,
      error,
      query: expressContext.req.body.query,
      variables: expressContext.req.body.variables,
      urlPath: expressContext.req.path,
      apiKey: expressContext.req.header('x-api-key'),
      origin: expressContext.req.headers.origin
    });
  } finally {
    endTimer();
  }
};

export const createResolvers = async (
  indexerArg: IndexerInterface,
  eventWatcher: EventWatcher,
  gqlLogger: winston.Logger
): Promise<any> => {
  const indexer = indexerArg as Indexer;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gqlCacheConfig = indexer.serverConfig.gql.cache;

  return {
    BigInt: GraphQLBigInt,

    BigDecimal: GraphQLBigDecimal,

    Event: {
      __resolveType: (obj: any) => {
        assert(obj.__typename);

        return obj.__typename;
      }
    },

    Subscription: {
      onEvent: {
        subscribe: () => eventWatcher.getEventIterator()
      }
    },

    Mutation: {
      watchContract: async (_: any, { address, kind, checkpoint, startingBlock = 1 }: { address: string, kind: string, checkpoint: boolean, startingBlock: number }): Promise<boolean> => {
        log('watchContract', address, kind, checkpoint, startingBlock);
        await indexer.watchContract(address, kind, checkpoint, startingBlock);

        return true;
      }
    },

    Query: {
      getUpgradeProposals: (
        _: any,
        { blockHash, contractAddress }: { blockHash: string, contractAddress: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('getUpgradeProposals', blockHash, contractAddress);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getUpgradeProposals',
          expressContext,
          async () => indexer.getUpgradeProposals(blockHash, contractAddress)
        );
      },

      getUpgradeProposalCount: (
        _: any,
        { blockHash, contractAddress }: { blockHash: string, contractAddress: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('getUpgradeProposalCount', blockHash, contractAddress);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getUpgradeProposalCount',
          expressContext,
          async () => indexer.getUpgradeProposalCount(blockHash, contractAddress)
        );
      },

      getDocumentProposals: (
        _: any,
        { blockHash, contractAddress }: { blockHash: string, contractAddress: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('getDocumentProposals', blockHash, contractAddress);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getDocumentProposals',
          expressContext,
          async () => indexer.getDocumentProposals(blockHash, contractAddress)
        );
      },

      getDocumentProposalCount: (
        _: any,
        { blockHash, contractAddress }: { blockHash: string, contractAddress: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('getDocumentProposalCount', blockHash, contractAddress);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getDocumentProposalCount',
          expressContext,
          async () => indexer.getDocumentProposalCount(blockHash, contractAddress)
        );
      },

      getDocumentMajorities: (
        _: any,
        { blockHash, contractAddress }: { blockHash: string, contractAddress: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('getDocumentMajorities', blockHash, contractAddress);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getDocumentMajorities',
          expressContext,
          async () => indexer.getDocumentMajorities(blockHash, contractAddress)
        );
      },

      hasVotedOnUpgradePoll: (
        _: any,
        { blockHash, contractAddress, _galaxy, _proposal }: { blockHash: string, contractAddress: string, _galaxy: number, _proposal: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('hasVotedOnUpgradePoll', blockHash, contractAddress, _galaxy, _proposal);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'hasVotedOnUpgradePoll',
          expressContext,
          async () => indexer.hasVotedOnUpgradePoll(blockHash, contractAddress, _galaxy, _proposal)
        );
      },

      hasVotedOnDocumentPoll: (
        _: any,
        { blockHash, contractAddress, _galaxy, _proposal }: { blockHash: string, contractAddress: string, _galaxy: number, _proposal: string },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expressContext: ExpressContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        info: GraphQLResolveInfo
      ): Promise<ValueResult> => {
        log('hasVotedOnDocumentPoll', blockHash, contractAddress, _galaxy, _proposal);

        // Set cache-control hints
        // setGQLCacheHints(info, {}, gqlCacheConfig);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'hasVotedOnDocumentPoll',
          expressContext,
          async () => indexer.hasVotedOnDocumentPoll(blockHash, contractAddress, _galaxy, _proposal)
        );
      },

      events: async (
        _: any,
        { blockHash, contractAddress, name }: { blockHash: string, contractAddress: string, name?: string },
        expressContext: ExpressContext
      ) => {
        log('events', blockHash, contractAddress, name);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'events',
          expressContext,
          async () => {
            const block = await indexer.getBlockProgress(blockHash);
            if (!block || !block.isComplete) {
              throw new Error(`Block hash ${blockHash} number ${block?.blockNumber} not processed yet`);
            }

            const events = await indexer.getEventsByFilter(blockHash, contractAddress, name);
            return events.map(event => indexer.getResultEvent(event));
          }
        );
      },

      eventsInRange: async (
        _: any,
        { fromBlockNumber, toBlockNumber }: { fromBlockNumber: number, toBlockNumber: number },
        expressContext: ExpressContext
      ) => {
        log('eventsInRange', fromBlockNumber, toBlockNumber);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'eventsInRange',
          expressContext,
          async () => {
            const syncStatus = await indexer.getSyncStatus();

            if (!syncStatus) {
              throw new Error('No blocks processed yet');
            }

            if ((fromBlockNumber < syncStatus.initialIndexedBlockNumber) || (toBlockNumber > syncStatus.latestProcessedBlockNumber)) {
              throw new Error(`Block range should be between ${syncStatus.initialIndexedBlockNumber} and ${syncStatus.latestProcessedBlockNumber}`);
            }

            const events = await indexer.getEventsInRange(fromBlockNumber, toBlockNumber);
            return events.map(event => indexer.getResultEvent(event));
          }
        );
      },

      getStateByCID: async (
        _: any,
        { cid }: { cid: string },
        expressContext: ExpressContext
      ) => {
        log('getStateByCID', cid);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getStateByCID',
          expressContext,
          async () => {
            const state = await indexer.getStateByCID(cid);

            return state && state.block.isComplete ? getResultState(state) : undefined;
          }
        );
      },

      getState: async (
        _: any,
        { blockHash, contractAddress, kind }: { blockHash: string, contractAddress: string, kind: string },
        expressContext: ExpressContext
      ) => {
        log('getState', blockHash, contractAddress, kind);

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getState',
          expressContext,
          async () => {
            const state = await indexer.getPrevState(blockHash, contractAddress, kind);

            return state && state.block.isComplete ? getResultState(state) : undefined;
          }
        );
      },

      getSyncStatus: async (
        _: any,
        __: Record<string, never>,
        expressContext: ExpressContext
      ) => {
        log('getSyncStatus');

        return executeAndRecordMetrics(
          indexer,
          gqlLogger,
          'getSyncStatus',
          expressContext,
          async () => indexer.getSyncStatus()
        );
      }
    }
  };
};
