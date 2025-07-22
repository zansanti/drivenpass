import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.CRYPTR_SECRET!);

export function encrypt(data: string): string {
  return cryptr.encrypt(data);
}

export function decrypt(encryptedData: string): string {
  return cryptr.decrypt(encryptedData);
}