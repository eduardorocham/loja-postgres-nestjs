import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class AtualizaUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @EmailUnico({
    message: 'Já existe um usuário cadastrado com o email informado',
  })
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
