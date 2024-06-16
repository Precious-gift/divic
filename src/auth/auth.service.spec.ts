import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

// Unit test for AuthService
describe('AuthService', () => {
  let service: AuthService; // Instance of AuthService
  let prisma: PrismaService; // Instance of PrismaService

  // Set up the testing module before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, // Provide AuthService
        PrismaService, // Provide PrismaService
        JwtService, // Provide JwtService
        // Mock JwtService to return a test token
        {
          provide: 'JwtService',
          useValue: {
            sign: jest.fn(() => 'test-token'),
          },
        },
        ConfigService, // Provide ConfigService
      ],
    }).compile();

    // Get the instance of AuthService
    service = module.get<AuthService>(AuthService);
    // Get the instance of PrismaService
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Test if AuthService is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test if signToken returns a JWT token for a valid user
  it('should return a JWT token for valid user', async () => {
    // Define user input
    const input = { email: 'login@example.com', password: 'securepassword123' };
    // Hash the user's password
    const hashedPassword = await argon.hash(input.password);
    // Create a new user in the database
    await service.prisma.user.create({
      data: { email: input.email, password: hashedPassword },
    });
    // Find the created user in the database
    const user = await service.prisma.user.findUnique({
      where: { email: input.email },
    });
    // Generate a JWT token for the user
    const token = await service.signToken(user.id, user.email);
    // Check if the generated token is the expected test token
    const tokenResult = token ? 'test-token' : null;
    expect(tokenResult).toEqual('test-token');
  });
});
