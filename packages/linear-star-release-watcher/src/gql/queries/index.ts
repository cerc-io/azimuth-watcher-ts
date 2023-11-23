import fs from 'fs';
import path from 'path';

export const events = fs.readFileSync(path.join(__dirname, 'events.gql'), 'utf8');
export const eventsInRange = fs.readFileSync(path.join(__dirname, 'eventsInRange.gql'), 'utf8');
export const withdrawLimit = fs.readFileSync(path.join(__dirname, 'withdrawLimit.gql'), 'utf8');
export const verifyBalance = fs.readFileSync(path.join(__dirname, 'verifyBalance.gql'), 'utf8');
export const getRemainingStars = fs.readFileSync(path.join(__dirname, 'getRemainingStars.gql'), 'utf8');
export const getStateByCID = fs.readFileSync(path.join(__dirname, 'getStateByCID.gql'), 'utf8');
export const getState = fs.readFileSync(path.join(__dirname, 'getState.gql'), 'utf8');
export const getSyncStatus = fs.readFileSync(path.join(__dirname, 'getSyncStatus.gql'), 'utf8');
