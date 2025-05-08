# Auth Service

A lightweight and extensible authentication and authorization microservice built with Node.js, Express, and TypeScript. This service handles user authentication using JWT and provides middleware and service layers for secure API access.

## 🚀 Technologies

- **Node.js** – JavaScript runtime for backend.
- **Express** – Minimalist web framework for Node.js.
- **TypeScript** – Strongly typed JavaScript.
- **JWT** – Secure token-based authentication.
- **Jest** – Testing framework.

## 📁 Project Structure

```
auth-service/
├── src/
│   ├── controllers/      # Route handlers
│   ├── middlewares/      # Express middlewares (e.g., auth checks)
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── index.ts          # Entry point
├── tests/                # Unit and integration tests
├── package.json
├── tsconfig.json
└── jest.config.ts
```

## 🔧 Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/cleristonmartins9102/auth-service.git
   cd auth-service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment variables**

   Create a `.env` file in the root directory and define the following variables:

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:3000`.

## 🧪 Running Tests

To run the test suite:

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
