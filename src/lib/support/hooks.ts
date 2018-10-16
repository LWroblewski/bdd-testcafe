import {After, AfterAll, Before, BeforeAll, setDefaultTimeout} from 'cucumber';
import {TestConfiguration} from './test-config.model';
import {loadConfig} from '../config/config-loader';
import { BddConfiguration } from '../config/config.model';

const createTestCafe = require('testcafe');

let config: BddConfiguration = null;
let testcafe = null;
let indexPort = 0;

setDefaultTimeout(60000);

BeforeAll(() => loadConfig().then((loadedConfig) => config = loadedConfig));

Before(function() {
  this.initConfig(config);
  createTestCafe(config.tests.host, 1338 + indexPort, 1339 + indexPort)
    .then(tc => {
      testcafe = tc;
      const runner = testcafe.createRunner();
      return runner
        .useProxy(config.tests.proxy)
        .src(config.tests.testFile)
        .screenshots(config.tests.screenshotsPath, false)
        .concurrency(config.tests.concurrency)
        .browsers(config.tests.browsers)
        .run({ debugMode: config.tests.debug })
        .then(() => {
          testcafe.close();
          // runner.stop();
        })
        .catch(error => {
          console.log('closing testcafe on error...', error);
          // testcafe.close();
        });
    });
  indexPort += 2;
  return this.waitForTestController
    .then(testController => testController.maximizeWindow());
});

After(function() {
  this.holder.free();
});

AfterAll(() => {
  let intervalId = null;

  function waitForTestCafe() {
    intervalId = setInterval(checkLastResponse, 1000);
  }

  function checkLastResponse() {
    process.exit();
    clearInterval(intervalId);
  }

  waitForTestCafe();
});
