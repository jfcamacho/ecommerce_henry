import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { JwtService } from '@nestjs/jwt';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let mockCategoriesRepository: CategoriesRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        JwtService,
        { provide: CategoriesRepository, useValue: mockCategoriesRepository}
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
