import { MigrationInterface, QueryRunner } from 'typeorm';

export class criaTabelas1750517848385 implements MigrationInterface {
  name = 'criaTabelas1750517848385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "produto_imagens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produto4" uuid, CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtos" ("4" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" character varying(100) NOT NULL, "nome" character varying(100) NOT NULL, "valor" integer NOT NULL, "quantidade_disponivel" integer NOT NULL, "unidade" character varying(255) NOT NULL, "categoria" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8f6cd3417794c205209b3a3cb33" PRIMARY KEY ("4"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produto_caracteristicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "produto_id" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produto4" uuid, CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "senha" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_imagens" ADD CONSTRAINT "FK_d4b052c2913362f410a5f9a46cf" FOREIGN KEY ("produto4") REFERENCES "produtos"("4") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_c403f2f68e819cb9805e22a2c55" FOREIGN KEY ("produto4") REFERENCES "produtos"("4") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_c403f2f68e819cb9805e22a2c55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_d4b052c2913362f410a5f9a46cf"`,
    );
    await queryRunner.query(`DROP TABLE "usuarios"`);
    await queryRunner.query(`DROP TABLE "produto_caracteristicas"`);
    await queryRunner.query(`DROP TABLE "produtos"`);
    await queryRunner.query(`DROP TABLE "produto_imagens"`);
  }
}
