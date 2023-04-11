import fs from 'fs';
import path from 'path';

export const events = fs.readFileSync(path.join(__dirname, 'events.gql'), 'utf8');
export const eventsInRange = fs.readFileSync(path.join(__dirname, 'eventsInRange.gql'), 'utf8');
export const _owner = fs.readFileSync(path.join(__dirname, '_owner.gql'), 'utf8');
export const operators = fs.readFileSync(path.join(__dirname, 'operators.gql'), 'utf8');
export const sponsoringIndexes = fs.readFileSync(path.join(__dirname, 'sponsoringIndexes.gql'), 'utf8');
export const escapeRequestsIndexes = fs.readFileSync(path.join(__dirname, 'escapeRequestsIndexes.gql'), 'utf8');
export const pointOwnerIndexes = fs.readFileSync(path.join(__dirname, 'pointOwnerIndexes.gql'), 'utf8');
export const managerForIndexes = fs.readFileSync(path.join(__dirname, 'managerForIndexes.gql'), 'utf8');
export const spawningForIndexes = fs.readFileSync(path.join(__dirname, 'spawningForIndexes.gql'), 'utf8');
export const votingForIndexes = fs.readFileSync(path.join(__dirname, 'votingForIndexes.gql'), 'utf8');
export const transferringForIndexes = fs.readFileSync(path.join(__dirname, 'transferringForIndexes.gql'), 'utf8');
export const getSyncStatus = fs.readFileSync(path.join(__dirname, 'getSyncStatus.gql'), 'utf8');
export const getStateByCID = fs.readFileSync(path.join(__dirname, 'getStateByCID.gql'), 'utf8');
export const getState = fs.readFileSync(path.join(__dirname, 'getState.gql'), 'utf8');
