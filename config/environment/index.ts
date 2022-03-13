import path from 'path';
import fs from 'fs';

import dotEnvSafe from 'dotenv-safe';

const dotEnvFilePath = path.resolve(
  process.env.NODE_ENV
    ? path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
    : path.resolve(process.cwd(), '.env')
);

if (fs.existsSync(dotEnvFilePath)) {
  dotEnvSafe.config({
    allowEmptyValues: true,
    path: dotEnvFilePath,
    example: path.resolve(process.cwd(), '.env.example')
  });
} else {
  throw new Error('not found environment variables');
}
