import { Connection, createConnection } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';

import { saveEntries } from '../save';
import { Entry } from '../types/index.d';
import { Unit } from '../types/index';

describe('save', () => {
  describe('#saveEntry()', () => {
    let connection: Connection;
    let dateNowSpy: jest.SpyInstance;

    beforeEach(async () => {
      connection = await createConnection();
      await connection.dropDatabase();
      await connection.synchronize();
      await connection.close();
      fs.removeSync(path.resolve(__dirname, '../images'));
      dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(0);
    });

    afterAll(async () => {
      // connection = await createConnection();
      // await connection.dropDatabase();
      // await connection.close();
      dateNowSpy.mockRestore();
    });

    it('saves image into database', async () => {
      const entry: Entry[] = [
        {
          imagePublicUrl:
            'https://images.saatchiart.com/saatchi/873993/art/7347253/6416459-QTVRXNRY-6.jpg',
          materials: ['Canvas'],
          medias: ['Oil'],
          subjects: ['Mortality'],
          styles: ['Figurative', 'Fine Art', 'Realism'],
          size: { width: 28, height: 36, unit: Unit['cm'] },
          title: 'Study of a skull',
          country: 'Romania',
          price: 430,
          author: { name: 'István Bába', foreignId: '873993' }
        }
      ];

      const [savedImage] = await saveEntries(entry);

      expect(JSON.stringify(savedImage)).toMatchSnapshot();
      expect(fs.existsSync(savedImage.imageUrl)).toBe(true);
    });
  });
});
