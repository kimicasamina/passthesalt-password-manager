# Passthesalt

Is a full-stack password manager application designed to securely store and retrieve user login credentials. The system ensures that passwords are encrypted before being saved to the database and can only be decrypted when needed by the client. Built using React.js with Vite and Tailwind CSS for the frontend, and Node.js, Sequelize, and PostgreSQL for the backend, this application is a secure, scalable, and maintainable solution for managing sensitive user information.

## Key Features:

### Secure Password Storage:

- The application uses the crypto library's AES encryption algorithm to encrypt passwords during storage. When a user retrieves their credentials, the system decrypts the password, ensuring sensitive data is protected at all times.

### User Authentication:

- A secure authentication system is implemented using JWT (JSON Web Tokens) to handle user login, registration, and session management. JWT tokens are used to secure API endpoints and ensure only authenticated users can access certain resources, such as password data.

### Database with Sequelize and PostgreSQL:

- The backend uses Sequelize ORM with a PostgreSQL database to create a scalable and maintainable structure for storing user credentials and data. The database is designed to grow with the application, utilizing migrations and models for easy updates and structure management.

### Scalable and Maintainable API:

- The API is built to be both scalable and maintainable, with a focus on security, performance, and code quality. It supports creating, updating, deleting, and retrieving user credentials while keeping security at the forefront with encryption and secure authentication methods.

### Seamless User Registration and Password Hashing:

- During user registration, Sequelize hooks and validations ensure that all inputs are properly validated. Passwords are automatically hashed using bcrypt before being stored in the database, ensuring that even the database cannot access the original password, which adds an additional layer of security against potential breaches.

### Technologies Used:

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM
- Security: AES Encryption, JWT, bcrypt

data sample

