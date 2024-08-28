import { Injectable } from '@nestjs/common';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { ArchivosRepository } from './archivos.repository';
import { ProductsRepository } from '../products/products.repository';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ArchivosService {

  constructor(
    private archivosRepository: ArchivosRepository,
    private productsRepository: ProductsRepository
  ){}

  async uploadImage(file: Express.Multer.File, id: string){
    try {
      const imagenUrl = await this.archivosRepository.uploadImage(file)
      if(imagenUrl){
        const product: Product = await this.productsRepository.getProductById(id)
        product.imgUrl = imagenUrl
        const productUpdated = await this.productsRepository.updateProduct(id, product)
        return productUpdated
      }
    } catch (err) {
      throw new Error('No es posible almacenar la imagen solicitada') 
    }
  }
}
