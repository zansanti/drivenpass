import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteUserAndData(userId: number) {
  // Deleta credenciais primeiro (por causa da relação)
  await prisma.credential.deleteMany({
    where: { userId },
  });

  // Deleta o usuário
  await prisma.user.delete({
    where: { id: userId },
  });
}