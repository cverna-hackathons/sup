import { Connection, createConnection } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';

import { saveEntries } from '../save';
import { Entry } from '../types/index.d';
import { Unit } from '../types/index';

describe('save', () => {
  describe('#saveEntry()', () => {
    let connection: Connection;
    let dateNowSpy:jest.SpyInstance;

    beforeEach(async () => {
      connection = await createConnection();
      await connection.dropDatabase();
      await connection.synchronize();
      await connection.close();
      await fs.removeSync(path.resolve(__dirname, '../images'));
      dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(0);
    });

    afterAll(async () => {
      // connection = await createConnection();
      // await connection.dropDatabase();
      // await connection.close();
      dateNowSpy.mockRestore();
    });

    it('saves image into database', async () => {
      const entry: Entry[] = [{
        imagePublicUrl: 'https://gals.kindgirls.com/d3/clover_10993/clover_10993_12.jpg',
        materials: ['canvas'],
        medias: ['Acrylic', 'charcoal'],
        subjects: ['urban'],
        styles: ['cubism'],
        size: {
          width: 100,
          height: 150,
          unit: Unit.cm
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
          soldArtCount: 1
        }
      }];

      const [savedImage] = await saveEntries(entry);

      expect(JSON.stringify(savedImage)).toMatchSnapshot();
      expect(fs.existsSync(savedImage.imageUrl)).toBe(true);
    });
  });
});
