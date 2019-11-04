import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageStorage1572880893298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "images_storage_enum" AS ENUM('local', 'S3')`, undefined);
        await queryRunner.query(`ALTER TABLE "images" ADD "storage" "images_storage_enum" NOT NULL DEFAULT 'local'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "storage"`, undefined);
        await queryRunner.query(`DROP TYPE "images_storage_enum"`, undefined);
    }

}
