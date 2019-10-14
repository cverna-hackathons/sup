import { Request, Response } from 'express';
import { handle } from './ErrorHandler';
import { RequestError } from './RequestError';

const testErrorMessage = 'Test error'
const testErrorCode = 500

test('Should throw on throw route', () => {
  let response: any;
  let code: number = 0;
  const responseMock = {
    send: (data: object) => {
      response = data
    },
    status: (codeNumber: number) : any => {
      code = codeNumber

      return responseMock
    }
  };

  handle(
    new RequestError(testErrorMessage, testErrorCode),
    { path: '/test' } as any as Request,
    responseMock as any as Response, () => null
  );

  expect(response.message).toEqual(testErrorMessage);
  expect(response.success).toEqual(false);
  expect(code).toEqual(testErrorCode);
});