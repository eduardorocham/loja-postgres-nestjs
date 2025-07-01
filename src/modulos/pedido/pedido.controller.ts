import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string, @Body() dadosDoPedido: CriaPedidoDTO) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);

    return {
      message: 'Pedido criado com sucesso',
      pedido: pedidoCriado,
    };
  }

  @Get()
  async buscaPedidosPorUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.buscaPedidosPorUsuario(usuarioId);
    return { pedidos };
  }

  @Patch()
  async atualizaStatusPedido(
    @Query('pedidoId') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDTO,
  ) {
    const pedidoAtualizado = await this.pedidoService.atualizaStatusPedido(
      pedidoId,
      dadosDeAtualizacao,
    );

    return {
      mensagem: 'Pedido atualizado com sucesso',
      pedido: pedidoAtualizado,
    };
  }
}
