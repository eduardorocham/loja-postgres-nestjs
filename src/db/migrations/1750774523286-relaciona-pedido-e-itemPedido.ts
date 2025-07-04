import { MigrationInterface, QueryRunner } from "typeorm";

export class relacionaPedidoEItemPedido1750774523286 implements MigrationInterface {
    name = 'relacionaPedidoEItemPedido1750774523286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidoId" uuid, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valor_total" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "valor_total"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "valor_total" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
    }

}
