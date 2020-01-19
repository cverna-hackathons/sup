import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Unit } from '../../index.d';

@Entity()
export class Dimension {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  width!: number;

  @Column()
  height!: number;

  @Column({
    type: 'enum',
    enum: Unit,
    default: Unit.in
  })
  unit!: Unit;
}
