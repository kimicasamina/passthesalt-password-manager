# Passthesalt

Passthesalt is a secure, full-stack password manager designed to safely store and manage user credentials. It uses advanced encryption to protect passwords and provides a seamless user experience, ensuring passwords are only decrypted when explicitly requested by the user.

## Key Features:

- Secure Password Storage: User credentials are encrypted using AES encryption before storage. Decryption occurs only when the user explicitly requests it by clicking a toggle button, ensuring sensitive data remains protected at all times.

- User Authentication: Implements JWT-based authentication for secure login and registration. The system ensures that only authenticated users can access their sensitive information.

- Database: Built with a scalable PostgreSQL database using Sequelize ORM. This structure ensures smooth growth and maintainability as the app scales.

- API: A secure and scalable RESTful API for managing user credentials. Built-in encryption and authentication ensure that sensitive data is always handled securely.

- Password Hashing: During user registration, passwords are securely hashed with bcrypt before being stored, ensuring even the database cannot access the original password.

## Technologies Used:

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM
- Security: AES Encryption, JWT, bcrypt
