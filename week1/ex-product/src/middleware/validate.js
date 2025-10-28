export function validate(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        errors: e.errors,
        errorName: e.name
      };
    }
  };
}