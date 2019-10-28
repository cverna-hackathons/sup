import * as Debugger from 'debug';
import * as Path from 'path';
import { getImageFeatures } from './ImageColorAnalyzer';

const debug = Debugger('sup:test:ImageColorAnalyzer');
const imageFilePath: string = Path.resolve(
  __dirname, '__fixtures__/RedImage.png'
);

describe(`Image color analyzer [ICA]`, () => {
  it(`Should retrieve image features`, async () => {
    const features = await getImageFeatures(imageFilePath);

    debug('features', features);
    expect(features.format).toBe('PNG');
    expect(features.width).toBe(400);
    expect(features.height).toBe(400);
  })
})