import { waitForAngular, AngularSelector } from 'testcafe-angular-selectors';
import testControllerHolder from './support/testControllerHolder';

declare var fixture;
declare var test;

fixture `fixture`
  .page `http://localhost:4200/`
  .beforeEach(async () => {
    // await waitForAngular();
  });

test('test', (t) => testControllerHolder.capture(t));
