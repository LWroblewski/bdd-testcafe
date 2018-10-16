import {After, AfterAll, Before, BeforeAll, setDefaultTimeout} from 'cucumber';
import {TestConfiguration} from './test-config.model';
import {loadConfig} from '../config/config-loader';

const createTestCafe = require('testcafe');

let config: TestConfiguration = null;
let testcafe = null;
let indexPort = 0;

setDefaultTimeout(60000);

BeforeAll(() => loadConfig().then(({tests}) => config = tests));

Before(function() {
  createTestCafe(config.host, 1338 + indexPort, 1339 + indexPort)
    .then(tc => {
      testcafe = tc;
      const runner = testcafe.createRunner();
      return runner
        .useProxy(config.proxy)
        .src(config.testFile)
        .screenshots(config.screenshotsPath, false)
        .concurrency(config.concurrency)
        .browsers(config.browsers)
        .run({ debugMode: config.debug })
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
