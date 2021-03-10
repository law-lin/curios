import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { postgraphileServer } from './postgraphile';

async function main() {
  const app = express();

  const { PORT } = process.env;

  // Middleware
  app.use(cors());
  app.use(postgraphileServer);

  // Start server
  app.listen({ port: PORT || 8080 }, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
