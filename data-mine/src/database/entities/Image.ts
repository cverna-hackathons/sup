import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Material } from './Material';
import { Media } from './Media';
import { Subject } from './Subject';
import { Style } from './Style';
import { Country } from './Country';
import { Dimension } from './Dimension';
import { Author } from './Author';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  imageUrl!: string;

  @Column()
  title?: string;

  @Column()
  price?: number;

  @ManyToMany(_ => Material, material => material.images)
  materials!: Material[];

  @ManyToMany(_ => Media, media => media.images)
  medias!: Media[];

  @ManyToMany(_ => Subject, subject => subject.images)
  subjects!: Subject[];

  @ManyToMany(_ => Style, style => style.images)
  styles!: Style[];

  @ManyToOne(_ => Country, country => country.images)
  country?: Country;

  @OneToOne(_ => Dimension)
  @JoinColumn()
  dimension!: Dimension;

  @ManyToOne(_ => Author, author => author.images)
  author?: Author;
}
