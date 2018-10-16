export class TestControllerHolder {
  captureResolver: any;
  getResolver: (value?: (TestController | PromiseLike<TestController>)) => void;
  testController: TestController;

  capture(t): Promise<TestController> {
    this.testController = t;

    if (this.getResolver) {
      this.getResolver(t);
    }

    return new Promise((resolve) => {
      this.captureResolver = resolve;
    });
  }

  free(): void {
    this.testController = null;

    if (this.captureResolver) {
      this.captureResolver();
    }
  }

  get(): Promise<TestController> {
    return new Promise((resolve) => {
      if (this.testController) {
        resolve(this.testController);
      } else {
        this.getResolver = resolve;
      }
    });
  }
}

const testControllerHolder = new TestControllerHolder();

export default testControllerHolder;
