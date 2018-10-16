import { setWorldConstructor, World } from 'cucumber';
import testControllerHolder, {TestControllerHolder} from './testControllerHolder';
import {PageObject} from '../page-objects/page-object';
import {TestConfiguration} from './test-config.model';
import { BddConfiguration, BddSelectors } from '../config/config.model';

/**
 * Custom World for Cucumber:
 * * handles the link with TestCafe
 * * Provides custom config, mainly custom selectors for spec definitions
 */
export class TestCafeWorld implements World {

  public readonly attach: (...args) => void;
  private readonly parameters: { [key: string]: any };
  private holder: TestControllerHolder;
  private testController;
  private page: PageObject;
  private waitForTestController;

  private _config: BddConfiguration;

  public get config(): BddConfiguration {
    return this._config;
  }

  public get testsConfig(): TestConfiguration {
    return this._config ? this._config.tests : null;
  }

  public get selectors(): BddSelectors {
    return this._config ? this._config.selectors : null;
  }

  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
    this.holder = testControllerHolder;
    this.waitForTestController = this.holder.get()
      .then(tc => {
        this.testController = tc;
        this.page = new PageObject(this.testController, this);
        return tc;
      });
  }

  initConfig(config: BddConfiguration) {
    this._config = config;
  }
}
setWorldConstructor(TestCafeWorld);
