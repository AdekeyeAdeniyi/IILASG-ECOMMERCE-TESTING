import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', (): JwtModuleOptions => {
  const secret = process.env.JWT_SECRET;
  return {
    secret,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    },
  };
});
