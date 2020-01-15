import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Image } from './Image';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  followers?: number;

  @Column()
  following?: number;

  @Column()
  totalArtCount!: number;

  @Column()
  soldArtCount!: number;

  @OneToMany(_ => Image, image => image.author)
  images: Image[];
}
