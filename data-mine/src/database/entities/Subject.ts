import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';
import { Image } from './Image';

@Entity()
export class Subject extends Tag {
  @ManyToMany(_ => Image, image => image.subjects)
  @JoinTable()
  images!: Image[];
}
