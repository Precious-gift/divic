import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * A custom decorator that retrieves the user object from the request object.
 *
 * @param data - Optional data that can be passed to the decorator.
 * @param ctx - The execution context object.
 *
 * @returns The user object from the request.
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Retrieve the request object from the execution context.
    const request: Express.Request = ctx.switchToHttp().getRequest();

    // Return the user object from the request.
    return request.user;
  },
);
