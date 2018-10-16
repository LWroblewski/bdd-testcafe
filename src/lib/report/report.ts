import {defaultReportingConfiguration, ReportingConfiguration} from './report-config.model';
const reporter = require('cucumber-html-reporter');

const args: Partial<ReportingConfiguration> = {
  ...defaultReportingConfiguration,
  ...require('yargs').argv
};

reporter.generate({
  theme: 'foundation',
  jsonFile: `${process.cwd()}/${args.jsonFile}`,
  output: args.output,
  screenshotsDirectory: 'reports/screenshots',
  storeScreenshots: false,
  reportSuiteAsScenarios: false,
  launchReport: true,
  brandTitle: 'Rapport de tests e2e',
  metadata: {
    'App Version': '0.3.2',
    'Test Environment': 'STAGING',
    'Browser': 'Chrome  54.0.2840.98',
    'Platform': 'Windows 10',
    'Parallel': 'Scenarios',
    'Executed': 'Remote'
  }
});
process.exit();


// more info on `metadata` is available in `options` section below.

// to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`.
// More info is available in `options` section below.
