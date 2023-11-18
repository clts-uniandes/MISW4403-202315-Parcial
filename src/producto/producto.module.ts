import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
