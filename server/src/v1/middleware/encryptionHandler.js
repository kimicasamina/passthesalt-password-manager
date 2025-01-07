import crypto from "crypto";

// Check environment variable for the key
const key = crypto.createHash("sha256").update(process.env.SECURE_KEY).digest(); // 32-byte key
const algorithm = "aes-256-cbc";

// Encryption function
export const encrypt = (password) => {
  console.log("Encryption...");
  const iv = crypto.randomBytes(16); // Generate a random IV
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), password: encrypted };
};

// Decryption function
export const decrypt = (encryptedData) => {
  console.log("Decryption...", encryptedData);
  const iv = Buffer.from(encryptedData.iv, "hex"); // Convert IV back to buffer
  const encryptedPassword = Buffer.from(encryptedData.password, "hex"); // Convert password back to buffer

  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedPassword, null, "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
