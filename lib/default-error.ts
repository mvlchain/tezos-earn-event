export default class DefaultError {
  protected returnErrorObject(message: string, code?: string) {
    return returnErrorObject(message, code);
  }
}
export const returnErrorObject = (message: string, code?: string) => {
  return JSON.stringify({
    message,
    code,
  });
};
