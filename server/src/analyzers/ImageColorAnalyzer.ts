import * as ImageMagick from 'imagemagick';
import { promisify } from 'util';

type LibCallback = (error: Error, features: ImageMagick.Features) => void;

export function getImageFeatures(filePath: string): Promise<ImageMagick.Features> {
  console.log('filePath', filePath);
  return promisify(
    (done: LibCallback) => ImageMagick.identify(filePath, done)
  )();
}