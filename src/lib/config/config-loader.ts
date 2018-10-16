import {BddConfiguration, defaultBddConfiguration, BddCommandArgs} from './config.model';
import * as fs from 'fs';
const argv: BddCommandArgs = require('yargs').argv;

const CONFIG_FILE_NAME = 'bdd-config.json';

export function loadConfig(): Promise<BddConfiguration> {
  return new Promise((resolve, reject) => {
    fs.readFile(argv.config || CONFIG_FILE_NAME, (err, data) => {
      resolve(err ? defaultBddConfiguration : {
        ...defaultBddConfiguration,
        ...JSON.parse(data.toString())
      });
    });
  });
}
