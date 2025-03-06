import { test, expect } from "@playwright/test";

test("Billboard detail component should have the right elements", async ({
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
            id: "c51f64ddab10c001a2267877",
            x: 18,
            y: 35,
            photosTaken: 3,
            advertiser: "Walsh, Huel and Champlin",
            address: "529 Rippin Branch",
            billboardText:
              "Kunde, Halvorson and Anderson's most advanced Table technology increases improbable capabilities",
            image: "https://picsum.photos/seed/cCdXby/400/250",
          },
        ],
      };
      await route.fulfill({ json });
    }
  );

  await page.route(
    "**/get-billboard?id=c51f64ddab10c001a2267877",
    async (route) => {
      const json = {
        success: true,
        billboard: {
          id: "c51f64ddab10c001a2267877",
          x: 18,
          y: 35,
          photosTaken: 3,
          advertiser: "Walsh, Huel and Champlin",
          address: "529 Rippin Branch",
          billboardText:
            "Kunde, Halvorson and Anderson's most advanced Table technology increases improbable capabilities",
          image: "https://picsum.photos/seed/cCdXby/400/250",
        },
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
  await page
    .getByRole("row", { name: "New Walsh, Huel and Champlin" })
    .getByRole("button")
    .click();
  await expect(
    page.getByRole("heading", { name: "Billboard Details" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
});

test("Billboard detail component should be closed after clicking close btn", async ({
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
            id: "c51f64ddab10c001a2267877",
            x: 18,
            y: 35,
            photosTaken: 3,
            advertiser: "Walsh, Huel and Champlin",
            address: "529 Rippin Branch",
            billboardText:
              "Kunde, Halvorson and Anderson's most advanced Table technology increases improbable capabilities",
            image: "https://picsum.photos/seed/cCdXby/400/250",
          },
        ],
      };
      await route.fulfill({ json });
    }
  );

  await page.route(
    "**/get-billboard?id=c51f64ddab10c001a2267877",
    async (route) => {
      const json = {
        success: true,
        billboard: {
          id: "c51f64ddab10c001a2267877",
          x: 18,
          y: 35,
          photosTaken: 3,
          advertiser: "Walsh, Huel and Champlin",
          address: "529 Rippin Branch",
          billboardText:
            "Kunde, Halvorson and Anderson's most advanced Table technology increases improbable capabilities",
          image: "https://picsum.photos/seed/cCdXby/400/250",
        },
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
  await page
    .getByRole("row", { name: "New Walsh, Huel and Champlin" })
    .getByRole("button")
    .click();
  await expect(
    page.getByRole("heading", { name: "Billboard Details" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(
    page
      .getByRole("row", { name: "New Walsh, Huel and Champlin" })
      .getByRole("button")
  ).toBeVisible();
});
