import {test} from '../fixtures/fixtures';

test.describe("[VisReg] Google Search Bar", () => {
    test.beforeEach(async ({ ui }) => {
        await ui.maps.goto();
        await ui.maps.assertPageIsLoaded();
    });

    /* Background may change, would need improvment for production */
    /* May fail on different environments */
    test("should render correctly in summary sidebar with input typed [may-fail]", async ({ ui, page }) => {
        await ui.maps.searchBar.fill("London");
        await ui.maps.searchBar.triggerSearchByEnter();
        await ui.maps.assertPageIsLoaded();
        await ui.maps.searchBar.assertVisual();
    });
});
