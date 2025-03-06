import { test, expect } from "@playwright/test";

test("Controller component should have the right elements", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByRole("group", { name: "Drone Controller" })
  ).toBeVisible();
  await expect(page.locator(".pt-5")).toBeVisible();
  await expect(page.getByText("Drone on Standby Waiting for")).toBeVisible();
});

test("Controller guide component should match with snap shots", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
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
