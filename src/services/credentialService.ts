import * as credentialRepository from '../repositories/credentialRepository';


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