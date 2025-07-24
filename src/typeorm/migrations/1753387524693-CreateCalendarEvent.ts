import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCalendarEvent1753387524693 implements MigrationInterface {
  name = 'CreateCalendarEvent1753387524693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "calendar_event"
	 	 (
			"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
			"userId" character varying NOT NULL,
			"name" character varying NOT NULL,
			"date" date NOT NULL,
			"countryCode" character varying NOT NULL,
			CONSTRAINT "PK_176fe24e6eb48c3fef696c7641f" PRIMARY KEY ("id")
		)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "calendar_event"`);
  }
}
