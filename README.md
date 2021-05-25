# Curios

## Goals
Provide a platform for:
- Course scheduling and viewing
- Course-specific Q&A system for students to ask questions and instructors to answer them

## Dependencies
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [GraphQL](https://graphql.org/)
- [PostGraphile](https://www.graphile.org/postgraphile/)
- [Chakra UI](https://chakra-ui.com/)

## Installation
1. If you don't have [nodemon](https://www.npmjs.com/package/nodemon) installed already, install it with `npm install -g nodemon`.
2. Install PostgreSQL if you haven't already. Make sure to remember your Postgres user and password.
3. Start the `psql` shell and create the `curios` database with `CREATE DATABASE curios;`.
4. Clone the repository `git clone git@github.com:VIP-Tech-Business-in-Development/curios.git`. Note: If you don't have an SSH key added, please [generate a new SSH key](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [add it to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).
5. Change your working directory to the `curios` directory by running `cd curios`.
6. Run `cd server` and create a .env file in the `server` directory.

### .env file
env files are a safe way to store project configurations and sensitive data across machines while still having a flexible way to configure your project per environment.

The `.env` file is nothing more than a simple hidden text file that you should create on the target deploy containing `KEY=VALUE` pairs separated by row breaks.

The `curios` project should have an `.env` file in the server directory with the following keys:
```
CLIENT=pg
PORT=8080
DATABASE=curios
PG_USER=REPLACE THIS WITH YOUR POSTGRES USER
PASSWORD=REPLACE THIS WITH YOUR POSTGRES PASSWORD
HOST=127.0.0.1
PG_PORT=5432
POSTGRAPHILE_SCHEMA=curios
POSTGRAPHILE_DEFAULT_ROLE=curios_anonymous
JWT_SECRET=REPLACE THIS WITH ANY STRING
```
Make sure to replace `PG_USER`, `PASSWORD`, and `JWT_SECRET`.

7. Run `yarn` to install server dependencies.
8. Run `npx knex migrate:latest` to update your schema in the Postgres db.
9. Change the working directory to the client directory by running `cd ../client`.
10. Run `yarn` to install client dependencies.
11. By now, you should everything needed to setup the app. In one terminal, run `yarn start` in the `client` directory. In another terminal, run `yarn start:dev` in the `server` directory.

## Commands
`yarn start` - starts the client. It should automatically launch a new tab in your browser and be hosted at http://localhost:3000.

`yarn start:dev` - starts the server. Go to http://localhost:8080/graphiql to see a visual interface for running GraphQL queries/mutations (similar to GraphQL playground).

## Interacting with the database directly

You can use pgAdmin (comes preinstalled with Postgres) to interact with the local databases on your machine, but using the shell is more preferred.

Some useful commands are:
```
\c curios    # This will connect you to the database
\dt          # This will list all tables in the working database
```
You can use any SQL command to interact with the database too, such as `SELECT * FROM curios.user;` to examine all the users.

## Modifying the Database
`npx knex migrate:make migration create_table` to create a migration file (this example has create_table as the migration name)
Update this migration file as per project needs.

`npx knex seed:make 01_users` to create a seed file (for dummy data).

You will want to run `npx knex migrate:latest` whenever you make changes to the database schema so that it's reflected in the Postgres db.