```
"user": {
        "id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
        "email": "saucebot@gmail.com",
        "username": "saucebot",
        "logins": [
            {
                "id": "2f92951a-1e23-4110-96ac-6c3ed72602c2",
                "name": "Day 1",
                "email": "saucebot@gmail.com",
                "username": "saucebot",
                "password": "856fc58a7ba8dc9782c00d0f72bb3cb3",
                "iv": "1e875f8af3dae031cf8717a73f47883a",
                "website": "www.day1.com",
                "favorites": false,
                "createdAt": "2025-01-19T06:47:39.000Z",
                "updatedAt": "2025-01-19T06:47:39.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "3ba8050e-5919-45aa-82b0-6dffd36a5fbb",
                "name": "Get to work",
                "email": "hellooo@gmail.com",
                "username": "hellooo",
                "password": "c3d315d6ce22c984f22748139664a30357b6e3e1c2f29cf295669a7c0560d37e",
                "iv": "fa28c3db3e413b75b404bc9b3a9e6952",
                "website": "www.gettowork.com",
                "favorites": false,
                "createdAt": "2025-01-19T06:59:55.000Z",
                "updatedAt": "2025-01-19T06:59:55.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "45800003-8452-47e2-a55b-7974420bf462",
                "name": "Habitica",
                "email": "saucebot@gmail.com",
                "username": "saucebot",
                "password": "6505c327db70422e16f36d4316b152da",
                "iv": "1b7089e4a05bdbf6696099ece63a4307",
                "website": "www.habitica.com",
                "favorites": false,
                "createdAt": "2025-01-19T07:01:17.000Z",
                "updatedAt": "2025-01-19T07:01:17.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "7950ea4a-2e8e-4b12-9157-a8ffe672aa6f",
                "name": "Github",
                "email": "saucebot@gmail.com",
                "username": "saucebot",
                "password": "fae70f1a77f35aadd9fae74f7a79e4cb",
                "iv": "b325e2f94911d18b74c6bc672f6783ee",
                "website": "www.github.com",
                "favorites": false,
                "createdAt": "2025-01-19T06:44:25.000Z",
                "updatedAt": "2025-01-19T06:44:25.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "b41828f3-d0f9-4f8f-b114-727de90b8756",
                "name": "Netflix",
                "email": "hellooo@gmail.com",
                "username": "hellooo",
                "password": "9a0967fafb4b1f052f57021544c0029e",
                "iv": "e9f3253f1ac8460ee14d82e37c9c4f8a",
                "website": "www.netflix.com",
                "favorites": false,
                "createdAt": "2025-01-19T06:59:16.000Z",
                "updatedAt": "2025-01-19T06:59:16.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "b8b648e0-3d79-4ce7-ba4e-c6dca7d67eef",
                "name": "Notion",
                "email": "hellooo@gmail.com",
                "username": "hellooo",
                "password": "60723cd6dbb50a3eec8a63fc0b01cbdf",
                "iv": "d4cb2c445c15cb520e6e52693246ce13",
                "website": "www.notion.com",
                "favorites": false,
                "createdAt": "2025-01-19T07:00:27.000Z",
                "updatedAt": "2025-01-19T07:00:27.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "e1fb9f58-0917-4db0-83b1-4195cca42283",
                "name": "Spotify",
                "email": "hellooo@gmail.com",
                "username": "hellooo",
                "password": "38f8ec640f2c1cc4148cea6dc41ccc0f",
                "iv": "2d41823a22874d9652c92e3603cb7959",
                "website": "www.spotify.com",
                "favorites": false,
                "createdAt": "2025-01-19T07:00:56.000Z",
                "updatedAt": "2025-01-19T07:00:56.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "f1876b0b-8298-44b4-954f-4658d430fad2",
                "name": "Steam",
                "email": "saucebot@gmail.com",
                "username": "saucebot",
                "password": "a65526ba27647d05066a9f53e14d27e0",
                "iv": "602249073ff0a379e9f620bd17082742",
                "website": "www.steam.com",
                "favorites": false,
                "createdAt": "2025-01-19T06:48:20.000Z",
                "updatedAt": "2025-01-19T06:48:20.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "f7d240db-b625-481d-9beb-5beaa2d5a912",
                "name": "Youtube",
                "email": "saucebot@gmail.com",
                "username": "saucebot",
                "password": "fa5a32423d21f170b88ef1f99608995c",
                "iv": "37b7be11dcd1185efb1bcd048c82a8d5",
                "website": "www.youtube.com",
                "favorites": false,
                "createdAt": "2025-01-19T06:58:38.000Z",
                "updatedAt": "2025-01-19T06:58:38.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            }
        ],
        "notes": [
            {
                "id": "0c46380a-99eb-419c-bc85-2afab22c3ff1",
                "name": "House Wifi Key",
                "content": "53A02-LH2039-G3950S",
                "favorites": false,
                "createdAt": "2025-01-19T06:46:21.000Z",
                "updatedAt": "2025-01-19T06:46:21.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            },
            {
                "id": "e1e0b432-f8df-4a7e-8778-c21b62be9d73",
                "name": "SECRET KEY",
                "content": "827F-FJF8-03NV",
                "favorites": false,
                "createdAt": "2025-01-19T06:47:12.000Z",
                "updatedAt": "2025-01-19T06:47:12.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "folder_id": null
            }
        ],
        "folders": [
            {
                "id": "09244020-6a00-4660-ba50-0f8c481a7dc4",
                "name": "Productivity Tools",
                "description": "",
                "createdAt": "2025-01-19T06:45:26.000Z",
                "updatedAt": "2025-01-19T06:45:26.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "notes": [],
                "logins": []
            },
            {
                "id": "51912b22-2b07-421d-bfea-eea4eae788e6",
                "name": "Streaming Services",
                "description": "",
                "createdAt": "2025-01-19T06:45:10.000Z",
                "updatedAt": "2025-01-19T06:45:10.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "notes": [],
                "logins": []
            },
            {
                "id": "5fb897cf-fb52-4d61-8819-df388b0bf0eb",
                "name": "Games",
                "description": "",
                "createdAt": "2025-01-19T06:44:32.000Z",
                "updatedAt": "2025-01-19T06:44:32.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "notes": [],
                "logins": []
            },
            {
                "id": "afde69a4-d75e-402b-afb7-d1d1c6d812dc",
                "name": "Socmed",
                "description": "social media accounts",
                "createdAt": "2025-01-19T06:44:48.000Z",
                "updatedAt": "2025-01-19T06:44:48.000Z",
                "user_id": "3d46fd02-2900-4f23-9220-0bbf6e8437df",
                "notes": [],
                "logins": []
            }
        ]
    }
```
