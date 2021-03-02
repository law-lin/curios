import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

async function main() {
  const app = express();

  const { PORT } = process.env;

  app.use(cors());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
