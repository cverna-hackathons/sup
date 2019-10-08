import * as Users from './users';

test('Should list users', () => {
  expect(typeof Users.list).toEqual('function');
});