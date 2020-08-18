import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TimestampEntites {
  @CreateDateColumn(
    {
      update: false
    }
  )
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
