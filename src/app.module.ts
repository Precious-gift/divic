import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './user/user.resolver';

/**
 * The root module of the application.
 * This module sets up the necessary modules and configurations for the application.
 */
@Module({
  imports: [
    // Set up the GraphQL module with the Apollo driver and the schema file path
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // Set up the configuration module globally
    ConfigModule.forRoot({ isGlobal: true }),
    // Import the authentication module
    AuthModule,
    // Import the user module
    UserModule,
    // Import the Prisma module
    PrismaModule,
  ],
  // Register the user resolver as a provider
  providers: [UserResolver],
})
export class AppModule {}
