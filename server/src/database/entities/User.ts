import { IsEmail } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    name: 'first_name',
  })
  public firstName!: string;
  
  @Column({
    name: 'last_name',
  })
  public lastName!: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  @IsEmail()
  public email!: string;
}