import { MigrationInterface, QueryRunner } from "typeorm";

export class corrigeCampoIdDoProduto1750787566718 implements MigrationInterface {
    name = 'corrigeCampoIdDoProduto1750787566718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_c403f2f68e819cb9805e22a2c55"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_d4b052c2913362f410a5f9a46cf"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_c6b1cba8ffb31f3982fa838b8ef"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" RENAME COLUMN "produto4" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" RENAME COLUMN "produto4" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "4" TO "id"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME CONSTRAINT "PK_8f6cd3417794c205209b3a3cb33" TO "PK_a5d976312809192261ed96174f3"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" RENAME COLUMN "produto4" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_d07fbe9a1faab330529824f7fea" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_d07fbe9a1faab330529824f7fea"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_eb1531605709dd94ec67b2141d0"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" RENAME COLUMN "produtoId" TO "produto4"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME CONSTRAINT "PK_a5d976312809192261ed96174f3" TO "PK_8f6cd3417794c205209b3a3cb33"`);
        await queryRunner.query(`ALTER TABLE "produtos" RENAME COLUMN "id" TO "4"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" RENAME COLUMN "produtoId" TO "produto4"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" RENAME COLUMN "produtoId" TO "produto4"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_c6b1cba8ffb31f3982fa838b8ef" FOREIGN KEY ("produto4") REFERENCES "produtos"("4") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_d4b052c2913362f410a5f9a46cf" FOREIGN KEY ("produto4") REFERENCES "produtos"("4") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_c403f2f68e819cb9805e22a2c55" FOREIGN KEY ("produto4") REFERENCES "produtos"("4") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
