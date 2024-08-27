import { Test, TestingModule } from '@nestjs/testing';
import { ArchivosController } from './archivos.controller';
import { ArchivosService } from './archivos.service';
import { ProductsRepository } from '../products/products.repository';
import { ArchivosRepository } from './archivos.repository';
import { JwtService } from '@nestjs/jwt';

describe('ArchivosController', () => {
  let controller: ArchivosController;
  let mockProductRepository: ProductsRepository;
  let mockArchivoRepository: ArchivosRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivosController],
      providers: [
        ArchivosService,
        JwtService,
        {provide: ProductsRepository, useValue: mockProductRepository},
        {provide: ArchivosRepository, useValue: mockArchivoRepository},
      ],
    }).compile();

    controller = module.get<ArchivosController>(ArchivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
