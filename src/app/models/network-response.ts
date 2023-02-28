export interface NetworkResponse<TData> {
  statusCode: number;
  data: TData;
  error: string;
}
