import { expect, Page } from "@playwright/test";
import { SearchBarComponent } from "../components/search-bar.component";
import { BaseUI } from "./base.ui";
import { SidebarDirectionsComponent } from "../components/sidebar-directions.component";
import { SidebarSummaryComponent } from "../components/sidebar-summary.component";

export class MapsUI extends BaseUI {

    constructor(page: Page) {
        super(page, '?hl=en');
    }

    searchBar = new SearchBarComponent(this.page);
    sidebarSummary = new SidebarSummaryComponent(this.page);
    sidebarDirections = new SidebarDirectionsComponent(this.page);

    async assertPageIsLoaded() {
        await expect(this.searchBar.root).toBeVisible();
    }
} 
