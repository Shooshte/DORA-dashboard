import { test, expect } from "@playwright/test";

test("has project and pipeline config form", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  // Expect a title "to contain" a substring.
  await page.getByTitle("Pipeline Data Config").isVisible();
});
