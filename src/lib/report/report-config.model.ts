export interface ReportingConfiguration {
  jsonFile: string;
  output: string;
}

export const defaultReportingConfiguration: ReportingConfiguration = {
  jsonFile: '/reports/report.json',
  output: 'reports/report.html'
};
