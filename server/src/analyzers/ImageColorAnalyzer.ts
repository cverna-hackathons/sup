import * as Debugger from 'debug';
import * as ImageMagick from 'imagemagick';
import { promisify } from 'util';

const debug = Debugger('sub:ImageColorAnalyzer');
type LibCallback = (error: Error, features: ImageMagick.Features) => void;

export function getImageFeatures(filePath: string): Promise<ImageMagick.Features> {
  debug('filePath', filePath);
  return promisify(
    (done: LibCallback) => ImageMagick.identify(filePath, done)
  )();
}