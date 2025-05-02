export interface HttpRequest<B,Q,P> {
  body: B,
  params: P,
  query: Q
}
export interface HttpResponse<B> {
  statusCode: number
  body: B
}