import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  url: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;
}

export class AtualizaProdutoDTO {
  @IsOptional()
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsOptional()
  @IsPositive({ message: 'O valor deve ser um número positivo' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor deve ser um número' })
  @Min(0.01, { message: 'O valor deve ser maior que zero' })
  valor: number;

  @IsOptional()
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsPositive({ message: 'A quantidade deve ser um número positivo' })
  quantidadeDisponivel: number;

  @IsOptional()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(1000, { message: 'A descrição deve ter no máximo 1000 caracteres' })
  descricao: string;

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'Deve haver no mínimo 3 características' })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve haver no mínimo 1 imagem' })
  @Type(() => CaracteristicaProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsOptional()
  @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
  categoria: string;
}
