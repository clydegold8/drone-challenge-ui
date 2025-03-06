import { test, expect } from '@playwright/test';

test('Main page has all the required components', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading', { name: 'Bigdatr Drone Control Panel' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Bigdatr Drone Control Instructions' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Drone Controller' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Drone Flight Results' })).toBeVisible();
  await expect(page.getByRole('alert')).toBeVisible();
});

test('Main page should match with snap shots', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('#root')).toMatchAriaSnapshot(`- heading "Bigdatr Drone Control Panel" [level=1]`);
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Bigdatr Drone Control Instructions" [level=1]
      - paragraph: Bigdatr operates an aerial drone to capture photographs of billboards. The drone moves in precise 1 km increments in four directions or can take a photograph when positioned correctly.
      - paragraph: "Control Pad Functions:"
      - list:
        - listitem: 🔼 Up → Moves 1 km north
        - listitem: 🔽 Down → Moves 1 km south
        - listitem: ◀ Left → Moves 1 km west
        - listitem: ▶ Right → Moves 1 km east
        - listitem: 📷 Center → Takes a photograph
      - paragraph: Ensure the drone is positioned correctly before taking a photograph. Happy flying! 🚁📷
      - button "Hide Control Instructions"
      `);
    await expect(page.getByRole('group')).toMatchAriaSnapshot(`
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
    await expect(page.locator('#root')).toMatchAriaSnapshot(`- heading "Drone Flight Results" [level=1]`);
    await expect(page.getByRole('alert')).toMatchAriaSnapshot(`- alert: No Drone Flight Results`);
});



