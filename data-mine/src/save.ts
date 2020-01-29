import * as Request from 'request';
import * as Sharp from 'sharp';
import { createWriteStream } from 'fs';
import {
  createConnection,
  getRepository,
  ObjectType,
} from 'typeorm';

import { Entry, Size, Author } from './types/index.d';
import { Image } from './database/entities/Image';
import { Material } from './database/entities/Material';
import { Media } from './database/entities/Media';
import { Subject } from './database/entities/Subject';
import { Style } from './database/entities/Style';
import { Country } from './database/entities/Country';
import { Dimension } from './database/entities/Dimension';
import { Author as AuthorEntity } from './database/entities/Author';

import * as path from "path";
import * as dotenv from 'dotenv';
const env = process.env.ENVIRONMENT || '';
const envPath = path.resolve(__dirname, `../config/${env}.env`);
dotenv.config({ path: envPath});

export async function storeImage(imageUrl: string): Promise<string> {
  const imageFilePath = '/tmp/holubicka.jpg'
  const imageStream = Request(imageUrl)

  const resizer = Sharp()
    .resize(100, 100)
    .jpeg()
  
  return new Promise((resolve) => {
    // First, download the image
    imageStream
      // Second resize the image
      .pipe(resizer)
      .pipe(createWriteStream(imageFilePath))
      .on('close', () => resolve(imageFilePath))
  })
}

async function getStringEntities<T>(
  entity: ObjectType<T>,
  names: string[] = []
): Promise<T[]> {
  return Promise.all(
    names.map((name: string) => {
      return getStringEntity<T>(entity, name);
    }),
  );
}

async function getStringEntity<T>(entity: ObjectType<T>, name: string): Promise<T> {
  const repo = getRepository(entity);
  const entry = await repo.findOne({
    where: [
      {
        name
      }
    ]
  });
  if (entry) {
    return Promise.resolve(entry);
  }
  const newEntry = repo.create();
  // @ts-ignore
  newEntry.name = name;
  await repo.save(newEntry);
  return newEntry;
}

async function getDimension(size: Size): Promise<Dimension> {
  const repo = getRepository(Dimension);
  const newDimension = new Dimension();
  newDimension.height = size.height;
  newDimension.width = size.width;
  newDimension.unit = size.unit;
  return repo.save(newDimension);
}

async function getAuthor(author: Author): Promise<AuthorEntity> {
  const repo = getRepository(AuthorEntity);
  const query = author.foreignId ? { foreignId: author.foreignId } : { name: author.name };
  const authorEntry = await repo.findOne({
    where: query,
  });
  if (authorEntry) {
    // TODO maybe we want to update existing author with freshest data?
    return Promise.resolve(authorEntry);
  }

  const newAuthorEntry = repo.create();
  newAuthorEntry.foreignId = author.foreignId;
  newAuthorEntry.name = author.name;
  newAuthorEntry.followers = author.followers;
  newAuthorEntry.following = author.following;
  newAuthorEntry.totalArtCount = author.totalArtCount;
  newAuthorEntry.soldArtCount = author.soldArtCount;
  return repo.save(newAuthorEntry);
}

export async function saveEntry(entry: Entry): Promise<Image> {
  // TODO sanitize entry (all data lower cased, trimmed ...) so we don't have duplicates
  const { manager } = await createConnection();

  const image = new Image();
  image.imageUrl = await storeImage(entry.imageUrl);
  image.title = entry.title;
  image.price = entry.price;
  image.materials = await getStringEntities<Material>(
    Material,
    entry.materials
  );
  image.medias = await getStringEntities<Media>(Media, entry.medias);
  image.subjects = await getStringEntities<Subject>(Subject, entry.subjects);
  image.styles = await getStringEntities<Style>(Style, entry.styles);
  image.country = entry.country ? await getStringEntity<Country>(Country, entry.country) : undefined;
  image.dimension = await getDimension(entry.size);
  image.author = entry.author ? await getAuthor(entry.author) : undefined;

  const newImage = await manager.save(image);
  await manager.connection.close();
  return newImage;
}
