import { Module } from '@nestjs/common';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excessao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [createKeyv('redis://localhost:6379')],
          ttl: 60 * 1000,
        };
      },
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal,
    },
  ],
})
export class AppModule {}
