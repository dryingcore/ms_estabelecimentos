import bcrypt from 'bcrypt';

const salt_rounds = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, salt_rounds);
}

export async function compareHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
