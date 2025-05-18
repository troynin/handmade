'use strict';

import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { basename as _basename, join, dirname } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);


const env = _env.NODE_ENV || 'development';
const configRaw = await readFile(new URL('../config/config.json', import.meta.url), 'utf-8');
const configJSON = JSON.parse(configRaw);
const config = configJSON[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

for (const file of files) {
  const modelModule = await import(pathToFileURL(join(__dirname, file)));
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
