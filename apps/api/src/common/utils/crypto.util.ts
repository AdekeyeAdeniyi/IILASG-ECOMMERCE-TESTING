import * as crypto from 'crypto';

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
const IV = Buffer.from(process.env.ENCRYPTION_IV!, 'hex');

const algorithm = 'aes-256-cbc';

export async function encrypt(text: string): Promise<string> {
  const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export async function decrypt(encryptedText: string): Promise<string> {
  const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, IV);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
