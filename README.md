# Inventory Management System API

[![CodeFactor](https://www.codefactor.io/repository/github/ahsan2882/inventory-management-server/badge)](https://www.codefactor.io/repository/github/ahsan2882/inventory-management-server)

#### The README is a work in progress, it is open for updates, you can submit a Pull Request, or I will find time to update in chunks

## Table of Contents

- [Introduction](#introduction)
- [Detailed Description](#detailed-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- [Project Structure](#project-structure)
- [Endpoints Information](#endpoints-information)
- [Authentication](#authentication)
- [Database](#database)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

## Introduction

Welcome to the Inventory Management System API! This project is an Express server built with TypeScript, serving as the backend for an inventory management system. It allows users to log in or sign up, view their inventory, update items, and customize the structure of their inventory.

## Detailed Description

The server is developed in Node.js using the Express framework and TypeScript. It leverages Firebase Firestore as the database for storing inventory data. The application follows a modular project structure to enhance maintainability and scalability.

## Features

- User authentication (login and signup)
- View and manage inventory items
- Dynamic structure modification for inventory customization

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- TypeScript
- Firebase account with Firestore enabled

## Setup Guide

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   npm install

3. Configure Firebase:

- Set up a Firebase project and configure Firestore.
- Add Firebase configuration details to `config/firebaseConfig.js`.

4. Start the server:
   npm start

## Project Structure

inventory-management-api/
|
|-- config/
| |-- firebaseConfig.js
| +-- ...
|
|-- controllers/
| |-- authController.js
| |-- inventoryController.js
| +-- ...
|
|-- routes/
| |-- authRoutes.js
| |-- inventoryRoutes.js
| +-- ...
|
|-- models/
| |-- User.js
| |-- Inventory.js
| +-- ...
|
|-- middleware/
| |-- authMiddleware.js
| +-- ...
|
+-- index.js

## API Endpoints

- **Authentication**:
- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in with existing credentials.

- **Inventory**:
- `GET /api/inventory`: Retrieve user's inventory.
- `PATCH /api/inventory/structure`: Modify inventory structure.
- `PUT /api/inventory/:itemId`: Update an item in the inventory.

[Detailed API Documentation](#) (Update with actual documentation)

## Authentication

The API uses token-based authentication. Upon successful login, a token is provided and must be included in subsequent requests in the `Authorization` header.

## Database

The server connects to Firebase Firestore for data storage. Ensure your Firestore rules are appropriately configured to restrict access based on your requirements.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

      mamba create --name my-dirac-env -c conda-forge dirac-grid
     conda activate my-dirac-env

# Inventory Management System API

## Table of Contents

- [Introduction](#introduction)
- [Detailed Description](#detailed-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- [Project Structure](#project-structure)
- [Endpoints Information](#endpoints-information)
- [Authentication](#authentication)
- [Database](#database)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

## Introduction

Welcome to the Inventory Management System API! This project is an Express server built with TypeScript, serving as the backend for an inventory management system. It allows users to log in or sign up, view their inventory, update items, and customize the structure of their inventory.

## Detailed Description

The server is developed in Node.js using the Express framework and TypeScript. It leverages Firebase Firestore as the database for storing inventory data. The application follows a modular project structure to enhance maintainability and scalability.

## Features

- User authentication (login and signup)
- View and manage inventory items
- Dynamic structure modification for inventory customization

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- TypeScript
- Firebase account with Firestore enabled

## Setup Guide

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   Install Dependencies:
   ```

bash
Copy code
npm install
Build TypeScript:

bash
Copy code
npm run build
Set Environment Variables:

Create a .env file in the root directory.
Add your Firebase credentials and other necessary environment variables.
env
Copy code
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
Start the Server:

bash
Copy code
npm start
Project Structure
The project follows a modular structure to enhance organization and scalability. Here is a brief overview:

plaintext
Copy code
src/
|-- controllers/
|-- middleware/
|-- models/
|-- routes/
|-- index.ts
controllers: Contains the business logic for each route.
middleware: Middleware functions used in the Express app.
models: Defines data models for Firestore.
routes: Handles the routing for different API endpoints.
index.ts: Entry point of the application.
Endpoints Information
Endpoint Description Method
/api/login User login POST
/api/signup User signup POST
/api/inventory Get user's inventory GET
/api/update-item Update an inventory item PUT
/api/modify-structure Modify inventory structure POST
Authentication
The API uses Firebase Authentication for user authentication. Ensure that the Firebase credentials are set in the .env file.

Database
The server connects to Firebase Firestore as the database for storing inventory data. Ensure that Firestore is properly set up and the credentials are provided in the .env file.

Contributing Guidelines
Contributions are welcome! Please follow the contribution guidelines before submitting a pull request.

License
This project is licensed under the MIT License.
