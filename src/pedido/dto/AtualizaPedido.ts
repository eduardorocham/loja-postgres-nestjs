import { PartialType } from '@nestjs/mapped-types';
import { CriaPedidoDTO } from './CriaPedido.dto';
import { StatusPedido } from '../enum/statusPedido.enum';
import { IsEnum } from 'class-validator';

export class AtualizaPedidoDTO extends PartialType(CriaPedidoDTO) {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
