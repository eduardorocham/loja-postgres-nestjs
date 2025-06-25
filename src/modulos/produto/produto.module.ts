import { Module } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutoEntity } from './produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository],
})
export class ProdutoModule {}
