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
  foreignId?: string;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  followers?: number;

  @Column({
    nullable: true,
  })
  following?: number;

  @Column({
    nullable: true,
  })
  totalArtCount?: number;

  @Column({
    nullable: true,
  })
  soldArtCount?: number;

  @OneToMany(_ => Image, image => image.author)
  images!: Image[];
}
