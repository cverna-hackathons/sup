import { IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ImageType } from './ImageType';
import { ImageStorageEnum } from './ImageStorageEnum'

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

  @Column({
    type: 'enum',
    enum: ImageStorageEnum,
    default: [ ImageStorageEnum.LOCAL ]
  })
  public storage!: ImageStorageEnum;

  get fileName(): string {
    const [ fname ] = this.filePath.split('/').reverse()

    return fname
  }

  get src(): string {
    return (
      `http://localhost:${process.env.NODE_PORT}/images/${this.fileName}`
    )
  }
  
  @ManyToOne(() => ImageType, (imageType: ImageType) => imageType.images)
  @JoinColumn({ name: 'image_type_id' })
  public imageType!: ImageType;
}