# Auth Service

A lightweight and extensible authentication and authorization microservice built with Node.js, Express, and TypeScript. This service handles user authentication using JWT and provides middleware and service layers for secure API access.

## 🚀 Technologies

- **Node.js** – JavaScript runtime
- **Express** – Fast, minimalist web framework
- **TypeScript** – Typed superset of JavaScript
- **JWT** – JSON Web Tokens for authentication
- **Firestore** – NoSQL document database from Google
- **Jest** – Testing framework for JavaScript/TypeScript
- **Bcrypt** – Password hashing

## 🔐 Secret Management

By default, the secret key (`JWT_SECRET`) used to sign tokens is expected to be securely stored in **Google Cloud Secret Manager** or **AWS Secret Manager**, optionally retrieved during runtime using a service account.  
Using a `.env` file is still supported but **not recommended in production**.

Example `.env`:
```env
PORT=5050
JWT_SECRET=your_jwt_secret
```

## 🧱 Architecture Notes

- The repository layer uses **Firestore** by default.
- The architecture allows you to easily replace Firestore with any other persistence layer, such as **PostgreSQL**, **MySQL**, or **MongoDB**.
- Replaceable through dependency injection in the repository abstraction layer.

## 🔑 Token Strategy

- **Access Token**: Expires in **15 minutes**
- **Refresh Token**: Expires in **730 hours** (~30 days)

Tokens are signed with your secret (`JWT_SECRET`) and follow best practices for stateless authentication.

## 📁 Project Structure

```
auth-service/
├── src/
│     └── application /
│                   └── controllers /
│                   └── contracts /
│                   └── erros /
│                   └── helpers /
│     └──data /
│           └── domain /
│           └── features /
│           └── models /
├──── infra /
│         └── adapters /
│         └── repository /
├──── main /
│        └── config /
│        └── factories /
│        └── routers /
│        └── server.ts
├── tests/
├── .gitignore
├── jest.config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
```

## 📦 Dependencies

### Runtime
- `express`
- `jsonwebtoken`
- `bcrypt`
- `@google-cloud/firestore`
- `@faker-js/faker`
- `module-alias`
- `path-alias`
- `@cleriston.marina/val`

### Development
- `typescript`
- `ts-node`
- `ts-node-dev`
- `jest`
- `ts-jest`
- `supertest`
- `jest-mock-extended`
- `@types/*` packages

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

3. **Set environment variables**

   Create a `.env` file (for development only):

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

4. **Run in development mode**

   ```bash
   npm run start:dev
   ```

   The server will be available at `http://localhost:5050`.

## 🧪 Running Tests

```bash
npm test
```

Or watch mode:

```bash
npm run test:watch
```

## 📄 License

This project is licensed under the ISC License.
