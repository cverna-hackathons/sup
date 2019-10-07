import * as HelloController from './hello';

test('Should have ping route', () => {
  expect(typeof HelloController.ping).toEqual('function');
});
