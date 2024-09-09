import { test as base } from "@playwright/test";
import { MapsUI } from "../ui/pages/maps.page";
import { setDefaultCookies } from "./cookies";

export const apiUiFixtures = base.extend<{
  api: {};
  ui: {
    maps: MapsUI;
  };
}>({
  api: async ({ request }, use) => {},
  ui: async ({ page, context }, use) => {
    await setDefaultCookies(context);
    await use({
      maps: new MapsUI(page),
    });
  },
});

export const test = apiUiFixtures;
export { expect } from "@playwright/test";
