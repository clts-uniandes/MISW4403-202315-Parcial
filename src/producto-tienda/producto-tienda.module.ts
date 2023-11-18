import { Module } from '@nestjs/common';
import { ProductoEntity } from 'src/producto/producto.entity';
import { ProductoTiendaService } from './producto-tienda.service';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity, TiendaEntity])],
  providers: [ProductoTiendaService],
})
export class ProductoTiendaModule {}
