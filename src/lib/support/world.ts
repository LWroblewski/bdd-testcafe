import { setWorldConstructor, World } from 'cucumber';
import testControllerHolder, {TestControllerHolder} from './testControllerHolder';
import {PageObject} from '../page-objects/page-object';
import {TestConfiguration} from './test-config.model';

export class TestCafeWorld implements World {

  public readonly attach: (...args) => void;
  private readonly parameters: { [key: string]: any };
  private holder: TestControllerHolder;
  private testController;
  private page: PageObject;
  private waitForTestController;

  private _config: TestConfiguration;

  public get config(): TestConfiguration {
    return this._config;
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
}
setWorldConstructor(TestCafeWorld);
