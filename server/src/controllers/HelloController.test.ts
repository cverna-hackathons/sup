import * as HelloController from './HelloController';

test('Should have ping route', () => {
  expect(typeof HelloController.ping).toEqual('function');
});
