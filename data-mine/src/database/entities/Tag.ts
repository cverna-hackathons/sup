import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class Tag {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    unique: true
  })
  name!: string;
}
