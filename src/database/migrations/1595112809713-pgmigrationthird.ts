import {MigrationInterface, QueryRunner} from "typeorm";

export class pgmigrationthird1595112809713 implements MigrationInterface {
    name = 'pgmigrationthird1595112809713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "FK_6d172787ae064daaf2451fff43e"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "UQ_6d172787ae064daaf2451fff43e"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "usersId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "UQ_6d172787ae064daaf2451fff43e" UNIQUE ("usersId")`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "FK_6d172787ae064daaf2451fff43e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
