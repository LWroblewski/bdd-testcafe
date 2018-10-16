import {defaultTestConfiguration, TestConfiguration} from '../support/test-config.model';
import {defaultReportingConfiguration, ReportingConfiguration} from '../report/report-config.model';

export interface BddCommandArgs {
  config?: string;
}

export interface BddConfiguration {
  tests: TestConfiguration;
  reports: ReportingConfiguration;
}

export const defaultBddConfiguration: BddConfiguration = {
  tests: defaultTestConfiguration,
  reports: defaultReportingConfiguration
};
