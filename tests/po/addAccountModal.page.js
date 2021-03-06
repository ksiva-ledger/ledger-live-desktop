import { portfolioPage, accountsPage } from "../common.js";
import Modal from "./modal.page";

export default class AddAccountModal extends Modal {
  async importAddButton() {
    return this.$("#add-accounts-import-add-button");
  }

  async goToAddAccount() {
    const exists = await portfolioPage.isAddAccountAvailable();
    if (!exists) {
      await portfolioPage.goToAccounts();
    }
    const addAccountButton = exists
      ? await portfolioPage.emtpyStateAddAccountButton()
      : await accountsPage.addAccountButton();
    await addAccountButton.click();
    await this.waitForDisplayed();
  }

  async prepareAddAccount(currency) {
    const container = await this.container();
    const selectControl = await container.$(".select__control");
    await selectControl.click();

    const input = await selectControl.$("input");
    await input.setValue(currency);
    await this.app.client.keys(["Enter"]);
  }

  async finishAddAccount(mockDeviceEvent) {
    const continueBtn = await this.continueButton();
    await continueBtn.click();

    await mockDeviceEvent({ type: "opened" });
    const importBtn = await this.importAddButton();
    await importBtn.waitForDisplayed();
    await importBtn.waitForEnabled();
    await importBtn.click();
  }
}
