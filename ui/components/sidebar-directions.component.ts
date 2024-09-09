import { Locator } from "@playwright/test";
import { expect } from "../../fixtures/fixtures";
import { BaseComponent } from "./base.component";
import { SearchBarComponent } from "./search-bar.component";

export class SidebarDirectionsComponent extends BaseComponent {
  root = this.parent.locator('#omnibox-directions');
  searchBar: SearchBarComponent = new SearchBarComponent(this.page);
  pointsList = this.root.getByRole('list');
  points = this.pointsList.getByRole('listitem').locator('input');
  point = (index: number) => this.points.nth(index);

  origin: Locator = this.root.locator('[data-value="Directions"]');
  destination: Locator = this.root.locator('[data-value="Directions"]');


  async assertOriginValueToBeEmpty(): Promise<void> {
    await expect(this.points.first()).toHaveValue('');
  }

  async assertDestinationValue(expected: string): Promise<void> {
    await expect(this.points.last()).toHaveValue(new RegExp(expected));
  }

}
