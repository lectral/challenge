import { Locator, Page } from "@playwright/test";

export class BaseComponent {
  protected page: Page;
  protected parent: Locator;
  
  constructor(page, parent=page.locator('body')) {
    this.page = page;
    this.parent = parent;
  }

}
