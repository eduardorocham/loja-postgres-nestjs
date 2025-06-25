import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string): Promise<boolean> {
    return this.usuarios.some((usuario) => usuario.email === email);
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find((usuario) => usuario.id === id);

    if (!possivelUsuario) {
      throw new Error('Usuário não encontrado');
    }

    return possivelUsuario;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') return;

      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter((usuarioSalvo) => {
      return usuarioSalvo.id !== usuario.id;
    });

    return usuario;
  }
}
