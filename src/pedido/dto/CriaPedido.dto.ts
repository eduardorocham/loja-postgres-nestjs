import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, ValidateNested, IsUUID } from 'class-validator';

class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;
  @IsInt()
  quantidade: number;
}

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
