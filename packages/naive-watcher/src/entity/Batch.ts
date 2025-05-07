//
// Copyright 2021 Vulcanize, Inc.
//

import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['blockHash', 'contractAddress'])
@Index(['blockHash', 'contractAddress', 'index'])
export class Batch {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column('varchar', { length: 66 })
    blockHash!: string;

  @Column('integer')
    blockNumber!: number;

  @Column('varchar', { length: 42 })
    contractAddress!: string;

  @Column('integer')
    index!: number;

  @Column('text')
    rawBatchData!: string;

  @Column('text', { nullable: true })
    proof!: string;
}
