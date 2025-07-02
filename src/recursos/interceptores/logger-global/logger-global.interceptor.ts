import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();

    const request = contextHttp.getRequest<Request | RequisicaoComUsuario>();
    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const instantePreControlador = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in request) {
          this.logger.log(`Rota acessada pelo usuário ${request.usuario.sub}`);
        }
        const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;
        this.logger.log(`Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota}ms`);
      }),
    );
  }
}
