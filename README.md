# Curios

Create the necessary database in your local Postgres database.

Create a `.env` file with the following keys:
- CLIENT=pg
- PORT=8080
- DATABASE=curios
- PG_USER (your Postgres user)
- PASSWORD (your Postgres password)
- HOST=127.0.0.1
- PG_PORT=5432
- POSTGRAPHILE_SCHEMA=curios
- POSTGRAPHILE_DEFAULT_ROLE=curios_anonymous
- JWT_SECRET (the JWT secret)

Run `npx knex migrate:latest` to update your schema in the Postgres db.

Run `yarn start:dev`
Go to http://localhost:8080/graphiql to see a visual interface for running GraphQL queries/mutations (similar to GraphQL playground).

# For new features
`npx knex migrate:make migration create_table` to create a migration file (this example has create_table as the migration name)
Update this migration file as per project needs.


`npx knex seed:make 01_users` to create a seed file (for dummy data).
