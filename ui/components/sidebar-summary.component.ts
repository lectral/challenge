import { expect } from "../../fixtures/fixtures";
import { BaseComponent } from "./base.component";
import { SearchBarComponent } from "./search-bar.component";

export class SidebarSummaryComponent extends BaseComponent {
  root = this.parent.getByRole("main");
  searchBar: SearchBarComponent = new SearchBarComponent(this.page);
  headline = this.root.locator("h1");
  directionsButton = this.page.locator('[data-value="Directions"]');

  async clickDirectionsButton() {
    await this.directionsButton.click();
  }

  async assertHeadlineText(expected: string): Promise<void> {
    await expect(await this.headline.innerText()).toBe(expected);
  }
}
