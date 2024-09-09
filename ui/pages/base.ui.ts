import { Page } from '@playwright/test';

export class BaseUI {
  protected page: Page;
  protected url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }
}
