import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(userData: { name: string; email: string; password: string }) {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });
}

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Email not found');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}