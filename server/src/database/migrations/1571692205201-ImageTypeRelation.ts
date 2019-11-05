import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageTypeRelation1571692205201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "images" ADD "image_type_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_90e91f4ebd1039dcdf5165211ac" FOREIGN KEY ("image_type_id") REFERENCES "image_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_90e91f4ebd1039dcdf5165211ac"`, undefined);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "image_type_id"`, undefined);
    }
}
