import {defaultTestConfiguration, TestConfiguration} from '../support/test-config.model';
import {defaultReportingConfiguration, ReportingConfiguration} from '../report/report-config.model';
import { defaultElementSelectors } from '../page-objects/page-object';

/**
 * Liste of elements used in the spec definitions
 */
export type ElementSelectorType = 
    'title'
  | 'modalTitle'
  | 'select'
  | 'buttonPrimary'
  | 'buttonSecondary'
  | 'buttonIcon'
  | 'radioButton'
  | 'error'
  | 'warning';

/**
 * BDD test command additional params:
 * * config: path to the config file 
 */
export interface BddCommandArgs {
  config?: string;
}

/**
 * Interface of the config provided in the configuration file
 */
export interface BddConfiguration {
  tests: TestConfiguration;
  reports: ReportingConfiguration;
  selectors?: BddSelectors;
}

export type BddSelectors = { [key in ElementSelectorType]: string };

/**
 * Default BDD Tests configuration
 */
export const defaultBddConfiguration: BddConfiguration = {
  tests: defaultTestConfiguration,
  reports: defaultReportingConfiguration,
  selectors: defaultElementSelectors
};
