import { PUSH_DUMMY_USER } from './index';

export function pushDummyUser() {
  return {
    type: PUSH_DUMMY_USER,
    payload: {
      id: '1',
      first_name: 'Dano',
      last_name: 'drevo',
      email: 'dano@drevo.sk',
    },
  };
}
