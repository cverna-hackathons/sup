import {MigrationInterface, QueryRunner} from "typeorm";

export class Images1571410499346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "file_path" character varying NOT NULL, CONSTRAINT "UQ_7adf8df88e8f675e56dc69c6e11" UNIQUE ("file_path"), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "images"`, undefined);
    }

}
