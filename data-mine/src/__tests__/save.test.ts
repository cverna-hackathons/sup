import { Connection, createConnection } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';

import { saveEntry } from '../save';
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
      connection = await createConnection();
      await connection.dropDatabase();
      await connection.close();
      dateNowSpy.mockRestore();
    });

    it('saves image into database', async () => {
      const entry: Entry = {
        imagePublicUrl: 'https://lh3.googleusercontent.com/proxy/Y5tFZiY63lftpBgz1_k-pOGqvhvtiRr3Ou00mQfz6a3Wc5MTc7N0xgscNrgHIITbHj1cLw8UGMO4ZqFUA_DPg5Vugp3TyVatVxs',
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
      };

      const savedImage = await saveEntry(entry);

      expect(JSON.stringify(savedImage)).toMatchSnapshot();
      expect(fs.existsSync(savedImage.imageUrl)).toBe(true);
    });
  });
});
