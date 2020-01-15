import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';
import { Image } from './Image';

@Entity()
export class Media extends Tag {
  @ManyToMany(_ => Image, image => image.medias)
  @JoinTable()
  images!: Image[];
}
