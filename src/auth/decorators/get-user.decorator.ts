import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    console.log(req);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return !data ? user : user[data];
  },
);
