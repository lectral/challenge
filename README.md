# Readme

## Architecture
I decided to test out the architecture described in this LinkedIn [article](https://www.linkedin.com/pulse/simple-effective-e2e-test-architecture-playwright-denis-skvortsov-hv5pf/) for the purpose of this challenge :) 

## Running
To run the tests in Docker, use the following command:
```yarn run:docker```

## Notes
- To enhance test resilience and reduce flakiness, we should utilize roles and test-ID attributes. The Google Maps page does not always reliably provide these.
- I have added a `docker-compose.yml` file and a `Dockerfile` to ensure reliable test execution in different environments or on CI.
- The tests are located in `search-bar.spec.ts`. The first two tests correspond to AC1 and AC2 from the challenge description.
  - Additional tests have also been included in this file (i.e testing for mixed cases, special characters etc.)
- A visual regression test has been created but is currently skipped in `visual.spec.ts`.

### Additional Test Cases
- Use a list of valid locations (including diacritics, special characters, etc.) to verify if they are properly searched by the user and to check the returned coordinates (data-driven testing).
- Verify if the search history is properly populated and displayed to the user.
- Handle network error scenarios.
- Test keyboard navigation.
- Assess the search box's responsiveness across different resolutions.
- Inject an AdBlocker into Playwright and test its functionality with it enabled.
- Test autocomplete suggestions.
- Evaluate boundaries, such as the maximum length of search box input and behavior when the box is empty.
- Check the accuracy of search results.
- Test the functionality of searching again after finding a location.
- Verify the ability to save locations to saved places.
- Test searching between two locations.
- ... and more, as this is a large product :)

### Non-functional testing
- For testing page load times accessability and general user experience we can use [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=pl), run in CI and store raports to service like [LHCI](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/server.md) server or using Calibre. But it will only provide general score and is not guarantee that our app / page performs as expected.
- **Accessability**
  - For accessability testing we can also use AXE library which integrates with Playwright https://playwright.dev/docs/accessibility-testing
  - Write scripts that behave similarly to the user, using aria-labels, and see if we can navigate page that way.
  - Actual user acceptance tests.
- **Performance and Load Testing**
  - If our testing environment is stable we could for example store requests timings durning tests to a file, and then push them as tagged metrics to monitoring service (for example **Datadog**).
    - Timings can be obtained using for example Playwright `page.on('requestfinished')` using something like this:
    - ```typescript
      export async function setupRequestInterception(test: typeof baseTest) {
            test.beforeEach(async ({ page }, testInfo) => {
                page.on('requestfinished', async (request) => {
                const timing = await request.timing();
                const logEntry = {
                    url: request.url(),
                    method: request.method(),
                    timing: timing.responseEnd - timing.requestStart
                };
      
                const logs = [logEntry]
                fs.writeFileSync(path.join(testInfo.testId), JSON.stringify(logs, null, 2));
                });
            });
        }
      ```
  - We could also store information about how long it takes the tests to execute some happy paths and track if this changes over time and releases.
  - Use software designed for performance or load testing like **JMeter** or **Locust.io**.
- **Security Testing**
  - Depending on the app tests that make sure that users with certain roles don't have access to restricted pages, can't use restricted endpoints etc.
  - Security scanning using SaaS software.

