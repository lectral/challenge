import { expect, Page } from "@playwright/test";
import { SearchBarComponent } from "../components/search-bar.component";
import { SidebarSummaryComponent } from "../components/sidebar.component";
import { BaseUI } from "./base.ui";

export class MapsUI extends BaseUI {

    constructor(page: Page) {
        super(page, '?hl=en');
    }

    searchBar = new SearchBarComponent(this.page);
    sidebarSummary = new SidebarSummaryComponent(this.page);

    async assertPageIsLoaded() {
        await expect(this.searchBar.root).toBeVisible();
    }
} 
