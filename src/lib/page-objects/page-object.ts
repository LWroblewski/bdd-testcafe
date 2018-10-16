import { ClientFunction, Selector } from 'testcafe';
import * as base64Img from 'base64-img';
import {TestCafeWorld} from '../support/world';
import { BddSelectors } from '../config/config.model';

const DELAY = 3000;

export const defaultElementSelectors: BddSelectors = {
  title:            'h1.title',
  modalTitle:       'mat-dialog-container h1.title',
  select:           'mat-select',
  buttonPrimary:    'button.primary',
  buttonSecondary:  'button.outline',
  buttonIcon:       'button mat-icon',
  radioButton:      'mat-radio-button',
  error:            'mat-error',
  warning:          'mat-hint.mat-warning'
}

export class PageObject {

  getLocation = ClientFunction(() => document.location.href);
  goBack = ClientFunction(() => window.history.back());

  constructor(private t: TestController, private world: TestCafeWorld) {}

  /**------------------- Element selectors -----------------**/

  getContent(): Selector {
    return this.getElement('body');
  }

  buttons(): Selector {
    return this.getElement('button');
  }

  buttonPrimary(): Selector {
    return this.getElement(this.world.selectors.buttonPrimary);
  }

  buttonSecondary(): Selector {
    return this.getElement(this.world.selectors.buttonSecondary);
  }

  buttonWithLabel(label: string): Selector {
    return this.buttons().withText(label);
  }

  iconButtons(): Selector {
    return this.getElement(this.world.selectors.buttonIcon);
  }

  iconButtonWithLabel(label: string): SelectorPromise {
    return this.iconButtons().withAttribute('aria-label', new RegExp(label));
  }

  radioButtons(): Selector {
    return this.getElement(this.world.selectors.radioButton);
  }

  radioButton(label: string) {
    return this.radioButtons().withText(label);
  }

  selects(): Selector {
    return this.getElement(this.world.selectors.select);
  }

  select(label: string): SelectorPromise {
    return this.selects().withAttribute('ng-reflect-placeholder', new RegExp(label));
  }

  selectOption(optionLabel: string) {
    return this.getElement('mat-option').withText(optionLabel);
  }

  inputs(): Selector {
    return this.getElement('input.mat-input-element');
  }

  async input(inputId: string | number) {
    return isNaN(Number(inputId)) ? this.inputWithLabel(inputId as string) : this.inputWithIndex(Number(inputId));
  }

  inputWithLabel(inputLabel: string): SelectorPromise {
    return this.inputs().withAttribute('ng-reflect-placeholder', new RegExp(inputLabel, 'g'));
  }

  inputWithIndex(index: number): Selector {
    return this.inputs().child(index);
  }

  email(): SelectorPromise {
    return this.inputs().withAttribute('type', 'email');
  }

  phone(): SelectorPromise {
    return this.inputs().withAttribute('type', 'tel');
  }

  birthDate(): SelectorPromise {
    return this.inputs().withAttribute('name', 'birthDate');
  }

  title(): Selector {
    return this.getElement(this.world.selectors.title);
  }

  errors(): Selector {
    return this.getElement(this.world.selectors.error);
  }

  error(errorText: string): Selector {
    return this.errors().withText(errorText);
  }

  warnings(): Selector {
    return this.getElement(this.world.selectors.warning);
  }

  warning(warningText: string): Selector {
    return this.warnings().withText(warningText);
  }

  /**-------------------- Browser interactions -------------------------**/

  gotoPage(page: string): Promise<any> {
    return this.t.navigateTo('/' + page);
  }

  async expectUrl(url: string) {
    const location = await this.getLocation();
    return this.t.expect(location).contains(url);
  }

  /**-------------------- DOM Elements actions ----------------------------**/

  async writeInInput(inputId: string | number, value: string) {
    const input = await this.input(inputId);
    await this.t.typeText(input, value);
  }

  async writeEmail(value: string) {
    const input = await this.email();
    await this.t.typeText(input, value);
  }

  async writePhone(value: string) {
    const input = await this.phone();
    await this.t.typeText(input, value);
  }

  async writeBirthDate(value: string) {
    const input = await this.birthDate();
    await this.t.typeText(input, value);
  }

  async selectListOption(selectLabel: string, optionLabel: string) {
    const select = await this.select(selectLabel);
    await this.t.click(select);
    await this.t.click(this.selectOption(optionLabel));
  }

  async clickOnButton(buttonLabel: string) {
    const button = this.buttonWithLabel(buttonLabel);
    await this.t.click(button);
  }

  async clickOnPrimaryButton() {
    await this.t.click(this.buttonPrimary());
  }

  async clickOnSecondaryButton() {
    await this.t.click(await this.buttonSecondary());
  }

  async clickOnButtonIcon(buttonLabel: string) {
    const buttonIcon = await this.iconButtonWithLabel(buttonLabel);
    await this.t.click(buttonIcon);
  }

  async clickOnRadioButton(radioLabel: string) {
    const radioButton = this.radioButton(radioLabel);
    await this.t.click(radioButton);
  }

  /**-------------------- DOM Elements expectations ------------------------**/

  shouldPageHasText(text: string) {
    return this.shouldElementWithContentExists('body', text);
  }

  shouldTitleExists(title: string) {
    return this.shouldElementWithContentExists(this.world.selectors.title, title);
  }

  shouldModalTitleExists(modalTitle: string) {
    return this.shouldElementWithContentExists(this.world.selectors.modalTitle, modalTitle);
  }

  shouldInputExists(inputLabel: string) {
    return this.inputWithLabel(inputLabel).exists;
  }

  shouldHaveAGivenNumberOfButtons(numButtons: number) {
    return this.shouldHaveAGivenNumberOfElements('button.mat-button', numButtons);
  }

  shouldButtonPrimaryBeEnabledOrDisabled(enabled: boolean) {
    return this.shouldElementBeEnabledOrDisabled(this.world.selectors.buttonPrimary, enabled);
  }

  async shouldInputHasValue(inputId: string, value: string) {
    await this.t.wait(DELAY);
    const inputValue = await this.inputWithLabel(inputId).value;
    return this.t.expect(inputValue).eql(value);
  }

  async shouldHaveError(errorText: string) {
    const errorElt = await this.error(errorText);
    return this.t.expect(errorElt.exists).ok();
  }

  async shouldHaveWarning(warningText: string) {
    const warningElt = await this.warning(warningText);
    return this.t.expect(warningElt.exists).ok();
  }

  /**---------------------- Core functions ----------------------------------**/

  shouldElementBeEnabledOrDisabled(element: string, enabled: boolean) {
    if (enabled) {
      return this.getElement(element);
    } else {
      return this.getElement(element).withAttribute('disabled');
    }
  }

  async shouldElementWithContentExists(element: string, content: string) {
    const elem = await this.getElement(element).textContent;
    return this.t.expect(elem).contains(content);
  }

  shouldHaveAGivenNumberOfElements(element: string, numElements: number) {
    const elem = this.getElement(element);
    return this.t.expect(elem.count).eql(numElements);
  }

  getElement(selector: string): Selector {
    return Selector(selector).with({boundTestRun: this.t});
  }

  async waitDelay(delay: number) {
    await this.t.wait(delay);
  }

  async takeScreenshot(path?: string) {
    return this.t.takeScreenshot(path).then(screenPath => {
      const imgInBase64 = base64Img.base64Sync(screenPath);
      const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
      return this.world.attach(imageConvertForCuc, 'image/png');
    });
  }
}
