import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';
import { Image } from './Image';

@Entity()
export class Country extends Tag {
  @ManyToMany(_ => Image, image => image.country)
  @JoinTable()
  images!: Image[];
}
