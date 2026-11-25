#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/075084bf5ccd736439461ca780a02733e8288c6f631e7ad0493d10fe0974eb77/contract';
import endContract from '../../snapshots/075084bf5ccd736439461ca780a02733e8288c6f631e7ad0493d10fe0974eb77/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/920a87b50729a867e21706dd0fa5c3739e273a84ed89eb2f3525633b2d6ef85c/contract';
import startContract from '../../snapshots/920a87b50729a867e21706dd0fa5c3739e273a84ed89eb2f3525633b2d6ef85c/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.dropColumn({ schema: 'public', table: 'User', column: 'name' }),
      this.dropColumn({ schema: 'public', table: 'User', column: 'username' }),
      this.createTable({
        schema: 'public',
        table: 'Project',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('demoUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('favorite', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('githubUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('imageUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Project_status_check_03c31bb9',
            sql`"status" IN ('Em andamento', 'MVP finalizado', 'Arquivado')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'ProjectTag',
        columns: [
          col('projectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('tagId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['tagId', 'projectId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ProjectTechnology',
        columns: [
          col('projectId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('technologyId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['technologyId', 'projectId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Tag',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Technology',
        columns: [
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('iconSlug', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'User',
        column: 'passwordHash',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
      this.addUnique({
        schema: 'public',
        table: 'Project',
        constraint: 'Project_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Tag',
        constraint: 'Tag_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Technology',
        constraint: 'Technology_name_key',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProjectTag',
        index: 'ProjectTag_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProjectTag',
        index: 'ProjectTag_tagId_idx_86854244',
        columns: ['tagId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProjectTechnology',
        index: 'ProjectTechnology_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProjectTechnology',
        index: 'ProjectTechnology_technologyId_idx_1e2af707',
        columns: ['technologyId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProjectTag',
        foreignKey: {
          name: 'ProjectTag_tagId_fkey',
          columns: ['tagId'],
          references: { schema: 'public', table: 'Tag', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProjectTag',
        foreignKey: {
          name: 'ProjectTag_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'Project', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProjectTechnology',
        foreignKey: {
          name: 'ProjectTechnology_technologyId_fkey',
          columns: ['technologyId'],
          references: { schema: 'public', table: 'Technology', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProjectTechnology',
        foreignKey: {
          name: 'ProjectTechnology_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'Project', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
