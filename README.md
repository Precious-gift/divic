<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS Prisma Authentication API

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [GraphQL Playground](#graphql-playground)
- [API Documentation](#api-documentation)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Biometric Login](#biometric-login)
- [Testing](#testing)
- [Postman Collection](#postman-collection)
- [Conclusion](#conclusion)

## Introduction

This project is a RESTful API service built with NestJS and TypeScript, supporting user authentication (standard and biometric) and registration. The API uses Prisma as the ORM and is exposed through GraphQL.

## Prerequisites

- Node.js
- Docker (for PostgreSQL)
- npm (Node Package Manager)

## Environment Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd nest-prisma-auth
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start PostgreSQL with Docker:**

   Create a `docker-compose.yml` file with the following content:

   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:latest
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: postgres
         POSTGRES_DB: nest
       ports:
         - '5434:5432'
   ```

   Then run:

   ```bash
   docker-compose up -d
   ```

4. **Set up Prisma:**

   Initialize Prisma in your NestJS project:

   ```bash
   npx prisma init
   ```

   Replace the contents of `prisma/schema.prisma` with:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id           Int      @id @default(autoincrement())
     createdAt    DateTime @default(now())
     updatedAt    DateTime @updatedAt
     email        String   @unique
     password     String
     biometricKey String?
     @@map("users")
   }
   ```

   Update the `.env` file to match your PostgreSQL setup:

   ```plaintext
   DATABASE_URL="postgresql://postgres:postgres@localhost:5434/nest?schema=public"
   ```

   Then run the following commands to set up Prisma:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Running the Application

To start the application, run:

````bash
npm run start:dev

## GraphQL Playground

You can access the GraphQL Playground at 'http://localhost:3000/graphql'

## API Documentation

The API is exposed through GraphQL and can be accessed via the GraphQL Playground at http://localhost:3000/graphql.

Schema
Here is the GraphQL schema for user registration, login, and biometric login mutations:

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  biometricKey: String
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type Query {
  users: User!
}

type Mutation {
  signUp(input: CreateUserInput!): String!
  signin(input: LoginUserInput!): String!
  biometricSignin(input: LoginUserInput!): String!
}

input CreateUserInput {
  email: String!
  password: String!
  biometricKey: String
}

input LoginUserInput {
  email: String!
  password: String!
}

Mutations

User Registration
Registers a new user with an email, password, and optional biometric key.

Mutation: signUp

Input Type: CreateUserInput

email: String (required)
password: String (required)
biometricKey: String (optional)

User Login
Authenticates a user using their email and password, returning a JWT token.

Mutation: signin

Input Type: LoginUserInput

email: String (required)
password: String (required)

Biometric Login
Authenticates a user using their email and biometric key, returning a JWT token.

Mutation: biometricSignin

Input Type: LoginUserInput

email: String (required)
password: String (required)

Queries
Get Users
Fetches all users.

Query: users

## Testing

Run unit tests:

```bash
npm run test

## Postman Collection

Download the Postman collection to test the API endpoints.

- [Download Postman Collection](./div/Divic.postman_collection.json)

## Conclusion

This README provides a comprehensive guide for setting up, running, testing, and documenting your NestJS Prisma Authentication API. It covers all necessary steps from environment setup to GraphQL endpoint exploration using the GraphQL Playground. Use the provided Postman collection for easy testing of API endpoints. If you encounter any issues or have questions, please refer to the documentation
````
