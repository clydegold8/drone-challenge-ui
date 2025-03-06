import { test, expect } from "@playwright/test";

test("Controller pad component should have the right elements", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(page.locator(".pt-5")).toBeVisible();
  await expect(
    page.getByRole("button").filter({ hasText: /^$/ }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("button").filter({ hasText: /^$/ }).nth(1)
  ).toBeVisible();
  await expect(
    page.getByRole("button").filter({ hasText: /^$/ }).nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("button").filter({ hasText: /^$/ }).nth(3)
  ).toBeVisible();
  await expect(
    page.getByRole("button").filter({ hasText: /^$/ }).nth(4)
  ).toBeVisible();
});

test("Controller pad component should be disabled when sending instructions", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole("button", { name: "Send Instructions" }).click();
  await expect(page.locator(".pt-5 > .flex")).toBeVisible();
  await expect(page.locator(".pt-5")).toBeVisible();
});

test("Controller pad component should match with snap shots", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(page.getByRole("group")).toMatchAriaSnapshot(`
      - group "Drone Controller":
        - button:
          - img
        - button:
          - img
        - button:
          - img
        - button:
          - img
        - button:
          - img
        - img
        - heading "Drone on Standby" [level=1]
        - code: Waiting for Instructions
        - button "Clear Instructions"
        - button "Send Instructions" [disabled]
      `);
});
