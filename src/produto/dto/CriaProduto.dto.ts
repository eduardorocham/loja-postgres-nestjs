import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDTO {
  id: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
  id: string;

  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  url: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsPositive({ message: 'O valor deve ser um número positivo' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor deve ser um número' })
  @Min(0.01, { message: 'O valor deve ser maior que zero' })
  valor: number;

  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsPositive({ message: 'A quantidade deve ser um número positivo' })
  quantidadeDisponivel: number;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(1000, { message: 'A descrição deve ter no máximo 1000 caracteres' })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'Deve haver no mínimo 3 características' })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'Deve haver no mínimo 1 imagem' })
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
  categoria: string;
}
