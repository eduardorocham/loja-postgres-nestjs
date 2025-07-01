import { Controller, Get, Post, Body, Patch, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Req() req: RequisicaoComUsuario, @Body() dadosDoPedido: CriaPedidoDTO) {
    const usuarioId = req.usuario.sub;
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);

    return {
      message: 'Pedido criado com sucesso',
      pedido: pedidoCriado,
    };
  }

  @Get()
  async buscaPedidosPorUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
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
