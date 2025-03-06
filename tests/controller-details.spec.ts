import { test, expect } from "@playwright/test";

test("Controller details component should have the right elements", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(
    page.locator("div").filter({ hasText: "Drone on Standby" }).nth(4)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Drone on Standby" })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: /^Waiting for Instructions$/ })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Clear Instructions" })
  ).toBeVisible();
});

test("Controller details component should show the inputed instructions from the controller pad and enable send instructions btn", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(2).click();
  await expect(
    page.locator("pre").filter({ hasText: "Detecting instructions" })
  ).toBeVisible();
  await expect(page.getByText("north,west,east,south,taking")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Clear Instructions" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send Instructions" })
  ).toBeVisible();
});

test("Controller details component should show additional info when submitting the instructions to the drone", async ({
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
  await page
    .getByRole("group")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .first()
    .click();
  await page
    .getByRole("group")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .nth(3)
    .click();
  await page
    .getByRole("group")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .nth(4)
    .click();
  await page
    .getByRole("group")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .nth(1)
    .click();
  await page
    .getByRole("group")
    .getByRole("button")
    .filter({ hasText: /^$/ })
    .nth(2)
    .click();
  await page.getByRole("button", { name: "Send Instructions" }).click();
  await expect(page.getByText("Detecting instructions")).toBeVisible();
  await expect(page.getByText("north,east,south,west,taking")).toBeVisible();
  await expect(
    page.locator("pre").filter({ hasText: "Sending Instructions to the" })
  ).toBeVisible();
  await expect(page.locator("pre").filter({ hasText: "Done!" })).toBeVisible();
  await expect(
    page.locator("pre").filter({ hasText: "Console resets in 2 seconds.." })
  ).toBeVisible();
  await expect(page.getByText("Clear InstructionsSend")).toBeVisible();
});

test("Controller details component Clear instruction btn should reset info showed in the console when clicked", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(2).click();
  await expect(page.getByText("Detecting instructions")).toBeVisible();
  await expect(page.getByText("north,east,south,west,taking")).toBeVisible();
  await page.getByRole("button", { name: "Clear Instructions" }).click();
  await expect(page.getByText("Waiting for Instructions")).toBeVisible();
  await expect(page.locator("pre").nth(1)).toBeVisible();
  await expect(page.getByText("Clear InstructionsSend")).toBeVisible();
});

test("Controller pad component should match with snap shots", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByRole("group")).toMatchAriaSnapshot(`
      - img
      - heading "Drone on Standby" [level=1]
      - text: $
      - code: Waiting for Instructions
      - text: ">"
      - button "Clear Instructions"
      - button "Send Instructions" [disabled]
      `);
});
