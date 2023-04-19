//
// Copyright 2021 Vulcanize, Inc.
//

import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { bigintTransformer } from '@cerc-io/util';

@Entity()
@Index(['blockHash', 'contractAddress', '_whose', '_index'], { unique: true })
export class GetOwnedPointAtIndex {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column('varchar', { length: 66 })
    blockHash!: string;

  @Column('integer')
    blockNumber!: number;

  @Column('varchar', { length: 42 })
    contractAddress!: string;

  @Column('varchar', { length: 42 })
    _whose!: string;

  @Column('numeric', { transformer: bigintTransformer })
    _index!: bigint;

  @Column('integer')
    value!: number;

  @Column('text', { nullable: true })
    proof!: string;
}