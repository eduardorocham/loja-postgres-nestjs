import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    this.produtoService.criaProduto(dadosDoProduto);

    return {
      produto: dadosDoProduto,
      mensagem: 'Produto criado com sucesso!',
    };
  }

  @Get()
  async listaProdutos() {
    return this.produtoService.listaProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async buscaProduto(@Param('id') id: string) {
    return this.produtoService.buscaProduto(id);
  }

  @Put('/:id')
  async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);

    return {
      produto: produtoAtualizado,
      mensagem: 'Produto atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'Produto removido com sucesso!',
    };
  }
}
