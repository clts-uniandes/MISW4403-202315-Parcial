import { Module } from '@nestjs/common';
import { TiendaController } from './tienda.controller';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TiendaEntity])],
  providers: [TiendaService],
  controllers: [TiendaController],
})
export class TiendaModule {}
