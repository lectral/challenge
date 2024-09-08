import {test, expect } from '../fixtures/fixtures';

test.describe('Google Maps Search', () => {
  test.beforeEach(async ({ui}) => {
    await ui.maps.goto();
    await ui.maps.assertPageIsLoaded();
  });
  
  test('should allow for searching when specific location is entered', async ({page, context, ui}) => {
    await ui.maps.searchBar.fill('New York');
    await ui.maps.searchBar.triggerSearchByEnter();
    await expect(ui.maps.sidebarSummary.headline).toHaveText('New York');
  });

});
