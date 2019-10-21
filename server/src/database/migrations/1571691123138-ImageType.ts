import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageType1571691123138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "image_types" ("id" SERIAL NOT NULL, "extension" character varying NOT NULL, "mime_type" character varying NOT NULL, CONSTRAINT "UQ_0dce3796daaac83e1ca14bce545" UNIQUE ("extension"), CONSTRAINT "PK_75326571bbf8d8f3df13a64eb10" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "image_types"`, undefined);
    }

}
