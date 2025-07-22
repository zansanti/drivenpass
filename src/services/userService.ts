import * as userRepository from '../repositories/userRepository';

export async function deleteUserAccount(userId: number) {
  await userRepository.deleteUserAndData(userId);
}