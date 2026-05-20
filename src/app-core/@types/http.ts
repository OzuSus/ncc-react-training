export interface IHttpError {
  code: number;
  message: string;
  details: string | null;
  validationErrors: string | null;
}
export interface IHttpResponse<T = unknown> {
  result: T;
  targetUrl: string | null;
  success: boolean;
  error: IHttpError | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
