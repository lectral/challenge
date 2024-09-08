import { Locator } from "@playwright/test";
import { BaseComponent } from "./base.component";

// search bar for google maps
export class SearchBarComponent extends BaseComponent {
    root = this.page.getByRole('search');
    private searchBarInput: Locator = this.root.locator('input');
    private searchBarSearchButton: Locator = this.root.locator('#searchbox-searchbutton');
    
    async fill(text: string): Promise<void> {
        await this.searchBarInput.fill(text);
    }

    async triggerSearchByEnter(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

    async triggerSearchByClick(): Promise<void> {
        await this.searchBarSearchButton.click();
    }


}
