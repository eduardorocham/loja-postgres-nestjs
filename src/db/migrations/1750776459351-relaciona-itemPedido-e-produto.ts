import { MigrationInterface, QueryRunner } from "typeorm";

export class relacionaItemPedidoEProduto1750776459351 implements MigrationInterface {
    name = 'relacionaItemPedidoEProduto1750776459351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "produto4" uuid`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_c6b1cba8ffb31f3982fa838b8ef" FOREIGN KEY ("produto4") REFERENCES "produtos"("4") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_c6b1cba8ffb31f3982fa838b8ef"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "produto4"`);
    }

}
