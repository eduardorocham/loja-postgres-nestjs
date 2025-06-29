import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashearSenhaPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(senha: string): Promise<string> {
    const sal = this.configService.get<string>('SALT');

    const senhaHasheada = await bcrypt.hash(senha, sal!);

    return senhaHasheada;
  }
}
