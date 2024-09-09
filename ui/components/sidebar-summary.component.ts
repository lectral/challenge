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
    // we could wait for proper request to finish here
    // in case of google they are performing a lot of requests ;)
    await this.page.waitForLoadState('networkidle')
    await expect(this.headline).toContainText(expected);
  }

  async assertErrorLocationNotFound(expected: string): Promise<void> {
    // should contain text "Google Maps can't find location "expected"
    await expect(this.root).toContainText(`Google Maps can't find ${expected}`);
  }

}
