import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';
import { Image } from './Image';

@Entity()
export class Material extends Tag {
  @ManyToMany(_ => Image, image => image.materials)
  @JoinTable()
  images!: Image[];
}
