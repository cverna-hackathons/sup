import { ping } from './hello';

test('Should have ping route', () => {
  expect(typeof ping).toEqual('function');
});
