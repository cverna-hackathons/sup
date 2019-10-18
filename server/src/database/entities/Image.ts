import { IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    name: 'file_path',
    type: 'varchar',
    unique: true
  })
  @IsString()
  public filePath!: string;
}