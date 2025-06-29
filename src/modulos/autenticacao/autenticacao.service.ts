import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticaDto } from './dto/autentica.dto';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.existeComEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('O e-mail ou senha estão incorretos.');
    }

    const usuarioAutenticado = await bcrypt.compare(senha, usuario.senha);

    if (!usuarioAutenticado) {
      throw new UnauthorizedException('O e-mail ou senha estão incorretos.');
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome,
    };

    return {
      token_access: await this.jwtService.signAsync(payload),
    };
  }
}
