import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Default {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  public timestamp: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  positiv: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  negative: number;

  @Column()
  file: string;

  @Column()
  insert_date: Date;
}
