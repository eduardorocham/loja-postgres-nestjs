import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { HashearSenhaPipe } from 'src/recursos/pipes/hashear-senha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDto,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    const usuarioCriado = await this.usuarioService.criaUsuario({
      senha: senhaHasheada,
      ...dadosDoUsuario,
    });

    return {
      usuario: new ListaUsuarioDto(usuarioCriado.id, usuarioCriado.nome),
      mensagem: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();

    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDto) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      mensagem: 'Usuário removido com sucesso!',
    };
  }
}
