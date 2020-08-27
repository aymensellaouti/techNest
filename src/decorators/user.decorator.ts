import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorateur récupérable via @User
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
