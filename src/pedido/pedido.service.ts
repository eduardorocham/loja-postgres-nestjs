import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { StatusPedido } from './enum/statusPedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private trataDadosDoPedido(dadosDoPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (!produtoRelacionado) {
        throw new NotFoundException(`O produto com id ${itemPedido.produtoId} nao foi encontrado`);
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior que a quantidade disponivel (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}`,
        );
      }
    });
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);

    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);
    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) });
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;

    pedidoEntity.usuario = usuario;

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce(
      (total, item) => total + item.precoVenda * item.quantidade,
      0,
    );

    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async buscaPedidosPorUsuario(usuarioId: string) {
    return await this.pedidoRepository.find({ where: { usuario: { id: usuarioId } } });
  }

  async atualizaStatusPedido(pedidoId: string, dadosDeAtualizacao: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    pedido.status = dadosDeAtualizacao.status;
    return await this.pedidoRepository.save(pedido);
  }

  private async buscaUsuario(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    if (!usuario) {
      throw new NotFoundException('Usuário nao encontrado');
    }

    return usuario;
  }
}
