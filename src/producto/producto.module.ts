import { Module } from '@nestjs/common';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  providers: [ProductoService],
})
export class ProductoModule {}
