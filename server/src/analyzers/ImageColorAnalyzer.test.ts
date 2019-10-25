import * as Path from 'path';
import { getImageFeatures } from './ImageColorAnalyzer';

const imageFilePath: string = Path.resolve(__dirname, '__fixtures/RedImage.png');

describe(`Image color analyzer [ICA]`, () => {
  it(`Should retrieve image features`, async () => {
    const features = await getImageFeatures(imageFilePath);

    expect(features).toBe(null);
  })
})