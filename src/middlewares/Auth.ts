// this checks Bearer token, if not supplied the request will be rejected!
export default function AuthRoute(ctx: any) {
  console.log('before ---- handle');
  if (!ctx.bearer) {
    ctx.set.status = 400;
    ctx.set.headers[
      'WWW-Authenticate'
    ] = `Bearer realm='sign', error="invalid_request"`;

    return 'unauthorized';
  }
  // drop your auth logic here
}
