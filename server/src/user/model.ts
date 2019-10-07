import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { getManager } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;
  
  @Column()
  public lastName!: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  public email!: string;
}