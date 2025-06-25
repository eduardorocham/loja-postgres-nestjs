import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    // Copia os campos simples
    // Object.assign(produtoEntity, {
    //   nome: dadosDoProduto.nome,
    //   descricao: dadosDoProduto.descricao,
    //   preco: dadosDoProduto.preco,
    //   // ...outros campos simples
    // });

    // // Converte características do DTO para entidades
    // produtoEntity.caracteristicas = dadosDoProduto.caracteristicas?.map((caracteristicaDto) => {
    //   const caracteristica = new ProdutoCaracteristicaEntity();
    //   Object.assign(caracteristica, caracteristicaDto);
    //   return caracteristica;
    // });

    // // Converte imagens do DTO para entidades
    // produtoEntity.imagens = dadosDoProduto.imagens?.map((imagemDto) => {
    //   const imagem = new ProdutoImagemEntity();
    //   Object.assign(imagem, imagemDto);
    //   return imagem;
    // });

    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.imagens = dadosDoProduto.imagens;
    produtoEntity.categoria = dadosDoProduto.categoria;

    await this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos(): Promise<ProdutoEntity[]> {
    const produtosSalvos = await this.produtoRepository.find();
    return produtosSalvos;
  }

  async buscaProduto(id: string): Promise<ProdutoEntity> {
    const produtoSalvo = await this.produtoRepository.findOne({ where: { id } });

    if (!produtoSalvo) {
      throw new NotFoundException('Produto nao encontrado');
    }

    return produtoSalvo;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO): Promise<ProdutoEntity> {
    await this.produtoRepository.update(id, novosDados);
    const produtoAtualizado = await this.produtoRepository.findOne({ where: { id } });

    if (!produtoAtualizado) {
      throw new NotFoundException('Produto nao encontrado');
    }

    return produtoAtualizado;
  }

  async deletaProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O produto não foi encontrado');
    }
  }
}
