export class RequestError extends Error {
  
  public customMessage: string;
  public customCode: number;
  
  constructor(message = 'Unknown request error', code = 500) {
    super(message);
    this.customMessage = message;
    this.customCode = code;
  }
}