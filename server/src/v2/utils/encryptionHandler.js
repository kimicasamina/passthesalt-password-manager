import crypto from 'crypto';

// Generate key from environment variable (ensure SECURE_KEY is the same for both encryption and decryption)
const key = crypto.createHash('sha256').update(process.env.SECURE_KEY).digest(); // 32-byte key
const algorithm = 'aes-256-cbc'; // AES-256-CBC algorithm

// Encryption function
export const encrypt = (password) => {
  console.log('Encryption...');

  const iv = crypto.randomBytes(16); // Generate a random 16-byte IV (Initialization Vector)

  // Create cipher instance
  let cipher = crypto.createCipheriv(algorithm, key, iv);

  // Encrypt password
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return encrypted password along with the IV used
  return { iv: iv.toString('hex'), password: encrypted };
};

// Decryption function
export const decrypt = (encryptedData) => {
  console.log('Decryption...', encryptedData);

  // Convert IV and encrypted password back to buffers
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const encryptedPassword = Buffer.from(encryptedData.password, 'hex');

  // Create decipher instance
  let decipher = crypto.createDecipheriv(algorithm, key, iv);

  // Decrypt the password
  let decrypted = decipher.update(encryptedPassword, null, 'utf8');
  decrypted += decipher.final('utf8');

  // Return decrypted password
  return decrypted;
};
