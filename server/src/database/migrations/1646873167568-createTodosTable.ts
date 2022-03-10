import {MigrationInterface, QueryRunner} from "typeorm";

export class createTodosTable1646873167568 implements MigrationInterface {
    name = 'createTodosTable1646873167568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "todos" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying(20) NOT NULL,
                "description" text,
                "is_active" boolean NOT NULL DEFAULT true,
                "user_id" integer,
                CONSTRAINT "UQ_c427d5928f463be5c8965e0d684" UNIQUE ("title"),
                CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "todos"
            ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"
        `);
        await queryRunner.query(`
            DROP TABLE "todos"
        `);
    }

}
