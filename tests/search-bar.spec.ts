import {test } from '../fixtures/fixtures';

test.describe('Google Maps Search', () => {
  test.beforeEach(async ({ui}) => {
    await ui.maps.goto();
    await ui.maps.assertPageIsLoaded();
  });
  
  test('should show information in sidebar after performing search', async ({page, context, ui}) => {
    const expectedLocation = 'Paris';
    await ui.maps.searchBar.fill(expectedLocation);
    await ui.maps.searchBar.triggerSearchByClick();
    await ui.maps.sidebarSummary.assertHeadlineText(expectedLocation);
  });

  test('should show search entry as destination after clicking directions', async ({page, context, ui}) => {
    const destination = 'London';
    await ui.maps.searchBar.fill(destination);
    await ui.maps.searchBar.triggerSearchByClick();
    await ui.maps.sidebarSummary.assertHeadlineText(destination);

    await ui.maps.sidebarSummary.clickDirectionsButton();
    await ui.maps.sidebarDirections.assertOriginValueToBeEmpty();
    await ui.maps.sidebarDirections.assertDestinationValue(destination);
  });

});
