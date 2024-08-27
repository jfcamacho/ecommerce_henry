import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../users/users.repository';
// import { Auth } from "./entities/auth.entity";
import * as jwt from 'jsonwebtoken';
import  * as bcrypt from "bcrypt"
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuthRepository: Partial<AuthRepository>;
  let mockUserRepository: Partial<UserRepository>;
  const authMock = {
    "email": "test@gmail.com",
    "password": "$test1A1830",
  }
  const userMock = {
    "id": "da7d144f-d3c2-49da-99fe-cbc1b0a72b2c",
    "email": "test@gmail.com",
    "name": "Miguel",
    "password": "$test1A1830",
    "password2": "$test1A1830",
    "address": "América 19-501",
    "phone": "999999999",
    "country": "Ecuador",
    "city": "Guayaquil"
  }

  beforeEach(async () => {
    const mockJwtService = {
      sign: (payload) => jwt.sign(payload, 'secret'),
    }
    mockUserRepository = {
      getUserByEmail: (email: string) => Promise.resolve(undefined)
    }
    mockAuthRepository = {
      signin: (auth: Auth) => Promise.resolve({success: 'User Login', token: 'kdahkfasbcsdmjcsdjfba'}),
      signup: (auth: CreateUserDto) => Promise.resolve(
        {
          ...auth,
          id: "da7d144f-d3c2-49da-99fe-cbc1b0a72b2c",
          password: undefined, 
          password2: undefined, 
          isAdmin: false, 
          orders: [],
        })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // AuthRepository,
        {provide: AuthRepository, useValue: mockAuthRepository},
        {provide: UserRepository, useValue: mockUserRepository},
        {provide: JwtService, useValue: mockJwtService}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be token', async () => {
    const mockUserVariant = {...userMock, isAdmin: false, orders: [], password: await bcrypt.hash(userMock.password, 10)}
    mockUserRepository.getUserByEmail = (email: string) => Promise.resolve(mockUserVariant as UserEntity)
    const response = await service.signin(authMock)
    expect(response.token).toBeDefined()
    expect(response.success).toEqual('User Login')
  })
});
