# bdd-testcafe

E2E tests are a very important part of your projects, mainly to avoid regressions and bugs, especially on specific parts of your application which are not regularly tested.

Their purpose is to test your product, and not your code. This a very common mistake when writting e2e tests: testing the code, and the business logic of the app. In fact, these tests should be written by product owners, and not by developers. More important, theses business tests should be used as a source of documentation and specifications for the project.

Cucumber offers you this opportunity, with the possibility to write understandable tests with Gherkin.

TestCafe has been prefered over Selenium because of the setup simplicity, and the lot of possibilities it offers (remote tests, multi browsers, concurrency, ie...).

## Presentation
This library main goal is to allow you to launch e2e tests using cucumber and TestCafe. Tests are feature files written in Gherkin, and are executed by Cucumber. The browser is started and managed by Testcafe APIs.

## Setup
TODO
