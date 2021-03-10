import { postgraphile } from 'postgraphile';
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter';

const {
  DATABASE_URL,
  DATABASE,
  PG_USER,
  PASSWORD,
  HOST,
  PG_PORT,
  POSTGRAPHILE_SCHEMA,
  POSTGRAPHILE_DEFAULT_ROLE,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const credentials = {
  database: DATABASE,
  user: PG_USER,
  password: PASSWORD,
  host: HOST,
  port: Number(PG_PORT),
};

export const postgraphileServer = postgraphile(
  NODE_ENV === 'production' ? DATABASE_URL : credentials,
  POSTGRAPHILE_SCHEMA,
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    jwtPgTypeIdentifier: `${POSTGRAPHILE_SCHEMA}.jwt_token`,
    jwtSecret: JWT_SECRET,
    pgDefaultRole: POSTGRAPHILE_DEFAULT_ROLE,
    appendPlugins: [ConnectionFilterPlugin],
  }
);
