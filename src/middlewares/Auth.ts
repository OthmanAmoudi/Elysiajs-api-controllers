export default function protectedRoute(ctx: any) {
  console.log('before ---- handle');
  if (!ctx.bearer) {
    ctx.set.status = 400;
    ctx.set.headers[
      'WWW-Authenticate'
    ] = `Bearer realm='sign', error="invalid_request"`;

    return 'unauthorized';
  }
}
