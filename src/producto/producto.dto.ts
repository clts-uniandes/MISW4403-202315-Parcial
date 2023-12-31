import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly precio: number;

  @IsString()
  @IsNotEmpty()
  readonly tipo: string;
}
