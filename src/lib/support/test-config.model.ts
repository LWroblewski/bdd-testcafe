export interface TestConfiguration {
  host: string;
  proxy: string;
  browsers: string[] | string;
  concurrency: number;
  screenshotsPath: string;
  debug: boolean;
  testFile: string;
}

export const defaultTestConfiguration: TestConfiguration = {
  host: 'localhost',
  proxy: null,
  browsers: 'chrome',
  screenshotsPath: 'reports/screenshots/',
  concurrency: 1,
  debug: false,
  testFile: `node_modules/bdd-launcher/lib/test.js`
};
