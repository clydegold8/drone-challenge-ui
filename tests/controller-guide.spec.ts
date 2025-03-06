import { test, expect } from '@playwright/test';

test('Controller guide component should have the right elements', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByText('Bigdatr Drone Control InstructionsBigdatr operates an aerial drone to capture')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Bigdatr Drone Control Instructions$/ })).toBeVisible();
    await expect(page.getByText('Bigdatr operates an aerial')).toBeVisible();
    await expect(page.getByText('Control Pad Functions:')).toBeVisible();
    await expect(page.getByText('🔼 Up → Moves 1 km north')).toBeVisible();
    await expect(page.getByText('🔽 Down → Moves 1 km south')).toBeVisible();
    await expect(page.getByText('◀ Left → Moves 1 km west')).toBeVisible();
    await expect(page.getByText('▶ Right → Moves 1 km east')).toBeVisible();
    await expect(page.getByText('📷 Center → Takes a photograph')).toBeVisible();
    await expect(page.getByText('Ensure the drone is')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hide Control Instructions' })).toBeVisible();
});

test('Controller guide component should be hidden after clicking hide instructions button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', { name: 'Hide Control Instructions' }).click();
    await expect(page.getByRole('button', { name: 'Show Control Instructions' })).toBeVisible();
});

test('Controller guide component should match with snap shots', async ({ page }) => {
    await page.goto('http://localhost:5173');
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
});