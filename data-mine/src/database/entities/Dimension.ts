import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Unit } from '../../types/index';

@Entity()
export class Dimension {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: 'float'
  })
  width!: number;

  @Column({
    type: 'float'
  })
  height!: number;

  @Column({
    type: 'enum',
    enum: Unit,
    default: Unit.in
  })
  unit!: Unit;
}
