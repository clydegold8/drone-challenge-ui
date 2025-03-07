import { test, expect } from "@playwright/test";

test("Drone flight results table component should have the right elements", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByRole("heading", { name: "Drone Flight Results" })
  ).toBeVisible();
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByText("No Drone Flight Results")).toBeVisible();
});

test("Drone flight results table component should be populated after submitting a valid instructions", async ({
  page,
}) => {
  await page.route(
    "**/instruct-drone?instructions=^%3Cv%3Ex",
    async (route) => {
      const json = {
        success: true,
        instructions: "^<v>x",
        billboards: [
          {
            id: "ebc574feffbc122beaa6c5fa",
            x: 0,
            y: 0,
            photosTaken: 1,
            advertiser: "Howell, Gutkowski and Rolfson",
            address: "987 Tyree Well",
            billboardText:
              "The blue Mouse combines Turkey aesthetics with Radon-based durability",
            image: "https://picsum.photos/seed/OWCNI/400/250?grayscale",
          },
        ],
      };
      await route.fulfill({ json });
    }
  );

  await page.goto("http://localhost:5173/");
  await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole("button", { name: "Send Instructions" }).click();
  await expect(
    page.getByRole("heading", { name: "Drone Flight Results" })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "AdvertiserAddressPhotos" }).nth(2)
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Advertiser" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Address" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Photos Taken" })).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Billboard Text" })
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Actions" })).toBeVisible();
  await expect(page.getByRole("cell").filter({ hasText: /^$/ })).toBeVisible();
});
