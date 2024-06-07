//
// Copyright 2021 Vulcanize, Inc.
//

import assert from 'assert';

import {
  ResultEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateStateForMappingType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateStateForElementaryType
} from '@cerc-io/util';

import { Indexer } from './indexer';

/**
 * Hook function to store an initial state.
 * @param indexer Indexer instance.
 * @param blockHash Hash of the concerned block.
 * @param contractAddress Address of the concerned contract.
 * @returns Data block to be stored.
 */
export async function createInitialState (indexer: Indexer, contractAddress: string, blockHash: string): Promise<any> {
  assert(indexer);
  assert(blockHash);
  assert(contractAddress);

  // Store an empty State.
  const stateData: any = {
    state: {}
  };

  // Use updateStateForElementaryType to update initial state with an elementary property.
  // Eg. const stateData = updateStateForElementaryType(stateData, '_totalBalance', result.value.toString());

  // Use updateStateForMappingType to update initial state with a nested property.
  // Eg. const stateData = updateStateForMappingType(stateData, '_allowances', [owner, spender], allowance.value.toString());

  // Return initial state data to be saved.
  return stateData;
}

/**
 * Hook function to create state diff.
 * @param indexer Indexer instance that contains methods to fetch the contract variable values.
 * @param blockHash Block hash of the concerned block.
 */
export async function createStateDiff (indexer: Indexer, blockHash: string): Promise<void> {
  assert(indexer);
  assert(blockHash);

  // Use indexer.createDiff() method to save custom state diff(s).
}

/**
 * Hook function to create state checkpoint
 * @param indexer Indexer instance.
 * @param contractAddress Address of the concerned contract.
 * @param blockHash Block hash of the concerned block.
 * @returns Whether to disable default checkpoint. If false, the state from this hook is updated with that from default checkpoint.
 */
export async function createStateCheckpoint (indexer: Indexer, contractAddress: string, blockHash: string): Promise<boolean> {
  assert(indexer);
  assert(blockHash);
  assert(contractAddress);

  // Use indexer.createStateCheckpoint() method to create a custom checkpoint.

  // Return false to update the state created by this hook by auto-generated checkpoint state.
  // Return true to disable update of the state created by this hook by auto-generated checkpoint state.
  return false;
}

/**
 * Event hook function.
 * @param indexer Indexer instance that contains methods to fetch and update the contract values in the database.
 * @param eventData ResultEvent object containing event information.
 */
export async function handleEvent (indexer: Indexer, eventData: ResultEvent): Promise<void> {
  assert(indexer);
  assert(eventData);

  const txData = await indexer.getFullTransaction(eventData.tx.hash, eventData.block.number);
  indexer.naiveBatch(eventData.block.hash, eventData.block.number, eventData.contract, txData.ethTransactionCidByTxHash.index, txData.data?.data ?? '');

  // // Perform indexing for PhisherStatusUpdated and MemberStatusUpdated.
  // if (!['PhisherStatusUpdatedEvent', 'MemberStatusUpdatedEvent'].includes(eventData.event.__typename))
  //   return;

  // const txData = await indexer.getFullTransaction(eventData.tx.hash, eventData.block.number);
  // const txDescription = getTxDescription(indexer, KIND_PHISHERREGISTRY, txData.input);
  // let txDescriptions = [txDescription];

  // if (txDescription.signature === INVOKE_SIGNATURE) {
  //   // Parse transactions from batches if it is an invoke method in Delegatable contract.
  //   txDescriptions = txDescription.args.signedInvocations.reduce(
  //     (txs: utils.TransactionDescription[], signedInvocation: any) => {
  //       // Get transactions from signed invocations batch.
  //       const batchTxs = signedInvocation.invocations.batch.map(
  //         (invocation: any) => getTxDescription(indexer, KIND_PHISHERREGISTRY, invocation.transaction.data),
  //       );

  //       txs.push(...batchTxs);

  //       return txs;
  //     },
  //     [],
  //   );
  // }

  // // Filter transactions for claimIfMember and claimIsPhisher methods.
  // txDescriptions = txDescriptions.filter(
  //   (tx: utils.TransactionDescription) => [CLAIM_IF_MEMBER_SIGNATURE, CLAIM_IF_PHISHER_SIGNATURE].includes(tx.signature),
  // );

  // for (const txDescription of txDescriptions) {
  //   switch (txDescription.signature) {
  //     case CLAIM_IF_MEMBER_SIGNATURE:
  //       // Update isMember entry for the identifier in database.
  //       await indexer.isMember(eventData.block.hash, eventData.contract, txDescription.args.identifier, true);
  //       break;
  //     case CLAIM_IF_PHISHER_SIGNATURE:
  //       // Update isPhisher entry for the identifier in database.
  //       await indexer.isPhisher(eventData.block.hash, eventData.contract, txDescription.args.identifier, true);
  //       break;
  //   }
  // }
}

// // Get transaction details from input data.
// const getTxDescription = (indexer: Indexer, contractKind: string, data: string): utils.TransactionDescription => {
//   const contractInterface = indexer.getContractInterface(contractKind);
//   assert(contractInterface);
//   return contractInterface.parseTransaction({ data });
// };
