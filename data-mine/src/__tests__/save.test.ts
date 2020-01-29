import { Connection, createConnection } from 'typeorm';

import {
  saveEntry,
  storeImage,
} from '../save';
import { Entry } from '../types/index.d';
import { Unit } from '../types/index';

const testImageUrl = 'https://gals.kindgirls.com/d3/carolina_sweets_21_30092/carolina_sweets_21_30092_1.jpg'

describe('save', () => {
  describe('#storeImage()', () => {
    it('stores and returns image s3 object path', async () => {
      const imagePath = await storeImage(testImageUrl)
      
      expect(typeof imagePath).toEqual('string')
    })
  })
  describe('#saveEntry()', () => {
    let connection: Connection;
    beforeEach(async () => {
      connection = await createConnection();
      await connection.dropDatabase();
      await connection.synchronize();
      await connection.close();
    });
    afterAll(async () => {
      connection = await createConnection();
      await connection.dropDatabase();
      await connection.close();
    });
    it('saves image into database', async () => {
      const entry: Entry = {
        imageUrl: testImageUrl,
        materials: ['canvas'],
        medias: ['Acrylic', 'charcoal'],
        subjects: ['urban'],
        styles: ['cubism'],
        size: {
          width: 100,
          height: 150,
          unit: Unit.cm,
        },
        title: 'New york in dark',
        country: 'US',
        price: 1200,
        author: {
          name: 'Harry Potter',
          foreignId: '1',
          followers: 100,
          following: 10,
          totalArtCount: 2,
          soldArtCount: 1,
        },
      };

      const savedImage = await saveEntry(entry);

      expect(JSON.stringify(savedImage)).toMatchSnapshot();
    });
  });
});
