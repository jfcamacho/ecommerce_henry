import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedRol1723484467847 implements MigrationInterface {
    name = 'UpdatedRol1723484467847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL DEFAULT 'https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_939156.jpg', "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "REL_c2354396f8361da558b647ed34" UNIQUE ("orderId"), CONSTRAINT "PK_5502309b1a989428ac47eb9f6ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "password" character varying(80) NOT NULL, "address" character varying(20) NOT NULL, "phone" integer NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "country" character varying(50), "city" character varying(50), "adress" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetail_products_product" ("orderdetailId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_e122aac221b62437d419e7e7190" PRIMARY KEY ("orderdetailId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c533a1a273414f0c768af01fd" ON "orderdetail_products_product" ("orderdetailId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1459c604d79f81abb5e52a0c36" ON "orderdetail_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD CONSTRAINT "FK_c2354396f8361da558b647ed342" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetail_products_product" ADD CONSTRAINT "FK_7c533a1a273414f0c768af01fde" FOREIGN KEY ("orderdetailId") REFERENCES "orderdetail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orderdetail_products_product" ADD CONSTRAINT "FK_1459c604d79f81abb5e52a0c363" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail_products_product" DROP CONSTRAINT "FK_1459c604d79f81abb5e52a0c363"`);
        await queryRunner.query(`ALTER TABLE "orderdetail_products_product" DROP CONSTRAINT "FK_7c533a1a273414f0c768af01fde"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "FK_c2354396f8361da558b647ed342"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1459c604d79f81abb5e52a0c36"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c533a1a273414f0c768af01fd"`);
        await queryRunner.query(`DROP TABLE "orderdetail_products_product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "orderdetail"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
