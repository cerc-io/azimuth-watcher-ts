//
// Copyright 2021 Vulcanize, Inc.
//

import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['blockHash', 'contractAddress', '_participant', '_batch'], { unique: true })
export class HasForfeitedBatch {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column('varchar', { length: 66 })
    blockHash!: string;

  @Column('integer')
    blockNumber!: number;

  @Column('varchar', { length: 42 })
    contractAddress!: string;

  @Column('varchar', { length: 42 })
    _participant!: string;

  @Column('integer')
    _batch!: number;

  @Column('boolean')
    value!: boolean;

  @Column('text', { nullable: true })
    proof!: string;
}
