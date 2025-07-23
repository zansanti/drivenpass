import * as credentialRepository from '../repositories/credentialRepository';
import { PrismaClient } from '@prisma/client';
import { encrypt } from '../utils/cryptoUtils';

const prisma = new PrismaClient();


export async function createCredential(data: {
  title: string;
  url: string;
  username: string;
  password: string;
  userId: number;
}) {
  const existingCredential = await credentialRepository.findByTitleAndUserId(
    data.title,
    data.userId
  );
  if (existingCredential) throw new Error('Title already exists');

  return credentialRepository.createCredential(data);
}

export async function getCredentials(userId: number) {
  return credentialRepository.findCredentialsByUserId(userId);
}

export async function deleteCredential(id: number, userId: number) {
  const deleted = await credentialRepository.deleteCredential(id, userId);
  if (deleted.count === 0) throw new Error('Credential not found');
}

export async function updateCredential(
  id: number,
  userId: number,
  data: { title?: string; url?: string; username?: string; password?: string }
) {
  // Verifica se a credencial existe e pertence ao usuário
  const credential = await prisma.credential.findFirst({
    where: { id, userId },
  });
  if (!credential) throw new Error('Credential not found');

  // Verifica título único (se o título foi alterado)
  if (data.title && data.title !== credential.title) {
    const existingTitle = await prisma.credential.findFirst({
      where: { title: data.title, userId },
    });
    if (existingTitle) throw new Error('Title already exists');
  }

  // Atualiza com senha criptografada (se fornecida)
  const updatedData = data.password
    ? { ...data, password: encrypt(data.password) }
    : data;

  return prisma.credential.update({
    where: { id },
    data: updatedData,
  });
}