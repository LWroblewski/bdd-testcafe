import { Before, Given, Then, When } from 'cucumber';
import {PageObject} from '../page-objects/page-object';

// TODO: remove after cucumber-js republishes initial AfterStep
async function AfterStep(page: PageObject) {
  await page.takeScreenshot();
}

When(/^Je me rends sur la page home$/, async function() {
  await this.page.gotoPage('');
  await AfterStep(this.page);
});

Then(/^Je devrais naviguer sur la page "(.*?)"$/, async function(titleText) {
  await this.page.shouldTitleExists(titleText);
  await AfterStep(this.page);
});

Then(/^Je devrais voir apparaître la modale "(.*?)"$/, async function(modalTitle) {
  await this.page.shouldModalTitleExists(modalTitle);
  await AfterStep(this.page);
});

When(/^Je clique sur le bouton "(.*?)"/, async function(buttonLabel: string) {
  await this.page.clickOnButton(buttonLabel);
  await AfterStep(this.page);
});

When(/^Je clique sur le bouton primaire$/, async function() {
  await this.page.clickOnPrimaryButton();
  await AfterStep(this.page);
});

When(/^Je clique sur le bouton secondaire$/, async function() {
  await this.page.clickOnSecondaryButton();
  await AfterStep(this.page);
});

When(/^Je clique sur le bouton Icône "(.*?)"$/, async function(buttonIconLabel) {
  await this.page.clickOnButtonIcon(buttonIconLabel);
  await AfterStep(this.page);
});

Then(/Je devrais voir le champ de saisie "(.*?)"$/, async function(inputLabel) {
  await this.page.shouldInputExists(inputLabel);
  await AfterStep(this.page);
});

Then(/^Le bouton de validation principal devrait être (disabled|enabled)$/, async function(isEnabled) {
  await this.page.shouldButtonPrimaryBeEnabledOrDisabled(isEnabled === 'enabled');
  await AfterStep(this.page);
});

When(/^Je sélectionne le radio button "(.*?)"$/, async function(radioLabel) {
  await this.page.clickOnRadioButton(radioLabel);
  await AfterStep(this.page);
});

When(/^Je saisis la valeur "(.*?)" dans le champ de saisie "(.*?)"$/, async function(value, inputLabel) {
  await this.page.writeInInput(inputLabel, value);
  await AfterStep(this.page);
});

When(/^Je saisis la valeur "(.*?)" dans le champ de saisie n°(d+)$/, async function(value, inputIndex) {
  await this.page.writeInInput(inputIndex, value);
  await AfterStep(this.page);
});

When(/^Je saisis le mail "(.*?)"$/, async function(value) {
  await this.page.writeEmail(value);
  await AfterStep(this.page);
});

When(/^Je saisis le numéro de téléphone "(d+)"$/, async function(value) {
  await this.page.writePhone(value);
  await AfterStep(this.page);
});

When(/^Je saisis la date de naissance "(.*?)"$/, async function(value) {
  await this.page.writeBirthDate(value);
  await AfterStep(this.page);
});

When(/^Je sélectionne la valeur "(.*?)" dans la liste "(.*?)"$/, async function(value, selectLabel) {
  await this.page.selectListOption(selectLabel, value);
  await AfterStep(this.page);
});

When(/^J'attends (\d+) secondes$/, async function(numSeconds) {
  await this.page.waitDelay(numSeconds * 1000);
  await AfterStep(this.page);
});

Then(/^Le champ de saisie n°(\d+) devrait contenir la valeur "(.*?)"$/, async function(inputIndex, value) {
  await this.page.shouldInputHasValue(inputIndex, value);
  await AfterStep(this.page);
});

Then(/^Je devrais voir le texte "(.*?)" sur la page$/, async function(value) {
  await this.page.shouldPageHasText(value);
  await AfterStep(this.page);
});

Then(/^Le champ de saisie "(.*?)" devrait contenir la valeur "(.*?)"$/, async function(inputLabel, value) {
  await this.page.shouldInputHasValue(inputLabel, value);
  await AfterStep(this.page);
});

Then(/^Je devrais voir cette erreur: "(.*?)"$/, async function(errorText) {
  await this.page.shouldHaveError(errorText);
  await AfterStep(this.page);
});

Then(/^Je devrais voir ce warning: "(.*?)"$/, async function(warningText) {
  await this.page.shouldHaveWarning(warningText);
  await AfterStep(this.page);
});
