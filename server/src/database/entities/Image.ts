import { IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ImageStorageEnum } from './ImageStorageEnum';
import { ImageType } from './ImageType';

interface IFileUpload {
  path: string,
  location: string,
}

@Entity('images')
export class Image extends BaseEntity {
  public static StorageEnum = ImageStorageEnum;
  public static currentStorage: ImageStorageEnum = (
    process.env.IMAGES_STORAGE === 'S3'
      ? ImageStorageEnum.S3 : ImageStorageEnum.LOCAL
  );
  public static storageFilePath(file: IFileUpload): string {
    return Image.currentStorage === ImageStorageEnum.S3
      ? file.location
      : file.path
  };

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
    default: [ ImageStorageEnum.LOCAL ],
    enum: ImageStorageEnum,
    type: 'enum',
  })
  public storage!: ImageStorageEnum;

  get fileName(): string {
    const [ fname ] = this.filePath.split('/').reverse();

    return fname;
  }

  get storageIsS3() {
    return (this.storage === ImageStorageEnum.S3);
  }

  get src(): string {
    const base = `http://localhost:${process.env.NODE_PORT}`;
    const path = this.storage === ImageStorageEnum.S3
      ? `/api/v1/images/${this.id}`
      : `/images/${this.fileName}`;
    
    return `${base}${path}`;
  }

  @ManyToOne(() => ImageType, (imageType: ImageType) => imageType.images)
  @JoinColumn({ name: 'image_type_id' })
  public imageType!: ImageType;
}