import { UserEntity } from 'entities';

export const jwtVerify = async (): Promise<
  Pick<UserEntity, 'id' | 'role'> | undefined
> => {
  return undefined;
};
