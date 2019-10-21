import { IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './Image'

@Entity('image_types')
export class ImageType extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    name: 'extension',
    type: 'varchar',
    unique: true
  })
  @IsString()
  public extension!: string;
  @Column({
    name: 'mime_type',
    type: 'varchar'
  })
  @IsString()
  public mimeType!: string;

  @OneToMany(() => Image, (image: Image) => image.imageType) // note: we will create author property in the Photo class below
  public images!: Image[];
}