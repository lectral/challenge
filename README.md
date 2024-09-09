# Readme

## Architecture
I decided to test out the architecture described in this LinkedIn [article](https://www.linkedin.com/pulse/simple-effective-e2e-test-architecture-playwright-denis-skvortsov-hv5pf/) for the purpose of this challenge. 

## Running
To run the tests in Docker, use the following command:
```yarn run:docker```

## Notes
- To enhance test resilience and reduce flakiness, we should utilize roles and test ID attributes. The Google Maps page does not always reliably provide these.
- I have added a `docker-compose.yml` file and a `Dockerfile` to ensure reliable test execution in different environments or on CI.
- The tests are located in `search-bar.spec.ts`. The first two tests correspond to AC1 and AC2 from the challenge description.
  - Additional tests have also been included in this file.
- A visual regression test has been created but is currently skipped in `visual.spec.ts`.

### Additional Test Cases That Could Be Scripted:
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
- ... and more, as this is a large product.
