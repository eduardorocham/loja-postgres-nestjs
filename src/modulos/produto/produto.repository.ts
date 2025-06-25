import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(dadosDoProduto: ProdutoEntity) {
    this.produtos.push(dadosDoProduto);
  }

  async listar() {
    return this.produtos;
  }

  private buscaProdutoPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new Error('Usuário não encontrado');
    }

    return possivelProduto;
  }

  async atualizar(id: string, dadosDoProduto: Partial<ProdutoEntity>) {
    const produto = this.buscaProdutoPorId(id);

    Object.entries(dadosDoProduto).forEach(([chave, valor]) => {
      if (chave === 'id') return;
      produto[chave] = valor;
    });

    return produto;
  }

  async remove(id: string) {
    const produto = this.buscaProdutoPorId(id);

    this.produtos = this.produtos.filter((produtoSalvo) => {
      return produtoSalvo.id !== produto.id;
    });

    return produto;
  }
}
