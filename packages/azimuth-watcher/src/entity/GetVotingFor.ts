//
// Copyright 2021 Vulcanize, Inc.
//

import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { bigintArrayTransformer } from '@cerc-io/util';

@Entity()
@Index(['blockHash', 'contractAddress', '_proxy'], { unique: true })
export class GetVotingFor {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column('varchar', { length: 66 })
    blockHash!: string;

  @Column('integer')
    blockNumber!: number;

  @Column('varchar', { length: 42 })
    contractAddress!: string;

  @Column('varchar', { length: 42 })
    _proxy!: string;

  @Column('numeric', { array: true, transformer: bigintArrayTransformer })
    value!: bigint[];

  @Column('text', { nullable: true })
    proof!: string;
}
