import { PrismaClient } from '@prisma/client';
import { encrypt, decrypt } from '../utils/cryptoUtils';

const prisma = new PrismaClient();

export async function createCredential(data: {
  title: string;
  url: string;
  username: string;
  password: string;
  userId: number;
}) {
  return prisma.credential.create({
    data: {
      ...data,
      password: encrypt(data.password),
    },
  });
}

export async function findCredentialsByUserId(userId: number) {
  const credentials = await prisma.credential.findMany({
    where: { userId },
  });
  return credentials.map(cred => ({
    ...cred,
    password: decrypt(cred.password),
  }));
}

export async function deleteCredential(id: number, userId: number) {
  return prisma.credential.deleteMany({
    where: { id, userId }, // Garante que só o dono pode deletar
  });
}
export async function findByTitleAndUserId(title: string, userId: number) {
  return prisma.credential.findFirst({
    where: {
      title,
      userId
    }
  });
}