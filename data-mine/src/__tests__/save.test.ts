import { Connection, createConnection } from 'typeorm';

import { saveEntry } from '../save';
import { Entry } from '../types/index.d';
import { Unit } from '../types/index';

describe('save', () => {
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
        imageBase64: 'pngBase64',
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
