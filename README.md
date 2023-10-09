## Description

Nest framework TypeScript Fantasy Football Insights repository.

## Installation

```bash
$ npm install
```

## Development Database

Database connection is setup to use environment variables in a `.env` file.
The Database connection is setup to use `mysql` with `typeorm` and `mysql2` packages.
A `.env.example` is provided that uses database and initial data variables for the following setup:
Development database creation using `ffi` with user `ffi` at `localhost:3306`:

> **Note:** Please make sure you have installed mysql and have configured your environment to use it.

```sql
CREATE DATABASE ffi;
```

```sql
CREATE USER 'ffi'@'localhost' IDENTIFIED BY 'ffi';
```

```sql
GRANT ALL PRIVILEGES ON *.* TO 'ffi'@'localhost' WITH GRANT OPTION;
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs

[Nest](https://docs.nestjs.com/) - Documentation for Nest framework.
