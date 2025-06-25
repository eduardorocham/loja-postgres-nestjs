import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class CriaUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @EmailUnico({
    message: 'Já existe um usuário cadastrado com o email informado',
  })
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;
}
