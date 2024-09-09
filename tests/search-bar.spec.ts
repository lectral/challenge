import {test } from '../fixtures/fixtures';

export const RECOMMENDATIONS_COUNT = 5 

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

  test('should display proper error message when searching for non-existing location', async ({ui}) => {
    const nonExistingLocation = '#$@Non-existing location#@$%';
    await ui.maps.searchBar.fill(nonExistingLocation);
    await ui.maps.searchBar.triggerSearchByEnter();

    await ui.maps.sidebarSummary.assertErrorLocationNotFound(nonExistingLocation);
  });

  test("should show list of search recommendations on partial search", async ({ui}) => {
    const partialLocation = 'Lon';
    await ui.maps.searchBar.fill(partialLocation);
    
    await ui.maps.searchBar.assertSearchRecommendations(partialLocation);
  });

  test("should show list of searches for non-obvious location", async ({ui}) => {
    const partialLocation = 'Bar';
    await ui.maps.searchBar.fill(partialLocation);
    await ui.maps.searchBar.triggerSearchByClick();

    // Google Maps does not provide any attributes to more properly tests results.
    await ui.maps.sidebarResults.assertHeadlineText();
  });
  
  test('should properly handle lowercase, upper and mixed case searches', async ({ui}) => {
    const searches = ['london', 'London', 'LONDON', 'LoNdOn', 'lOnDoN'];
    for (const search of searches) {
      await test.step(`on value ${search}`, async () => {
        await ui.maps.searchBar.fill(search);
        await ui.maps.searchBar.triggerSearchByClick();
        await ui.maps.sidebarSummary.assertHeadlineText('London');
      });
    }
  });
  
});
