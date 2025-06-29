import { IsEmail, IsNotEmpty } from 'class-validator';

export class AutenticaDto {
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  senha: string;
}
