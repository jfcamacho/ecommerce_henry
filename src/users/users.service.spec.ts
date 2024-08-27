import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserRepository: Partial<UserRepository>
  const mockUser: CreateUserDto = {
    "email": "test@gmail.com",
    "name": "Miguel",
    "password": "$test1A1830",
    // "password2": "$test1A1830",
    "address": "América 19-501",
    "phone": "999999999",
    "country": "Ecuador",
    "city": "Guayaquil",
  }

  beforeEach(async () => {
    mockUserRepository = {
      getUsers: (page: number , limit: number): Promise<UserEntity[]> => Promise.resolve([
        {...mockUser, isAdmin: false, orders: [], id: "1234fs-234srd-452gsr-3823ft"}
      ]),
      getUserById: (id: 'string'): Promise<UserEntity> => Promise.resolve({
        ...mockUser, isAdmin: false, orders: [], id: "1234fs-234srd-452gsr-3823ft"
      }),
      deleteUser: (id: 'string'): Promise<string> => Promise.resolve("1234fs-234srd-452gsr-3823ft"),
      updateUser: (user: UserEntity): Promise<string> => Promise.resolve("1234fs-234srd-452gsr-3823ft")
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: mockUserRepository}
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should return all the users defined', async () => {
    const users = await service.findAll(1,5)
    expect(users).toEqual([
      {...mockUser, isAdmin: false, orders: [], id: "1234fs-234srd-452gsr-3823ft"}
    ])
  })
  it('Should return the user with id 1234fs-234srd-452gsr-3823ft', async () => {
    const users = await service.findOne("1234fs-234srd-452gsr-3823ft")
    expect(users).toEqual({
      ...mockUser, isAdmin: false, orders: [], id: "1234fs-234srd-452gsr-3823ft"
      })
  })
  it('Should delete the user 1234fs-234srd-452gsr-3823ft', async () => {
    const users = await service.remove("1234fs-234srd-452gsr-3823ft")
    expect(users).toEqual("1234fs-234srd-452gsr-3823ft")
  })
});
