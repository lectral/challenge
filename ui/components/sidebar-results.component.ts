import { expect } from "../../fixtures/fixtures";
import { BaseComponent } from "./base.component";
import { SearchBarComponent } from "./search-bar.component";

export class SidebarResultsComponent extends BaseComponent {
  root = this.parent.getByRole("main");
  feed = this.root.getByRole('feed');
  headline = this.feed.locator("h1");
  
  async assertHeadlineText(): Promise<void> {
    await expect(this.headline).toContainText("Results");
  }
}
