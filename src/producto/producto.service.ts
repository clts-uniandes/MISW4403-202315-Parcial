import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Tipo } from './entities/tipo.enum';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async findAll(): Promise<ProductoEntity[]> {
    return await this.productoRepository.find({
      relations: ['tiendas'],
    });
  }

  async findOne(id: string): Promise<ProductoEntity> {
    const producto: ProductoEntity = await this.productoRepository.findOne({
      where: { id },
      relations: ['tiendas'],
    });
    if (!producto)
      throw new BusinessLogicException(
        'El producto con el id dado no fue encontrado',
        BusinessError.NOT_FOUND,
      );

    return producto;
  }

  async create(producto: ProductoEntity): Promise<ProductoEntity> {
    await this.validateTipo(producto.tipo);
    return await this.productoRepository.save(producto);
  }

  async update(id: string, producto: ProductoEntity): Promise<ProductoEntity> {
    const persistedProducto: ProductoEntity =
      await this.productoRepository.findOne({ where: { id } });

    if (!persistedProducto)
      throw new BusinessLogicException(
        'El producto con el id dado no fue encontrado',
        BusinessError.NOT_FOUND,
      );
    await this.validateTipo(producto.tipo);
    return await this.productoRepository.save({
      ...persistedProducto,
      ...producto,
    });
  }

  async delete(id: string) {
    const producto: ProductoEntity = await this.productoRepository.findOne({
      where: { id },
    });
    if (!producto)
      throw new BusinessLogicException(
        'El producto con el id dado no fue encontrado',
        BusinessError.NOT_FOUND,
      );

    await this.productoRepository.remove(producto);
  }

  private async validateTipo(tipo: string) {
    if (!Object.values(Tipo).includes(tipo as Tipo))
      throw new BusinessLogicException(
        'Tipo de producto no permitido',
        BusinessError.BAD_REQUEST,
      ); 
  }
}
