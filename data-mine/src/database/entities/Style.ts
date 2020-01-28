import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';
import { Image } from './Image';

@Entity()
export class Style extends Tag {
  @ManyToMany(_ => Image, image => image.styles)
  @JoinTable()
  images!: Image[];
}
