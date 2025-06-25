import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;

    return await this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios(): Promise<ListaUsuarioDto[]> {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  async atualizaUsuario(id: string, dadosDeAtualizacao: AtualizaUsuarioDto) {
    await this.usuarioRepository.update(id, dadosDeAtualizacao);
  }

  async deletaUsuario(id: string) {
    await this.usuarioRepository.delete(id);
  }

  async existeComEmail(email: string): Promise<boolean> {
    const usuarioComEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (usuarioComEmail) return true;
    return false;
  }
}
