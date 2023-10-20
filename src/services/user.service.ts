import { UserEntity } from "entities";
import { Logger, encryptPassword, getUserRepository } from "utils";

export const getUser = async (email: string): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
  .createQueryBuilder('user')
  .select([
      'user.email',
      'user.name',
      'user.role',
  ])
  .where('user.email = :email', {email})
  .getOne();
  Logger.log("User", user);
  return user;
};

export const getUserById = async (id: string): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
  .createQueryBuilder('user')
  .select([
      'user.email',
      'user.name',
      'user.role',
  ])
  .where('user.id = :id', {id})
  .getOne();
  Logger.log("User", user);
  return user;
};

export const getPassword = async (email: string): Promise<string | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
  .createQueryBuilder('user')
  .select([
      'user.password',
  ])
  .where('user.email = :email', {email})
  .getOne();
  return user.password;
};

export const createUser = async (
  email: string,
  name: string,
  password: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user = new UserEntity();
  user.email = email;
  user.name = name;
  user.password = password;
  await userRepository.save(user);
  return user;
};

export const updatePassword = async (
  email: string,
  update: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository.findOneBy({
    email: email,
  });
  user.password = update;
  await userRepository.save(user);
  return user;
};
