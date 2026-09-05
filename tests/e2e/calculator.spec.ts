import { expect, test } from "@playwright/test";

test.describe("TI2026 Fantasy Calculator", () => {
  test("loads the calculator and shows a complete recommended roster", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Dota 2 Fantasy Calculator & Optimizer" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Best roster" })).toBeVisible();
    await expect(page.getByText("Projected roster score", { exact: true })).toBeVisible();
    await expect(page.locator(".winner-card")).toHaveCount(3);
  });

  test("saves a selected Prefix after a page reload", async ({ page }) => {
    await page.goto("/");

    const prefix = page.getByLabel("Prefix");
    await prefix.selectOption("golden");
    await expect(prefix).toHaveValue("golden");

    await page.reload();
    await expect(page.getByLabel("Prefix")).toHaveValue("golden");
  });

  test("keeps the main navigation usable", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Predictions", exact: true }).click();
    await expect(page).toHaveURL(/\/predictions$/);
    await expect(page.getByRole("link", { name: "Guide", exact: true })).toBeVisible();
  });
});
