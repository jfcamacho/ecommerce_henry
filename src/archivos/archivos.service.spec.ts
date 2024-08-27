import { Test, TestingModule } from '@nestjs/testing';
import { ArchivosService } from './archivos.service';
import { ArchivosRepository } from './archivos.repository';
import { Readable } from 'stream';
import { UploadApiResponse } from 'cloudinary';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { Product } from '../products/entities/product.entity';

describe('ArchivosService', () => {
  let service: ArchivosService;
  let mockArchivosRepository: Partial<ArchivosRepository>
  let mockProductsRepository: Partial<ProductsRepository>
  const mockProduct = {
    "id": "123gfs-478fgt-8423tq-2364hg",
    "name": "Motorola Edge 40",
    "description": "The best smartphone in the world",
    "price": 179.89,
    "stock": 12,
    "imgUrl": "https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_939156.jpg"
  }
  const mockImage: Express.Multer.File = {
    fieldname: 'testImg',
    originalname: 'testImg',
    encoding: 'utf8',
    mimetype: 'text/plain',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: Buffer.from([])
  }

  beforeEach(async () => {
    mockArchivosRepository = {
      uploadImage: (file: Express.Multer.File): Promise<string> => Promise.resolve("https://test/image.png")
    }
    mockProductsRepository = {
      getProductById: (id: string) => Promise.resolve(
        {
          "id": "123gfs-478fgt-8423tq-2364hg",
          "name": "Motorola Edge 40",
          "description": "The best smartphone in the world",
          "price": 179.89,
          "stock": 12,
          "imgUrl": "https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_939156.jpg"
        }
      ),
      updateProduct: (mockProduct) => Promise.resolve("123gfs-478fgt-8423tq-2364hg")
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArchivosService,
        {provide: ProductsRepository, useValue: mockProductsRepository},
        {provide: ArchivosRepository, useValue: mockArchivosRepository}
      ],
    }).compile();

    service = module.get<ArchivosService>(ArchivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should look for product provided', async () => {
    const product = await mockProductsRepository.getProductById("123gfs-478fgt-8423tq-2364hg")
    expect(product).toEqual({
        "id": "123gfs-478fgt-8423tq-2364hg",
        "name": "Motorola Edge 40",
        "description": "The best smartphone in the world",
        "price": 179.89,
        "stock": 12,
        "imgUrl": "https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_939156.jpg"
    })
  })
  it('should update product', async () => {
    const newProduct = await mockProductsRepository.updateProduct(mockProduct)
    expect(newProduct).toEqual("123gfs-478fgt-8423tq-2364hg")
  })
  it('shloud provide a image scure url', async () => {
    const uploadedImage = await service.uploadImage(mockImage, "123gfs-478fgt-8423tq-2364hg")
    const urlImage = await mockArchivosRepository.uploadImage(mockImage)
    expect(uploadedImage).toEqual("123gfs-478fgt-8423tq-2364hg")
    expect(urlImage).toEqual("https://test/image.png")
  })
});
