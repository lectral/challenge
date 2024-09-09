import { expect } from "../../fixtures/fixtures";
import { Locator } from "@playwright/test";
import { BaseComponent } from "./base.component";

const RECOMMENDATIONS_COUNT = 5;

export class SearchBarComponent extends BaseComponent {
  root = this.page.getByRole("search");
  searchbox = this.root.locator("#searchbox");
  searchBarInput: Locator = this.root.locator("input");
  searchBarSearchButton: Locator = this.root.locator("#searchbox-searchbutton");

  recommendations = this.root.getByRole("grid").getByRole("row");
  recommendation = (index: number) => this.recommendations.nth(index);

  async clear(): Promise<void> {
    await this.searchBarInput.fill("");
  }
  async fill(text: string): Promise<void> {
    await this.searchBarInput.fill(text);
  }

  async triggerSearchByEnter(): Promise<void> {
    await this.page.keyboard.press("Enter");
  }

  async triggerSearchByClick(): Promise<void> {
    await this.searchBarSearchButton.click();
  }

  async assertSearchRecommendations(partialSearch: string): Promise<void> {
    await expect(this.recommendations).toHaveCount(RECOMMENDATIONS_COUNT);
    for (let i = 0; i < RECOMMENDATIONS_COUNT; i++) {
      const recommendation = this.recommendation(i);
      await expect(recommendation).toContainText(new RegExp(partialSearch));
    }
  }

  async assertVisual() {
    await expect(this.searchbox).toHaveScreenshot({
        omitBackground: true,
    });
  }
}
